import { GoogleGenAI } from "@google/genai";

const getApiKey = (): string => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY environment variable not set.");
      return "";
    }
    return apiKey;
};

// We memoize the AI instance to avoid re-creating it on every call.
let ai: GoogleGenAI | null = null;
const getAi = () => {
    if (!ai) {
        const key = getApiKey();
        if (key) {
            ai = new GoogleGenAI({ apiKey: key });
        }
    }
    return ai;
};

const isQuotaError = (error: any): boolean => {
    const msg = error?.message?.toLowerCase() || '';
    return (
        error.status === 429 || 
        error.code === 429 || 
        msg.includes('429') || 
        msg.includes('quota') ||
        msg.includes('resource_exhausted') ||
        msg.includes('capacity') ||
        msg.includes('rate limit') ||
        msg.includes('exceeded') // Catch 'user has exceeded quota'
    );
};

// Mock Response Generator for Fallback Mode
const getMockResponse = (prompt: string): string => {
    const p = prompt.toLowerCase();
    
    if (p.includes('cold email') || p.includes('email script')) {
        return "Subject: Reducing procurement costs for [Company]\n\nHi [Name],\n\nI noticed [Company] is active in the [Industry] sector. We recently helped a similar company reduce their sourcing costs by 15% using our verified exporter database.\n\nWould you be open to a 5-minute chat next Tuesday?\n\nBest,\n[Your Name]\n\n(Generated in Offline Mode)";
    }
    
    if (p.includes('cold call') || p.includes('call script')) {
        return "**Opener:** Hi [Name], this is [Name] from TradeNexus. I'm calling because we've just updated our database of high-volume exporters in [Industry], and I thought you might be looking for more reliable suppliers.\n\n**Objection (Not Interested):** I understand. Most of our clients said the same until they saw our price benchmarking tool. It takes 2 minutes to show you. Will you be at your desk at 2pm?\n\n(Generated in Offline Mode)";
    }
    
    if (p.includes('hs code') || p.includes('classify')) {
        return "Based on your description, the likely HS Code is **6109.10** (T-shirts, singlets and other vests; knitted or crocheted, of cotton). \n\nDuty Rate: ~16.5%\n\n(Generated in Offline Mode)";
    }

    if (p.includes('negotiation') || p.includes('objection')) {
        return "When facing price objections, focus on the Total Cost of Ownership (TCO). Highlight how your database reduces risk and vetting time, which saves money in the long run. Ask: 'If we could save you 10 hours a week on supplier vetting, what would that be worth?'\n\n(Generated in Offline Mode)";
    }

    return "I apologize, but our AI systems are currently at maximum capacity. I am operating in Offline Mode. I can still help you navigate the dashboard or explain our features.";
};

export const getGeminiResponse = async (prompt: string): Promise<string> => {
    const genAI = getAi();
    if (!genAI) return getMockResponse(prompt);
    
    const systemInstruction = `
        You are an expert AI Sales Assistant for "TradeNexus".
        Your goal is to help users sell databases of importers and exporters.
        Provide concise, persuasive, and professional advice.
        If generating content, keep it short and impact-focused.
    `;

    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                topP: 0.95,
            },
        });
        
        const text = response.text;
        if (!text) {
          throw new Error("No text response from Gemini API.");
        }
        return text;

    } catch (error: any) {
        if (isQuotaError(error)) {
            console.warn("Gemini Quota Exceeded (Text Gen). Using Mock Fallback.");
            return getMockResponse(prompt);
        }
        console.error("Error calling Gemini API:", error);
        return "I encountered an error processing your request. Please check your connection.";
    }
};

export const getHsCodeClassification = async (productDescription: string): Promise<string> => {
    const genAI = getAi();
    if (!genAI) return getMockResponse('hs code');

    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: productDescription,
        });
        return response.text || "Classification unavailable.";
    } catch (error: any) {
        if (isQuotaError(error)) return getMockResponse('hs code');
        return "Error classifying product.";
    }
};

export const getTradeBotResponse = async (history: { role: 'user' | 'model'; text: string }[], newMessage: string): Promise<string> => {
    const genAI = getAi();
    if (!genAI) return getMockResponse(newMessage);
  
    // Convert frontend history to SDK history format
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));
  
    const systemInstruction = `
      You are "NexusSales", an AI specialized in international trade negotiation and sales strategy.
      Your user is selling B2B databases of importers/exporters.
      Help them:
      1. Overcome objections (e.g., "We already have a supplier").
      2. Suggest pricing strategies.
      3. Draft follow-up messages.
      4. Analyze deal health.
      
      Be assertive, professional, and results-oriented.
    `;
  
    try {
      const chat = genAI.chats.create({
        model: "gemini-3-pro-preview",
        config: {
          systemInstruction,
        },
        history: chatHistory
      });
  
      const result = await chat.sendMessage({ message: newMessage });
      return result.text || "I apologize, but I couldn't generate a response at this time.";
    } catch (error: any) {
      if (isQuotaError(error)) {
          return getMockResponse(newMessage);
      }
      console.error("ChatBot error:", error);
      return "I encountered an issue. Please try again.";
    }
};

export interface NewsItem {
    text: string;
    sources: { title: string; uri: string }[];
}

export const getRealTimeTradeNews = async (): Promise<NewsItem> => {
     // Fallback / Mock News
     return { 
         text: "Global trade volumes up 2.5% in Q3 as supply chains stabilize. Vietnam emerges as top alternative manufacturing hub for electronics. New tariffs announced on EV imports in EU.", 
         sources: [
             { title: "Global Trade Review", uri: "#" },
             { title: "Logistics Weekly", uri: "#" }
         ] 
     };
};

// --- New Sales Specific Functions ---

export const generateEmailScript = async (companyName: string, industry: string): Promise<string> => {
    const prompt = `Write a cold email to the Purchasing Director of ${companyName} (Industry: ${industry}).
    The value proposition is that we are selling a verified database of high-quality exporters that could lower their procurement costs.
    Keep it under 150 words. Use a catchy subject line.`;
    return getGeminiResponse(prompt);
};

export const generateCallScript = async (companyName: string): Promise<string> => {
    const prompt = `Write a cold call script for calling ${companyName}.
    Goal: Schedule a demo of our Importer/Exporter Database.
    Include: Opener, Value Prop, and how to handle the "Not interested" objection.`;
    return getGeminiResponse(prompt);
};

export const generateImage = async (prompt: string): Promise<string | null> => {
    const genAI = getAi();
    if (!genAI) return null;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
              parts: [{ text: prompt }],
            },
        });
        
        // Iterate through parts to find the image
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (error: any) {
        if (isQuotaError(error)) {
            console.warn("Gemini Image Quota Exceeded - Skipping generation.");
            return null;
        }
        console.error("Error generating image:", error);
        return null;
    }
};
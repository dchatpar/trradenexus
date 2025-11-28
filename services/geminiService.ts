// AI features are temporarily disabled to fix deployment issues.
// All functions now return static messages or nulls without making API calls.

const disabledMessage = "AI features are temporarily unavailable due to high demand. Please check back later.";
const classificationDisabled = "AI Classification is temporarily unavailable.";
const chatDisabled = "The AI ChatBot is temporarily unavailable.";

export const getGeminiResponse = async (prompt: string): Promise<string> => {
    console.warn("getGeminiResponse called, but AI features are disabled.");
    return Promise.resolve(disabledMessage);
};

export const getHsCodeClassification = async (productDescription: string): Promise<string> => {
    console.warn("getHsCodeClassification called, but AI features are disabled.");
    return Promise.resolve(classificationDisabled);
};

export const getTradeBotResponse = async (history: { role: 'user' | 'model'; text: string }[], newMessage: string): Promise<string> => {
    console.warn("getTradeBotResponse called, but AI features are disabled.");
    return Promise.resolve(chatDisabled);
};

export interface NewsItem {
    text: string;
    sources: { title: string; uri: string }[];
}

export const getRealTimeTradeNews = async (): Promise<NewsItem> => {
     // This function was already mocked, so it's safe.
     return { 
         text: "Global trade volumes up 2.5% in Q3 as supply chains stabilize. Vietnam emerges as top alternative manufacturing hub for electronics. New tariffs announced on EV imports in EU.", 
         sources: [
             { title: "Global Trade Review", uri: "#" },
             { title: "Logistics Weekly", uri: "#" }
         ] 
     };
};

export const generateEmailScript = async (companyName: string, industry: string): Promise<string> => {
    return getGeminiResponse("generate email script");
};

export const generateCallScript = async (companyName: string): Promise<string> => {
    return getGeminiResponse("generate call script");
};

export const generateImage = async (prompt: string): Promise<string | null> => {
    console.warn("generateImage called, but AI features are disabled.");
    return Promise.resolve(null); // Return null to indicate image generation failed.
};

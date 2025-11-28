
import React, { useState, useRef, useEffect } from 'react';
import { PageHeader, GlassCard } from '../common/Shared';
import { getGeminiResponse } from '../../services/geminiService';
import { PaperAirplaneIcon, CpuChipIcon, UserCircleIcon } from '../Icons';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const AIAssistantPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello! I am your TradeNexus AI assistant. Ask me anything about global trade, tariffs, or supplier risks.', sender: 'ai', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const responseText = await getGeminiResponse(input);
            const aiMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'ai', timestamp: new Date() };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            const errorMsg: Message = { id: (Date.now() + 1).toString(), text: "I'm having trouble connecting to the network right now. Please try again.", sender: 'ai', timestamp: new Date() };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            <PageHeader title="AI Trade Assistant" subtitle="Your expert copilot for global commerce" />
            
            <GlassCard className="flex-1 flex flex-col overflow-hidden relative">
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                                    {msg.sender === 'user' ? <UserCircleIcon className="h-5 w-5 text-white" /> : <CpuChipIcon className="h-5 w-5 text-white" />}
                                </div>
                                <div className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-700 text-gray-100 rounded-tl-none'}`}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                    <p className="text-xs opacity-50 mt-2 text-right">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start gap-3 animate-pulse">
                             <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center"><CpuChipIcon className="h-5 w-5 text-white" /></div>
                             <div className="bg-slate-700 p-4 rounded-2xl rounded-tl-none">
                                <div className="flex gap-1">
                                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-900/50 border-t border-white/5">
                    <form onSubmit={handleSend} className="relative">
                        <input 
                            type="text" 
                            className="w-full pl-6 pr-14 py-4 bg-slate-800 rounded-xl border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none text-white placeholder-gray-500 shadow-lg"
                            placeholder="Ask about tariffs, HS codes, or market trends..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                        />
                        <button 
                            type="submit" 
                            disabled={!input.trim() || loading}
                            className="absolute right-2 top-2 p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:bg-gray-600"
                        >
                            <PaperAirplaneIcon className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            </GlassCard>
        </div>
    );
};

export default AIAssistantPage;

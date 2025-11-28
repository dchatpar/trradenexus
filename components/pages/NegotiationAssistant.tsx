
import React from 'react';
import ChatBot from '../ChatBot';
import { PageHeader, GlassCard } from '../common/Shared';
import { CurrencyDollarIcon } from '../Icons';

const NegotiationAssistant: React.FC = () => {
    // Re-using the ChatBot logic but wrapping it in a dedicated page layout for focus
    // In a real app, we might pass specific 'negotiation' context props to ChatBot
    
    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            <PageHeader title="AI Negotiation Assistant" subtitle="Real-time deal coaching and objection handling" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">
                <GlassCard className="col-span-2 p-0 flex flex-col relative overflow-hidden bg-slate-900/50">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                         <CurrencyDollarIcon className="h-64 w-64 text-white" />
                    </div>
                    {/* We embed the chatbot logic visually here by using the global chatbot or re-implementing a dedicated view */}
                    <div className="flex-1 flex items-center justify-center p-12 text-center">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">Start a Negotiation Session</h3>
                            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                                "I'm about to call a prospect who says our price is too high. What should I say?"
                                <br/><br/>
                                Use the chat widget below (bottom right) or the AI Assistant page for general queries. This page is a dashboard for active deal analysis.
                            </p>
                        </div>
                    </div>
                </GlassCard>

                <div className="space-y-6 overflow-y-auto">
                    <GlassCard className="p-6">
                        <h3 className="font-bold text-white mb-4">Quick Tactics</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="p-3 bg-slate-800 rounded-lg border-l-2 border-green-500">
                                <strong>The "Price" Objection:</strong> Focus on ROI. "If we could save you 15% on procurement, is the subscription cost a barrier?"
                            </li>
                            <li className="p-3 bg-slate-800 rounded-lg border-l-2 border-blue-500">
                                <strong>The "Timing" Objection:</strong> Create urgency. "This database segment is being updated next week, locking in current pricing now saves you..."
                            </li>
                        </ul>
                    </GlassCard>
                    
                     <GlassCard className="p-6">
                        <h3 className="font-bold text-white mb-4">Deal Health Check</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Momentum</span>
                                    <span className="text-green-400">High</span>
                                </div>
                                <div className="w-full bg-slate-700 h-1.5 rounded-full"><div className="bg-green-500 h-1.5 rounded-full" style={{width: '80%'}}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Sentiment</span>
                                    <span className="text-yellow-400">Neutral</span>
                                </div>
                                <div className="w-full bg-slate-700 h-1.5 rounded-full"><div className="bg-yellow-500 h-1.5 rounded-full" style={{width: '50%'}}></div></div>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default NegotiationAssistant;

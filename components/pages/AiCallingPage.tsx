

import React, { useState, useEffect, useRef } from 'react';
import { PageHeader, GlassCard, Button } from '../common/Shared';
import { PhoneIcon, PlayIcon, PauseIcon, UserCircleIcon, MicrophoneIcon, XMarkIcon } from '../Icons';
import { mockCallLogs } from '../../data/mockData';
import { generateCallScript } from '../../services/geminiService';
import { connectGeminiLive } from '../../services/geminiLiveService';

const AiCallingPage: React.FC = () => {
    const [script, setScript] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeCallId, setActiveCallId] = useState<string | null>(null);
    const [isLiveCallActive, setIsLiveCallActive] = useState(false);
    const [liveTranscription, setLiveTranscription] = useState<string[]>([]);
    const [audioLevel, setAudioLevel] = useState(0);
    const sessionRef = useRef<any>(null);

    const handleGenerateScript = async () => {
        setLoading(true);
        const newScript = await generateCallScript("Acme Global Industries");
        setScript(newScript);
        setLoading(false);
    };

    const startLiveCall = async () => {
        // Feature is disabled in the service, so this will fail.
        // UI should reflect this disabled state.
        alert("Live AI Calling is temporarily disabled.");
    };

    const endLiveCall = () => {
        if (sessionRef.current) {
            sessionRef.current.disconnect();
            setIsLiveCallActive(false);
            setAudioLevel(0);
        }
    };

    const togglePlay = (id: string) => {
        if (activeCallId === id) {
            setActiveCallId(null);
        } else {
            setActiveCallId(id);
        }
    };

    return (
        <div className="space-y-8">
            <PageHeader title="AI Calling Center" subtitle="Automated voice agents & call intelligence" />

            {isLiveCallActive && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
                    <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl p-8 flex flex-col items-center relative">
                        <button onClick={endLiveCall} className="absolute top-4 right-4 text-gray-400 hover:text-white"><XMarkIcon className="h-6 w-6" /></button>
                        
                        <div className="relative mb-8">
                             <div className="h-32 w-32 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.5)] z-10 relative">
                                <MicrophoneIcon className="h-16 w-16 text-white" />
                             </div>
                             {/* Audio Pulse Rings */}
                             <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping" style={{ transform: `scale(${1 + audioLevel/50})` }}></div>
                             <div className="absolute inset-0 rounded-full bg-purple-500 opacity-20 animate-pulse" style={{ animationDuration: '2s', transform: `scale(${1 + audioLevel/80})` }}></div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">Live AI Call</h3>
                        <p className="text-green-400 font-mono text-sm mb-6 animate-pulse">● Connected (Gemini Live)</p>

                        <div className="w-full bg-slate-800 rounded-xl p-4 h-48 overflow-y-auto mb-6 custom-scrollbar text-sm space-y-2">
                            {liveTranscription.length === 0 && <p className="text-gray-500 text-center italic mt-10">Listening...</p>}
                            {liveTranscription.map((t, i) => (
                                <p key={i} className="text-gray-300 whitespace-pre-wrap">{t}</p>
                            ))}
                        </div>

                        <div className="flex gap-4 w-full">
                            <Button className="flex-1 bg-slate-700 hover:bg-slate-600">Mute</Button>
                            <Button className="flex-1 bg-red-600 hover:bg-red-500" onClick={endLiveCall}>End Call</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* AI Dialer Interface */}
                <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-500/20 rounded-full">
                            <PhoneIcon className="h-6 w-6 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Power Dialer</h3>
                    </div>
                    
                    <div className="bg-slate-900 rounded-xl p-6 border border-white/5 mb-6 text-center">
                        <div className="h-24 w-24 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-4 relative">
                            <UserCircleIcon className="h-16 w-16 text-gray-500" />
                            <span className="absolute bottom-1 right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-slate-900"></span>
                        </div>
                        <h4 className="text-lg font-bold text-white">Calling: Next Lead...</h4>
                        <p className="text-gray-400 text-sm">Queue: 42 contacts remaining</p>
                    </div>

                    <div className="space-y-4">
                         <div className="flex justify-between">
                            <Button className="w-full mr-2" onClick={startLiveCall} disabled>Start AI Voice Call</Button>
                            <Button className="w-full ml-2 bg-red-600 hover:bg-red-500">Pause Queue</Button>
                         </div>
                         <div className="pt-4 border-t border-white/10">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="font-semibold text-white">Live Script Assistant</h5>
                                <button onClick={handleGenerateScript} className="text-xs text-blue-400 hover:underline" disabled={loading}>
                                    {loading ? 'Generating...' : 'Regenerate Script'}
                                </button>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-lg text-sm text-gray-300 h-40 overflow-y-auto">
                                {script || "Click regenerate to create a script for the current lead..."}
                            </div>
                         </div>
                    </div>
                </GlassCard>

                {/* Call Logs */}
                <GlassCard className="p-6">
                     <h3 className="text-xl font-bold text-white mb-6">Recent Call Logs</h3>
                     <div className="space-y-4">
                        {mockCallLogs.map(log => (
                            <div key={log.id} className="bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-white">{log.leadName}</h4>
                                        <p className="text-xs text-gray-400">{log.timestamp} • {log.duration}</p>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-xs ${log.sentiment === 'Positive' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                        {log.sentiment}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300 mb-3">{log.summary}</p>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => togglePlay(log.id)}
                                        className="flex items-center px-3 py-1.5 bg-slate-700 rounded-lg text-xs text-white hover:bg-slate-600 transition-colors"
                                    >
                                        {activeCallId === log.id ? <PauseIcon className="h-3 w-3 mr-2" /> : <PlayIcon className="h-3 w-3 mr-2" />}
                                        {activeCallId === log.id ? 'Playing...' : 'Listen Recording'}
                                    </button>
                                    <span className="text-xs text-gray-500">{log.outcome}</span>
                                </div>
                            </div>
                        ))}
                     </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default AiCallingPage;
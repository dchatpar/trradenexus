
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button } from '../common/Shared';
import { ClipboardDocumentListIcon, PlayIcon } from '../Icons';
import { getGeminiResponse } from '../../services/geminiService';

const CallScriptsPage: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [generatedScript, setGeneratedScript] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;
        setLoading(true);
        try {
            const prompt = `Write a professional B2B cold call script for selling importer/exporter data services. Focus on: ${topic}. Include objection handling for "not interested" and "too expensive".`;
            const result = await getGeminiResponse(prompt);
            setGeneratedScript(result);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader title="AI Call Scripts" subtitle="Generate high-converting scripts for any scenario" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <GlassCard className="p-6">
                        <h3 className="text-white font-bold mb-4">Script Generator</h3>
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Scenario / Focus</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-900 border border-gray-700 rounded p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. Selling to logistics managers..."
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Generating...' : 'Create Script'}
                            </Button>
                        </form>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <h3 className="text-white font-bold mb-4">Saved Scripts</h3>
                        <ul className="space-y-2">
                            {['Gatekeeper Bypass', 'Price Negotiation', 'Value Prop - Tier 1'].map((s, i) => (
                                <li key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 cursor-pointer transition-colors">
                                    <div className="flex items-center gap-3">
                                        <ClipboardDocumentListIcon className="h-5 w-5 text-blue-400" />
                                        <span className="text-sm text-gray-300">{s}</span>
                                    </div>
                                    <PlayIcon className="h-4 w-4 text-gray-500 hover:text-white" />
                                </li>
                            ))}
                        </ul>
                    </GlassCard>
                </div>

                <div className="lg:col-span-2">
                    <GlassCard className="p-8 h-full min-h-[500px]">
                        {generatedScript ? (
                            <div className="prose prose-invert max-w-none">
                                <h3 className="text-white font-bold text-xl mb-4">Generated Script</h3>
                                <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                                    {generatedScript}
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <Button variant="secondary">Copy to Clipboard</Button>
                                    <Button>Save to Library</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                                <ClipboardDocumentListIcon className="h-16 w-16 mb-4" />
                                <p>Enter a scenario to generate a script</p>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default CallScriptsPage;

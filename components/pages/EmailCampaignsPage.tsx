
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, DataTable } from '../common/Shared';
import { EnvelopeIcon, PaperAirplaneIcon } from '../Icons';
import { mockCampaigns } from '../../data/mockData';
import { generateEmailScript } from '../../services/geminiService';

const EmailCampaignsPage: React.FC = () => {
    const [draftBody, setDraftBody] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateDraft = async () => {
        setLoading(true);
        const script = await generateEmailScript("Global Importers Ltd", "Electronics");
        setDraftBody(script);
        setLoading(false);
    };

    return (
        <div className="space-y-8">
            <PageHeader title="AI Email Outreach" subtitle="Personalized bulk email campaigns" action={<Button>New Campaign</Button>} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Stats */}
                 <GlassCard className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Total Emails Sent</p>
                        <p className="text-2xl font-bold text-white">12,450</p>
                    </div>
                    <EnvelopeIcon className="h-8 w-8 text-blue-500 opacity-50" />
                 </GlassCard>
                 <GlassCard className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Avg Open Rate</p>
                        <p className="text-2xl font-bold text-green-400">42.8%</p>
                    </div>
                    <div className="h-8 w-8 rounded-full border-2 border-green-500/30 flex items-center justify-center text-green-500 font-bold text-xs">%</div>
                 </GlassCard>
                 <GlassCard className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs uppercase">Reply Rate</p>
                        <p className="text-2xl font-bold text-purple-400">8.2%</p>
                    </div>
                    <div className="h-8 w-8 rounded-full border-2 border-purple-500/30 flex items-center justify-center text-purple-500 font-bold text-xs">@</div>
                 </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Active Campaigns</h3>
                    <DataTable headers={['Name', 'Status', 'Sent', 'Open Rate', 'Reply Rate']}>
                        {mockCampaigns.filter(c => c.type === 'Email').map(c => (
                            <tr key={c.id} className="hover:bg-white/5">
                                <td className="px-6 py-4 font-medium text-white">{c.name}</td>
                                <td className="px-6 py-4"><span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">{c.status}</span></td>
                                <td className="px-6 py-4">{c.sentCount}</td>
                                <td className="px-6 py-4">{c.openRate}%</td>
                                <td className="px-6 py-4">{c.responseRate}%</td>
                            </tr>
                        ))}
                    </DataTable>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-4">
                         <h3 className="text-lg font-bold text-white">AI Template Generator</h3>
                         <button onClick={handleCreateDraft} className="text-sm text-blue-400 hover:text-blue-300" disabled={loading}>
                            {loading ? 'Generating...' : 'Generate New Draft'}
                         </button>
                    </div>
                    <div className="space-y-4">
                        <input type="text" placeholder="Subject Line" className="w-full bg-slate-900 border border-gray-700 rounded p-3 text-white" value={draftBody ? "Opportunity to reduce procurement costs" : ""} readOnly />
                        <textarea 
                            className="w-full bg-slate-900 border border-gray-700 rounded p-3 text-white h-64 text-sm leading-relaxed"
                            placeholder="AI generated content will appear here..."
                            value={draftBody}
                            onChange={(e) => setDraftBody(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="secondary">Save Template</Button>
                            <Button><PaperAirplaneIcon className="h-4 w-4 mr-2 inline" /> Send Test</Button>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default EmailCampaignsPage;

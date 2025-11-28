
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, Badge } from '../common/Shared';
import { ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon, UserGroupIcon, Cog6ToothIcon } from '../Icons';
import { mockCampaigns, mockWhatsappTemplates } from '../../data/mockData';

const WhatsappPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'settings'>('campaigns');

    return (
        <div className="space-y-6">
            <PageHeader title="WhatsApp Integration" subtitle="Reach leads instantly with high-conversion messages" 
                action={<Button className="bg-green-600 hover:bg-green-500">New Blast</Button>}
            />

            <div className="flex gap-4 mb-6">
                <button onClick={() => setActiveTab('campaigns')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'campaigns' ? 'bg-green-600 text-white' : 'bg-slate-800 text-gray-400 hover:text-white'}`}>Campaigns</button>
                <button onClick={() => setActiveTab('templates')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'templates' ? 'bg-green-600 text-white' : 'bg-slate-800 text-gray-400 hover:text-white'}`}>Templates</button>
                <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-green-600 text-white' : 'bg-slate-800 text-gray-400 hover:text-white'}`}>Settings</button>
            </div>

            {activeTab === 'campaigns' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <GlassCard className="lg:col-span-2 p-6">
                        <h3 className="text-white font-bold mb-4">Active WhatsApp Blasts</h3>
                        <table className="w-full text-left">
                            <thead className="text-gray-500 text-xs uppercase bg-slate-800/50">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Campaign Name</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Sent</th>
                                    <th className="px-4 py-3">Read Rate</th>
                                    <th className="px-4 py-3 rounded-r-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300 text-sm">
                                {mockCampaigns.filter(c => c.type === 'WhatsApp').map(c => (
                                    <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="px-4 py-4 font-medium">{c.name}</td>
                                        <td className="px-4 py-4"><Badge color={c.status === 'Active' ? 'green' : 'yellow'}>{c.status}</Badge></td>
                                        <td className="px-4 py-4">{c.sentCount}/{c.targetCount}</td>
                                        <td className="px-4 py-4">{c.openRate}%</td>
                                        <td className="px-4 py-4"><button className="text-blue-400 hover:text-blue-300">View</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </GlassCard>
                    <div className="space-y-6">
                        <GlassCard className="p-6">
                            <h3 className="text-white font-bold mb-2">Quick Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-800/50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-400">Msgs Sent</p>
                                    <p className="text-xl font-bold text-white">1,240</p>
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-400">Replies</p>
                                    <p className="text-xl font-bold text-green-400">315</p>
                                </div>
                            </div>
                        </GlassCard>
                        <GlassCard className="p-6 bg-gradient-to-br from-green-900/40 to-slate-900/40 border-green-500/20">
                            <ChatBubbleBottomCenterTextIcon className="h-8 w-8 text-green-400 mb-2" />
                            <h4 className="text-white font-bold">Connect Number</h4>
                            <p className="text-sm text-gray-400 mt-1 mb-4">Scan QR code to link your business WhatsApp account.</p>
                            <Button className="w-full bg-green-600 hover:bg-green-500">Link Device</Button>
                        </GlassCard>
                    </div>
                </div>
            )}

            {activeTab === 'templates' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockWhatsappTemplates.map(t => (
                        <GlassCard key={t.id} className="p-6 relative group hover:border-green-500/30 transition-all">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="text-white font-bold">{t.name}</h4>
                                <Badge color={t.status === 'Approved' ? 'green' : 'yellow'}>{t.status}</Badge>
                            </div>
                            <p className="text-xs text-gray-500 uppercase mb-2">{t.category}</p>
                            <div className="bg-slate-900 p-3 rounded-lg text-sm text-gray-300 border border-white/5 mb-4 relative">
                                {t.content}
                                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded shadow">WhatsApp</div>
                            </div>
                            <div className="flex gap-2">
                                <Button className="flex-1" variant="secondary">Edit</Button>
                                <Button className="flex-1 bg-green-600 hover:bg-green-500"><PaperAirplaneIcon className="h-4 w-4" /></Button>
                            </div>
                        </GlassCard>
                    ))}
                    <GlassCard className="p-6 flex flex-col items-center justify-center border-dashed border-2 border-gray-700 hover:border-green-500/50 cursor-pointer text-gray-500 hover:text-white transition-colors h-full min-h-[200px]">
                        <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                            <span className="text-2xl font-bold">+</span>
                        </div>
                        <p>Create Template</p>
                    </GlassCard>
                </div>
            )}
        </div>
    );
};

export default WhatsappPage;

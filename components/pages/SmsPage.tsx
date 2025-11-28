
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, Badge, DataTable } from '../common/Shared';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '../Icons';
import { mockCampaigns } from '../../data/mockData';

const SmsPage: React.FC = () => {
    const [message, setMessage] = useState('');
    
    return (
        <div className="space-y-6">
            <PageHeader title="SMS Marketing" subtitle="Instant direct messaging campaigns" action={<Button>New Blast</Button>} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <GlassCard className="p-6">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-400" /> Quick Send
                    </h3>
                    <div className="space-y-4">
                        <select className="w-full bg-slate-900 border border-gray-700 rounded p-3 text-white">
                            <option>List: New Leads (500)</option>
                            <option>List: Q3 Customers (120)</option>
                        </select>
                        <textarea 
                            className="w-full bg-slate-900 border border-gray-700 rounded p-3 text-white h-32"
                            placeholder="Type your SMS message..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            maxLength={160}
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>{message.length}/160 characters</span>
                            <span>1 Credit per msg</span>
                        </div>
                        <Button className="w-full"><PaperAirplaneIcon className="h-4 w-4 mr-2 inline" /> Send Now</Button>
                    </div>
                </GlassCard>

                <div className="lg:col-span-2 space-y-6">
                     <div className="grid grid-cols-3 gap-4">
                        <GlassCard className="p-4 text-center">
                            <p className="text-gray-400 text-xs uppercase">Sent Today</p>
                            <p className="text-2xl font-bold text-white">850</p>
                        </GlassCard>
                        <GlassCard className="p-4 text-center">
                            <p className="text-gray-400 text-xs uppercase">Delivery Rate</p>
                            <p className="text-2xl font-bold text-green-400">98.5%</p>
                        </GlassCard>
                         <GlassCard className="p-4 text-center">
                            <p className="text-gray-400 text-xs uppercase">Credits</p>
                            <p className="text-2xl font-bold text-blue-400">12k</p>
                        </GlassCard>
                     </div>

                     <GlassCard className="p-6">
                        <h3 className="text-white font-bold mb-4">Recent SMS Campaigns</h3>
                        <DataTable headers={['Name', 'Status', 'Sent', 'Clicks', 'Date']}>
                            {mockCampaigns.filter(c => c.type === 'SMS' || c.type === 'WhatsApp').slice(0, 5).map((c, i) => (
                                <tr key={c.id || i} className="hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">{c.name || 'Flash Sale Alert'}</td>
                                    <td className="px-6 py-4"><Badge color="green">Delivered</Badge></td>
                                    <td className="px-6 py-4">{c.sentCount}</td>
                                    <td className="px-6 py-4 text-blue-400">12%</td>
                                    <td className="px-6 py-4 text-gray-400">Today</td>
                                </tr>
                            ))}
                            {/* Fallback mock row if filter is empty */}
                            <tr className="hover:bg-white/5">
                                <td className="px-6 py-4 font-medium text-white">BFCM Early Access</td>
                                <td className="px-6 py-4"><Badge color="green">Delivered</Badge></td>
                                <td className="px-6 py-4">1,500</td>
                                <td className="px-6 py-4 text-blue-400">24%</td>
                                <td className="px-6 py-4 text-gray-400">Yesterday</td>
                            </tr>
                        </DataTable>
                     </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default SmsPage;

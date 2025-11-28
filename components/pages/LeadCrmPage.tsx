
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, Badge } from '../common/Shared';
import { mockLeads } from '../../data/mockData';
import { Lead } from '../../types';
import { PhoneIcon, EnvelopeIcon, UserCircleIcon } from '../Icons';

const LeadCrmPage: React.FC = () => {
    const [leads] = useState<Lead[]>(mockLeads);
    const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

    const statusColors: Record<string, 'blue' | 'green' | 'yellow' | 'red' | 'purple'> = {
        'New': 'blue',
        'Contacted': 'yellow',
        'Qualified': 'purple',
        'Negotiating': 'green',
        'Closed': 'green',
        'Lost': 'red'
    };

    return (
        <div className="space-y-6">
            <PageHeader 
                title="Lead Management" 
                subtitle="Track and manage your sales pipeline" 
                action={
                    <div className="flex bg-slate-800 rounded-lg p-1">
                        <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 rounded-md text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>List</button>
                        <button onClick={() => setViewMode('kanban')} className={`px-4 py-1.5 rounded-md text-sm ${viewMode === 'kanban' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>Kanban</button>
                    </div>
                }
            />

            {viewMode === 'list' ? (
                <GlassCard className="overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-800 text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Company</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Value</th>
                                <th className="px-6 py-4">Last Contact</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 text-gray-300">
                            {leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-white/5">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-white">{lead.contactName}</p>
                                            <p className="text-xs text-gray-500">{lead.title}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{lead.companyName}</td>
                                    <td className="px-6 py-4"><Badge color={statusColors[lead.status]}>{lead.status}</Badge></td>
                                    <td className="px-6 py-4 font-mono">${lead.value.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400">{lead.lastContact}</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button className="p-1.5 bg-green-500/20 rounded text-green-400 hover:bg-green-500/30"><PhoneIcon className="h-4 w-4" /></button>
                                        <button className="p-1.5 bg-blue-500/20 rounded text-blue-400 hover:bg-blue-500/30"><EnvelopeIcon className="h-4 w-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </GlassCard>
            ) : (
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {['New', 'Contacted', 'Qualified', 'Negotiating', 'Closed'].map(status => (
                        <div key={status} className="min-w-[300px] w-80">
                            <h4 className="text-sm font-bold text-gray-400 uppercase mb-3 flex justify-between">
                                {status}
                                <span className="bg-slate-800 px-2 rounded-full text-xs">{leads.filter(l => l.status === status).length}</span>
                            </h4>
                            <div className="space-y-3">
                                {leads.filter(l => l.status === status).map(lead => (
                                    <div key={lead.id} className="bg-slate-800 p-4 rounded-xl border border-white/5 hover:border-blue-500/50 cursor-move transition-all shadow-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-bold text-white text-sm">{lead.companyName}</p>
                                            <p className="text-xs text-green-400 font-mono">${(lead.value / 1000).toFixed(1)}k</p>
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <UserCircleIcon className="h-4 w-4 text-gray-500" />
                                            <p className="text-xs text-gray-300">{lead.contactName}</p>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{lead.notes}</p>
                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <span>{lead.lastContact}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LeadCrmPage;

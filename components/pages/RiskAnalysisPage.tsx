
import React from 'react';
import { PageHeader, GlassCard, DataTable, Badge } from '../common/Shared';
import { ExclamationTriangleIcon, ShieldCheckIcon, GlobeAltIcon } from '../Icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RiskAnalysisPage: React.FC = () => {
    const riskData = [
        { country: 'China', risk: 65, color: '#eab308' },
        { country: 'Vietnam', risk: 45, color: '#22c55e' },
        { country: 'Russia', risk: 85, color: '#ef4444' },
        { country: 'India', risk: 55, color: '#eab308' },
        { country: 'USA', risk: 25, color: '#3b82f6' },
    ];

    const alerts = [
        { id: 1, type: 'Disruption', msg: 'Port congestion reported in Shanghai (Wait time: 5 days)', date: '2h ago', severity: 'high' },
        { id: 2, type: 'Financial', msg: 'Credit rating downgrade for Supplier: TechCorp Ltd', date: '5h ago', severity: 'medium' },
        { id: 3, type: 'Regulatory', msg: 'New export controls on semiconductors effective immediately', date: '1d ago', severity: 'high' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Risk Radar" subtitle="Monitor supply chain stability and partner health" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 bg-gradient-to-br from-red-900/20 to-slate-900/50 border-red-500/20">
                    <div className="flex items-center gap-3 mb-2">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
                        <h3 className="text-white font-bold">High Risk Partners</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">3</p>
                    <p className="text-sm text-red-300 mt-1">Requires immediate attention</p>
                </GlassCard>
                <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <GlobeAltIcon className="h-6 w-6 text-yellow-400" />
                        <h3 className="text-white font-bold">Geo-Political Alerts</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">12</p>
                    <p className="text-sm text-gray-400 mt-1">Active regions monitored</p>
                </GlassCard>
                <GlassCard className="p-6 bg-gradient-to-br from-green-900/20 to-slate-900/50 border-green-500/20">
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldCheckIcon className="h-6 w-6 text-green-400" />
                        <h3 className="text-white font-bold">Safe Trade Score</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">88/100</p>
                    <p className="text-sm text-green-300 mt-1">Supply chain healthy</p>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Regional Risk Heatmap</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={riskData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="country" type="category" stroke="#9ca3af" width={80} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff'}} />
                                <Bar dataKey="risk" radius={[0, 4, 4, 0]} barSize={30}>
                                    {riskData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Live Risk Alerts</h3>
                    <div className="space-y-4">
                        {alerts.map(alert => (
                            <div key={alert.id} className="flex gap-4 p-3 bg-slate-900/50 rounded-lg border border-white/5">
                                <div className={`p-2 rounded-full h-fit ${alert.severity === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    <ExclamationTriangleIcon className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-bold text-white">{alert.type}</span>
                                        <span className="text-xs text-gray-500">• {alert.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-300 leading-snug">{alert.msg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default RiskAnalysisPage;

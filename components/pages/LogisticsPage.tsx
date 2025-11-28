
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, Badge } from '../common/Shared';
import { TruckIcon, GlobeAltIcon, MapPinIcon, ArrowRightIcon } from '../Icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LogisticsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'routes' | 'rates' | 'tracking'>('routes');

    const ratesData = [
        { month: 'Jan', air: 4.5, sea: 1.2 }, { month: 'Feb', air: 4.8, sea: 1.3 },
        { month: 'Mar', air: 5.2, sea: 1.5 }, { month: 'Apr', air: 4.9, sea: 1.4 },
        { month: 'May', air: 4.6, sea: 1.2 }, { month: 'Jun', air: 4.4, sea: 1.1 },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Logistics Intelligence" subtitle="Optimize freight routes and track shipments" />

            {/* Navigation */}
            <div className="flex space-x-2 bg-slate-800/50 p-1 rounded-lg w-fit">
                <button onClick={() => setActiveTab('routes')} className={`px-4 py-2 rounded-md text-sm transition-all ${activeTab === 'routes' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>Route Finder</button>
                <button onClick={() => setActiveTab('rates')} className={`px-4 py-2 rounded-md text-sm transition-all ${activeTab === 'rates' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>Freight Rates</button>
                <button onClick={() => setActiveTab('tracking')} className={`px-4 py-2 rounded-md text-sm transition-all ${activeTab === 'tracking' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>Tracking</button>
            </div>

            {activeTab === 'routes' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <GlassCard className="p-6">
                        <h3 className="text-white font-bold mb-4">Route Estimator</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-center">
                                <div className="flex-1">
                                    <label className="text-xs text-gray-400 uppercase">Origin Port</label>
                                    <input type="text" defaultValue="Shanghai (CNSHA)" className="w-full bg-slate-900 border border-gray-700 rounded p-2 text-white mt-1"/>
                                </div>
                                <ArrowRightIcon className="h-5 w-5 text-gray-500 mt-5" />
                                <div className="flex-1">
                                    <label className="text-xs text-gray-400 uppercase">Dest Port</label>
                                    <input type="text" defaultValue="Los Angeles (USLAX)" className="w-full bg-slate-900 border border-gray-700 rounded p-2 text-white mt-1"/>
                                </div>
                            </div>
                            <Button fullWidth>Calculate Routes</Button>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded-lg"><GlobeAltIcon className="h-6 w-6 text-blue-400"/></div>
                                    <div>
                                        <p className="font-bold text-white">Sea Freight</p>
                                        <p className="text-xs text-gray-400">Direct • CMA CGM</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-white">$1,850</p>
                                    <p className="text-xs text-gray-400">18 Days</p>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/20 rounded-lg"><TruckIcon className="h-6 w-6 text-purple-400"/></div>
                                    <div>
                                        <p className="font-bold text-white">Air Freight</p>
                                        <p className="text-xs text-gray-400">Express • DHL</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-white">$5,200</p>
                                    <p className="text-xs text-gray-400">3 Days</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                    
                    <GlassCard className="p-0 overflow-hidden relative min-h-[400px]">
                        <div className="absolute inset-0 bg-slate-900 opacity-50 flex items-center justify-center">
                            <p className="text-gray-500">Map Visualization Placeholder</p>
                        </div>
                        {/* Integrating GlobalMap here would be ideal if reused */}
                    </GlassCard>
                </div>
            )}

            {activeTab === 'rates' && (
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Freight Rate Index (USD/kg)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={ratesData}>
                                <XAxis dataKey="month" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} />
                                <Line type="monotone" dataKey="air" stroke="#8b5cf6" strokeWidth={3} name="Air Freight" />
                                <Line type="monotone" dataKey="sea" stroke="#3b82f6" strokeWidth={3} name="Sea Freight" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            )}

            {activeTab === 'tracking' && (
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Active Shipments</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg border border-white/5">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-mono text-blue-400 font-bold">SHP-2023-00{i}</span>
                                        <Badge color={i === 1 ? 'green' : 'yellow'}>{i === 1 ? 'In Transit' : 'Customs Hold'}</Badge>
                                    </div>
                                    <p className="text-sm text-gray-300">Electronics • 20ft Container</p>
                                </div>
                                <div className="text-right text-sm">
                                    <p className="text-white">ETA: Oct {25 + i}</p>
                                    <p className="text-gray-500">Port of LA</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            )}
        </div>
    );
};

export default LogisticsPage;

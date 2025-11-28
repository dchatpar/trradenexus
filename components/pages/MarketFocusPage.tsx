
import React from 'react';
import { PageHeader, GlassCard, Badge } from '../common/Shared';
import { LightBulbIcon, ArrowTrendingUpIcon } from '../Icons';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

const MarketFocusPage: React.FC = () => {
    // Mock Opportunity Data: X=Volume, Y=Growth, Z=Margin
    const opportunities = [
        { name: 'Vietnam Electronics', x: 80, y: 120, z: 200, fill: '#3b82f6' },
        { name: 'India Textiles', x: 60, y: 80, z: 150, fill: '#10b981' },
        { name: 'Brazil Coffee', x: 90, y: 40, z: 300, fill: '#f59e0b' },
        { name: 'Germany Auto Parts', x: 70, y: 20, z: 250, fill: '#8b5cf6' },
        { name: 'US Medical Devices', x: 50, y: 90, z: 400, fill: '#ec4899' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Focus Markets" subtitle="Identify high-growth opportunities and diversify your basket" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <GlassCard className="p-6 bg-gradient-to-br from-purple-900/40 to-slate-900/40 border-purple-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <LightBulbIcon className="h-8 w-8 text-purple-400" />
                        <div>
                            <h3 className="text-white font-bold text-lg">Top Recommendation</h3>
                            <p className="text-xs text-purple-300">AI Suggested</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                        Demand for <strong className="text-white">Medical Devices</strong> in <strong className="text-white">Vietnam</strong> has grown by 120% YoY. Import tariffs are currently reduced.
                    </p>
                    <Badge color="purple">High Potential</Badge>
                </GlassCard>

                <div className="lg:col-span-2">
                    <GlassCard className="p-6 h-full">
                        <h3 className="text-lg font-bold text-white mb-4">Opportunity Matrix</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis type="number" dataKey="x" name="Trade Volume" stroke="#9ca3af" label={{ value: 'Volume', position: 'bottom', fill: '#6b7280' }} />
                                    <YAxis type="number" dataKey="y" name="YoY Growth" stroke="#9ca3af" label={{ value: 'Growth %', angle: -90, position: 'insideLeft', fill: '#6b7280' }} />
                                    <ZAxis type="number" dataKey="z" range={[100, 500]} name="Margin" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff'}} />
                                    <Scatter name="Markets" data={opportunities} fill="#8884d8">
                                        {opportunities.map((entry, index) => <cell key={`cell-${index}`} fill={entry.fill} />)}
                                    </Scatter>
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </GlassCard>
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Product Gap Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <ArrowTrendingUpIcon className="h-5 w-5 text-green-400" /> Rising Demand (Under-supplied)
                    </h4>
                    <ul className="space-y-3">
                        {[
                            { name: 'Lithium Batteries', market: 'EU', growth: '+45%' },
                            { name: 'Organic Cotton', market: 'USA', growth: '+32%' },
                            { name: 'Solar Panels', market: 'South Africa', growth: '+88%' }
                        ].map((item, i) => (
                            <li key={i} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-white/5">
                                <div>
                                    <p className="text-white font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-500">Market: {item.market}</p>
                                </div>
                                <span className="text-green-400 font-bold">{item.growth}</span>
                            </li>
                        ))}
                    </ul>
                </GlassCard>
                
                <GlassCard className="p-6">
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <ArrowTrendingUpIcon className="h-5 w-5 text-red-400 rotate-180" /> Declining Markets (Over-saturated)
                    </h4>
                    <ul className="space-y-3">
                        {[
                            { name: 'Face Masks', market: 'Global', growth: '-65%' },
                            { name: 'Standard LEDs', market: 'China', growth: '-12%' },
                            { name: 'Office Furniture', market: 'UK', growth: '-8%' }
                        ].map((item, i) => (
                            <li key={i} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-white/5">
                                <div>
                                    <p className="text-white font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-500">Market: {item.market}</p>
                                </div>
                                <span className="text-red-400 font-bold">{item.growth}</span>
                            </li>
                        ))}
                    </ul>
                </GlassCard>
            </div>
        </div>
    );
};

export default MarketFocusPage;


import React from 'react';
import { PageHeader, GlassCard, Badge, Button } from '../common/Shared';
import { LeafIcon, ShieldCheckIcon, GlobeAltIcon, DocumentCheckIcon } from '../Icons';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const SustainabilityPage: React.FC = () => {
    // Mock Emissions Data
    const emissionData = [
        { month: 'Jan', co2: 420 }, { month: 'Feb', co2: 380 }, { month: 'Mar', co2: 450 },
        { month: 'Apr', co2: 410 }, { month: 'May', co2: 390 }, { month: 'Jun', co2: 350 },
    ];

    const suppliers = [
        { name: 'EcoTextiles Vietnam', score: 92, grade: 'A', certs: ['ISO 14001', 'Fair Trade'] },
        { name: 'Shenzhen Electronics', score: 78, grade: 'B', certs: ['ISO 9001'] },
        { name: 'Mumbai Cotton Mills', score: 65, grade: 'C', certs: [] },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Sustainability & ESG" subtitle="Track supply chain carbon footprint and ethical compliance" />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 bg-gradient-to-br from-green-900/20 to-slate-900/50 border-green-500/20">
                    <div className="flex items-center gap-3 mb-2">
                        <LeafIcon className="h-6 w-6 text-green-400" />
                        <h3 className="text-white font-bold">Carbon Footprint</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">2,450 <span className="text-sm font-normal text-gray-400">mT</span></p>
                    <p className="text-sm text-green-400 mt-1">▼ 12% vs last year</p>
                </GlassCard>
                <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldCheckIcon className="h-6 w-6 text-blue-400" />
                        <h3 className="text-white font-bold">Avg Supplier Score</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">78/100</p>
                    <p className="text-sm text-gray-400 mt-1">Ethical Sourcing Index</p>
                </GlassCard>
                <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <DocumentCheckIcon className="h-6 w-6 text-purple-400" />
                        <h3 className="text-white font-bold">Certifications</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">85%</p>
                    <p className="text-sm text-gray-400 mt-1">Suppliers Verified</p>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Emissions Chart */}
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold text-white mb-6">CO2 Emissions Trend</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={emissionData}>
                                <defs>
                                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} />
                                <Area type="monotone" dataKey="co2" stroke="#10b981" fillOpacity={1} fill="url(#colorCo2)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Supplier Table */}
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Supplier ESG Ratings</h3>
                    <div className="space-y-4">
                        {suppliers.map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-white/5">
                                <div>
                                    <h4 className="font-bold text-white">{s.name}</h4>
                                    <div className="flex gap-2 mt-1">
                                        {s.certs.length > 0 ? s.certs.map(c => <Badge key={c} color="blue">{c}</Badge>) : <span className="text-xs text-red-400">No Certs</span>}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-2xl font-bold ${s.grade === 'A' ? 'text-green-400' : s.grade === 'B' ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {s.grade}
                                    </div>
                                    <p className="text-xs text-gray-500">Score: {s.score}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="secondary" className="w-full mt-4">Run Compliance Audit</Button>
                </GlassCard>
            </div>
        </div>
    );
};

export default SustainabilityPage;

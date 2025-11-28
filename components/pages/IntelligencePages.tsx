
import React from 'react';
import { PageHeader, GlassCard, DataTable, Button, Badge } from '../common/Shared';
import { useData } from '../../contexts/DataContext';
import { ChartDataPoint } from '../../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

// --- Buyer Intelligence ---
export const BuyerIntelligencePage: React.FC = () => {
  const { companies } = useData();
  const buyers = companies.slice(0, 10); // Mock filtering

  return (
    <div className="space-y-6">
      <PageHeader title="Buyer Intelligence" subtitle="Identify high-intent buyers for your products" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Filters Sidebar Mock */}
         <GlassCard className="p-6 h-fit">
            <h3 className="text-white font-semibold mb-4">Filters</h3>
            <div className="space-y-4">
                <div>
                    <label className="text-xs text-gray-400 uppercase">Product Category</label>
                    <select className="w-full mt-1 bg-slate-900 border border-gray-700 rounded p-2 text-white"><option>Electronics</option></select>
                </div>
                <div>
                    <label className="text-xs text-gray-400 uppercase">Target Market</label>
                    <select className="w-full mt-1 bg-slate-900 border border-gray-700 rounded p-2 text-white"><option>North America</option></select>
                </div>
                <Button className="w-full mt-2">Apply Filters</Button>
            </div>
         </GlassCard>
         
         {/* Results */}
         <div className="lg:col-span-3 space-y-4">
            {buyers.map(buyer => (
                <GlassCard key={buyer.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h4 className="text-lg font-bold text-white">{buyer.name}</h4>
                        <p className="text-sm text-gray-400">{buyer.country} • {buyer.industry}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Purchase Vol</p>
                            <p className="text-white font-mono">{buyer.tradeVolume}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-xs text-gray-500">Match Score</p>
                             <p className="text-green-400 font-bold">94%</p>
                        </div>
                        <Button variant="secondary">Unlock Contact</Button>
                    </div>
                </GlassCard>
            ))}
         </div>
      </div>
    </div>
  );
};

// --- Supplier Intelligence ---
export const SupplierIntelligencePage: React.FC = () => {
    return (
        <div className="space-y-6">
            <PageHeader title="Supplier Intelligence" subtitle="Source reliable partners and analyze supply chains" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6 bg-gradient-to-br from-blue-900/40 to-slate-900/40">
                    <h3 className="text-xl font-bold text-white mb-2">Find New Suppliers</h3>
                    <p className="text-gray-400 mb-6">Search our verified database of 50M+ manufacturers.</p>
                    <input type="text" placeholder="What are you sourcing? (e.g. Cotton fabric)" className="w-full p-3 rounded-lg bg-slate-800 border border-gray-600 text-white mb-4" />
                    <Button className="w-full">Search Suppliers</Button>
                </GlassCard>
                <GlassCard className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">My Supplier Watchlist</h3>
                    <div className="space-y-3 mt-4">
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-gray-300">Foxconn Tech</span>
                            <Badge color="green">Stable</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-gray-300">LG Display</span>
                            <Badge color="yellow">Alert</Badge>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

// --- Market Intelligence ---
export const MarketIntelligencePage: React.FC = () => {
    const data = [
        { name: 'USA', value: 400 }, { name: 'China', value: 300 },
        { name: 'Germany', value: 300 }, { name: 'Japan', value: 200 }
    ];
    const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

    return (
        <div className="space-y-6">
            <PageHeader title="Market Intelligence" subtitle="Global trends and market opportunity analysis" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                    <h3 className="text-white font-semibold mb-4">Top Importing Markets (Semiconductors)</h3>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                         </ResponsiveContainer>
                    </div>
                </GlassCard>
                <GlassCard className="p-6">
                    <h3 className="text-white font-semibold mb-4">Market Growth Forecast</h3>
                    <div className="h-64 flex items-center justify-center">
                        <p className="text-gray-500 italic">Advanced forecasting requires Premium Plan</p>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

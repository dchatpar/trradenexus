
import React from 'react';
import { PageHeader, GlassCard, Badge } from '../common/Shared';
import { useData } from '../../contexts/DataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { GlobeAltIcon } from '../Icons';

export const TradeAnalyticsPage: React.FC = () => {
  const data = [
      { name: 'Q1', import: 4000, export: 2400 },
      { name: 'Q2', import: 3000, export: 1398 },
      { name: 'Q3', import: 2000, export: 9800 },
      { name: 'Q4', import: 2780, export: 3908 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Trade Analytics" subtitle="Deep dive into your trade performance metrics" />
      
      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-6">Quarterly Import vs Export</h3>
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} />
                    <Bar dataKey="import" fill="#3b82f6" name="Import" />
                    <Bar dataKey="export" fill="#10b981" name="Export" />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};

export const CountryStatisticsPage: React.FC = () => {
    const { countryStats } = useData();

    return (
        <div className="space-y-6">
            <PageHeader title="Global Country Statistics" subtitle="Access trade data from 203 countries & exclusive mirror data" />
            
            {/* World Map Hero */}
            <GlassCard className="p-8 flex items-center justify-center bg-[#000510] h-96 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-10 bg-center"></div>
                <GlobeAltIcon className="h-64 w-64 text-blue-900/30 animate-pulse relative z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <h2 className="text-3xl font-bold text-white mb-2">203 Countries Covered</h2>
                    <p className="text-blue-300 max-w-lg text-center mb-6">TradeNexus provides the world's largest import-export database, including exclusive mirror data for hard-to-reach markets.</p>
                    <div className="flex gap-3">
                         <Badge color="green">100% Coverage</Badge>
                         <Badge color="purple">Mirror Data Active</Badge>
                    </div>
                </div>
            </GlassCard>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Top Trading Economies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {countryStats.map((c, i) => (
                    <GlassCard key={i} className="p-6 hover:translate-y-1 transition-transform cursor-pointer border-t-4 border-blue-600/50">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white">{c.country}</h3>
                            <span className={`px-2 py-0.5 rounded text-xs ${c.riskLevel === 'Low' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{c.riskLevel} Risk</span>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-400"><span>GDP</span> <span className="text-white">{c.gdp}</span></div>
                            <div className="flex justify-between text-gray-400"><span>Balance</span> <span className="text-white">{c.tradeBalance}</span></div>
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="text-xs text-gray-500">Top Export</p>
                                <p className="text-white truncate">{c.topExport}</p>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
            
            <div className="flex justify-center mt-8">
                <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-white/10">
                    View All 203 Countries
                </button>
            </div>
        </div>
    );
}

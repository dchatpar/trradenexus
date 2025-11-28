
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, Badge } from '../common/Shared';
import { AdjustmentsHorizontalIcon, BeakerIcon, CalculatorIcon } from '../Icons';

const ScenarioPlannerPage: React.FC = () => {
    // State for variables
    const [tariff, setTariff] = useState(15);
    const [freight, setFreight] = useState(2500);
    const [leadTime, setLeadTime] = useState(25);
    const [margin, setMargin] = useState(30);

    const baseCost = 50000; // Base Product Cost
    const dutyCost = baseCost * (tariff / 100);
    const landedCost = baseCost + dutyCost + freight;
    const sellPrice = landedCost * (1 + margin / 100);
    const profit = sellPrice - landedCost;

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Scenario Planner" subtitle="Simulate market changes and protect your margins" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <GlassCard className="p-6 h-fit bg-gradient-to-b from-slate-900 to-slate-900/50">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <AdjustmentsHorizontalIcon className="h-5 w-5 text-blue-400"/> Simulation Variables
                    </h3>
                    
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs text-gray-400 uppercase">Import Tariff</label>
                                <span className="text-blue-400 font-bold">{tariff}%</span>
                            </div>
                            <input 
                                type="range" min="0" max="50" value={tariff} onChange={(e) => setTariff(Number(e.target.value))} 
                                className="w-full accent-blue-500 bg-slate-700 rounded-lg appearance-none h-2 cursor-pointer"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs text-gray-400 uppercase">Freight Cost</label>
                                <span className="text-green-400 font-bold">${freight}</span>
                            </div>
                            <input 
                                type="range" min="500" max="10000" step="100" value={freight} onChange={(e) => setFreight(Number(e.target.value))} 
                                className="w-full accent-green-500 bg-slate-700 rounded-lg appearance-none h-2 cursor-pointer"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs text-gray-400 uppercase">Target Margin</label>
                                <span className="text-purple-400 font-bold">{margin}%</span>
                            </div>
                            <input 
                                type="range" min="5" max="100" value={margin} onChange={(e) => setMargin(Number(e.target.value))} 
                                className="w-full accent-purple-500 bg-slate-700 rounded-lg appearance-none h-2 cursor-pointer"
                            />
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <Button fullWidth variant="secondary"><BeakerIcon className="h-4 w-4 mr-2"/> Save Scenario</Button>
                    </div>
                </GlassCard>

                {/* Results Visualization */}
                <GlassCard className="lg:col-span-2 p-8 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    
                    <h3 className="text-center text-gray-400 uppercase tracking-widest text-sm font-bold mb-8">Projected Financial Impact</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12 relative z-10">
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5">
                            <p className="text-xs text-gray-500 uppercase mb-1">Duty Paid</p>
                            <p className="text-xl font-bold text-red-300">${dutyCost.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5">
                            <p className="text-xs text-gray-500 uppercase mb-1">Landed Cost</p>
                            <p className="text-xl font-bold text-white">${landedCost.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5">
                            <p className="text-xs text-gray-500 uppercase mb-1">Sell Price</p>
                            <p className="text-xl font-bold text-blue-300">${sellPrice.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-green-900/20 rounded-xl border border-green-500/30">
                            <p className="text-xs text-green-400 uppercase mb-1">Net Profit</p>
                            <p className="text-2xl font-bold text-green-400">${profit.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5 relative z-10">
                        <h4 className="font-bold text-white mb-4">AI Insight</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Based on your inputs, a <strong className="text-blue-400">{tariff}% tariff</strong> increases your landed cost by <strong>${dutyCost.toLocaleString()}</strong>. 
                            To maintain a {margin}% margin, your selling price must be at least <strong>${sellPrice.toLocaleString()}</strong>. 
                            Consider sourcing from FTA partners to reduce duty exposure.
                        </p>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default ScenarioPlannerPage;

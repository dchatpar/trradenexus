
import React from 'react';
import { PageHeader, GlassCard, Badge, Button } from '../common/Shared';
import { ChartBarIcon, GlobeAltIcon, UserGroupIcon, BuildingOfficeIcon } from '../Icons';

const SystemWorkspacePage: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="System Generated Workspace" subtitle="Automated intelligence based on your company profile - Netwit" />

            {/* Top Stats Bar */}
            <GlassCard className="p-0 overflow-hidden">
                <div className="flex flex-wrap border-b border-white/10 bg-slate-900/50">
                    <button className="px-6 py-3 text-sm font-medium text-white border-b-2 border-orange-500 bg-white/5">Import</button>
                    <button className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-white">Export</button>
                    <button className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-white">My Company</button>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    <div>
                        <label className="text-xs text-gray-500 uppercase font-semibold">Date Range</label>
                        <select className="w-full mt-1 bg-slate-800 border border-gray-700 rounded text-white text-sm p-2">
                            <option>01/01/2021 - 12/31/2024</option>
                        </select>
                    </div>
                    
                    <div className="flex gap-2">
                         <button className="flex-1 py-1.5 rounded bg-slate-700 text-gray-300 text-xs hover:bg-orange-600 hover:text-white transition-colors">6 M</button>
                         <button className="flex-1 py-1.5 rounded bg-orange-600 text-white text-xs shadow-lg shadow-orange-500/20">12 M</button>
                         <button className="flex-1 py-1.5 rounded bg-slate-700 text-gray-300 text-xs hover:bg-orange-600 hover:text-white transition-colors">Custom</button>
                    </div>
                </div>
            </GlassCard>

            {/* HS Code Analysis */}
            <GlassCard className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <ChartBarIcon className="h-5 w-5 text-blue-400"/> HS Code Analysis
                    </h3>
                    <Badge color="blue">HS: 00</Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'HS Codes', val: 'No Data' },
                        { label: 'Suppliers', val: 'My Vs All' },
                        { label: 'Countries', val: 'My Vs All' },
                        { label: 'Value & Share', val: 'My Vs All' }
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-800/50 rounded-xl p-4 border border-white/5 text-center hover:border-blue-500/30 transition-colors">
                            <p className="text-gray-400 text-xs mb-1">{item.label}</p>
                            <p className="text-white font-medium">{item.val}</p>
                        </div>
                    ))}
                </div>
            </GlassCard>

            {/* Competitors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <UserGroupIcon className="h-5 w-5 text-red-400"/> Top Direct Competitors
                        </h3>
                    </div>
                    
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                        {['Direct Competitors', 'Suppliers', 'Value & Share', 'My Vs Competitor'].map(tab => (
                            <button key={tab} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-gray-300 whitespace-nowrap border border-white/5">{tab}</button>
                        ))}
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-xl h-48 flex items-center justify-center border border-dashed border-gray-700">
                        <p className="text-gray-500 text-sm">No Data Found for Selected Period</p>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <BuildingOfficeIcon className="h-5 w-5 text-purple-400"/> Other Competitors
                        </h3>
                    </div>
                     <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                        {['Others Competitors', 'Suppliers', 'Value & Share', 'My Vs Competitor'].map(tab => (
                            <button key={tab} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-gray-300 whitespace-nowrap border border-white/5">{tab}</button>
                        ))}
                    </div>
                    <div className="bg-slate-900/50 rounded-xl h-48 flex items-center justify-center border border-dashed border-gray-700">
                        <p className="text-gray-500 text-sm">No Data Found</p>
                    </div>
                </GlassCard>
            </div>

            {/* Suppliers & Origins */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                     <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <GlobeAltIcon className="h-5 w-5 text-green-400"/> Country of Origin
                    </h3>
                    <div className="bg-slate-900/50 rounded-xl h-48 flex items-center justify-center border border-dashed border-gray-700">
                        <p className="text-gray-500 text-sm">No Data Found</p>
                    </div>
                </GlassCard>
                 <GlassCard className="p-6">
                     <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <UserGroupIcon className="h-5 w-5 text-yellow-400"/> Top Direct Suppliers
                    </h3>
                    <div className="bg-slate-900/50 rounded-xl h-48 flex items-center justify-center border border-dashed border-gray-700">
                        <p className="text-gray-500 text-sm">No Data Found</p>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default SystemWorkspacePage;

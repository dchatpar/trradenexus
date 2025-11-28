
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, Badge } from '../common/Shared';
import { FunnelIcon, XMarkIcon } from '../Icons';

const CompaniesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    const tabs = [
        { name: 'All', count: 0 },
        { name: 'Buyers', count: 0 },
        { name: 'Suppliers', count: 0 },
        { name: 'Competitors', count: 0 },
        { name: 'Contacts', count: 0 }
    ];

    return (
        <div className="space-y-6 flex flex-col h-full animate-fade-in relative min-h-[500px]">
            <PageHeader 
                title="Companies" 
                subtitle="Manage and track your global business network" 
                action={<Button className="md:hidden" onClick={() => setShowFilters(!showFilters)} variant="secondary"><FunnelIcon className="h-4 w-4 mr-2" /> Filters</Button>}
            />
            
            <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden relative">
                {/* Tabs - Scrollable horizontally */}
                <div className="w-full overflow-x-auto border-b border-white/10 bg-slate-900/50 custom-scrollbar">
                    <div className="flex px-4 pt-2 min-w-max">
                        {tabs.map(tab => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                    activeTab === tab.name 
                                    ? 'border-orange-500 text-white bg-white/5' 
                                    : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                            >
                                {tab.name} <span className="ml-2 bg-slate-800 px-2 py-0.5 rounded-full text-xs">{tab.count}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden relative">
                    {/* Filters Sidebar - Mobile Overlay / Desktop Fixed */}
                    <div className={`
                        absolute inset-y-0 left-0 z-20 bg-slate-950 md:bg-slate-900/30 border-r border-white/10 p-4 w-64 transform transition-transform duration-300 ease-in-out h-full
                        md:relative md:transform-none md:block
                        ${showFilters ? 'translate-x-0' : '-translate-x-full'}
                    `}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold flex items-center gap-2"><FunnelIcon className="h-4 w-4"/> Filters</h3>
                            <div className="flex gap-4">
                                <button className="text-xs text-orange-400 hover:underline">Clear</button>
                                <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setShowFilters(false)}><XMarkIcon className="h-5 w-5"/></button>
                            </div>
                        </div>

                        <div className="space-y-6 overflow-y-auto h-[calc(100%-4rem)] custom-scrollbar pb-10">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Date Added</label>
                                <div className="space-y-2">
                                    <input type="date" className="w-full bg-slate-800 border border-gray-700 rounded p-2 text-xs text-gray-300" />
                                    <input type="date" className="w-full bg-slate-800 border border-gray-700 rounded p-2 text-xs text-gray-300" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Trade Volume</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['1M', '3M', '6M', '12M'].map(v => (
                                        <button key={v} className="px-3 py-1 bg-slate-800 rounded border border-white/5 text-xs text-gray-300 hover:bg-slate-700">{v}</button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Exclude Filters</label>
                                <div className="space-y-2">
                                    {['Viewed', 'Prospective Buyers', 'My Buyers', 'My Suppliers'].map(f => (
                                        <label key={f} className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer hover:text-white">
                                            <input type="checkbox" className="rounded border-gray-700 bg-slate-800 text-orange-500 focus:ring-orange-500" />
                                            Exclude {f}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Table Area */}
                    <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/20 p-4 w-full relative">
                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 flex-shrink-0">
                             <input 
                                type="text" 
                                placeholder="Search by company name..." 
                                className="bg-slate-800 border border-gray-600 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500 w-full sm:w-64"
                             />
                             <div className="flex gap-2 w-full sm:w-auto">
                                 <div className="text-xs text-gray-400 flex-1 sm:flex-none flex items-center justify-center bg-slate-800 px-3 py-2 rounded-lg border border-white/5 whitespace-nowrap">
                                    0 Full Profile Balance left
                                 </div>
                                 <Button className="text-xs h-auto py-2 whitespace-nowrap">Download</Button>
                             </div>
                         </div>

                         <div className="border border-white/10 rounded-lg overflow-hidden flex-1 relative">
                             <div className="absolute inset-0 overflow-auto custom-scrollbar">
                                 <table className="w-full text-left min-w-[800px]">
                                     <thead className="bg-slate-800 text-xs uppercase text-gray-400 font-medium sticky top-0 z-10">
                                         <tr>
                                             <th className="px-6 py-3 bg-slate-800">Company Name</th>
                                             <th className="px-6 py-3 bg-slate-800">Country</th>
                                             <th className="px-6 py-3 text-right bg-slate-800">Imp Shipments</th>
                                             <th className="px-6 py-3 text-right bg-slate-800">Imp Value</th>
                                             <th className="px-6 py-3 text-right bg-slate-800">Exp Shipments</th>
                                             <th className="px-6 py-3 text-right bg-slate-800">Exp Value</th>
                                         </tr>
                                     </thead>
                                     <tbody className="divide-y divide-white/5">
                                         <tr>
                                             <td colSpan={6} className="px-6 py-20 text-center text-gray-500">
                                                 <div className="flex flex-col items-center justify-center">
                                                     <div className="h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                                         <XMarkIcon className="h-8 w-8 text-gray-600" />
                                                     </div>
                                                     <p className="text-lg font-medium text-gray-400">No data found</p>
                                                     <p className="text-sm text-gray-600">Try adjusting your filters or search terms</p>
                                                 </div>
                                             </td>
                                         </tr>
                                     </tbody>
                                 </table>
                             </div>
                         </div>
                         <div className="flex justify-between items-center mt-4 text-xs text-gray-500 flex-shrink-0">
                             <span>Showing 0 of 0</span>
                         </div>
                    </div>
                </div>
            </GlassCard>
            
            {/* Backdrop for mobile sidebar */}
            {showFilters && (
                <div 
                    className="fixed inset-0 bg-black/50 z-10 md:hidden"
                    onClick={() => setShowFilters(false)}
                />
            )}
        </div>
    );
};

export default CompaniesPage;
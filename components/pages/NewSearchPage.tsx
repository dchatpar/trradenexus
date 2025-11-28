
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button } from '../common/Shared';
import { LockClosedIcon, MagnifyingGlassIcon } from '../Icons';

const NewSearchPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'standard' | 'logistics'>('standard');
    const [direction, setDirection] = useState<'import' | 'export'>('import');

    const renderLockOverlay = () => (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-xl border border-white/10">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-full mb-4 shadow-lg shadow-orange-500/30">
                <LockClosedIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Feature Locked</h3>
            <p className="text-gray-300 mb-6 text-center max-w-md">This feature is available in the Paid Plan. Upgrade now to unlock advanced Logistics search parameters.</p>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 border-none shadow-lg shadow-orange-500/20">Upgrade Plan</Button>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="New Search" subtitle="Discover global trade opportunities" />

            {/* Tabs */}
            <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl w-fit border border-white/5">
                <button
                    onClick={() => setActiveTab('standard')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${
                        activeTab === 'standard' ? 'bg-white text-slate-900 shadow' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Standard Search
                </button>
                <button
                    onClick={() => setActiveTab('logistics')}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                        activeTab === 'logistics' ? 'bg-white text-slate-900 shadow' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Logistics <LockClosedIcon className="h-3 w-3" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Search Form */}
                <GlassCard className="lg:col-span-2 p-8 relative min-h-[500px]">
                    {activeTab === 'logistics' && renderLockOverlay()}
                    
                    <div className="flex gap-4 mb-8">
                        <button 
                            onClick={() => setDirection('import')}
                            className={`flex-1 py-3 rounded-xl border font-bold text-center transition-all ${
                                direction === 'import' 
                                ? 'bg-blue-600/20 border-blue-500 text-blue-400' 
                                : 'bg-slate-800 border-transparent text-gray-500 hover:border-gray-600'
                            }`}
                        >
                            Import
                        </button>
                        <button 
                             onClick={() => setDirection('export')}
                             className={`flex-1 py-3 rounded-xl border font-bold text-center transition-all ${
                                direction === 'export' 
                                ? 'bg-green-600/20 border-green-500 text-green-400' 
                                : 'bg-slate-800 border-transparent text-gray-500 hover:border-gray-600'
                            }`}
                        >
                            Export
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-sm text-gray-400 font-medium mb-1 block">Search Parameters</label>
                            {activeTab === 'standard' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <input type="text" placeholder="Select Country..." className="w-full bg-slate-900 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
                                     <input type="text" placeholder="HS Code (2 Digit)..." className="w-full bg-slate-900 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <input type="text" placeholder="Consignee Name" className="w-full bg-slate-900 border border-gray-700 rounded-lg p-3 text-white" />
                                     <input type="text" placeholder="Shipper Name" className="w-full bg-slate-900 border border-gray-700 rounded-lg p-3 text-white" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 font-medium mb-1 block">Value Range (USD Million)</label>
                            <input type="range" className="w-full accent-blue-500" />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0M</span>
                                <span>100M+</span>
                            </div>
                        </div>
                        
                        <div className="pt-4">
                            <Button className="w-full py-4 text-lg bg-orange-600 hover:bg-orange-500 shadow-orange-500/20">
                                <MagnifyingGlassIcon className="h-5 w-5 mr-2 inline" /> Search Records
                            </Button>
                        </div>
                    </div>
                </GlassCard>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <GlassCard className="p-6 bg-gradient-to-br from-blue-900/20 to-slate-900/50">
                        <h3 className="text-white font-bold mb-2">Searches Left</h3>
                        <p className="text-3xl font-bold text-white mb-1">30 <span className="text-sm font-normal text-gray-400">/ 30</span></p>
                        <p className="text-xs text-blue-300 bg-blue-500/10 inline-block px-2 py-1 rounded">Free Plan</p>
                    </GlassCard>
                    
                    <GlassCard className="p-6">
                        <h3 className="text-white font-bold mb-4">Trending Now</h3>
                        <div className="flex flex-wrap gap-2">
                             {['Coffee', 'Steel', 'Microchips', 'Vietnam Textiles', 'Tesla'].map(tag => (
                                 <span key={tag} className="px-3 py-1 bg-slate-800 text-gray-300 text-xs rounded-full border border-white/5 hover:bg-slate-700 cursor-pointer">{tag}</span>
                             ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default NewSearchPage;


import React, { useState } from 'react';
import { PageHeader, GlassCard, Badge } from '../common/Shared';
import { mockDeals } from '../../data/mockData';
import { Deal } from '../../types';
import { CurrencyDollarIcon } from '../Icons';

const DealPipelinePage: React.FC = () => {
    const [deals, setDeals] = useState<Deal[]>(mockDeals);
    
    const stages: Deal['stage'][] = ['New Lead', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won'];

    const onDragStart = (e: React.DragEvent, dealId: string) => {
        e.dataTransfer.setData('dealId', dealId);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const onDrop = (e: React.DragEvent, stage: Deal['stage']) => {
        const dealId = e.dataTransfer.getData('dealId');
        setDeals(deals.map(d => d.id === dealId ? { ...d, stage } : d));
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            <PageHeader title="Deal Pipeline" subtitle="Visual sales funnel management" />
            
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
                <div className="flex gap-4 h-full min-w-max px-2">
                    {stages.map(stage => {
                        const stageDeals = deals.filter(d => d.stage === stage);
                        const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

                        return (
                            <div 
                                key={stage} 
                                className="w-80 flex flex-col bg-slate-900/50 rounded-xl border border-white/5 h-full"
                                onDragOver={onDragOver}
                                onDrop={(e) => onDrop(e, stage)}
                            >
                                <div className="p-4 border-b border-white/5 bg-slate-800/50 rounded-t-xl">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold text-white text-sm uppercase">{stage}</h3>
                                        <span className="bg-slate-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">{stageDeals.length}</span>
                                    </div>
                                    <p className="text-xs text-green-400 font-mono font-bold">${totalValue.toLocaleString()}</p>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                                    {stageDeals.map(deal => (
                                        <div 
                                            key={deal.id}
                                            draggable
                                            onDragStart={(e) => onDragStart(e, deal.id)}
                                            className="bg-slate-800 p-4 rounded-lg border border-white/5 shadow-sm hover:shadow-md hover:border-blue-500/50 cursor-grab active:cursor-grabbing transition-all"
                                        >
                                            <p className="text-sm font-bold text-white mb-1">{deal.name}</p>
                                            <p className="text-xs text-gray-400 mb-3">{deal.companyName}</p>
                                            
                                            <div className="flex justify-between items-center">
                                                <Badge color="green">${deal.value.toLocaleString()}</Badge>
                                                <div className="flex items-center text-xs text-gray-500" title="Probability">
                                                    <span className="w-16 bg-gray-700 h-1.5 rounded-full mr-2">
                                                        <span className="block h-full bg-blue-500 rounded-full" style={{ width: `${deal.probability}%` }}></span>
                                                    </span>
                                                    {deal.probability}%
                                                </div>
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
                                                <span>{deal.owner}</span>
                                                <span>{deal.expectedCloseDate}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DealPipelinePage;

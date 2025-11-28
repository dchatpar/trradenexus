
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, Badge } from '../common/Shared';
import { DocumentCheckIcon, GlobeEuropeAfricaIcon, ArrowRightIcon } from '../Icons';

const TradeAgreementsPage: React.FC = () => {
    const [origin, setOrigin] = useState('Vietnam');
    const [destination, setDestination] = useState('European Union');

    const agreements = [
        {
            name: 'EU-Vietnam Free Trade Agreement (EVFTA)',
            status: 'Active',
            reduction: '99% tariff elimination',
            rules: 'Product must be wholly obtained or sufficiently worked in Vietnam.',
            benefit: 'High'
        },
        {
            name: 'GSP (Generalized System of Preferences)',
            status: 'Expired',
            reduction: 'Standard GSP rates apply if eligible',
            rules: 'Standard GSP rules of origin.',
            benefit: 'Low'
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Trade Agreements & Market Access" subtitle="Optimize duty rates with FTA intelligence" />

            <GlassCard className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-xs font-medium text-gray-400 mb-1">Origin Country</label>
                        <select 
                            className="w-full bg-slate-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                        >
                            <option value="Vietnam">Vietnam</option>
                            <option value="India">India</option>
                            <option value="China">China</option>
                        </select>
                    </div>
                    <div className="pb-4 text-gray-500">
                        <ArrowRightIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-xs font-medium text-gray-400 mb-1">Destination Market</label>
                        <select 
                            className="w-full bg-slate-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        >
                            <option value="European Union">European Union</option>
                            <option value="USA">USA</option>
                            <option value="Japan">Japan</option>
                        </select>
                    </div>
                    <Button className="w-full md:w-auto h-[46px]">Check Agreements</Button>
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 gap-6">
                {agreements.map((fta, i) => (
                    <GlassCard key={i} className="p-6 border-l-4 border-l-green-500">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <GlobeEuropeAfricaIcon className="h-5 w-5 text-blue-400"/> {fta.name}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">Benefit Level: <span className="text-green-400 font-bold">{fta.benefit}</span></p>
                            </div>
                            <Badge color={fta.status === 'Active' ? 'green' : 'red'}>{fta.status}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-white/5">
                                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Tariff Impact</h4>
                                <p className="text-white text-sm">{fta.reduction}</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-white/5">
                                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Rules of Origin</h4>
                                <p className="text-white text-sm">{fta.rules}</p>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                            <Button variant="secondary" size="sm"><DocumentCheckIcon className="h-4 w-4 mr-2"/> Download Legal Text</Button>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export default TradeAgreementsPage;


import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, Badge, Input } from '../common/Shared';
import { ScaleIcon, ShieldCheckIcon, ExclamationTriangleIcon } from '../Icons';

const CompliancePage: React.FC = () => {
    const [name, setName] = useState('');
    const [result, setResult] = useState<'clean' | 'warning' | null>(null);
    const [loading, setLoading] = useState(false);

    const handleScreen = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            if (name.toLowerCase().includes('bad')) {
                setResult('warning');
            } else {
                setResult('clean');
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Compliance & Regulatory" subtitle="Screen partners and stay updated on trade laws" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Screening Tool */}
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <ScaleIcon className="h-5 w-5 text-purple-400" /> Denied Party Screening
                    </h3>
                    <p className="text-sm text-gray-400 mb-6">Check individuals and companies against 500+ global watchlists (OFAC, UN, EU, etc.).</p>
                    
                    <form onSubmit={handleScreen} className="space-y-4">
                        <Input 
                            label="Entity Name" 
                            placeholder="Enter company or individual name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button fullWidth disabled={!name || loading}>
                            {loading ? 'Screening Databases...' : 'Run Screening'}
                        </Button>
                    </form>

                    {result && (
                        <div className={`mt-6 p-4 rounded-xl border ${result === 'clean' ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'} animate-fade-in`}>
                            <div className="flex items-center gap-3 mb-2">
                                {result === 'clean' ? <ShieldCheckIcon className="h-6 w-6 text-green-400"/> : <ExclamationTriangleIcon className="h-6 w-6 text-red-400"/>}
                                <h4 className={`font-bold ${result === 'clean' ? 'text-green-400' : 'text-red-400'}`}>
                                    {result === 'clean' ? 'No Matches Found' : 'Potential Match Detected'}
                                </h4>
                            </div>
                            <p className="text-sm text-gray-300">
                                {result === 'clean' 
                                    ? `Entity "${name}" does not appear on any active sanctions list.` 
                                    : `Warning: "${name}" has a 95% name match on the SDN List. Do not proceed without further verification.`}
                            </p>
                        </div>
                    )}
                </GlassCard>

                {/* Regulatory Updates */}
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Trade Regulation Alerts</h3>
                    <div className="space-y-4">
                        {[
                            { title: 'EU Carbon Border Adjustment Mechanism (CBAM)', date: 'Oct 24', impact: 'High', type: 'Regulation' },
                            { title: 'New Export Controls on AI Chips (USA)', date: 'Oct 20', impact: 'Critical', type: 'Sanction' },
                            { title: 'India-UK FTA Negotiation Round 12', date: 'Oct 15', impact: 'Medium', type: 'Trade Deal' }
                        ].map((alert, i) => (
                            <div key={i} className="p-3 bg-slate-900/50 rounded-lg border border-white/5 hover:bg-slate-800 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <Badge color={alert.impact === 'Critical' ? 'red' : alert.impact === 'High' ? 'orange' : 'blue'}>{alert.type}</Badge>
                                    <span className="text-xs text-gray-500">{alert.date}</span>
                                </div>
                                <p className="text-sm text-white font-medium mt-1">{alert.title}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default CompliancePage;

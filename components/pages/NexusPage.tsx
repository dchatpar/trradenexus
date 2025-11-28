
import React, { useState } from 'react';
import { PageHeader, GlassCard, Badge, Button } from '../common/Shared';
import { ShareIcon, BuildingOfficeIcon, GlobeAltIcon, MapPinIcon } from '../Icons';
import { motion } from 'framer-motion';

// Mock Graph Data
const initialNodes = [
    { id: '1', name: 'Your Company', type: 'root', x: 400, y: 300 },
    { id: '2', name: 'Foxconn Tech', type: 'supplier', tier: 1, x: 250, y: 150 },
    { id: '3', name: 'Samsung Semi', type: 'supplier', tier: 1, x: 550, y: 150 },
    { id: '4', name: 'LG Chem', type: 'supplier', tier: 1, x: 400, y: 100 },
    { id: '5', name: 'Rare Earth Mining Co', type: 'supplier', tier: 2, x: 150, y: 50 },
    { id: '6', name: 'Silicon Wafers Ltd', type: 'supplier', tier: 2, x: 650, y: 50 },
    { id: '7', name: 'Global Logistics', type: 'partner', tier: 1, x: 400, y: 450 },
    { id: '8', name: 'Best Buy US', type: 'buyer', tier: 1, x: 200, y: 400 },
    { id: '9', name: 'Walmart', type: 'buyer', tier: 1, x: 600, y: 400 },
];

const initialLinks = [
    { from: '2', to: '1' }, { from: '3', to: '1' }, { from: '4', to: '1' },
    { from: '5', to: '2' }, { from: '6', to: '3' },
    { from: '1', to: '7' }, { from: '1', to: '8' }, { from: '1', to: '9' }
];

const NexusPage: React.FC = () => {
    const [selectedNode, setSelectedNode] = useState<any>(null);

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col animate-fade-in">
            <PageHeader title="Nexus Chain" subtitle="Visualize multi-tier supply chain connections" />

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
                {/* Graph Area */}
                <GlassCard className="lg:col-span-3 relative overflow-hidden bg-slate-900/50 p-0 border-slate-800" noPadding>
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                    
                    <svg className="w-full h-full min-h-[500px]">
                        {/* Links */}
                        {initialLinks.map((link, i) => {
                            const start = initialNodes.find(n => n.id === link.from);
                            const end = initialNodes.find(n => n.id === link.to);
                            if (!start || !end) return null;
                            return (
                                <motion.line 
                                    key={i}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.2 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                                    stroke="white" 
                                    strokeWidth="2" 
                                />
                            );
                        })}

                        {/* Nodes */}
                        {initialNodes.map((node) => (
                            <g key={node.id} onClick={() => setSelectedNode(node)} className="cursor-pointer group">
                                <motion.circle 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: Math.random() * 0.5 }}
                                    cx={node.x} cy={node.y} r={node.type === 'root' ? 30 : 20} 
                                    className={`
                                        ${node.type === 'root' ? 'fill-brand-600' : 
                                          node.type === 'supplier' ? 'fill-blue-600' : 
                                          node.type === 'buyer' ? 'fill-green-600' : 'fill-purple-600'}
                                        stroke-slate-900 stroke-4 hover:stroke-white transition-colors duration-300
                                    `}
                                />
                                <text x={node.x} y={node.y + (node.type === 'root' ? 45 : 35)} textAnchor="middle" fill="white" className="text-xs font-medium opacity-70 group-hover:opacity-100 pointer-events-none select-none">
                                    {node.name}
                                </text>
                                {node.type === 'root' && (
                                    <circle cx={node.x} cy={node.y} r="40" fill="none" stroke="#f97316" strokeOpacity="0.2" strokeWidth="2">
                                        <animate attributeName="r" from="30" to="50" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                )}
                            </g>
                        ))}
                    </svg>

                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-slate-900/80 p-3 rounded-lg border border-white/10 backdrop-blur text-xs text-gray-300">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600"></span> Supplier</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-600"></span> Buyer</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-600"></span> Logistics</div>
                    </div>
                </GlassCard>

                {/* Details Panel */}
                <div className="space-y-4">
                    <GlassCard className="p-6 h-full">
                        {selectedNode ? (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <Badge color={selectedNode.type === 'supplier' ? 'blue' : 'green'}>{selectedNode.type.toUpperCase()}</Badge>
                                    <h3 className="text-xl font-bold text-white mt-2">{selectedNode.name}</h3>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                        <MapPinIcon className="h-4 w-4" /> Taiwan (CN)
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-3 bg-slate-800 rounded-lg border border-white/5">
                                        <p className="text-xs text-gray-500 uppercase">Trade Volume</p>
                                        <p className="text-white font-mono font-bold">$14.2M / yr</p>
                                    </div>
                                    <div className="p-3 bg-slate-800 rounded-lg border border-white/5">
                                        <p className="text-xs text-gray-500 uppercase">Tier Status</p>
                                        <p className="text-white font-mono font-bold">Tier {selectedNode.tier || 1}</p>
                                    </div>
                                    <div className="p-3 bg-slate-800 rounded-lg border border-white/5">
                                        <p className="text-xs text-gray-500 uppercase">Risk Score</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-slate-700 h-2 rounded-full">
                                                <div className="bg-green-500 h-2 rounded-full" style={{width: '20%'}}></div>
                                            </div>
                                            <span className="text-green-400 text-xs font-bold">Low</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button fullWidth size="sm">View Profile</Button>
                                    <Button fullWidth size="sm" variant="secondary"><ShareIcon className="h-4 w-4"/></Button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                                <ShareIcon className="h-12 w-12 mb-4 opacity-50" />
                                <p>Select a node to view connection details</p>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default NexusPage;

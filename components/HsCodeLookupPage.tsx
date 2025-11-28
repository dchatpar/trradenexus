
import React, { useState } from 'react';
import { getHsCodeClassification } from '../services/geminiService';
import { TagIcon, PaperAirplaneIcon, MagnifyingGlassIcon, ChevronDownIcon, DocumentTextIcon, GlobeAltIcon, CalculatorIcon } from './Icons';
import { PageHeader, GlassCard, Badge, Button } from './common/Shared';
import { mockHsTree } from '../data/mockData';
import { HsNode } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

// --- Recursive Tree Node Component ---
const TreeNode: React.FC<{ node: HsNode; onSelect: (node: HsNode) => void; selectedId?: string; level?: number }> = ({ node, onSelect, selectedId, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = node.code === selectedId;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasChildren) {
            setIsOpen(!isOpen);
        } else {
            onSelect(node);
        }
    };

    const handleLabelClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(node);
        if (hasChildren && !isOpen) setIsOpen(true);
    };

    return (
        <div className="select-none">
            <div 
                className={`flex items-center py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
                onClick={handleLabelClick}
            >
                <div onClick={handleToggle} className={`mr-2 p-0.5 rounded hover:bg-white/10 transition-colors ${hasChildren ? '' : 'opacity-0'}`}>
                    <ChevronDownIcon className={`h-3 w-3 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`} />
                </div>
                <div className="flex-1 truncate">
                    <span className={`font-mono text-xs mr-2 ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>{node.code}</span>
                    <span className="text-sm">{node.label}</span>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && hasChildren && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        {node.children!.map((child) => (
                            <TreeNode key={child.code} node={child} onSelect={onSelect} selectedId={selectedId} level={level + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const HsCodeLookupPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'browse' | 'ai'>('browse');
  const [selectedNode, setSelectedNode] = useState<HsNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // AI State
  const [aiDescription, setAiDescription] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiDescription.trim() || aiLoading) return;
    setAiLoading(true);
    setAiResult('');
    try {
      const classification = await getHsCodeClassification(aiDescription);
      setAiResult(classification);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  // Filter Tree logic (Simple implementation: expands valid paths would be complex, 
  // for now we just filter the list if search term exists, or show full tree)
  // To keep it simple for the mock, we search specifically for leaf nodes or matching codes
  const renderTree = () => {
      if (searchTerm.trim() === '') {
          return mockHsTree.map(node => (
              <TreeNode key={node.code} node={node} onSelect={setSelectedNode} selectedId={selectedNode?.code} />
          ));
      } else {
          // Flat search for demo purposes
          const term = searchTerm.toLowerCase();
          const results: HsNode[] = [];
          const traverse = (nodes: HsNode[]) => {
              for (const node of nodes) {
                  if (node.code.includes(term) || node.label.toLowerCase().includes(term)) {
                      results.push(node);
                  }
                  if (node.children) traverse(node.children);
              }
          }
          traverse(mockHsTree);
          
          if (results.length === 0) return <div className="text-gray-500 text-sm p-4 text-center">No matching codes found.</div>;

          return results.map(node => (
              <div 
                key={node.code} 
                onClick={() => setSelectedNode(node)}
                className={`p-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedNode?.code === node.code ? 'bg-blue-600/10 border-l-2 border-l-blue-500' : ''}`}
              >
                  <p className="font-mono text-blue-400 text-sm font-bold">{node.code}</p>
                  <p className="text-gray-300 text-sm">{node.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{node.level}</p>
              </div>
          ));
      }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <PageHeader 
        title="HS Code Intelligence" 
        subtitle="Global product classification and duty rates" 
        action={
            <div className="flex bg-slate-800 rounded-lg p-1">
                <button onClick={() => setActiveMode('browse')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeMode === 'browse' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>Browse Tree</button>
                <button onClick={() => setActiveMode('ai')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeMode === 'ai' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>AI Classifier</button>
            </div>
        }
      />

      {activeMode === 'browse' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
              {/* Left Panel: Tree / Search */}
              <GlassCard className="lg:col-span-1 flex flex-col p-0 overflow-hidden">
                  <div className="p-4 border-b border-white/10 bg-slate-900/50">
                      <div className="relative">
                          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <input 
                              type="text" 
                              placeholder="Search code or description..." 
                              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                          />
                      </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 custom-scrollbar space-y-1">
                      {renderTree()}
                  </div>
              </GlassCard>

              {/* Right Panel: Details */}
              <GlassCard className="lg:col-span-2 flex flex-col p-0 overflow-hidden relative">
                  {selectedNode ? (
                      <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                          {/* Header */}
                          <div className="p-8 bg-gradient-to-b from-blue-900/20 to-transparent border-b border-white/5">
                              <Badge color="blue">{selectedNode.level}</Badge>
                              <h2 className="text-3xl font-mono font-bold text-white mt-4 mb-2">{selectedNode.code}</h2>
                              <p className="text-lg text-slate-300 leading-relaxed">{selectedNode.label}</p>
                          </div>

                          <div className="p-8 space-y-8">
                              {/* Duty Rates */}
                              <div>
                                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                      <CalculatorIcon className="h-5 w-5 text-green-400" /> Import Duty Rates
                                  </h3>
                                  {selectedNode.dutyRates && selectedNode.dutyRates.length > 0 ? (
                                      <div className="overflow-hidden rounded-xl border border-white/10">
                                          <table className="w-full text-left">
                                              <thead className="bg-slate-800/50 text-xs uppercase text-gray-400">
                                                  <tr>
                                                      <th className="px-6 py-3">Destination</th>
                                                      <th className="px-6 py-3">Standard Rate</th>
                                                      <th className="px-6 py-3">Notes</th>
                                                  </tr>
                                              </thead>
                                              <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                                                  {selectedNode.dutyRates.map((rate, i) => (
                                                      <tr key={i} className="hover:bg-white/5">
                                                          <td className="px-6 py-4 font-medium text-white">{rate.country}</td>
                                                          <td className="px-6 py-4"><span className="text-green-400 font-bold bg-green-500/10 px-2 py-1 rounded">{rate.rate}</span></td>
                                                          <td className="px-6 py-4 text-gray-500 italic">{rate.note || '-'}</td>
                                                      </tr>
                                                  ))}
                                              </tbody>
                                          </table>
                                      </div>
                                  ) : (
                                      <div className="p-6 bg-slate-800/30 rounded-xl border border-dashed border-gray-700 text-center text-gray-500">
                                          {selectedNode.level === 'Subheading' ? 'No specific duty data available for this code.' : 'Select a Subheading (leaf node) to view specific duty rates.'}
                                      </div>
                                  )}
                              </div>

                              {/* Related Products */}
                              <div>
                                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                      <TagIcon className="h-5 w-5 text-purple-400" /> Related Products
                                  </h3>
                                  <div className="flex flex-wrap gap-2">
                                      {selectedNode.relatedProducts ? (
                                          selectedNode.relatedProducts.map((prod, i) => (
                                              <span key={i} className="px-4 py-2 rounded-full bg-slate-800 border border-white/5 text-sm text-gray-300 hover:text-white hover:border-purple-500/50 transition-colors cursor-default">
                                                  {prod}
                                              </span>
                                          ))
                                      ) : (
                                          <span className="text-gray-500 text-sm">No related product tags.</span>
                                      )}
                                  </div>
                              </div>

                              {/* Compliance / Notes Mock */}
                              <div>
                                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                      <DocumentTextIcon className="h-5 w-5 text-yellow-400" /> Compliance Notes
                                  </h3>
                                  <div className="bg-yellow-900/10 border border-yellow-500/20 p-4 rounded-xl">
                                      <p className="text-sm text-yellow-200">
                                          <strong>Regulatory Alert:</strong> Ensure proper documentation of origin to qualify for preferential tariffs under Free Trade Agreements.
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                          <div className="h-20 w-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                              <GlobeAltIcon className="h-10 w-10 text-gray-600" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Select a HS Code</h3>
                          <p className="text-gray-400 max-w-sm">Browse the tree on the left or search to view detailed classification, duty rates, and compliance info.</p>
                      </div>
                  )}
              </GlassCard>
          </div>
      ) : (
        /* AI Classifier Mode */
        <GlassCard className="flex-1 p-8 max-w-3xl mx-auto w-full flex flex-col">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-600/20 rounded-xl">
                    <TagIcon className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">AI Classification Assistant</h3>
                    <p className="text-gray-400">Describe your product in plain language to get the correct HS Code.</p>
                </div>
             </div>
             
             <form onSubmit={handleAiSubmit} className="space-y-4">
                <textarea
                    value={aiDescription}
                    onChange={(e) => setAiDescription(e.target.value)}
                    placeholder="E.g., 'Wireless bluetooth headphones with noise cancellation' or 'Frozen fillets of atlantic salmon'"
                    className="w-full px-4 py-4 bg-slate-900 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 text-white h-40 text-lg placeholder-gray-600 resize-none"
                    disabled={aiLoading}
                />
                <Button
                    type="submit"
                    disabled={aiLoading || !aiDescription.trim()}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 text-lg"
                >
                    {aiLoading ? (
                        <span className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Analyzing Product...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <PaperAirplaneIcon className="h-5 w-5"/> Classify Now
                        </span>
                    )}
                </Button>
            </form>

            {aiResult && (
                <div className="mt-8 animate-fade-in-up">
                    <div className="p-6 bg-slate-800 rounded-xl border border-purple-500/30 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                        <h4 className="text-purple-300 font-bold uppercase text-xs tracking-wider mb-3">AI Recommendation</h4>
                        <div className="prose prose-invert max-w-none text-sm">
                            <pre className="whitespace-pre-wrap font-sans text-gray-200">{aiResult}</pre>
                        </div>
                    </div>
                </div>
            )}
        </GlassCard>
      )}
    </div>
  );
};

export default HsCodeLookupPage;

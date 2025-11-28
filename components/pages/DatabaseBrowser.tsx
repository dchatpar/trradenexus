
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { PageHeader, GlassCard, Badge, Button } from '../common/Shared';
import { MagnifyingGlassIcon, MapPinIcon, BriefcaseIcon, UserGroupIcon } from '../Icons';
import { Company } from '../../types';

const DatabaseBrowser: React.FC = () => {
  const { companies } = useData();
  const [search, setSearch] = useState('');

  const filtered = companies.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.country.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddLead = (company: Company) => {
      alert(`Added ${company.name} to your Lead CRM!`);
      // In a real app, this would dispatch an action to add to the leads store
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Database Browser" subtitle="Search 50M+ Verified Importers & Exporters" />

      <GlassCard className="p-6 sticky top-24 z-10 backdrop-blur-xl bg-[#0f172a]/80">
        <div className="relative">
             <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
             <input 
                type="text" 
                placeholder="Search by company, product (e.g. 'Coffee'), HS Code, or country..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-inner"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
             />
        </div>
        <div className="flex gap-2 mt-4">
            {['USA', 'China', 'Germany', 'Electronics', 'Textiles'].map(tag => (
                <button key={tag} onClick={() => setSearch(tag)} className="px-3 py-1 rounded-full bg-slate-700 text-xs text-gray-300 hover:bg-blue-600 hover:text-white transition-colors">
                    {tag}
                </button>
            ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(company => (
            <GlassCard key={company.id} className="p-6 hover:border-blue-500/50 transition-all flex flex-col h-full group">
                <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {company.name.charAt(0)}
                    </div>
                    <Badge color={company.tier === 'Tier 1' ? 'green' : 'blue'}>{company.tier}</Badge>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{company.name}</h3>
                
                <div className="flex items-center text-gray-400 text-sm mb-4">
                    <MapPinIcon className="h-4 w-4 mr-1" /> {company.country}
                    <span className="mx-2">•</span>
                    <BriefcaseIcon className="h-4 w-4 mr-1" /> {company.industry}
                </div>

                <div className="mt-auto space-y-4">
                     <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5">
                        <p className="text-xs text-gray-500 mb-1">Decision Maker</p>
                        <p className="text-sm font-medium text-white">{company.contactPerson || 'N/A'}</p>
                        <p className="text-xs text-gray-400">{company.contactEmail || 'Login to view email'}</p>
                     </div>

                    <div className="flex gap-2">
                         <Button className="flex-1" variant="secondary">View Details</Button>
                         <Button className="flex-1 bg-green-600 hover:bg-green-500 border-none" onClick={() => handleAddLead(company)}>
                            <UserGroupIcon className="h-4 w-4 mr-2 inline" /> Add Lead
                         </Button>
                    </div>
                </div>
            </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default DatabaseBrowser;

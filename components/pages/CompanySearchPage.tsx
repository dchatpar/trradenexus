import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { PageHeader, GlassCard, Badge, Button } from '../common/Shared';
import { MagnifyingGlassIcon, MapPinIcon, BriefcaseIcon } from '../Icons';
import { Company } from '../../types';

interface CompanySearchPageProps {
  onCompanyClick: (company: Company) => void;
}

const CompanySearchPage: React.FC<CompanySearchPageProps> = ({ onCompanyClick }) => {
  const { companies } = useData();
  const [search, setSearch] = useState('');

  const filtered = companies.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.country.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Company Search" subtitle="Find buyers and suppliers globally" />

      <GlassCard className="p-6 sticky top-24 z-10 backdrop-blur-xl bg-[#0f172a]/80">
        <div className="relative">
             <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
             <input 
                type="text" 
                placeholder="Search by company name, country, or product..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-inner"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
             />
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(company => (
            <GlassCard key={company.id} className="p-6 hover:bg-white/5 transition-all cursor-pointer group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {company.name.charAt(0)}
                    </div>
                    <Badge color={company.tier === 'Tier 1' ? 'green' : company.tier === 'Tier 2' ? 'blue' : 'yellow'}>{company.tier}</Badge>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{company.name}</h3>
                
                <div className="flex items-center text-gray-400 text-sm mb-4">
                    <MapPinIcon className="h-4 w-4 mr-1" /> {company.country}
                    <span className="mx-2">•</span>
                    <BriefcaseIcon className="h-4 w-4 mr-1" /> {company.industry}
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-500">Trade Vol</p>
                        <p className="font-semibold text-gray-200">{company.tradeVolume}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Risk Score</p>
                        <div className="flex items-center gap-2">
                             <div className="h-1.5 w-12 bg-gray-700 rounded-full overflow-hidden">
                                <div className={`h-full ${company.riskScore < 30 ? 'bg-green-500' : company.riskScore < 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${company.riskScore}%` }}></div>
                             </div>
                        </div>
                    </div>
                </div>
                
                <Button className="mt-4 w-full" variant="secondary" onClick={() => onCompanyClick(company)}>View Profile</Button>
            </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default CompanySearchPage;
import React, { useState } from 'react';
import { Company } from '../../types';
import { GlassCard, Button, Badge, DataTable } from '../common/Shared';
import { MapPinIcon, GlobeAltIcon, ChartBarIcon, ShieldCheckIcon, UserGroupIcon, EnvelopeIcon, PhoneIcon } from '../Icons';
import { useData } from '../../contexts/DataContext';

interface CompanyProfilePageProps {
  company: Company;
  onBack: () => void;
}

const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({ company, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'trade' | 'contacts'>('overview');
  const { shipments } = useData();

  // Mock shipments for this company
  const companyShipments = shipments.filter(s => s.importer === company.name || s.exporter === company.name).slice(0, 10);

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        <GlassCard className="p-6">
            <h4 className="font-bold text-white mb-2">Key Metrics</h4>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center"><span className="text-gray-400">Trade Volume</span> <span className="text-white font-bold">{company.tradeVolume}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-400">Founded</span> <span className="text-white font-bold">{company.foundedYear}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-400">Risk Score</span> <Badge color={company.riskScore < 40 ? 'green' : company.riskScore < 70 ? 'yellow' : 'red'}>{company.riskScore}/100</Badge></div>
            </div>
        </GlassCard>
        <GlassCard className="p-6 md:col-span-2">
            <h4 className="font-bold text-white mb-2">Top Products</h4>
            <div className="flex flex-wrap gap-2">
                {company.topProducts.map(p => <Badge key={p} color="gray">{p}</Badge>)}
            </div>
        </GlassCard>
    </div>
  );

  const renderTradeHistory = () => (
      <DataTable headers={['Date', 'Product', 'Partner', 'Value (USD)']}>
          {companyShipments.map(s => (
              <tr key={s.id}>
                  <td className="px-6 py-4">{s.date}</td>
                  <td className="px-6 py-4">{s.productDesc}</td>
                  <td className="px-6 py-4">{s.importer === company.name ? s.exporter : s.importer}</td>
                  <td className="px-6 py-4 text-green-400">${s.valueUSD.toLocaleString()}</td>
              </tr>
          ))}
      </DataTable>
  );

  const renderContacts = () => (
      <GlassCard className="p-6">
          <h4 className="font-bold text-white mb-4">Verified Contacts</h4>
          <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-lg flex justify-between items-center">
                  <div>
                      <p className="font-bold text-white">{company.contactPerson}</p>
                      <p className="text-xs text-gray-400">Director of Global Procurement</p>
                  </div>
                  <div className="flex gap-2">
                      <Button size="sm" variant="secondary"><EnvelopeIcon className="h-4 w-4" /></Button>
                      <Button size="sm" variant="secondary"><PhoneIcon className="h-4 w-4" /></Button>
                  </div>
              </div>
          </div>
      </GlassCard>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={onBack} className="text-blue-400 hover:text-blue-300 text-sm font-medium mb-2 flex items-center gap-1">
        <span className="text-lg">&larr;</span> Back to Search
      </button>
      
      {/* Header */}
      <GlassCard className="p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-4xl shadow-2xl border border-white/10 flex-shrink-0">
                {company.name.charAt(0)}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-white">{company.name}</h2>
                        <div className="flex items-center gap-4 text-gray-400 text-sm mt-2">
                            <span className="flex items-center gap-1"><MapPinIcon className="h-4 w-4"/> {company.country}</span>
                            <span className="flex items-center gap-1"><GlobeAltIcon className="h-4 w-4"/> {company.website}</span>
                        </div>
                    </div>
                    {company.isVerified && <Badge color="green"><ShieldCheckIcon className="h-3 w-3 inline mr-1" /> Verified</Badge>}
                </div>
                <p className="text-gray-300 mt-4 text-sm max-w-2xl">{company.description}</p>
            </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}>Overview</button>
        <button onClick={() => setActiveTab('trade')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'trade' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}>Trade History</button>
        <button onClick={() => setActiveTab('contacts')} className={`px-4 py-3 text-sm font-medium ${activeTab === 'contacts' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}>Contacts</button>
      </div>

      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'trade' && renderTradeHistory()}
        {activeTab === 'contacts' && renderContacts()}
      </div>
    </div>
  );
};

export default CompanyProfilePage;

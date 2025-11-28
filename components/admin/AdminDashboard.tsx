import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../../contexts/DataContext';
import { GlassCard, PageHeader, DataTable, Button, Badge } from '../common/Shared';
import { ArrowUpTrayIcon, TrashIcon } from '../Icons';
import { Shipment, Company } from '../../types';

const AdminDashboard: React.FC = () => {
  const { shipments, companies, deleteShipment, deleteCompany, resetData } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'data' | 'users'>('overview');
  const [dataCategory, setDataCategory] = useState<'shipments' | 'companies'>('shipments');

  // --- Render Overview Tab ---
  const renderOverview = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-gray-400 text-sm font-medium">Total Shipments</h3>
          <p className="text-3xl font-bold text-white mt-2">{shipments.length.toLocaleString()}</p>
          <p className="text-green-400 text-sm mt-1">Live Database Records</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-gray-400 text-sm font-medium">Companies Tracked</h3>
          <p className="text-3xl font-bold text-white mt-2">{companies.length.toLocaleString()}</p>
          <p className="text-blue-400 text-sm mt-1">Global Entities</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-gray-400 text-sm font-medium">System Status</h3>
          <p className="text-3xl font-bold text-green-400 mt-2">Operational</p>
          <p className="text-gray-400 text-sm mt-1">Last backup: 12m ago</p>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">Database Ingestion Rate</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { name: '00:00', value: 240 }, { name: '04:00', value: 139 },
              { name: '08:00', value: 980 }, { name: '12:00', value: 390 },
              { name: '16:00', value: 480 }, { name: '20:00', value: 380 },
              { name: '23:59', value: 430 },
            ]}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );

  // --- Render Data Management Tab ---
  const renderDataManagement = () => (
    <div className="space-y-6 animate-fade-in">
       {/* Import Center */}
       <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Data Import Center</h3>
            <p className="text-sm text-gray-400">Upload CSV/Excel files to update the master database.</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
             <Button variant="secondary" onClick={resetData}>Reset Mock Data</Button>
             <Button>
                <div className="flex items-center gap-2">
                    <ArrowUpTrayIcon className="h-4 w-4" /> Upload File
                </div>
             </Button>
          </div>
        </div>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
            <p className="text-gray-400">Drag and drop files here, or click to browse</p>
            <p className="text-xs text-gray-500 mt-2">Supports .csv, .xlsx (Max 50MB)</p>
        </div>
       </GlassCard>

       {/* Data Tables */}
       <div className="flex gap-4 border-b border-gray-700">
          <button 
            onClick={() => setDataCategory('shipments')}
            className={`pb-2 px-1 text-sm font-medium ${dataCategory === 'shipments' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          >
            Shipments ({shipments.length})
          </button>
          <button 
            onClick={() => setDataCategory('companies')}
            className={`pb-2 px-1 text-sm font-medium ${dataCategory === 'companies' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          >
            Companies ({companies.length})
          </button>
       </div>

       {dataCategory === 'shipments' ? (
         <DataTable headers={['Date', 'Product', 'Importer', 'Exporter', 'Value', 'Actions']}>
            {shipments.slice(0, 10).map((s) => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">{s.date}</td>
                    <td className="px-6 py-4">{s.productDesc}</td>
                    <td className="px-6 py-4">{s.importer}</td>
                    <td className="px-6 py-4">{s.exporter}</td>
                    <td className="px-6 py-4">${s.valueUSD.toLocaleString()}</td>
                    <td className="px-6 py-4">
                        <button onClick={() => deleteShipment(s.id)} className="text-red-400 hover:text-red-300">
                            <TrashIcon className="h-4 w-4" />
                        </button>
                    </td>
                </tr>
            ))}
         </DataTable>
       ) : (
         <DataTable headers={['Name', 'Country', 'Industry', 'Tier', 'Volume', 'Actions']}>
            {companies.slice(0, 10).map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{c.name}</td>
                    <td className="px-6 py-4">{c.country}</td>
                    <td className="px-6 py-4">{c.industry}</td>
                    <td className="px-6 py-4"><Badge color={c.tier === 'Tier 1' ? 'green' : 'blue'}>{c.tier}</Badge></td>
                    <td className="px-6 py-4">{c.tradeVolume}</td>
                    <td className="px-6 py-4">
                        <button onClick={() => deleteCompany(c.id)} className="text-red-400 hover:text-red-300">
                            <TrashIcon className="h-4 w-4" />
                        </button>
                    </td>
                </tr>
            ))}
         </DataTable>
       )}
    </div>
  );

  return (
    <div>
      <PageHeader 
        title="Admin Console" 
        subtitle="System management and data governance"
        action={
            <div className="flex bg-slate-800 rounded-lg p-1">
                <button onClick={() => setActiveTab('overview')} className={`px-4 py-1.5 rounded-md text-sm transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>Overview</button>
                <button onClick={() => setActiveTab('data')} className={`px-4 py-1.5 rounded-md text-sm transition-all ${activeTab === 'data' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>Data Manager</button>
                <button onClick={() => setActiveTab('users')} className={`px-4 py-1.5 rounded-md text-sm transition-all ${activeTab === 'users' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>Users</button>
            </div>
        }
      />
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'data' && renderDataManagement()}
      {activeTab === 'users' && <div className="text-center text-gray-500 p-10">User Management Module Loaded.</div>}
    </div>
  );
};

export default AdminDashboard;
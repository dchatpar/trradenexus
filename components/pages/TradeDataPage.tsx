import React, { useState, useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { PageHeader, GlassCard, DataTable, Button, Badge } from '../common/Shared';
import { MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon } from '../Icons';

interface TradeDataPageProps {
  type: 'import' | 'export';
}

const TradeDataPage: React.FC<TradeDataPageProps> = ({ type }) => {
  const { shipments } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');

  // Filter Logic: 
  // For 'import', we assume 'Your Company' is the importer (simulated logic for this mock view, 
  // or just show all records where importer is a specific country if we had that context).
  // For this demo, let's just randomize or filter based on a flag, or show all for now but color code.
  
  const filteredData = useMemo(() => {
    return shipments.filter(s => {
      const matchesSearch = 
        s.productDesc.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.hsCode.includes(searchTerm) ||
        s.importer.toLowerCase().includes(searchTerm) ||
        s.exporter.toLowerCase().includes(searchTerm);
      
      const matchesCountry = filterCountry ? (type === 'import' ? s.originCountry === filterCountry : s.destCountry === filterCountry) : true;
      
      return matchesSearch && matchesCountry;
    });
  }, [shipments, searchTerm, filterCountry, type]);

  const displayedData = filteredData.slice(0, 50); // Pagination mock

  return (
    <div className="space-y-6">
      <PageHeader 
        title={type === 'import' ? 'Import Data' : 'Export Data'} 
        subtitle={`Analyze global ${type} shipments`}
        action={<Button><ArrowDownTrayIcon className="h-4 w-4 mr-2 inline" /> Export Report</Button>}
      />

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search product, HS code, company..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="w-full md:w-48 relative">
                 <select 
                    className="w-full pl-3 pr-10 py-2.5 bg-slate-900/50 border border-gray-700 rounded-lg text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    onChange={(e) => setFilterCountry(e.target.value)}
                 >
                    <option value="">All Countries</option>
                    <option value="China">China</option>
                    <option value="USA">USA</option>
                    <option value="Germany">Germany</option>
                    <option value="Vietnam">Vietnam</option>
                 </select>
                 <FunnelIcon className="absolute right-3 top-3 h-5 w-5 text-gray-500 pointer-events-none" />
            </div>
        </div>
      </GlassCard>

      {/* Data Table */}
      <DataTable headers={['Date', 'HS Code', 'Product', type === 'import' ? 'Exporter' : 'Importer', 'Origin/Dest', 'Qty', 'Value', 'Port']}>
        {displayedData.length > 0 ? (
            displayedData.map(s => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-gray-300">{s.date}</td>
                    <td className="px-6 py-4 font-mono text-blue-300">{s.hsCode}</td>
                    <td className="px-6 py-4 font-medium text-white">{s.productDesc}</td>
                    <td className="px-6 py-4 text-gray-300">{type === 'import' ? s.exporter : s.importer}</td>
                    <td className="px-6 py-4"><Badge color="blue">{type === 'import' ? s.originCountry : s.destCountry}</Badge></td>
                    <td className="px-6 py-4 text-gray-300">{s.quantity} {s.unit}</td>
                    <td className="px-6 py-4 text-green-400 font-medium">${s.valueUSD.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{s.port}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No records found matching your criteria.
                </td>
            </tr>
        )}
      </DataTable>
      
      <div className="text-center text-gray-500 text-sm mt-4">
        Showing top {displayedData.length} records of {filteredData.length}
      </div>
    </div>
  );
};

export default TradeDataPage;
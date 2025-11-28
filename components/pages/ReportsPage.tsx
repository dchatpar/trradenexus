
import React from 'react';
import { PageHeader, GlassCard, DataTable, Button } from '../common/Shared';
import { ArrowDownTrayIcon, TrashIcon } from '../Icons';

const ReportsPage: React.FC = () => {
    const reports = [
        { id: '1', name: 'Q3 Market Analysis - Electronics', date: 'Oct 24, 2023', type: 'Market Report', format: 'PDF', size: '2.4 MB' },
        { id: '2', name: 'Competitor Watch - Foxconn', date: 'Oct 22, 2023', type: 'Competitor Intel', format: 'XLSX', size: '1.1 MB' },
        { id: '3', name: 'Lead List - Germany Auto', date: 'Oct 15, 2023', type: 'Lead Export', format: 'CSV', size: '450 KB' },
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Reports Center" subtitle="Access your generated intelligence reports" action={<Button>Generate New Report</Button>} />
            
            <GlassCard>
                <DataTable headers={['Report Name', 'Type', 'Date Created', 'Format', 'Size', 'Actions']}>
                    {reports.map(r => (
                        <tr key={r.id} className="hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white">{r.name}</td>
                            <td className="px-6 py-4 text-gray-400">{r.type}</td>
                            <td className="px-6 py-4 text-gray-400">{r.date}</td>
                            <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-slate-800 text-xs font-mono">{r.format}</span></td>
                            <td className="px-6 py-4 text-gray-400">{r.size}</td>
                            <td className="px-6 py-4 flex gap-3">
                                <button className="text-blue-400 hover:text-blue-300"><ArrowDownTrayIcon className="h-4 w-4" /></button>
                                <button className="text-red-400 hover:text-red-300"><TrashIcon className="h-4 w-4" /></button>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </GlassCard>
        </div>
    );
};

export default ReportsPage;


import React from 'react';
import { PageHeader, GlassCard, DataTable, Badge, Button } from '../common/Shared';
import { BellAlertIcon, TrashIcon, MagnifyingGlassIcon } from '../Icons';

const SavedSearchesPage: React.FC = () => {
    const savedSearches = [
        { id: '1', name: 'Verified Electronics Suppliers - China', date: 'Oct 20, 2023', alert: true, freq: 'Daily' },
        { id: '2', name: 'Cotton Importers > $1M Vol', date: 'Oct 15, 2023', alert: false, freq: '-' },
        { id: '3', name: 'New Logistics Companies (USA)', date: 'Oct 10, 2023', alert: true, freq: 'Weekly' },
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Saved Searches & Alerts" subtitle="Monitor database updates automatically" />

            <GlassCard>
                <DataTable headers={['Search Name', 'Date Created', 'Alert Status', 'Frequency', 'New Matches', 'Actions']}>
                    {savedSearches.map(s => (
                        <tr key={s.id} className="hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                                <MagnifyingGlassIcon className="h-4 w-4 text-blue-400" /> {s.name}
                            </td>
                            <td className="px-6 py-4 text-gray-400">{s.date}</td>
                            <td className="px-6 py-4">
                                <Badge color={s.alert ? 'green' : 'gray'}>{s.alert ? 'Active' : 'Disabled'}</Badge>
                            </td>
                            <td className="px-6 py-4 text-gray-300">{s.freq}</td>
                            <td className="px-6 py-4 text-blue-400 font-bold">
                                {s.alert ? '+12' : '-'}
                            </td>
                            <td className="px-6 py-4 flex gap-3">
                                <button className="text-gray-400 hover:text-white" title="Toggle Alert"><BellAlertIcon className="h-4 w-4" /></button>
                                <button className="text-red-400 hover:text-red-300"><TrashIcon className="h-4 w-4" /></button>
                                <Button className="text-xs h-auto py-1 px-3">Run Search</Button>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </GlassCard>
        </div>
    );
};

export default SavedSearchesPage;


import React from 'react';
import { PageHeader, GlassCard, Button } from '../common/Shared';
import { ArrowUpTrayIcon, ArrowDownTrayIcon, DocumentDuplicateIcon } from '../Icons';

const ContactDataPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <PageHeader title="Contact Data Manager" subtitle="Import leads or export your database" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassCard className="p-8 text-center flex flex-col items-center justify-center hover:bg-slate-800/50 transition-colors">
                    <div className="h-20 w-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-6">
                        <ArrowUpTrayIcon className="h-10 w-10 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Import Contacts</h3>
                    <p className="text-gray-400 mb-6 max-w-sm">Upload CSV or Excel files. We'll automatically map columns and detect duplicates.</p>
                    <div className="w-full max-w-xs border-2 border-dashed border-gray-600 rounded-xl p-8 bg-slate-900/50 mb-4 cursor-pointer hover:border-blue-500 transition-colors">
                        <p className="text-sm text-gray-500">Drag & Drop file here</p>
                    </div>
                    <Button>Select File</Button>
                </GlassCard>

                <GlassCard className="p-8 text-center flex flex-col items-center justify-center hover:bg-slate-800/50 transition-colors">
                    <div className="h-20 w-20 rounded-full bg-green-600/20 flex items-center justify-center mb-6">
                        <ArrowDownTrayIcon className="h-10 w-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Export Data</h3>
                    <p className="text-gray-400 mb-6 max-w-sm">Download your leads and contacts. Choose specific segments or export entire lists.</p>
                    
                    <div className="w-full max-w-xs space-y-3 mb-6">
                        <select className="w-full bg-slate-900 border border-gray-700 rounded p-3 text-white">
                            <option>All Qualified Leads</option>
                            <option>New Leads (Last 30 Days)</option>
                            <option>Closed Won Deals</option>
                        </select>
                        <select className="w-full bg-slate-900 border border-gray-700 rounded p-3 text-white">
                            <option>CSV Format</option>
                            <option>Excel (.xlsx)</option>
                        </select>
                    </div>
                    
                    <Button className="bg-green-600 hover:bg-green-500">Download Export</Button>
                </GlassCard>
            </div>
            
            <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <DocumentDuplicateIcon className="h-5 w-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white">Recent Data Jobs</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="text-gray-500 text-xs uppercase border-b border-white/5">
                        <tr>
                            <th className="px-4 py-3">Job Name</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Records</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm">
                        <tr className="border-b border-white/5">
                            <td className="px-4 py-3">Q3 Leads Import</td>
                            <td className="px-4 py-3">Import</td>
                            <td className="px-4 py-3">450</td>
                            <td className="px-4 py-3 text-green-400">Completed</td>
                            <td className="px-4 py-3">Oct 24, 2023</td>
                        </tr>
                         <tr>
                            <td className="px-4 py-3">Weekly Backup</td>
                            <td className="px-4 py-3">Export</td>
                            <td className="px-4 py-3">1,205</td>
                            <td className="px-4 py-3 text-green-400">Completed</td>
                            <td className="px-4 py-3">Oct 20, 2023</td>
                        </tr>
                    </tbody>
                </table>
            </GlassCard>
        </div>
    );
};

export default ContactDataPage;

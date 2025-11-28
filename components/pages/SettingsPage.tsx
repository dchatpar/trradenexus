
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, Badge, DataTable } from '../common/Shared';
import { useAuth } from '../../contexts/AuthContext';
import { UserCircleIcon, ShieldCheckIcon, BellIcon, Cog6ToothIcon, BuildingOfficeIcon, TrashIcon } from '../Icons';

const SettingsPage: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    
    // Mock Workspaces Data
    const [workspaces, setWorkspaces] = useState([
        { id: 1, name: 'Default Workspace', created: '2023-01-15', items: 1240 },
        { id: 2, name: 'Q3 Electronics Sourcing', created: '2023-08-22', items: 450 },
        { id: 3, name: 'Competitor Analysis', created: '2023-10-05', items: 85 }
    ]);

    const handleCreateWorkspace = () => {
        const name = prompt("Enter Workspace Name:");
        if (name) {
            setWorkspaces([...workspaces, { 
                id: Date.now(), 
                name, 
                created: new Date().toISOString().split('T')[0], 
                items: 0 
            }]);
        }
    };

    const renderWorkspaces = () => (
        <div className="space-y-6">
            <GlassCard className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white">Workspace Management</h3>
                        <p className="text-sm text-gray-400">You are on the <span className="text-purple-400 font-bold">SME Plan</span> (300 Workspaces Included)</p>
                    </div>
                    <Button onClick={handleCreateWorkspace}>Create Workspace</Button>
                </div>
                
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Usage</span>
                        <span>{workspaces.length} / 300</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(workspaces.length / 300) * 100}%` }}></div>
                    </div>
                </div>

                <DataTable headers={['Workspace Name', 'Date Created', 'Shipment Records', 'Status', 'Actions']}>
                    {workspaces.map(ws => (
                        <tr key={ws.id} className="hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white">{ws.name}</td>
                            <td className="px-6 py-4 text-gray-400">{ws.created}</td>
                            <td className="px-6 py-4">{ws.items}</td>
                            <td className="px-6 py-4"><Badge color="green">Active</Badge></td>
                            <td className="px-6 py-4">
                                <button className="text-red-400 hover:text-red-300 transition-colors">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </GlassCard>

            <GlassCard className="p-6">
                 <h3 className="text-lg font-bold text-white mb-4">Workspace Policies</h3>
                 <div className="space-y-4 text-sm text-gray-300">
                     <div className="flex justify-between py-2 border-b border-white/5">
                         <span>Workspace Deletion Limit</span>
                         <span className="text-white">75 Per Month</span>
                     </div>
                     <div className="flex justify-between py-2 border-b border-white/5">
                         <span>Sharing Rights</span>
                         <span className="text-green-400">Enabled</span>
                     </div>
                     <div className="flex justify-between py-2">
                         <span>Auto-Archive</span>
                         <span className="text-yellow-400">After 90 Days Inactivity</span>
                     </div>
                 </div>
            </GlassCard>
        </div>
    );

    return (
        <div className="space-y-6">
            <PageHeader title="Settings" subtitle="Manage your account preferences" />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <GlassCard className="col-span-1 p-4 h-fit">
                    <nav className="space-y-1">
                        <button 
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'profile' ? 'text-white bg-blue-600/20 border-l-2 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <UserCircleIcon className="mr-3 h-5 w-5" /> Profile
                        </button>
                        <button 
                            onClick={() => setActiveTab('workspaces')}
                            className={`w-full flex items-center px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'workspaces' ? 'text-white bg-blue-600/20 border-l-2 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <BuildingOfficeIcon className="mr-3 h-5 w-5" /> Workspaces
                        </button>
                        <button 
                            onClick={() => setActiveTab('security')}
                            className={`w-full flex items-center px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'security' ? 'text-white bg-blue-600/20 border-l-2 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <ShieldCheckIcon className="mr-3 h-5 w-5" /> Security
                        </button>
                        <button 
                            onClick={() => setActiveTab('notifications')}
                            className={`w-full flex items-center px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'text-white bg-blue-600/20 border-l-2 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <BellIcon className="mr-3 h-5 w-5" /> Notifications
                        </button>
                        <button 
                            onClick={() => setActiveTab('api')}
                            className={`w-full flex items-center px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'api' ? 'text-white bg-blue-600/20 border-l-2 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <Cog6ToothIcon className="mr-3 h-5 w-5" /> API Keys
                        </button>
                    </nav>
                </GlassCard>

                <div className="lg:col-span-3 space-y-6">
                    {activeTab === 'workspaces' && renderWorkspaces()}
                    
                    {activeTab === 'profile' && (
                        <GlassCard className="p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Profile Information</h3>
                            <div className="flex items-start gap-6">
                                <img src={user?.avatarUrl} alt="Avatar" className="h-24 w-24 rounded-full border-4 border-slate-700" />
                                <div className="flex-1 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
                                            <input type="text" defaultValue={user?.name} className="w-full bg-slate-900 border border-gray-700 rounded p-2.5 text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                                            <input type="email" defaultValue={user?.email} className="w-full bg-slate-900 border border-gray-700 rounded p-2.5 text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Company</label>
                                            <input type="text" defaultValue={user?.company} className="w-full bg-slate-900 border border-gray-700 rounded p-2.5 text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Role</label>
                                            <input type="text" defaultValue={user?.role} disabled className="w-full bg-slate-900/50 border border-gray-700 rounded p-2.5 text-gray-500 cursor-not-allowed" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button>Save Changes</Button>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    )}

                    {activeTab === 'notifications' && (
                        <GlassCard className="p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Preferences</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-white/5">
                                    <div>
                                        <p className="font-medium text-white">Email Notifications</p>
                                        <p className="text-sm text-gray-400">Receive updates about your leads and campaigns</p>
                                    </div>
                                    <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                        <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer translate-x-6 transition-transform duration-200 ease-in-out"/>
                                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-600 cursor-pointer"></label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <p className="font-medium text-white">Marketing Emails</p>
                                        <p className="text-sm text-gray-400">Receive offers and newsletters</p>
                                    </div>
                                    <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                        <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"/>
                                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"></label>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;

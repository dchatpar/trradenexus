
import React from 'react';
import { PageHeader, GlassCard, DataTable, Button, Badge } from '../common/Shared';
import { UsersIcon, EnvelopeIcon, TrashIcon } from '../Icons';

const TeamPage: React.FC = () => {
    const teamMembers = [
        { id: 1, name: 'Admin User', email: 'admin@tradenexus.com', role: 'Owner', lastActive: 'Now' },
        { id: 2, name: 'Sarah Chen', email: 'sarah@company.com', role: 'Editor', lastActive: '2h ago' },
        { id: 3, name: 'Mike Ross', email: 'mike@company.com', role: 'Viewer', lastActive: '1d ago' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Team Management" subtitle="Manage access and collaborate with your organization" action={<Button><UsersIcon className="h-4 w-4 mr-2"/> Invite Member</Button>} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <GlassCard className="p-4 h-fit">
                    <h3 className="text-white font-bold mb-4">Plan Usage</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Seats Used</span>
                                <span>3 / 10</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1.5">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '30%'}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/5">
                        <Button variant="secondary" fullWidth size="sm">Upgrade Plan</Button>
                    </div>
                </GlassCard>

                <GlassCard className="lg:col-span-3">
                    <DataTable headers={['Name', 'Email', 'Role', 'Last Active', 'Actions']}>
                        {teamMembers.map(member => (
                            <tr key={member.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{member.name}</td>
                                <td className="px-6 py-4 text-gray-400">{member.email}</td>
                                <td className="px-6 py-4">
                                    <Badge color={member.role === 'Owner' ? 'purple' : member.role === 'Editor' ? 'blue' : 'gray'}>{member.role}</Badge>
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-sm">{member.lastActive}</td>
                                <td className="px-6 py-4 flex gap-3">
                                    <button className="text-blue-400 hover:text-blue-300" title="Resend Invite"><EnvelopeIcon className="h-4 w-4"/></button>
                                    {member.role !== 'Owner' && (
                                        <button className="text-red-400 hover:text-red-300" title="Remove User"><TrashIcon className="h-4 w-4"/></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </DataTable>
                </GlassCard>
            </div>
        </div>
    );
};

export default TeamPage;

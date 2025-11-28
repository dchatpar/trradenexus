
import React from 'react';
import { PageHeader, GlassCard } from '../common/Shared';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { PresentationChartLineIcon, UserCircleIcon } from '../Icons';

const SalesAnalyticsPage: React.FC = () => {
    // Mock Data
    const activityData = [
        { name: 'Mon', calls: 45, emails: 120, sms: 30 },
        { name: 'Tue', calls: 52, emails: 135, sms: 45 },
        { name: 'Wed', calls: 38, emails: 110, sms: 25 },
        { name: 'Thu', calls: 65, emails: 160, sms: 50 },
        { name: 'Fri', calls: 48, emails: 95, sms: 40 },
    ];

    const funnelData = [
        { name: 'New Leads', value: 1200 },
        { name: 'Contacted', value: 850 },
        { name: 'Qualified', value: 420 },
        { name: 'Proposal', value: 180 },
        { name: 'Closed', value: 65 },
    ];

    const sourceData = [
        { name: 'Email', value: 45 },
        { name: 'Cold Call', value: 25 },
        { name: 'WhatsApp', value: 20 },
        { name: 'Referral', value: 10 },
    ];

    const teamData = [
        { name: 'Sarah Chen', revenue: 45000, deals: 5, rank: 1 },
        { name: 'Mike Ross', revenue: 38500, deals: 4, rank: 2 },
        { name: 'David Kim', revenue: 32000, deals: 3, rank: 3 },
        { name: 'Emma Wilson', revenue: 28000, deals: 4, rank: 4 },
    ];

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

    return (
        <div className="space-y-6">
            <PageHeader title="Sales Analytics" subtitle="Performance metrics and revenue insights" />

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Revenue', value: '$142,500', change: '+12%', color: 'text-green-400' },
                    { title: 'Conversion Rate', value: '4.8%', change: '+0.5%', color: 'text-blue-400' },
                    { title: 'Avg Deal Size', value: '$8,450', change: '-2%', color: 'text-yellow-400' },
                    { title: 'Sales Cycle', value: '18 Days', change: '-4 Days', color: 'text-purple-400' }
                ].map((stat, i) => (
                    <GlassCard key={i} className="p-6">
                        <p className="text-gray-400 text-xs uppercase font-medium">{stat.title}</p>
                        <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                        <p className="text-gray-500 text-xs mt-1">{stat.change} vs last month</p>
                    </GlassCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <PresentationChartLineIcon className="h-5 w-5 text-blue-400" />
                        Outreach Activity
                    </h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} />
                                <Area type="monotone" dataKey="emails" stroke="#10b981" fillOpacity={1} fill="url(#colorEmails)" name="Emails" />
                                <Area type="monotone" dataKey="calls" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCalls)" name="Calls" />
                                <Area type="monotone" dataKey="sms" stroke="#f59e0b" fillOpacity={0.5} strokeDasharray="3 3" name="SMS" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <h3 className="text-white font-bold mb-6">Conversion Funnel</h3>
                    <div className="h-72">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={funnelData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                                <XAxis type="number" stroke="#9ca3af" />
                                <YAxis dataKey="name" type="category" stroke="#9ca3af" width={100} />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 md:col-span-1">
                    <h3 className="text-white font-bold mb-4">Revenue by Source</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={sourceData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 text-xs text-gray-400 mt-2">
                        {sourceData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-6 md:col-span-2">
                    <h3 className="text-white font-bold mb-4">Team Leaderboard</h3>
                    <div className="space-y-4">
                        {teamData.map((member) => (
                            <div key={member.name} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white ${member.rank === 1 ? 'bg-yellow-500' : 'bg-slate-600'}`}>
                                        {member.rank}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                                        <div>
                                            <p className="font-bold text-white">{member.name}</p>
                                            <p className="text-xs text-gray-500">{member.deals} Deals Closed</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-400">${member.revenue.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">Revenue</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default SalesAnalyticsPage;

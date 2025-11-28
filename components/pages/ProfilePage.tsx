
import React from 'react';
import { PageHeader, GlassCard } from '../common/Shared';
import { useAuth } from '../../contexts/AuthContext';
import ActivityFeed from '../ActivityFeed';
import { activityData } from '../../data/mockData';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <PageHeader title="User Profile" />
            
            <GlassCard className="p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-900 to-purple-900 opacity-50"></div>
                <div className="relative z-10 pt-16">
                    <img 
                        src={user?.avatarUrl} 
                        alt={user?.name} 
                        className="h-32 w-32 rounded-full border-4 border-slate-800 mx-auto shadow-2xl"
                    />
                    <h2 className="text-2xl font-bold text-white mt-4">{user?.name}</h2>
                    <p className="text-gray-400">{user?.role} Member • {user?.company}</p>
                    
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-8">
                        <div className="bg-slate-800/50 p-4 rounded-xl">
                            <p className="text-3xl font-bold text-white">124</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Searches</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl">
                            <p className="text-3xl font-bold text-white">45</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Leads</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl">
                            <p className="text-3xl font-bold text-white">12</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Reports</p>
                        </div>
                    </div>
                </div>
            </GlassCard>

            <ActivityFeed items={activityData} />
        </div>
    );
};

export default ProfilePage;
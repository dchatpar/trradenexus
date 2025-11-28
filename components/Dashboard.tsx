
import React from 'react';
import { GlassCard, Button } from './common/Shared';
import { MagnifyingGlassIcon, PlayIcon, ChartBarIcon, BuildingOfficeIcon, GlobeAltIcon, StarIcon } from './Icons';
import { motion } from 'framer-motion';
import GlobalMap from './visualizations/GlobalMap';

interface DashboardProps {
    onNavigate?: (page: string) => void;
}

const FeatureCard: React.FC<{ title: string; isNew?: boolean }> = ({ title, isNew }) => (
    <GlassCard spotlight className="p-5 cursor-pointer h-full flex flex-col justify-between group min-h-[140px]" noPadding>
        <div className="p-5">
            <div className="flex justify-between items-start gap-2">
                <h3 className="text-sm font-bold text-slate-100 group-hover:text-brand-400 transition-colors leading-snug">{title}</h3>
                {isNew && <span className="flex-shrink-0 bg-brand-600/20 text-brand-400 text-[10px] px-2 py-0.5 rounded border border-brand-500/20 font-bold uppercase tracking-wider">New</span>}
            </div>
        </div>
        <div className="px-5 pb-4 pt-0 flex flex-wrap gap-x-3 gap-y-2 border-t border-white/5 mt-auto pt-3">
            <span className="text-[10px] font-medium text-slate-500 group-hover:text-slate-300 flex items-center gap-1.5 transition-colors">
                <PlayIcon className="h-3 w-3" /> Watch Video
            </span>
        </div>
    </GlassCard>
);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10 pb-8 max-w-7xl mx-auto"
    >
        {/* Interactive Hero Map Section */}
        <div className="relative">
            <GlobalMap />
            
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none p-4">
                <motion.h1 variants={item} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 font-display tracking-tight leading-tight relative z-10 drop-shadow-xl text-center">
                    Global Trade Intelligence
                </motion.h1>
                <motion.p variants={item} className="text-slate-300 mb-8 text-xs md:text-sm lg:text-base max-w-2xl mx-auto relative z-10 drop-shadow-md text-center bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full border border-white/10">
                    Access data from 203 countries updated as of <span className="text-brand-400 font-medium">Nov 18, 2025</span>
                </motion.p>

                <motion.div variants={item} className="max-w-3xl w-full relative z-20 pointer-events-auto">
                    <div className="flex items-center bg-slate-900/80 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20 focus-within:border-brand-500/50 focus-within:ring-4 focus-within:ring-brand-500/10 transition-all group">
                        <MagnifyingGlassIcon className="h-5 w-5 md:h-6 md:w-6 text-slate-400 ml-2 md:ml-4 flex-shrink-0 group-focus-within:text-brand-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search products, HS Codes, or Companies..."
                            className="flex-1 bg-transparent border-none text-white px-3 md:px-4 py-2 md:py-3 focus:ring-0 placeholder-slate-500 text-sm md:text-lg w-full outline-none"
                        />
                        <Button size="lg" className="rounded-xl px-4 md:px-8 shadow-none hidden sm:flex">
                            Search
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Quick Action Cards */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <GlassCard 
                spotlight 
                className="p-6 cursor-pointer border-t-4 border-t-brand-500 flex items-center gap-5 group" 
                noPadding
                onClick={() => onNavigate && onNavigate('workspaces')}
             >
                 <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-brand-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500/20 transition-colors">
                     <ChartBarIcon className="h-6 w-6 md:h-7 md:w-7 text-brand-500" />
                 </div>
                 <div>
                     <h3 className="font-bold text-white text-base md:text-lg group-hover:text-brand-400 transition-colors">System Workspace</h3>
                     <p className="text-xs md:text-sm text-slate-400 mt-1">Automated insights & competitor analysis</p>
                 </div>
             </GlassCard>
             <GlassCard 
                spotlight 
                className="p-6 cursor-pointer border-t-4 border-t-blue-500 flex items-center gap-5 group" 
                noPadding
                onClick={() => onNavigate && onNavigate('companies')}
             >
                 <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                     <BuildingOfficeIcon className="h-6 w-6 md:h-7 md:w-7 text-blue-500" />
                 </div>
                 <div>
                     <h3 className="font-bold text-white text-base md:text-lg group-hover:text-blue-400 transition-colors">My Companies</h3>
                     <p className="text-xs md:text-sm text-slate-400 mt-1">Track your buyers & supplier network</p>
                 </div>
             </GlassCard>
             <GlassCard 
                spotlight 
                className="p-6 cursor-pointer border-t-4 border-t-green-500 flex items-center gap-5 group" 
                noPadding
                onClick={() => onNavigate && onNavigate('new-search')}
             >
                 <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                     <GlobeAltIcon className="h-6 w-6 md:h-7 md:w-7 text-green-500" />
                 </div>
                 <div>
                     <h3 className="font-bold text-white text-base md:text-lg group-hover:text-green-400 transition-colors">New Search</h3>
                     <p className="text-xs md:text-sm text-slate-400 mt-1">Discover opportunities in 200+ markets</p>
                 </div>
             </GlassCard>
        </motion.div>

        {/* Feature Navigation Grid */}
        <motion.div variants={item}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-1.5 bg-brand-500/10 rounded-lg">
                    <StarIcon className="h-5 w-5 text-brand-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Platform Modules</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <FeatureCard title="TradeNexus Workshop" isNew={true} />
                <FeatureCard title="Manage Account" />
                <FeatureCard title="Invite Team Members" />
                <FeatureCard title="Dashboard & Graphs" />
                <FeatureCard title="Summary & Analysis" />
                <FeatureCard title="My Workspaces" />
                <FeatureCard title="Find Trending Products" />
                <FeatureCard title="Support Ticket & Chat" />
            </div>
        </motion.div>
    </motion.div>
  );
};

export default Dashboard;

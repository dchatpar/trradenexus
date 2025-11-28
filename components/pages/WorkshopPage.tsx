
import React from 'react';
import { PageHeader, GlassCard, Button } from '../common/Shared';
import { PlayIcon, ClockIcon } from '../Icons';

const WorkshopPage: React.FC = () => {
  const tutorials = [
    { id: 1, title: 'Getting Started with TradeNexus', duration: '5:20', category: 'Basics', thumbnail: 'bg-blue-600' },
    { id: 2, title: 'Advanced Search Techniques', duration: '8:45', category: 'Search', thumbnail: 'bg-purple-600' },
    { id: 3, title: 'Understanding HS Codes', duration: '12:10', category: 'Compliance', thumbnail: 'bg-green-600' },
    { id: 4, title: 'Exporting Reports to Excel', duration: '4:30', category: 'Reporting', thumbnail: 'bg-orange-600' },
    { id: 5, title: 'Analyzing Competitor Supply Chains', duration: '15:00', category: 'Intelligence', thumbnail: 'bg-red-600' },
    { id: 6, title: 'Managing Your Workspace', duration: '6:15', category: 'Account', thumbnail: 'bg-slate-600' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="TradeNexus Workshop" subtitle="Master the platform with expert video tutorials" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((video) => (
          <GlassCard key={video.id} className="p-0 overflow-hidden group cursor-pointer hover:border-brand-500/50 transition-all">
            <div className={`h-48 ${video.thumbnail} relative flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <PlayIcon className="h-8 w-8 text-white ml-1" />
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                <ClockIcon className="h-3 w-3" /> {video.duration}
              </div>
            </div>
            <div className="p-5">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">{video.category}</span>
              <h3 className="text-lg font-bold text-white mt-2 group-hover:text-brand-300 transition-colors">{video.title}</h3>
              <div className="mt-4 flex justify-between items-center">
                <Button size="sm" variant="secondary">Watch Now</Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-8 text-center mt-8">
        <h3 className="text-xl font-bold text-white mb-2">Need a Live Walkthrough?</h3>
        <p className="text-gray-400 mb-6">Schedule a 1-on-1 session with our product experts.</p>
        <Button size="lg">Book a Demo</Button>
      </GlassCard>
    </div>
  );
};

export default WorkshopPage;

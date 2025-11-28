
import React from 'react';
import { PageHeader, GlassCard, Button } from '../common/Shared';
import { MagnifyingGlassIcon } from '../Icons';

const LegacySearchPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Old Search Tool" subtitle="Access the legacy database interface" />

      <GlassCard className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-20 w-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-white/10">
          <MagnifyingGlassIcon className="h-10 w-10 text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Classic View</h2>
        <p className="text-gray-400 max-w-md mb-8">
          You are viewing the placeholder for the legacy search interface. 
          We recommend using the <strong>New Search</strong> for AI-powered results and verified contacts.
        </p>
        <div className="flex gap-4">
          <Button variant="secondary">Launch Legacy Tool</Button>
          <Button>Switch to New Search</Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default LegacySearchPage;

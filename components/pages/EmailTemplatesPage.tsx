
import React from 'react';
import { PageHeader, GlassCard, Button, Badge } from '../common/Shared';
import { mockEmailTemplates } from '../../data/mockData';
import { DocumentDuplicateIcon, EnvelopeIcon } from '../Icons';

const EmailTemplatesPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <PageHeader title="Email Templates" subtitle="Pre-built templates for faster outreach" action={<Button>New Template</Button>} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockEmailTemplates.map(template => (
                    <GlassCard key={template.id} className="p-6 flex flex-col h-full hover:border-blue-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-600/20 rounded-lg">
                                <EnvelopeIcon className="h-6 w-6 text-blue-400" />
                            </div>
                            <Badge color="purple">{template.category}</Badge>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{template.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">Subject: <span className="text-gray-300 italic">{template.subject}</span></p>
                        
                        <div className="flex-1 bg-slate-900/50 p-3 rounded-lg border border-white/5 mb-4 overflow-hidden relative">
                            <p className="text-xs text-gray-400 line-clamp-4">{template.body}</p>
                            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-900 to-transparent"></div>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            <span className="text-xs text-gray-500">Used {template.lastUsed}</span>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"><DocumentDuplicateIcon className="h-4 w-4" /></button>
                                <Button className="text-xs px-3 py-1.5 h-auto">Use</Button>
                            </div>
                        </div>
                    </GlassCard>
                ))}
                
                 <GlassCard className="p-6 flex flex-col items-center justify-center border-dashed border-2 border-gray-700 hover:border-blue-500/50 cursor-pointer text-gray-500 hover:text-white transition-colors min-h-[250px]">
                    <div className="h-14 w-14 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                        <span className="text-3xl font-bold">+</span>
                    </div>
                    <p className="font-medium">Create Custom Template</p>
                </GlassCard>
            </div>
        </div>
    );
};

export default EmailTemplatesPage;

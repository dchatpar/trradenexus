
import React, { useEffect, useState } from 'react';
import { getRealTimeTradeNews, NewsItem } from '../services/geminiService';
import { NewspaperIcon, ArrowTrendingUpIcon } from './Icons';

const TradeNews: React.FC = () => {
    const [news, setNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await getRealTimeTradeNews();
            setNews(data);
            setLoading(false);
        };
        fetchNews();
    }, []);

    return (
        <div className="glass-card p-6 rounded-xl shadow-lg border border-white/10 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                    <NewspaperIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Live Market Intelligence</h3>
                    <p className="text-xs text-gray-400">Powered by Google Search</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap font-medium">
                            {news?.text}
                        </div>
                        
                        {news?.sources && news.sources.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-white/10">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Sources</h4>
                                <div className="flex flex-wrap gap-2">
                                    {news.sources.slice(0, 3).map((source, idx) => (
                                        <a 
                                            key={idx} 
                                            href={source.uri} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs text-blue-300 transition-colors truncate max-w-[200px]"
                                        >
                                            <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                                            {source.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TradeNews;

import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '../Icons';
import { useData } from '../../contexts/DataContext';

const GlobalSearch: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { companies } = useData();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const filteredCompanies = query 
        ? companies.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
        : [];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[20vh]" onClick={() => setIsOpen(false)}>
            <div className="w-full max-w-2xl bg-[#1e293b] rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>
                <div className="flex items-center px-4 py-4 border-b border-white/10">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    <input 
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 ml-3 text-lg"
                        placeholder="Search companies, leads, or reports..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <span className="text-xs text-gray-500 border border-gray-600 rounded px-1.5 py-0.5">ESC</span>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                    {query === '' ? (
                        <div className="p-8 text-center text-gray-500">
                            Type to search across the entire platform
                        </div>
                    ) : filteredCompanies.length > 0 ? (
                        <ul>
                            <li className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase bg-slate-800/50">Companies</li>
                            {filteredCompanies.map(c => (
                                <li key={c.id} className="px-4 py-3 hover:bg-blue-600/20 cursor-pointer flex justify-between group transition-colors">
                                    <span className="text-gray-200 group-hover:text-white">{c.name}</span>
                                    <span className="text-sm text-gray-500">{c.country}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                         <div className="p-8 text-center text-gray-500">
                            No results found for "{query}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalSearch;
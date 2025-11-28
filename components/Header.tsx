

import React, { useState } from 'react';
import { UserCircleIcon, GlobeAltIcon, Bars3Icon, BellIcon } from './Icons';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './common/Shared';

interface HeaderProps {
    children?: React.ReactNode;
    title: string;
    onNavigate: (page: string) => void;
    currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ children, title, onNavigate, currentPage }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'dashboard' },
    { label: 'New Search', id: 'new-search' },
    { label: 'Workspaces', id: 'workspaces' },
    { label: 'Companies', id: 'database' } // FIX: Was 'companies', now points to the correct 'database' page.
  ];

  return (
    <header className="h-20 lg:h-24 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 pointer-events-none flex-shrink-0 transition-all duration-300">
      {/* Glass Background Wrapper */}
      <div className="absolute inset-x-4 sm:inset-x-6 top-4 bottom-2 bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-xl sm:rounded-2xl shadow-lg -z-10 pointer-events-auto"></div>

      <div className="flex items-center gap-4 lg:gap-8 w-full pl-2 sm:pl-4 pointer-events-auto">
        {children} {/* Sidebar Toggle */}
        
        {/* Main Navigation (Desktop) */}
        <div className="hidden lg:flex items-center p-1 rounded-lg">
            {navLinks.map(link => {
                const isActive = currentPage === link.id;
                return (
                    <button
                        key={link.id}
                        onClick={() => onNavigate(link.id)}
                        className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative ${
                            isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        {isActive && (
                            <motion.div 
                                layoutId="nav-bg"
                                className="absolute inset-0 bg-white/10 rounded-lg"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{link.label}</span>
                    </button>
                );
            })}
        </div>
        <span className="lg:hidden text-lg font-bold text-white truncate">{title}</span>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 pr-2 sm:pr-4 pointer-events-auto">
        <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-slate-900 shadow-[0_0_8px_2px_rgba(239,68,68,0.5)]"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1 rounded-full hover:bg-white/5 transition-all border border-transparent hover:border-white/10 focus:outline-none"
          >
            <ImageWithFallback
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover ring-2 ring-slate-800"
              src={user?.avatarUrl}
              alt=""
            />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-64 origin-top-right rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="px-5 py-4 border-b border-white/5 bg-white/5">
                            <p className="text-sm text-white font-bold">{user?.name}</p>
                            <p className="text-xs text-slate-400 truncate mt-0.5">{user?.email}</p>
                        </div>
                        <div className="p-2 space-y-1">
                            <button onClick={() => { onNavigate('profile'); setShowProfileMenu(false); }} className="w-full text-left flex items-center px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 rounded-lg hover:text-white transition-colors">
                            <UserCircleIcon className="mr-3 h-5 w-5 text-slate-500" /> My Account
                            </button>
                            <button onClick={() => { onNavigate('pricing'); setShowProfileMenu(false); }} className="w-full text-left flex items-center px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 rounded-lg hover:text-white transition-colors">
                            <GlobeAltIcon className="mr-3 h-5 w-5 text-slate-500" /> Subscription
                            </button>
                        </div>
                        <div className="p-2 border-t border-white/5">
                            <button
                            onClick={() => { logout(); setShowProfileMenu(false); }}
                            className="w-full text-left flex items-center px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
                            >
                            Sign Out
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;

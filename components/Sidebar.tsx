
import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, UserGroupIcon, 
  XMarkIcon, UserCircleIcon, 
  WorkshopIcon, TicketIcon, ClockIcon, BellAlertIcon,
  ChartBarIcon, ChatBubbleLeftRightIcon,
  BriefcaseIcon, PhoneIcon, EnvelopeIcon,
  ChevronDownIcon, CalculatorIcon, DocumentTextIcon,
  ShareIcon, ExclamationTriangleIcon, LightBulbIcon,
  ScaleIcon, DocumentCheckIcon, UsersIcon,
  LeafIcon, TruckIcon, BeakerIcon
} from './Icons';
import { useAuth } from '../contexts/AuthContext';
import { useAssets } from '../contexts/AssetContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './common/Shared';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  page: string;
  isNew?: boolean;
}

interface MenuGroup {
    title: string;
    items: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();
  const { logoUrl } = useAssets();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
      'Sales & CRM': true,
      'Outreach Engine': true,
      'Core': true,
      'Tools': true,
      'Intelligence': true,
      'Legal & Compliance': true
  });

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const toggleGroup = (title: string) => {
      setExpandedGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const menuGroups: MenuGroup[] = [
      {
          title: 'Core',
          items: [
            { label: 'Dashboard', icon: <ChartBarIcon className="h-5 w-5" />, page: 'dashboard' },
            { label: 'Workshop', icon: <WorkshopIcon className="h-5 w-5" />, page: 'workshop', isNew: true },
            { label: 'Tickets', icon: <TicketIcon className="h-5 w-5" />, page: 'tickets' },
          ]
      },
      {
          title: 'Intelligence',
          items: [
            { label: 'Database Browser', icon: <MagnifyingGlassIcon className="h-5 w-5" />, page: 'database' },
            { label: 'Nexus Chain', icon: <ShareIcon className="h-5 w-5" />, page: 'nexus', isNew: true },
            { label: 'Risk Radar', icon: <ExclamationTriangleIcon className="h-5 w-5" />, page: 'risk-analysis' },
            { label: 'Market Focus', icon: <LightBulbIcon className="h-5 w-5" />, page: 'market-focus' },
            { label: 'Logistics Intel', icon: <TruckIcon className="h-5 w-5" />, page: 'logistics', isNew: true },
            { label: 'Sustainability', icon: <LeafIcon className="h-5 w-5" />, page: 'sustainability', isNew: true },
            { label: 'Alerts & Monitor', icon: <BellAlertIcon className="h-5 w-5" />, page: 'alerts' },
            { label: 'Country Stats', icon: <ChartBarIcon className="h-5 w-5" />, page: 'country-stats' },
          ]
      },
      {
          title: 'Legal & Compliance',
          items: [
            { label: 'Trade Agreements', icon: <DocumentCheckIcon className="h-5 w-5" />, page: 'agreements', isNew: true },
            { label: 'Compliance Check', icon: <ScaleIcon className="h-5 w-5" />, page: 'compliance', isNew: true },
          ]
      },
      {
          title: 'Tools',
          items: [
            { label: 'Landed Cost', icon: <CalculatorIcon className="h-5 w-5" />, page: 'trade-calculator' },
            { label: 'Doc Generator', icon: <DocumentTextIcon className="h-5 w-5" />, page: 'document-generator' },
            { label: 'Scenario Planner', icon: <BeakerIcon className="h-5 w-5" />, page: 'scenario-planner', isNew: true },
          ]
      },
      {
          title: 'Sales & CRM',
          items: [
            { label: 'Lead Manager', icon: <UserGroupIcon className="h-5 w-5" />, page: 'leads' },
            { label: 'Deal Pipeline', icon: <BriefcaseIcon className="h-5 w-5" />, page: 'deal-pipeline' },
            { label: 'Calendar', icon: <ClockIcon className="h-5 w-5" />, page: 'calendar' },
            { label: 'Sales Analytics', icon: <ChartBarIcon className="h-5 w-5" />, page: 'sales-analytics' },
          ]
      },
      {
          title: 'Outreach Engine',
          items: [
            { label: 'AI Calling', icon: <PhoneIcon className="h-5 w-5" />, page: 'ai-calling' },
            { label: 'Email Campaigns', icon: <EnvelopeIcon className="h-5 w-5" />, page: 'email-campaigns' },
            { label: 'WhatsApp', icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />, page: 'whatsapp' },
            { label: 'SMS Blast', icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />, page: 'sms' },
            { label: 'Call Scripts', icon: <TicketIcon className="h-5 w-5" />, page: 'call-scripts' },
          ]
      },
      {
          title: 'Account',
          items: [
            { label: 'My Contact', icon: <UserGroupIcon className="h-5 w-5" />, page: 'contacts' },
            { label: 'Team', icon: <UsersIcon className="h-5 w-5" />, page: 'team' },
            { label: 'My Profile', icon: <UserCircleIcon className="h-5 w-5" />, page: 'profile' },
            { label: 'Subscription', icon: <ClockIcon className="h-5 w-5" />, page: 'pricing' },
            { label: 'Old Search', icon: <MagnifyingGlassIcon className="h-5 w-5" />, page: 'search-legacy' },
          ]
      }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm lg:hidden"
                onClick={() => setIsOpen(false)}
            />
        )}
      </AnimatePresence>
      
      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-[70] flex h-screen w-72 flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col lg:py-6 lg:pl-6">
            <div className="flex-1 flex flex-col bg-slate-900/60 backdrop-blur-xl lg:border border-white/5 lg:rounded-2xl overflow-hidden shadow-2xl relative">
                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>

                {/* Brand Header */}
                <div className="flex h-20 items-center justify-between px-6 border-b border-white/5 bg-slate-900/50 flex-shrink-0">
                    <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick('dashboard')}>
                        {logoUrl ? (
                            <ImageWithFallback 
                                src={logoUrl} 
                                alt="TradeNexus" 
                                className="h-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity" 
                            />
                        ) : (
                            <span className="text-2xl font-bold font-display tracking-tight text-white group-hover:text-brand-500 transition-colors">TradeNexus</span>
                        )}
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-6 custom-scrollbar relative z-10">
                    {menuGroups.map((group) => (
                        <div key={group.title}>
                            <div 
                                className="px-3 mb-2 flex items-center justify-between cursor-pointer group/header select-none"
                                onClick={() => toggleGroup(group.title)}
                            >
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover/header:text-slate-300 transition-colors">{group.title}</h3>
                                <ChevronDownIcon className={`h-3 w-3 text-slate-600 transition-transform duration-300 ${expandedGroups[group.title] ? 'rotate-180' : ''}`} />
                            </div>
                            
                            <AnimatePresence initial={false}>
                                {expandedGroups[group.title] && (
                                    <motion.div
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: { opacity: 1, height: "auto" },
                                            collapsed: { opacity: 0, height: 0 }
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden space-y-1"
                                    >
                                        {group.items.map(item => {
                                            const isActive = currentPage === item.page;
                                            return (
                                                <button
                                                    key={item.page}
                                                    onClick={() => handleNavClick(item.page)}
                                                    className={`w-full group flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                                                    isActive
                                                        ? 'text-white'
                                                        : 'text-slate-400 hover:text-slate-100'
                                                    }`}
                                                >
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="sidebar-active"
                                                            className="absolute inset-0 bg-brand-500/10 border-l-2 border-brand-500"
                                                            initial={false}
                                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                        />
                                                    )}
                                                    
                                                    <div className="flex items-center gap-3 relative z-10">
                                                        <span className={`${isActive ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`}>
                                                        {item.icon}
                                                        </span>
                                                        <span>{item.label}</span>
                                                    </div>
                                                    {item.isNew && (
                                                    <span className={`relative z-10 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${isActive ? 'bg-brand-500/20 text-brand-400' : 'bg-slate-800 text-slate-400'}`}>
                                                        New
                                                    </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </nav>

                {/* User Footer */}
                <div className="p-4 border-t border-white/5 relative z-10 bg-slate-900/50 flex-shrink-0">
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-white/5 transition-all mb-2"
                >
                    <XMarkIcon className="h-5 w-5 mr-3" />
                    Logout
                </button>

                {user && (
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleNavClick('profile')}
                        className="flex items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand-500/30 cursor-pointer transition-all group"
                    >
                        <ImageWithFallback 
                            src={user.avatarUrl} 
                            alt="User" 
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-brand-500/50 transition-colors"
                        />
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                            <p className="text-xs text-slate-400 capitalize truncate">{user.role} Plan</p>
                        </div>
                    </motion.div>
                )}
                </div>
            </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
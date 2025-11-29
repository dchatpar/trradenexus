

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AssetProvider } from './contexts/AssetContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Bars3Icon } from './components/Icons';
import Dashboard from './components/Dashboard';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import OnboardingWizard from './components/wizard/OnboardingWizard';
import LandingPage from './components/landing/LandingPage';
import { motion, AnimatePresence } from 'framer-motion';
import { Company } from './types';

// Import Pages
import AdminDashboard from './components/admin/AdminDashboard';
import DatabaseBrowser from './components/pages/DatabaseBrowser';
import LeadCrmPage from './components/pages/LeadCrmPage';
import AiCallingPage from './components/pages/AiCallingPage';
import EmailCampaignsPage from './components/pages/EmailCampaignsPage';
import NegotiationAssistant from './components/pages/NegotiationAssistant';
import PricingPage from './components/pages/PricingPage';
import SettingsPage from './components/pages/SettingsPage';
import ProfilePage from './components/pages/ProfilePage';
import ReportsPage from './components/pages/ReportsPage';
import WhatsappPage from './components/pages/WhatsappPage';
import CallScriptsPage from './components/pages/CallScriptsPage';
import ContactDataPage from './components/pages/ContactDataPage';
import DealPipelinePage from './components/pages/DealPipelinePage';
import EmailTemplatesPage from './components/pages/EmailTemplatesPage';
import SalesAnalyticsPage from './components/pages/SalesAnalyticsPage';
import SmsPage from './components/pages/SmsPage';
import CalendarPage from './components/pages/CalendarPage';
import SavedSearchesPage from './components/pages/SavedSearchesPage';
import { CountryStatisticsPage } from './components/pages/AnalyticsPages';
import { TradeCalculatorPage, DocumentGeneratorPage } from './components/pages/ToolsPages';

// New Core Pages
import SystemWorkspacePage from './components/pages/SystemWorkspacePage';
import NewSearchPage from './components/pages/NewSearchPage';
import CompanyProfilePage from './components/pages/CompanyProfilePage';

// New Intelligence Pages
import NexusPage from './components/pages/NexusPage';
import RiskAnalysisPage from './components/pages/RiskAnalysisPage';
import MarketFocusPage from './components/pages/MarketFocusPage';

// New Phase 4 Pages
import TradeAgreementsPage from './components/pages/TradeAgreementsPage';
import CompliancePage from './components/pages/CompliancePage';
import TeamPage from './components/pages/TeamPage';

// New Phase 6 Pages
import SustainabilityPage from './components/pages/SustainabilityPage';
import LogisticsPage from './components/pages/LogisticsPage';
import ScenarioPlannerPage from './components/pages/ScenarioPlannerPage';

// Components
import ChatBot from './components/ChatBot';
import GlobalSearch from './components/common/GlobalSearch';
import ToastContainer from './components/common/Toast';

import WorkshopPage from './components/pages/WorkshopPage';
import TicketsPage from './components/pages/TicketsPage';
import LegacySearchPage from './components/pages/LegacySearchPage';
import HsCodeLookupPage from './components/HsCodeLookupPage';

const AppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [authView, setAuthView] = useState<'landing' | 'login' | 'register'>('landing');
  const [showWizard, setShowWizard] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Check if wizard should be shown
  useEffect(() => {
      if (isAuthenticated && user) {
          if (!user.onboardingData) {
              setShowWizard(true);
          } else {
              setShowWizard(false);
          }
      }
  }, [isAuthenticated, user]);

  const handleWizardComplete = () => {
      setShowWizard(false);
      setCurrentPage('workspaces');
  };
  
  const handleNavigate = (page: string) => {
    setSelectedCompany(null); // Clear selected company when navigating away
    setCurrentPage(page);
  };

  const pageTitles: { [key: string]: string } = {
    dashboard: 'Welcome',
    workspaces: 'My Workspaces',
    'new-search': 'New Search',
    companies: 'Companies',
    workshop: 'TradeNexus Workshop',
    contacts: 'My Contact',
    profile: 'My Account',
    pricing: 'Subscription Plan',
    tickets: 'Ticket Management',
    'search-legacy': 'Old Search Tool',
    alerts: 'My Alerts',
    database: 'Database Browser',
    leads: 'Lead CRM',
    'deal-pipeline': 'Deal Pipeline',
    'ai-calling': 'AI Calling Center',
    'email-campaigns': 'Email Campaigns',
    whatsapp: 'WhatsApp Marketing',
    sms: 'SMS Blast',
    'sales-analytics': 'Sales Analytics',
    'call-scripts': 'Script Generator',
    'trade-calculator': 'Landed Cost Calculator',
    'document-generator': 'Trade Doc Generator',
    nexus: 'Nexus Supply Chain',
    'risk-analysis': 'Risk Analysis Radar',
    'market-focus': 'Market Focus & Opportunities',
    agreements: 'Free Trade Agreements',
    compliance: 'Compliance Screening',
    team: 'Team Management',
    sustainability: 'Sustainability & ESG',
    logistics: 'Logistics Intelligence',
    'scenario-planner': 'What-If Simulation'
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
            <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-brand-500 animate-spin"></div>
            </div>
            <p className="text-slate-400 text-sm font-medium animate-pulse">Initializing TradeNexus...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (authView === 'login') return <LoginPage />;
    if (authView === 'register') return <RegisterPage onSwitchToLogin={() => setAuthView('login')} />;
    return <LandingPage onLogin={() => setAuthView('login')} onRegister={() => setAuthView('register')} />;
  }

  const renderPage = () => {
    if (selectedCompany) {
      return <CompanyProfilePage company={selectedCompany} onBack={() => setSelectedCompany(null)} />;
    }
    
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigate={handleNavigate} />;
      case 'workspaces': return <SystemWorkspacePage />;
      case 'new-search': return <NewSearchPage />;
      
      case 'workshop': return <WorkshopPage />;
      case 'tickets': return <TicketsPage />;
      case 'search-legacy': return <LegacySearchPage />;
      case 'contacts': return <ContactDataPage />; 
      case 'profile': return <ProfilePage />;
      case 'pricing': return <PricingPage />;
      case 'alerts': return <SavedSearchesPage />;
      case 'team': return <TeamPage />;
      
      case 'nexus': return <NexusPage />;
      case 'risk-analysis': return <RiskAnalysisPage />;
      case 'market-focus': return <MarketFocusPage />;
      case 'agreements': return <TradeAgreementsPage />;
      case 'compliance': return <CompliancePage />;
      case 'sustainability': return <SustainabilityPage />;
      case 'logistics': return <LogisticsPage />;
      
      case 'database': return <DatabaseBrowser onSelectCompany={setSelectedCompany} />;
      case 'leads': return <LeadCrmPage />;
      case 'deal-pipeline': return <DealPipelinePage />;
      case 'calendar': return <CalendarPage />;
      case 'ai-calling': return <AiCallingPage />;
      case 'call-scripts': return <CallScriptsPage />;
      case 'email-campaigns': return <EmailCampaignsPage />;
      case 'email-templates': return <EmailTemplatesPage />;
      case 'whatsapp': return <WhatsappPage />;
      case 'sms': return <SmsPage />;
      case 'negotiator': return <NegotiationAssistant />;
      case 'sales-analytics': return <SalesAnalyticsPage />;
      case 'country-stats': return <CountryStatisticsPage />;
      case 'reports': return <ReportsPage />;
      case 'settings': return <SettingsPage />;
      
      case 'trade-calculator': return <TradeCalculatorPage />;
      case 'document-generator': return <DocumentGeneratorPage />;
      case 'scenario-planner': return <ScenarioPlannerPage />;
      
      case 'hs-code-lookup': return <HsCodeLookupPage />;

      case 'admin':
        if (user?.role !== 'admin') return <Dashboard onNavigate={handleNavigate} />;
        return <AdminDashboard />;
        
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };
  
  const pageKey = selectedCompany ? `company-${selectedCompany.id}` : currentPage;

  return (
    // Only constrain overflow when in the authenticated app view
    <div className="flex h-screen w-screen overflow-hidden text-slate-200 bg-slate-950">
      {showWizard && <OnboardingWizard onComplete={handleWizardComplete} />}
      
      <GlobalSearch />
      <ToastContainer />
      
      {/* Sidebar - Fixed Position handled by CSS class in component, but flex layout helps here too */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={handleNavigate}
      />

      {/* Main Content Layout - Flex Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Sticky Header */}
        <Header 
            title={selectedCompany ? 'Company Profile' : (pageTitles[currentPage] || 'Dashboard')} 
            onNavigate={handleNavigate}
            currentPage={currentPage}
        >
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-400 hover:text-white rounded-md hover:bg-white/10 transition-colors">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </Header>

        {/* Scrollable Area - This is the ONLY element that should scroll */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageKey}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="max-w-[1600px] mx-auto min-h-full pb-20"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <ChatBot />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <NotificationProvider>
          <AssetProvider>
            <AppContent />
          </AssetProvider>
        </NotificationProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
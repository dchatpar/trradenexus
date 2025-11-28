import React, { useState } from 'react';
import { Company } from '../../types';
import { GlassCard, Button, Badge, DataTable } from '../common/Shared';
import { MapPinIcon, GlobeAltIcon, ChartBarIcon, ShieldCheckIcon, UserGroupIcon, EnvelopeIcon, PhoneIcon } from '../Icons';
import { useData } from '../../contexts/DataContext';

interface CompanyProfilePageProps {
  company: Company;
  onBack: () => void;
}

const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({ company, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'trade' | 'contacts'>('overview');
  const { shipments } = useData();

  // Mock shipments for this company
  const companyShipments = shipments.filter(s => s.importer === company.name || s.exporter === company.name).slice(0, 10);

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={onBack} className="text-blue-400 hover:text-blue-300 text-sm font-medium mb-2 flex items-center gap-1">
        <span className="text-lg">&larr;</span> Back to Search
      </button>
      
      {/* Header */}
      <GlassCard className="p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-4xl shadow-2xl border border-white/
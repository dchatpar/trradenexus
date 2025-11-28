import React, { useState } from 'react';
import { SearchResultItem, ResultType, CompanyProfile } from '../types';
import { searchResults, companyProfileData } from '../data/mockData';
import KpiCard from './KpiCard';
import { GlobeAltIcon, MagnifyingGlassIcon, ShieldCheckIcon, ChartBarIcon, ArrowTrendingUpIcon } from './Icons';

const ResultTypeBadge: React.FC<{ type: ResultType }> = ({ type }) => {
    const styles = {
        [ResultType.Company]: 'bg-blue-100 text-blue-800',
        [ResultType.Shipment]: 'bg-green-100 text-green-800',
        [ResultType.Product]: 'bg-yellow-100 text-yellow-800',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type]}`}>
            {type}
        </span>
    );
};

const CompanyProfileView: React.FC<{ profile: CompanyProfile, onBack: () => void }> = ({ profile, onBack }) => {
    const kpiIcons: { [key: string]: React.ReactNode } = {
      'Annual Volume': <ChartBarIcon className="h-6 w-6 text-accent" />,
      'Total Shipments': <ArrowTrendingUpIcon className="h-6 w-6 text-accent" />,
      'Supplier Network': <GlobeAltIcon className="h-6 w-6 text-accent" />,
      'On-time Delivery': <ShieldCheckIcon className="h-6 w-6 text-accent" />,
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in">
            <button onClick={onBack} className="text-sm font-medium text-accent hover:underline mb-4">&larr; Back to Search Results</button>
            <div className="border-b pb-4 mb-4">
                <h2 className="text-2xl font-bold text-dark">{profile.name}</h2>
                <p className="text-gray-500">{profile.country} | <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{profile.website}</a></p>
                <p className="mt-2 text-gray-700">{profile.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {profile.kpis.map(kpi => <KpiCard key={kpi.title} {...kpi} icon={kpiIcons[kpi.title]}/>)}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-dark mb-2">Recent Trade Activity</h3>
                <ul className="divide-y divide-gray-200">
                    {profile.recentActivity.map(item => (
                        <li key={item.id} className="py-3 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-800">{item.description}</p>
                                <p className="text-xs text-gray-500">{item.date}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{item.value}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


const SearchPage: React.FC = () => {
    const [selectedCompany, setSelectedCompany] = useState<CompanyProfile | null>(null);

    // In a real app, this would trigger a search
    const handleResultClick = (result: SearchResultItem) => {
        if (result.type === ResultType.Company && result.id === companyProfileData.id) {
            setSelectedCompany(companyProfileData);
        } else {
            // Placeholder for other result types
            alert(`Viewing details for "${result.title}" is not yet implemented.`);
        }
    }

    if (selectedCompany) {
        return <CompanyProfileView profile={selectedCompany} onBack={() => setSelectedCompany(null)} />;
    }

    return (
        <div className="container mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <div className="flex items-center gap-2">
                    <MagnifyingGlassIcon className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold text-dark">Global Trade Search</h3>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search for companies, shipments, HS codes..."
                        className="flex-1 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button className="px-4 py-2 font-semibold text-white bg-secondary rounded-lg shadow-md hover:bg-primary transition-colors duration-200">
                        Search
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                 <h3 className="text-lg font-semibold text-dark mb-4">Search Results</h3>
                 <ul className="divide-y divide-gray-200">
                    {searchResults.map(item => (
                        <li key={item.id} className="py-4 cursor-pointer hover:bg-gray-50" onClick={() => handleResultClick(item)}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-md font-medium text-accent">{item.title}</p>
                                    <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                                    <p className="text-xs text-gray-400 mt-2">{item.country} &middot; {item.timestamp}</p>
                                </div>
                                <ResultTypeBadge type={item.type} />
                            </div>
                        </li>
                    ))}
                 </ul>
            </div>
        </div>
    );
};

export default SearchPage;
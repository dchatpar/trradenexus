
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { GlassCard, Button } from '../common/Shared';
import { MagnifyingGlassIcon, BriefcaseIcon, GlobeAltIcon, UserGroupIcon, BuildingOfficeIcon } from '../Icons';
import SuccessModal from '../common/SuccessModal';

interface OnboardingWizardProps {
    onComplete: () => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
    const { user, updateUser } = useAuth();
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Form State
    const [role, setRole] = useState('');
    const [industry, setIndustry] = useState('');
    const [businessLine, setBusinessLine] = useState('');
    const [targetCountries, setTargetCountries] = useState<string[]>([]);
    const [primaryGoal, setPrimaryGoal] = useState('');
    const [countrySearch, setCountrySearch] = useState('');

    // Step 1 Options: Role
    const roles = ["CEO / Founder", "Sales Manager", "Procurement Director", "Supply Chain Manager", "Analyst", "Other"];
    
    // Step 2 Options: Industry
    const industries = ["Agriculture", "Electronics", "Textiles", "Chemicals", "Metals", "Automotive", "Pharma", "Logistics", "Other"];

    // Step 3 Options: Business Line
    const businessOptions = [
        "Export", "Import", "Export & Import", 
        "Planning to start Export", "Planning to start Import", 
        "Domestic Trader", "Other"
    ];

    // Step 4 Options: Target Countries (Multi-select)
    const countries = [
        "United States", "Canada", "United Kingdom", "India", "China", 
        "Germany", "Vietnam", "Brazil", "UAE", "Singapore", "Australia",
        "Japan", "South Korea", "Mexico", "France"
    ];

    // Step 5 Options: Goal
    const goals = [
        "Find New Buyers", "Find New Suppliers", "Analyze Competitors", 
        "Monitor Market Trends", "Check Duty Rates", "Verify Companies"
    ];

    const toggleCountry = (c: string) => {
        if (targetCountries.includes(c)) {
            setTargetCountries(prev => prev.filter(item => item !== c));
        } else {
            if (targetCountries.length < 5) {
                setTargetCountries(prev => [...prev, c]);
            }
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleFinish = async () => {
        setIsAnalyzing(true);
        
        // Simulate AI analyzing profile to build workspace
        setTimeout(() => {
            updateUser({
                onboardingData: {
                    role,
                    industry,
                    businessLine,
                    targetCountries,
                    primaryGoal
                }
            });
            setIsAnalyzing(false);
            setShowSuccess(true);
        }, 2000);
    };

    const handleCloseModal = () => {
        setShowSuccess(false);
        onComplete();
    };

    const renderProgressBar = () => (
        <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3, 4, 5].map(s => (
                <div key={s} className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${step >= s ? 'bg-orange-500' : 'bg-gray-700'}`}></div>
            ))}
        </div>
    );

    return (
        <>
            <div className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
                <GlassCard className="max-w-xl w-full p-8 border-t-4 border-orange-500 animate-fade-in-up relative min-h-[500px] flex flex-col">
                    
                    {isAnalyzing ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
                            <div className="relative h-24 w-24 mb-6">
                                <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <GlobeAltIcon className="h-10 w-10 text-white animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Analyzing Trade Patterns...</h2>
                            <p className="text-gray-400">Building your custom workspace based on {industry} trends in {targetCountries.join(', ')}.</p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-white mb-1">Welcome, {user?.name}!</h2>
                                <p className="text-gray-400 text-sm">Let's tailor TradeNexus to your business needs.</p>
                                {renderProgressBar()}
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar px-1">
                                {step === 1 && (
                                    <div className="animate-fade-in">
                                        <div className="text-center mb-6">
                                            <UserGroupIcon className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                                            <h3 className="text-xl font-semibold text-white">What is your role?</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {roles.map((opt) => (
                                                <button key={opt} onClick={() => setRole(opt)} className={`p-3 rounded-lg text-sm border transition-all ${role === opt ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-800 border-gray-700 text-gray-300 hover:border-gray-500'}`}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="animate-fade-in">
                                        <div className="text-center mb-6">
                                            <BuildingOfficeIcon className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                                            <h3 className="text-xl font-semibold text-white">Which industry fits best?</h3>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {industries.map((opt) => (
                                                <button key={opt} onClick={() => setIndustry(opt)} className={`p-3 rounded-lg text-sm border transition-all ${industry === opt ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-800 border-gray-700 text-gray-300 hover:border-gray-500'}`}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="animate-fade-in">
                                        <div className="text-center mb-6">
                                            <BriefcaseIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
                                            <h3 className="text-xl font-semibold text-white">Your Line of Business?</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {businessOptions.map((opt) => (
                                                <button key={opt} onClick={() => setBusinessLine(opt)} className={`w-full p-3 rounded-lg text-left text-sm border transition-all ${businessLine === opt ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-800 border-gray-700 text-gray-300 hover:border-gray-500'}`}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="animate-fade-in">
                                        <div className="text-center mb-4">
                                            <GlobeAltIcon className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                                            <h3 className="text-xl font-semibold text-white">Target Markets?</h3>
                                            <p className="text-xs text-gray-500">Select up to 5 countries</p>
                                        </div>
                                        <div className="relative mb-3">
                                            <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <input type="text" placeholder="Filter countries..." className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-gray-600 rounded-lg text-white text-sm focus:outline-none" onChange={(e) => setCountrySearch(e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                                            {countries.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase())).map((c) => (
                                                <button key={c} onClick={() => toggleCountry(c)} className={`p-2 rounded text-xs border transition-all truncate ${targetCountries.includes(c) ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-800 border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 5 && (
                                    <div className="animate-fade-in">
                                        <div className="text-center mb-6">
                                            <MagnifyingGlassIcon className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                                            <h3 className="text-xl font-semibold text-white">Primary Goal?</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {goals.map((opt) => (
                                                <button key={opt} onClick={() => setPrimaryGoal(opt)} className={`p-4 rounded-lg text-sm border transition-all ${primaryGoal === opt ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-800 border-gray-700 text-gray-300 hover:border-gray-500'}`}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between pt-6 mt-4 border-t border-white/10">
                                {step > 1 ? (
                                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                                ) : (
                                    <div></div>
                                )}
                                
                                <Button 
                                    onClick={step === 5 ? handleFinish : nextStep} 
                                    disabled={
                                        (step === 1 && !role) || 
                                        (step === 2 && !industry) || 
                                        (step === 3 && !businessLine) || 
                                        (step === 4 && targetCountries.length === 0) || 
                                        (step === 5 && !primaryGoal)
                                    }
                                    className={`px-8 ${step === 5 ? 'bg-green-600 hover:bg-green-500' : 'bg-orange-600 hover:bg-orange-500'}`}
                                >
                                    {step === 5 ? 'Build Workspace' : 'Next'}
                                </Button>
                            </div>
                        </>
                    )}
                </GlassCard>
            </div>
            
            <SuccessModal 
                isOpen={showSuccess}
                onClose={handleCloseModal}
                title="Workspace Ready!"
                message={`We've configured your ${industry} workspace focusing on ${targetCountries.length} markets.`}
                actionText="Go to My Workspace"
            />
        </>
    );
};

export default OnboardingWizard;

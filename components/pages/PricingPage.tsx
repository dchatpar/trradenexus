
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, Badge } from '../common/Shared';
import { ShieldCheckIcon, GlobeAltIcon, UserGroupIcon, StarIcon, CheckBadgeIcon } from '../Icons';

const PricingPage: React.FC = () => {
    const [annual, setAnnual] = useState(true);

    const plans = [
        { 
            name: 'Free Trial', 
            price: 0, 
            description: 'Ideal for businesses to discover how TradeNexus can help grow business.',
            features: [
                'All Countries Access',
                'Data from 2014 Onward',
                '30 Searches',
                'Full Shipment View',
                '10 Users',
                'No Credit Card Needed'
            ],
            cta: 'Try 7-Day Free Trial',
            color: 'border-gray-600'
        },
        { 
            name: 'Startup', 
            price: 1500, 
            description: 'For Start-ups looking for essential databases.',
            features: [
                '79 Countries',
                'Data from 2014 Onward',
                '4,800 Searches',
                '360,000 Download Credits',
                '5 Users',
                'Workspace Management'
            ],
            cta: 'Buy Now',
            color: 'border-blue-500'
        },
        { 
            name: 'SME', 
            price: 4500, 
            popular: true, 
            description: 'Designed for SMEs looking to scale and stay competitive.',
            features: [
                '203 Countries (12 Exclusive)',
                'Unlimited Searches (Fair Use)',
                '1,040,000 Download Credits',
                '10 Users',
                '300 Workspaces',
                'Data Ninja Dashboard'
            ],
            cta: 'Buy Now',
            color: 'border-purple-500'
        },
        { 
            name: 'Corporate', 
            price: 9600, 
            description: 'Designed for large teams seeking larger limits.',
            features: [
                '203 Countries + Mirror Data',
                'Unlimited Searches',
                '2,400,000 Download Credits',
                '15 Users',
                '600 Workspaces',
                'Dedicated Support'
            ],
            cta: 'Buy Now',
            color: 'border-yellow-500'
        }
    ];

    const testimonials = [
        { name: 'Rashid', role: 'Manager Procurement', text: "Thanks to TradeNexus, my profits have gone up by 40%. I now focus on importing products with high margins and high volumes. Best part is Reports just take 5 minutes every month to consume." },
        { name: 'Ana Bush', role: 'GM Supply Chain', text: "Due to TradeNexus reports, We were able to reduce our import duty by 30%. This had a huge direct impact on our profit margins." },
        { name: 'Johannes Ohl', role: 'Head of Sales', text: "TradeNexus helped me discover a new product with 50% margin, huge volumes and 40% growth rate. I have a winner now and expanding rapidly." }
    ];

    return (
        <div className="space-y-16 pb-12">
            {/* Header Section */}
            <div className="text-center space-y-6">
                <Badge color="green">ROI GUARANTEED</Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-white font-display leading-tight">
                    Delivers Over <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">100X Returns</span> on Your Investment!
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    A single opportunity can yield 50X returns, and with TradeNexus, you can discover hundreds every single month.
                </p>
                
                <div className="flex items-center justify-center gap-4 mt-8">
                    <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
                    <button 
                        onClick={() => setAnnual(!annual)}
                        className="w-14 h-7 bg-slate-700 rounded-full relative transition-colors focus:outline-none"
                    >
                        <div className={`absolute top-1 w-5 h-5 bg-blue-500 rounded-full transition-transform shadow-md ${annual ? 'left-8' : 'left-1'}`}></div>
                    </button>
                    <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-gray-400'}`}>Annually <span className="text-green-400 text-xs font-bold ml-1">(Save 20%)</span></span>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {plans.map(plan => (
                    <GlassCard key={plan.name} className={`p-6 relative flex flex-col border-t-4 ${plan.color} ${plan.popular ? 'bg-slate-800/80 shadow-2xl scale-105 z-10' : 'bg-slate-900/50'}`}>
                        {plan.popular && (
                            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-4">
                                <Badge color="purple">Most Popular</Badge>
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-xs text-gray-400 h-10 mb-4">{plan.description}</p>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">${plan.price.toLocaleString()}</span>
                            <span className="text-gray-400 text-sm"> /year</span>
                        </div>
                        <Button variant={plan.popular ? 'primary' : 'secondary'} className="w-full justify-center mb-6">
                            {plan.cta}
                        </Button>
                        <div className="space-y-3 flex-1">
                            {plan.features.map(f => (
                                <li key={f} className="flex items-start text-sm text-gray-300">
                                    <CheckBadgeIcon className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* ROI Guarantee */}
            <GlassCard className="p-8 mx-4 bg-gradient-to-r from-blue-900/40 to-slate-900/40 border-blue-500/30">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                         <ShieldCheckIcon className="h-24 w-24 text-green-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Not Sure About TradeNexus's ROI?</h2>
                        <p className="text-gray-300 text-lg mb-4">
                            We guarantee you'll find at least one profitable opportunity. If you don't, we'll help you find one—or give you a <strong className="text-white">100% refund.</strong>
                        </p>
                        <div className="flex gap-4 text-sm text-blue-300">
                            <span className="flex items-center gap-1"><CheckBadgeIcon className="h-4 w-4" /> No Questions Asked</span>
                            <span className="flex items-center gap-1"><CheckBadgeIcon className="h-4 w-4" /> 7 Day Free Trial</span>
                            <span className="flex items-center gap-1"><CheckBadgeIcon className="h-4 w-4" /> Dedicated Support</span>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Features Grid (Why TradeNexus) */}
            <div className="px-4">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Why TradeNexus is the Best?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4 text-center p-6 bg-slate-800/30 rounded-xl">
                        <div className="h-14 w-14 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto text-blue-400">
                            <GlobeAltIcon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">World's Largest Platform</h3>
                        <p className="text-gray-400 text-sm">Expand your global reach with access to trade data from 203 Countries. Exclusive cross-country search access.</p>
                    </div>
                    <div className="space-y-4 text-center p-6 bg-slate-800/30 rounded-xl">
                         <div className="h-14 w-14 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto text-purple-400">
                            <UserGroupIcon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Verified Decision Makers</h3>
                        <p className="text-gray-400 text-sm">Get verified contacts for up to 70% companies. Initiate personalized conversation via Direct Dials, Email and LinkedIn.</p>
                    </div>
                    <div className="space-y-4 text-center p-6 bg-slate-800/30 rounded-xl">
                         <div className="h-14 w-14 bg-green-600/20 rounded-full flex items-center justify-center mx-auto text-green-400">
                            <StarIcon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Data Ninja</h3>
                        <p className="text-gray-400 text-sm">Empower your teams to slice and dice, customize, and download working excel dashboards without technical expertise.</p>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="px-4">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Honest Reviews from Customers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <GlassCard key={i} className="p-8">
                            <div className="flex gap-1 mb-4">
                                {[1,2,3,4,5].map(s => <StarIcon key={s} className="h-4 w-4 text-yellow-500" />)}
                            </div>
                            <p className="text-gray-300 italic mb-6">"{t.text}"</p>
                            <div>
                                <p className="text-white font-bold">{t.name}</p>
                                <p className="text-sm text-gray-500">{t.role}</p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
            
            {/* FAQ Teaser */}
             <div className="text-center">
                <p className="text-gray-400">Have questions? Visit our <a href="#" className="text-blue-400 hover:underline">Knowledgebase</a> or chat with our 24/7 Fanatic Support.</p>
            </div>
        </div>
    );
};

export default PricingPage;

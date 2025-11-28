
import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRightIcon, CheckCircleIcon, GlobeAltIcon, ChartBarIcon, 
  ShieldCheckIcon, UserGroupIcon, StarIcon, ArrowPathIcon, 
  FingerPrintIcon, BuildingOfficeIcon, ChevronDownIcon, MagnifyingGlassIcon
} from '../Icons';
import { 
  Button, GlassCard, BorderBeam, BackgroundBeams, TextReveal, 
  AnimatedGradientBackground, ScrollReveal, AnimatedShapes, 
  Section, Container 
} from '../common/Shared';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

// --- Constants ---
const companies = ["Samsung", "Maersk", "Foxconn", "Walmart", "Amazon", "Toyota", "DHL", "FedEx", "Costco", "Nestle"];

// --- Sub Components ---

const AccordionItem: React.FC<{ i: number, expanded: false | number, setExpanded: (i: false | number) => void, title: string, children: React.ReactNode }> = ({ i, expanded, setExpanded, title, children }) => {
    const isOpen = i === expanded;
    return (
        <motion.div initial={false} className="border-b border-white/5">
            <button
                onClick={() => setExpanded(isOpen ? false : i)}
                className="flex justify-between items-center w-full p-6 text-left hover:bg-white/5 transition-colors"
            >
                <span className={`text-base md:text-lg font-medium transition-colors ${isOpen ? 'text-brand-400' : 'text-slate-200'}`}>
                    {title}
                </span>
                <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto", marginBottom: 24 },
                            collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 text-slate-400 text-sm leading-relaxed max-w-2xl">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="text-center px-4 py-6 border-r border-white/5 last:border-r-0 hover:bg-white/5 transition-colors">
        <div className="text-3xl md:text-4xl font-bold font-display text-white mb-1 tracking-tight">{value}</div>
        <div className="text-xs font-bold text-brand-500 uppercase tracking-widest">{label}</div>
    </div>
);

const BentoCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; className?: string; graphic?: React.ReactNode }> = ({ title, desc, icon, className, graphic }) => (
    <GlassCard className={`p-8 flex flex-col justify-between group hover:border-brand-500/30 transition-all duration-500 h-full ${className}`} noPadding spotlight>
        <div className="p-8 relative z-10">
            <div className="h-12 w-12 rounded-xl bg-slate-800/50 border border-white/10 flex items-center justify-center text-brand-400 mb-6 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300 shadow-lg">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
        </div>
        {graphic && (
            <div className="relative w-full h-40 mt-4 overflow-hidden rounded-b-2xl border-t border-white/5 bg-slate-950/50">
                {graphic}
            </div>
        )}
    </GlassCard>
);

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onRegister }) => {
  const [expandedFaq, setExpandedFaq] = useState<false | number>(0);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [-20, 0]);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans selection:bg-brand-500/30">
      
      {/* Sticky Navigation */}
      <motion.nav 
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 pointer-events-none"
      >
        <div className="pointer-events-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-red-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
                  <GlobeAltIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold font-display tracking-tight text-white hidden sm:block">TradeNexus</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              {['Features', 'Data', 'Pricing', 'FAQ'].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full"></span>
                  </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={onLogin} className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">Log in</button>
              <Button onClick={onRegister} size="sm" variant="shiny" className="rounded-full px-5 text-xs font-bold uppercase tracking-wide">
                Get Started
              </Button>
            </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <AnimatedGradientBackground className="relative">
        <Section className="pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center min-h-[90vh]">
            {/* Background Ambience */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <BackgroundBeams />
                <AnimatedShapes />
            </div>
            <motion.div style={{ y: yBg }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] -z-20 opacity-40 will-change-transform" />

            <Container className="text-center z-10 relative">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex justify-center mb-8">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                            </span>
                            v2.0 Now Live: AI Supply Chain Analysis
                        </span>
                    </motion.div>
                    
                    <div className="mb-8 relative max-w-5xl mx-auto">
                        <TextReveal 
                            text="Unlock the World's Trade Intelligence" 
                            className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight leading-[1.1] text-center justify-center text-white drop-shadow-2xl" 
                            delay={0.2}
                        />
                    </div>
                    
                    <motion.p 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
                    >
                        Access 10 billion+ shipment records from <strong className="text-white">203 countries</strong>. 
                        Find verified buyers, monitor competitors, and optimize your supply chain with the world's most advanced AI trade engine.
                    </motion.p>
                    
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
                    >
                        <Button onClick={onRegister} pulse size="lg" className="h-14 px-8 rounded-full text-lg shadow-[0_0_30px_-10px_rgba(249,115,22,0.6)] w-full sm:w-auto">
                            Search Database Free
                        </Button>
                        <button onClick={onRegister} className="group flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-colors px-6 py-3 font-medium w-full sm:w-auto">
                            <span>Book Live Demo</span> 
                            <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* 3D Dashboard Preview (Scalable) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 100, rotateX: 10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative mx-auto max-w-5xl perspective-1000 w-full"
                    >
                        <div className="relative rounded-xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden aspect-[16/10] group">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80 z-20 pointer-events-none"></div>
                            <BorderBeam size={300} duration={10} colorFrom="#f97316" colorTo="#3b82f6" />
                            
                            {/* Dashboard Mockup Content */}
                            <div className="absolute inset-0 p-4 sm:p-6 bg-slate-950 grid grid-cols-12 gap-4">
                                <div className="col-span-3 hidden md:block bg-slate-900/50 rounded-lg border border-white/5 animate-pulse"></div>
                                <div className="col-span-12 md:col-span-9 space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-1/3 h-24 bg-slate-900/50 rounded-lg border border-white/5"></div>
                                        <div className="w-1/3 h-24 bg-slate-900/50 rounded-lg border border-white/5"></div>
                                        <div className="w-1/3 h-24 bg-slate-900/50 rounded-lg border border-white/5"></div>
                                    </div>
                                    <div className="flex-1 h-full bg-slate-900/30 rounded-lg border border-white/5 relative overflow-hidden">
                                        {/* Fake Chart */}
                                        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-between px-8 pb-8 gap-2 opacity-50">
                                            {[40, 70, 50, 90, 60, 80, 45, 75, 95, 60, 85, 100].map((h, i) => (
                                                <div key={i} className="w-full bg-gradient-to-t from-brand-600/50 to-brand-400/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                                <Button className="scale-110 shadow-2xl pointer-events-none">Explore Interactive Demo</Button>
                            </div>
                        </div>
                        {/* Reflection */}
                        <div className="absolute top-full left-0 right-0 h-32 bg-gradient-to-b from-brand-500/10 to-transparent blur-3xl -z-10 opacity-30 transform scale-x-90"></div>
                    </motion.div>
                </motion.div>
            </Container>
        </Section>
      </AnimatedGradientBackground>

      {/* Social Proof Marquee */}
      <Section className="py-12 border-y border-white/5 bg-slate-900/30 backdrop-blur-sm relative z-20">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="flex gap-20 animate-scroll w-max hover:[animation-play-state:paused] opacity-50 hover:opacity-100 transition-opacity duration-500">
            {[...companies, ...companies].map((company, i) => (
                <div key={i} className="text-lg md:text-xl font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap select-none flex items-center gap-3">
                    <GlobeAltIcon className="h-6 w-6 text-slate-600" /> {company}
                </div>
            ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section className="py-24 bg-slate-950">
          <Container>
              <ScrollReveal>
                  <div className="text-center mb-16">
                      <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">Intelligence in 3 Steps</h2>
                      <p className="text-slate-400">Transform raw data into actionable business deals.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                      {/* Connector Line (Desktop) */}
                      <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-slate-800 via-brand-500/50 to-slate-800 z-0"></div>
                      
                      {[
                          { icon: <MagnifyingGlassIcon className="w-6 h-6"/>, title: "Search", desc: "Query by product, HS code, or company name across 203 countries." },
                          { icon: <FingerPrintIcon className="w-6 h-6"/>, title: "Identify", desc: "View detailed profiles, transaction history, and trading partners." },
                          { icon: <ArrowPathIcon className="w-6 h-6"/>, title: "Connect", desc: "Get direct contact details for decision makers and start closing." }
                      ].map((step, i) => (
                          <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                              <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-brand-500/50 transition-all duration-300 shadow-xl">
                                  <div className="text-brand-500">{step.icon}</div>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                              <p className="text-slate-400 text-sm max-w-xs">{step.desc}</p>
                          </div>
                      ))}
                  </div>
              </ScrollReveal>
          </Container>
      </Section>

      {/* Bento Grid Features */}
      <Section id="features" className="py-24 bg-slate-950 relative">
          <Container>
              <ScrollReveal>
                  <div className="text-center mb-20">
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">The TradeNexus Advantage</h2>
                      <p className="text-slate-400 max-w-2xl mx-auto text-lg">We combine massive datasets with next-gen AI to give you visibility where others have blind spots.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                      {/* Large Card */}
                      <div className="md:col-span-2 md:row-span-2">
                        <BentoCard 
                            className="bg-gradient-to-br from-slate-900 to-slate-900/50"
                            title="Global Mirror Data Technology"
                            desc="Access trade flows even for countries that don't publish data. Our algorithms reconstruct invisible trade routes by analyzing partner country reports, giving you 100% global visibility."
                            icon={<GlobeAltIcon className="h-6 w-6"/>}
                            graphic={
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <div className="w-[120%] h-[120%] border-[1px] border-dashed border-brand-500/30 rounded-full animate-[spin_60s_linear_infinite]"></div>
                                    <div className="absolute w-[80%] h-[80%] border-[1px] border-dashed border-blue-500/30 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                                    <div className="absolute w-4 h-4 bg-brand-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.8)]"></div>
                                </div>
                            }
                        />
                      </div>
                      
                      {/* Side Cards */}
                      <BentoCard 
                        title="AI HS Code Classification"
                        desc="Stop guessing codes. Our NLP engine classifies products with 99% accuracy using fuzzy logic descriptions."
                        icon={<ChartBarIcon className="h-6 w-6"/>}
                        className="bg-slate-900/40"
                      />
                      <BentoCard 
                        title="Verified Contact Details"
                        desc="Unlock direct dials and verified emails for key decision makers in procurement and sales departments."
                        icon={<UserGroupIcon className="h-6 w-6"/>}
                        className="bg-slate-900/40"
                      />
                      
                      {/* Bottom Wide */}
                      <div className="md:col-span-3">
                        <BentoCard 
                            className="bg-gradient-to-r from-blue-900/10 to-brand-900/10"
                            title="Supply Chain Risk Radar"
                            desc="Monitor your suppliers' financial health and trade stability in real-time. Get alerts on disruptions before they impact your inventory."
                            icon={<ShieldCheckIcon className="h-6 w-6"/>}
                            graphic={
                                <div className="h-full w-full flex items-center px-10 gap-4">
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 w-[70%] relative">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full shadow-lg"></div>
                                        </div>
                                    </div>
                                    <span className="text-yellow-400 font-bold font-mono text-xs">MODERATE</span>
                                </div>
                            }
                        />
                      </div>
                  </div>
              </ScrollReveal>
          </Container>
      </Section>

      {/* Global Impact Stats */}
      <Section className="py-20 bg-slate-900/50 border-y border-white/5">
          <Container>
              <ScrollReveal>
                  <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                      <StatItem value="203" label="Countries" />
                      <StatItem value="10B+" label="Records" />
                      <StatItem value="21M+" label="Companies" />
                      <StatItem value="95%" label="Accuracy" />
                  </div>
              </ScrollReveal>
          </Container>
      </Section>

      {/* Pricing Section */}
      <Section id="pricing" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950 pointer-events-none"></div>
        <Container className="relative z-10">
            <ScrollReveal>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-6">Simple, Transparent Pricing</h2>
                    <p className="text-slate-400">Choose the plan that fits your scale. No hidden fees.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {['Startup', 'SME', 'Corporate'].map((plan, i) => (
                        <GlassCard key={plan} className={`p-8 flex flex-col relative group hover:scale-105 transition-transform duration-300 ${i === 1 ? 'bg-slate-800/80 border-brand-500/50 shadow-2xl shadow-brand-900/20' : 'bg-slate-900/40'}`}>
                            {i === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">Most Popular</div>}
                            <h3 className="text-2xl font-bold text-white mb-2">{plan}</h3>
                            <div className="text-4xl font-bold text-white mb-6 flex items-baseline gap-1">
                                ${i === 0 ? '1,500' : i === 1 ? '4,500' : '9,600'}
                                <span className="text-base font-normal text-slate-500">/yr</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center text-sm text-slate-300">
                                    <CheckCircleIcon className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" />
                                    Access to {i === 0 ? '79' : '203'} countries
                                </li>
                                <li className="flex items-center text-sm text-slate-300"><CheckCircleIcon className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" /> {i === 0 ? '360k' : i === 1 ? '1M' : '2.4M'} Downloads</li>
                                <li className="flex items-center text-sm text-slate-300"><CheckCircleIcon className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" /> {i === 0 ? '5' : i === 1 ? '10' : '15'} User Accounts</li>
                                {i > 0 && <li className="flex items-center text-sm text-slate-300"><CheckCircleIcon className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" /> Advanced Workspace Tools</li>}
                                {i > 1 && <li className="flex items-center text-sm text-slate-300"><CheckCircleIcon className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" /> API Access & Mirror Data</li>}
                            </ul>
                            <Button variant={i === 1 ? 'primary' : 'secondary'} onClick={onRegister} fullWidth className={i===1 ? 'shadow-brand-500/20' : ''}>
                                Choose {plan}
                            </Button>
                        </GlassCard>
                    ))}
                </div>
            </ScrollReveal>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" className="py-24 bg-slate-900/20">
          <Container className="max-w-3xl">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 font-display">Frequently Asked Questions</h2>
                <GlassCard noPadding className="overflow-hidden">
                    <AccordionItem i={0} expanded={expandedFaq} setExpanded={setExpandedFaq} title="What exactly is TradeNexus?">TradeNexus is a global trade intelligence platform that aggregates import-export data from 203 countries. We process billions of shipment records to help businesses find new buyers, track suppliers, and analyze market trends with AI precision.</AccordionItem>
                    <AccordionItem i={1} expanded={expandedFaq} setExpanded={setExpandedFaq} title="How accurate is your data?">Our data is sourced directly from official customs manifests, bills of lading, and government filings. We then use our proprietary AI algorithms to clean, standardize, and verify company entities, achieving a 95%+ accuracy rate.</AccordionItem>
                    <AccordionItem i={2} expanded={expandedFaq} setExpanded={setExpandedFaq} title="Do you offer a free trial?">Yes! We offer a 7-day free trial with no credit card required. You can access a limited set of searches and view the dashboard to understand the power of our platform before committing.</AccordionItem>
                    <AccordionItem i={3} expanded={expandedFaq} setExpanded={setExpandedFaq} title="Can I download the data?">Absolutely. Depending on your subscription plan, you receive a monthly allocation of download credits. You can export data in Excel or CSV formats for offline analysis.</AccordionItem>
                    <AccordionItem i={4} expanded={expandedFaq} setExpanded={setExpandedFaq} title="What is 'Mirror Data'?">Mirror Data allows us to reconstruct trade flows for countries that do not publicly release their customs data. By analyzing the "mirror" records of their trading partners (e.g., exports TO that country), we provide visibility where others cannot.</AccordionItem>
                </GlassCard>
              </ScrollReveal>
          </Container>
      </Section>

      {/* Final CTA */}
      <Section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-600/10 pointer-events-none"></div>
          <Container className="text-center relative z-10 max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">Ready to dominate global trade?</h2>
              <p className="text-xl text-slate-300 mb-10">Join 10,000+ companies using TradeNexus to source smarter.</p>
              <Button onClick={onRegister} size="lg" pulse className="px-12 py-4 text-lg rounded-full shadow-2xl">Start Your Free Trial</Button>
              <p className="mt-6 text-sm text-slate-500">No credit card required. Cancel anytime.</p>
          </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 pt-16 pb-8">
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-red-600 flex items-center justify-center">
                            <GlobeAltIcon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold font-display tracking-tight text-white">TradeNexus</span>
                    </div>
                    <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                        Connecting the world of trade through data, intelligence, and technology. Empowering businesses to make data-driven decisions since 2024.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Platform</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><a href="#" className="hover:text-brand-400 transition-colors">Search Database</a></li>
                        <li><a href="#" className="hover:text-brand-400 transition-colors">Workspace</a></li>
                        <li><a href="#" className="hover:text-brand-400 transition-colors">API Access</a></li>
                        <li><a href="#" className="hover:text-brand-400 transition-colors">Pricing</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><a href="#" className="hover:text-brand-400 transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-brand-400 transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-brand-400 transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-slate-600 text-xs">
                    &copy; 2025 TradeNexus Inc. All rights reserved.
                </div>
                <div className="flex gap-4">
                    {/* Social Icons Placeholder */}
                    <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors flex items-center justify-center text-slate-400 hover:text-white">
                        <GlobeAltIcon className="h-4 w-4"/>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors flex items-center justify-center text-slate-400 hover:text-white">
                        <ChartBarIcon className="h-4 w-4"/>
                    </div>
                </div>
            </div>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;

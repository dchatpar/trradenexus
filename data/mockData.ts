
import { KpiData, Lead, Deal, Campaign, CallLog, Company, CompanyProfile, ActivityItem, ActivityStatus, Shipment, HsCode, CountryStats, SearchResultItem, ResultType, WhatsappTemplate, EmailTemplate, HsNode } from '../types';

// --- Generators ---

const generateLeads = (count: number): Lead[] => {
  const statuses: Lead['status'][] = ['New', 'Contacted', 'Qualified', 'Negotiating', 'Closed', 'Lost'];
  const companies = ['TechGlobal', 'AgriCorp', 'Oceanic Traders', 'Vertex Systems', 'Horizon Imports', 'Apex Logistics'];
  const names = ['John Smith', 'Sarah Chen', 'Michael Ross', 'Emma Wilson', 'David Kim', 'Luis Garcia'];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `LEAD-${1000 + i}`,
    companyName: companies[Math.floor(Math.random() * companies.length)] + ' ' + (i + 1),
    contactName: names[Math.floor(Math.random() * names.length)],
    title: 'Procurement Director',
    email: `contact@company${i}.com`,
    phone: `+1 (555) 01${Math.floor(Math.random() * 99)}`,
    country: ['USA', 'China', 'Germany', 'UK', 'Brazil'][Math.floor(Math.random() * 5)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    value: Math.floor(Math.random() * 50000) + 5000,
    lastContact: `${Math.floor(Math.random() * 10)} days ago`,
    notes: 'Interested in bulk electronics orders.',
  }));
};

const generateDeals = (count: number): Deal[] => {
    const stages: Deal['stage'][] = ['New Lead', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won'];
    return Array.from({ length: count }).map((_, i) => ({
        id: `DEAL-${100 + i}`,
        name: `Deal #${i+1}`,
        companyName: `Company ${String.fromCharCode(65 + i)}`,
        value: Math.floor(Math.random() * 100000) + 10000,
        stage: stages[Math.floor(Math.random() * stages.length)],
        probability: Math.floor(Math.random() * 100),
        expectedCloseDate: '2023-12-15',
        owner: 'Demo User'
    }));
};

const generateCompanies = (count: number): Company[] => {
  const industries = ['Electronics', 'Agriculture', 'Textiles', 'Automotive', 'Energy', 'Chemicals'];
  const countries = ['USA', 'China', 'Germany', 'Japan', 'Vietnam', 'India'];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `COMP-${100 + i}`,
    name: `Global Partner ${i + 1} ${['Corp', 'Ltd', 'Inc', 'GmbH'].sort(() => 0.5 - Math.random())[0]}`,
    country: countries[Math.floor(Math.random() * countries.length)],
    industry: industries[Math.floor(Math.random() * industries.length)],
    tier: Math.random() > 0.8 ? 'Tier 1' : Math.random() > 0.5 ? 'Tier 2' : 'Tier 3',
    isVerified: Math.random() > 0.3,
    tradeVolume: `$${(Math.random() * 100 + 1).toFixed(1)}M`,
    employeeCount: '50-200',
    foundedYear: 2005,
    website: 'www.example.com',
    description: 'Premier importer of goods.',
    topProducts: ['Widgets', 'Gadgets'],
    riskScore: Math.floor(Math.random() * 100),
    contactPerson: 'Director of Purchasing',
    contactEmail: 'purchasing@example.com',
    contactPhone: '+1 555-0123'
  }));
};

// --- Initial Data Sets ---

export const mockLeads: Lead[] = generateLeads(50);
export const mockDeals: Deal[] = generateDeals(15);
export const mockCompanies: Company[] = generateCompanies(100);

export const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Q3 Electronics Outreach', type: 'Email', status: 'Active', targetCount: 1200, sentCount: 850, openRate: 42, responseRate: 12, lastRun: '2 hours ago' },
  { id: '2', name: 'Cold Call - Textile Buyers', type: 'Call', status: 'Completed', targetCount: 200, sentCount: 200, responseRate: 8, lastRun: 'Yesterday' },
  { id: '3', name: 'WhatsApp Promo - Brazil', type: 'WhatsApp', status: 'Active', targetCount: 500, sentCount: 120, openRate: 85, responseRate: 25, lastRun: '30 mins ago' },
];

export const mockCallLogs: CallLog[] = [
  { id: '1', leadName: 'TechGlobal Inc', duration: '4m 32s', outcome: 'Connected', sentiment: 'Positive', timestamp: '10:30 AM', summary: 'Discussed pricing tiers, requested proposal.', recordingUrl: '#' },
  { id: '2', leadName: 'AgriCorp Ltd', duration: '0m 45s', outcome: 'Voicemail', sentiment: 'Neutral', timestamp: '11:15 AM', summary: 'Left voicemail regarding Q4 inventory.', recordingUrl: '#' },
  { id: '3', leadName: 'Vertex Systems', duration: '12m 10s', outcome: 'Connected', sentiment: 'Positive', timestamp: '01:45 PM', summary: 'Negotiated contract terms. Agreed to send draft.', recordingUrl: '#' },
  { id: '4', leadName: 'Apex Logistics', duration: '1m 20s', outcome: 'Busy', sentiment: 'Neutral', timestamp: '02:30 PM', summary: 'Line busy, scheduled callback.', recordingUrl: '#' },
];

export const mockWhatsappTemplates: WhatsappTemplate[] = [
    { id: '1', name: 'Intro Offer', content: 'Hi {{name}}, are you interested in our new catalog?', category: 'Marketing', status: 'Approved' },
    { id: '2', name: 'Order Update', content: 'Your shipment {{id}} has departed.', category: 'Utility', status: 'Approved' },
    { id: '3', name: 'Meeting Reminder', content: 'Hi {{name}}, gentle reminder about our call scheduled for {{time}}.', category: 'Utility', status: 'Pending' },
    { id: '4', name: 'Seasonal Discount', content: 'Hi {{name}}, get 20% off on all bulk orders this month. Reply YES to claim.', category: 'Marketing', status: 'Approved' },
    { id: '5', name: 'Company Update', content: 'Hi {{name}}, we have an important update regarding our terms of service.', category: 'Utility', status: 'Approved' },
];

export const mockEmailTemplates: EmailTemplate[] = [
    { id: '1', name: 'Cold Intro', subject: 'Partnership Opportunity', body: 'Hi {{Name}}, I saw your company is active in...', category: 'Intro', lastUsed: '2 days ago' },
    { id: '2', name: 'Follow Up', subject: 'Checking in', body: 'Hi {{Name}}, just bumping this to the top of your inbox...', category: 'Follow-up', lastUsed: '1 week ago' },
];

// --- Trade Data Mocks ---

export const mockShipments: Shipment[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `SHP-${1000+i}`,
  date: '2023-10-24',
  productDesc: 'Cotton T-Shirts',
  hsCode: '6109.10',
  importer: 'Global Retail Inc',
  exporter: 'Textile World Ltd',
  originCountry: 'Vietnam',
  destCountry: 'USA',
  quantity: 5000,
  unit: 'Pcs',
  valueUSD: 12500,
  port: 'Los Angeles'
}));

export const mockHsCodes: HsCode[] = [
  { code: '0901.21', description: 'Coffee, roasted: Not decaffeinated', dutyRate: '0%' },
  { code: '8542.31', description: 'Electronic integrated circuits: Processors and controllers', dutyRate: '0%' },
  { code: '6109.10', description: 'T-shirts, singlets and other vests, knitted or crocheted, of cotton', dutyRate: '16.5%' },
];

export const mockHsTree: HsNode[] = [
  {
    code: '09',
    label: 'Coffee, Tea, Maté and Spices',
    level: 'Chapter',
    children: [
      {
        code: '0901',
        label: 'Coffee, whether or not roasted or decaffeinated; coffee husks and skins; coffee substitutes containing coffee in any proportion',
        level: 'Heading',
        children: [
          {
            code: '0901.11',
            label: 'Coffee, not roasted: Not decaffeinated',
            level: 'Subheading',
            dutyRates: [
              { country: 'USA', rate: 'Free' },
              { country: 'China', rate: '8%' },
              { country: 'EU', rate: 'Free' }
            ],
            relatedProducts: ['Arabica Beans', 'Robusta Beans', 'Green Coffee']
          },
          {
            code: '0901.12',
            label: 'Coffee, not roasted: Decaffeinated',
            level: 'Subheading',
            dutyRates: [
              { country: 'USA', rate: 'Free' },
              { country: 'China', rate: '8%' }
            ],
            relatedProducts: ['Decaf Green Beans']
          },
          {
            code: '0901.21',
            label: 'Coffee, roasted: Not decaffeinated',
            level: 'Subheading',
            dutyRates: [
              { country: 'USA', rate: 'Free' },
              { country: 'China', rate: '15%' }
            ],
            relatedProducts: ['Espresso Roast', 'Whole Bean Coffee']
          }
        ]
      },
      {
        code: '0902',
        label: 'Tea, whether or not flavored',
        level: 'Heading',
        children: [
          {
            code: '0902.10',
            label: 'Green tea (not fermented) in immediate packings of a content not exceeding 3 kg',
            level: 'Subheading',
            dutyRates: [
              { country: 'USA', rate: 'Free' },
              { country: 'UK', rate: '2%' }
            ],
            relatedProducts: ['Matcha', 'Sencha', 'Tea Bags']
          }
        ]
      }
    ]
  },
  {
    code: '85',
    label: 'Electrical machinery and equipment and parts thereof; sound recorders and reproducers, television image and sound recorders and reproducers, and parts and accessories of such articles',
    level: 'Chapter',
    children: [
      {
        code: '8517',
        label: 'Telephone sets, including telephones for cellular networks or for other wireless networks; other apparatus for the transmission or reception of voice, images or other data',
        level: 'Heading',
        children: [
          {
            code: '8517.13',
            label: 'Smartphones',
            level: 'Subheading',
            dutyRates: [
              { country: 'USA', rate: 'Free', note: 'Trade war tariffs may apply' },
              { country: 'India', rate: '20%' },
              { country: 'EU', rate: 'Free' }
            ],
            relatedProducts: ['iPhone', 'Android Devices', 'Mobile Handsets']
          }
        ]
      },
      {
        code: '8542',
        label: 'Electronic integrated circuits',
        level: 'Heading',
        children: [
          {
            code: '8542.31',
            label: 'Processors and controllers',
            level: 'Subheading',
            dutyRates: [
              { country: 'Global', rate: 'Free (ITA)' }
            ],
            relatedProducts: ['CPU', 'Microcontrollers', 'SoC']
          }
        ]
      }
    ]
  }
];

export const mockCountryStats: CountryStats[] = [
  { country: 'China', riskLevel: 'Medium', gdp: '$17.7T', tradeBalance: '+$676B', topExport: 'Electronics' },
  { country: 'USA', riskLevel: 'Low', gdp: '$23.3T', tradeBalance: '-$948B', topExport: 'Refined Petroleum' },
  { country: 'Germany', riskLevel: 'Low', gdp: '$4.2T', tradeBalance: '+$200B', topExport: 'Cars' },
  { country: 'Vietnam', riskLevel: 'Medium', gdp: '$366B', tradeBalance: '+$4B', topExport: 'Broadcasting Equipment' },
  { country: 'India', riskLevel: 'Medium', gdp: '$3.1T', tradeBalance: '-$100B', topExport: 'Petroleum Products' },
  { country: 'Brazil', riskLevel: 'Medium', gdp: '$1.6T', tradeBalance: '+$60B', topExport: 'Soybeans' },
  { country: 'Japan', riskLevel: 'Low', gdp: '$4.9T', tradeBalance: '+$20B', topExport: 'Motor Vehicles' },
  { country: 'UK', riskLevel: 'Low', gdp: '$3.1T', tradeBalance: '-$180B', topExport: 'Machinery' },
];

export const searchResults: SearchResultItem[] = [
    { id: '101', title: 'Global Electronics Ltd', type: ResultType.Company, summary: 'Leading exporter of consumer electronics.', country: 'China', timestamp: 'Verified 2d ago' },
    { id: 'SHP-999', title: 'Shipment: 50k LED Panels', type: ResultType.Shipment, summary: 'Large shipment from Shenzhen to Rotterdam.', country: 'Netherlands', timestamp: '2023-10-20' },
    { id: '102', title: 'Coffee Beans - Arabica', type: ResultType.Product, summary: 'HS Code 0901.11 - High demand in EU.', country: 'Brazil', timestamp: 'Trending' },
];


// --- Dashboard KPIs ---

export const kpiData: KpiData[] = [
  { title: 'Total Leads', value: '1,248', change: '+12% this week' },
  { title: 'Calls Made', value: '342', change: '+5% today' },
  { title: 'Emails Sent', value: '8,450', change: '+1.2k this week' },
  { title: 'Deals Closed', value: '$142k', change: '+18% vs last month' },
];

// --- Activity Feed ---

export const activityData: ActivityItem[] = [
  { id: '1', description: 'AI Agent called TechGlobal (Positive)', timestamp: '10 mins ago', status: ActivityStatus.Completed },
  { id: '2', description: 'Email Campaign "Q3 Outreach" sent 500 emails', timestamp: '1 hour ago', status: ActivityStatus.Completed },
  { id: '3', description: 'New Lead: Oceanic Traders added from Database', timestamp: '2 hours ago', status: ActivityStatus.Flagged },
  { id: '4', description: 'Follow-up task: Call Vertex Systems', timestamp: '4 hours ago', status: ActivityStatus.Pending },
];

export const companyProfileData: CompanyProfile = {
  ...mockCompanies[0],
  kpis: kpiData,
  recentActivity: []
};
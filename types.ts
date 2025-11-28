

export interface KpiData {
  title: string;
  value: string;
  change: string;
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export enum ActivityStatus {
  Completed = 'Completed',
  Pending = 'Pending',
  Flagged = 'Flagged'
}

export interface ActivityItem {
  id: string;
  description: string;
  timestamp: string;
  status: ActivityStatus;
}

// --- Sales & CRM Types ---

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Negotiating' | 'Closed' | 'Lost';
export type DealStage = 'New Lead' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  title: string;
  email: string;
  phone: string;
  country: string;
  status: LeadStatus;
  value: number;
  lastContact: string;
  notes: string;
}

export interface Deal {
  id: string;
  name: string;
  companyName: string;
  value: number;
  stage: DealStage;
  probability: number; // 0-100
  expectedCloseDate: string;
  owner: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'Call' | 'WhatsApp' | 'SMS';
  status: 'Active' | 'Paused' | 'Completed' | 'Draft';
  targetCount: number;
  sentCount: number;
  openRate?: number; // percentage
  responseRate: number; // percentage
  lastRun: string;
}

export interface CallLog {
  id: string;
  leadName: string;
  duration: string;
  outcome: 'Connected' | 'Voicemail' | 'Wrong Number' | 'Busy';
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  timestamp: string;
  summary: string;
  recordingUrl?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'Intro' | 'Follow-up' | 'Proposal' | 'Closing';
  lastUsed: string;
}

export interface WhatsappTemplate {
  id: string;
  name: string;
  content: string;
  category: 'Marketing' | 'Utility' | 'Authentication';
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface SmsTemplate {
    id: string;
    name: string;
    content: string;
    chars: number;
    category: 'Promo' | 'Reminder' | 'Alert';
}

// --- Calendar ---
export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    type: 'Call' | 'Meeting' | 'Email' | 'Deadline';
    description?: string;
    attendees?: string[];
}

// --- Saved Searches ---
export interface SavedSearch {
    id: string;
    name: string;
    query: string;
    filters: Record<string, any>;
    dateCreated: string;
    alertEnabled: boolean;
    alertFrequency: 'Daily' | 'Weekly' | 'Instant';
}

// --- Company Data (Enhanced for Sales) ---

export interface Company {
  id: string;
  name: string;
  country: string;
  industry: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  isVerified: boolean;
  tradeVolume: string;
  employeeCount: string;
  foundedYear: number;
  website: string;
  description: string;
  topProducts: string[];
  riskScore: number;
  // Sales specific fields
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface CompanyProfile extends Company {
  kpis: KpiData[];
  recentActivity: {
    id: string;
    description: string;
    date: string;
    value: string;
  }[];
}

// --- System Workspace Profile ---
export interface CompetitorData {
  id: string;
  name: string;
  share: number; // Percentage
  value: string;
  type: 'Direct' | 'Other';
}

// --- Auth & User ---

export type UserRole = 'admin' | 'premium' | 'standard' | 'free';

export interface OnboardingData {
  role: string;
  industry: string;
  businessLine: string;
  targetCountries: string[];
  primaryGoal: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  avatarUrl?: string;
  permissions?: string[];
  onboardingData?: OnboardingData;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type AuthProviderType = 'google' | 'linkedin' | 'sso' | 'email';

// --- Search ---

export enum ResultType {
  Company = 'Company',
  Shipment = 'Shipment',
  Product = 'Product'
}

export interface SearchResultItem {
  id: string;
  title: string;
  type: ResultType;
  summary: string;
  country: string;
  timestamp: string;
}

// --- Trade Data ---

export interface Shipment {
  id: string;
  date: string;
  productDesc: string;
  hsCode: string;
  importer: string;
  exporter: string;
  originCountry: string;
  destCountry: string;
  quantity: number;
  unit: string;
  valueUSD: number;
  port: string;
}

export interface HsCode {
  code: string;
  description: string;
  dutyRate: string;
}

// Hierarchical HS Code Structure
export interface HsNode {
  code: string;
  label: string;
  level: 'Chapter' | 'Heading' | 'Subheading';
  children?: HsNode[];
  dutyRates?: { country: string; rate: string; note?: string }[];
  relatedProducts?: string[];
}

export interface CountryStats {
  country: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  gdp: string;
  tradeBalance: string;
  topExport: string;
}

// --- Notifications ---

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number; // ms
}

// --- Reports ---

export interface SavedReport {
    id: string;
    name: string;
    type: string;
    dateCreated: string;
    format: 'PDF' | 'CSV' | 'XLSX';
    size: string;
}
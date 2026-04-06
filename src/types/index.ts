export interface Spec {
  label: string;
  value: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  galleryImages: string[];
  specs: Spec[];
  features: string[];
  markets: Market[];
  certifications: string[];
  leadTime: string;
  moq: string;
}

export type Market = 'canada' | 'africa' | 'mideast';

export interface MarketInfo {
  id: Market;
  name: string;
  color: string;
  countries: string[];
  description: string;
  logistics: string;
  ports: string;
  languages: string[];
  popularProducts: string[];
  whatsappMessage: string;
  flagEmoji: string;
}

export interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  categories: string[];
  description: string;
  quantity: string;
  timeline: string;
  referral: string;
}

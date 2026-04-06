import { Country, CountryCode } from '@/types';

export const countries: Record<CountryCode, Country> = {
  NG: {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    currency: 'NGN',
    currencySymbol: '₦',
    locale: 'en-NG',
    phone: '+234 800 000 0000',
    email: 'nigeria@smrtq.com',

    // legacy (kept for backward compat)
    heroSubline: 'End power outages for good. Stop spending on generator fuel — smrtQ pays for itself in under 4 months. Available now across Nigeria.',

    heroHeadlineLine1: 'POWER WITHOUT',
    heroHeadlineLine2: 'LIMITS',
    heroSubheading:
      'End power outages for good. Stop spending on generator fuel — smrtQ pays for itself in under 4 months. Available now across Nigeria.',
    heroBadgeText: '🇳🇬 Trusted by 10,000+ Nigerians',

    statsBar: [
      { display: '10,000+', label: 'Customers Powered' },
      { display: '₦80k/mo', label: 'Avg. Fuel Saved' },
      { display: '4 Months', label: 'Avg. Payback' },
      { display: '5-Year', label: 'Warranty' },
    ],

    useCases: [
      {
        body: 'No more blackouts. Keep your lights, fans, TV, AC, and fridge running around the clock — quietly, safely, and without spending on fuel. Silent and emission-free indoors.',
      },
      {
        body: "Don't lose sales to NEPA cuts. Protect your POS, fridges, computers, and CCTV from costly downtime. Stay open while competitors go dark.",
      },
      {
        body: 'From beach picnics to farm sites — reliable, clean power wherever you go. No jerry cans. No noise.',
      },
      {
        body: 'Keep laptops, routers, power tools, and comms running on remote sites, farms, and oil fields across Nigeria.',
      },
    ],

    featuresSubheading: "Every detail engineered to outlast Nigeria's toughest power conditions.",

    ctaHeadline: 'READY TO DITCH THE GENERATOR?',
    ctaSubtext:
      'Join 10,000+ Nigerian homes and businesses already running on smrtQ. Delivered across Lagos, Abuja, Port Harcourt & more.',
  },

  AE: {
    code: 'AE',
    name: 'UAE',
    flag: '🇦🇪',
    currency: 'AED',
    currencySymbol: 'AED',
    locale: 'en-AE',
    phone: '+971 800 000 0000',
    email: 'uae@smrtq.com',

    heroSubline:
      'From desert camps to rooftop gatherings — smrtQ keeps you powered anywhere in the UAE. Silent, smart, and built for the Gulf sun.',

    heroHeadlineLine1: 'POWER YOUR',
    heroHeadlineLine2: 'ADVENTURE',
    heroSubheading:
      'From desert camps to rooftop gatherings — smrtQ keeps you powered anywhere in the UAE. Silent, smart, and built for the Gulf sun.',
    heroBadgeText: '🇦🇪 Now available across UAE',

    statsBar: [
      { display: '10,000+', label: 'Customers Powered' },
      { display: '5-Year', label: 'Warranty Guarantee' },
      { display: '99.8%', label: 'Uptime Rate' },
      { display: '24/7', label: 'Customer Support' },
    ],

    useCases: [
      {
        body: 'Protect your home during peak-summer outages. Keep your AC, smart devices, and appliances running without interruption — silent and safe indoors.',
      },
      {
        body: 'Safeguard your café, salon, or retail space from outages. Protect your POS, fridges, and lighting for seamless customer experiences.',
      },
      {
        body: 'Power your Hatta camp, desert retreat, or beach setup. Run portable ACs, camp kitchens, speakers, and lights — 2 full days on a single charge.',
      },
      {
        body: 'Power tools, laptops, drones, and comms gear on remote UAE construction and field sites. Industrial grade, portable design.',
      },
    ],

    featuresSubheading: "Premium engineering for the UAE's demanding climate and lifestyle.",

    ctaHeadline: 'POWER MEETS LIFESTYLE.',
    ctaSubtext:
      "Join thousands of UAE residents who've made the switch to clean, silent power. Fast delivery across Dubai, Abu Dhabi, Sharjah & beyond.",
  },

  SA: {
    code: 'SA',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    currency: 'SAR',
    currencySymbol: 'SAR',
    locale: 'en-SA',
    phone: '+966 800 000 0000',
    email: 'ksa@smrtq.com',

    heroSubline:
      "Reliable backup power for Saudi homes, farms, and businesses. Solar-ready, whisper-quiet, and built for the Kingdom's climate.",

    heroHeadlineLine1: 'CLEAN POWER.',
    heroHeadlineLine2: 'YOUR WAY.',
    heroSubheading:
      "Reliable backup power for Saudi homes, farms, and businesses. Solar-ready, whisper-quiet, and built for the Kingdom's climate.",
    heroBadgeText: '🇸🇦 Vision 2030 Aligned · Solar Ready',

    statsBar: [
      { display: '10,000+', label: 'Customers Powered' },
      { display: '5-Year', label: 'Warranty Guarantee' },
      { display: '2000W', label: 'Max Solar Input' },
      { display: '24/7', label: 'Customer Support' },
    ],

    useCases: [
      {
        body: 'Keep your family safe and comfortable during power interruptions. Run your AC, lighting, and appliances — silently and without fumes — inside your home.',
      },
      {
        body: 'Protect your business from outage losses. Reliable power for restaurants, clinics, retail stores, and offices across the Kingdom.',
      },
      {
        body: 'Perfect for desert chalets, farm retreats, and mountain camps. Power air coolers, lights, camp kitchens, and entertainment — anywhere in Saudi Arabia.',
      },
      {
        body: "Power your agricultural pumps, remote field offices, and construction equipment. Built for the demands of Saudi farms, oil fields, and outdoor worksites.",
      },
    ],

    featuresSubheading:
      "Engineered for Saudi Arabia's extreme heat, solar abundance, and Vision 2030 energy ambitions.",

    ctaHeadline: 'ENERGY INDEPENDENCE STARTS HERE.',
    ctaSubtext:
      'Join thousands of Saudi households and businesses choosing clean, solar-powered backup energy. Delivered across Riyadh, Jeddah, Dammam & beyond.',
  },
};

export const countryList: Country[] = [countries.NG, countries.SA, countries.AE];

export const DEFAULT_COUNTRY: CountryCode = 'NG';

export function formatPrice(price: number, countryCode: CountryCode): string {
  const country = countries[countryCode];
  if (countryCode === 'NG') {
    return `₦${price.toLocaleString('en-NG')}`;
  }
  return `${country.currencySymbol} ${price.toLocaleString('en-US')}`;
}

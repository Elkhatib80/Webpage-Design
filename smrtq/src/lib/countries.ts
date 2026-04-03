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
    heroSubline: 'End power outages for good. Reliable backup power for your home, office, and business — available now in Nigeria.',
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
    heroSubline: 'Power your adventures. From desert camping to rooftop gatherings — smrtQ keeps you charged anywhere in the UAE.',
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
    heroSubline: 'Engineered for the Kingdom. Dependable power for Vision 2030 lifestyles — outdoor, travel, and beyond.',
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

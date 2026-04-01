'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CountryCode } from '@/types';
import { DEFAULT_COUNTRY } from '@/lib/countries';

interface CountryContextType {
  countryCode: CountryCode;
  setCountryCode: (code: CountryCode) => void;
}

const CountryContext = createContext<CountryContextType>({
  countryCode: DEFAULT_COUNTRY,
  setCountryCode: () => {},
});

export function CountryProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryCodeState] = useState<CountryCode>(DEFAULT_COUNTRY);

  useEffect(() => {
    const saved = localStorage.getItem('smrtq_country') as CountryCode;
    if (saved && ['NG', 'AE', 'SA'].includes(saved)) {
      setCountryCodeState(saved);
    }
  }, []);

  const setCountryCode = (code: CountryCode) => {
    setCountryCodeState(code);
    localStorage.setItem('smrtq_country', code);
  };

  return (
    <CountryContext.Provider value={{ countryCode, setCountryCode }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}

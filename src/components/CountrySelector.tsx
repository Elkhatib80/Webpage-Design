'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCountry } from '@/lib/contexts/CountryContext';
import { countries, countryList } from '@/lib/countries';
import { CountryCode } from '@/types';

export default function CountrySelector() {
  const { countryCode, setCountryCode } = useCountry();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = countries[countryCode];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const select = (code: CountryCode) => {
    setCountryCode(code);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:border-yellow/50 bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer"
        aria-label="Select your country"
        aria-expanded={open}
      >
        <span className="text-lg leading-none">{current.flag}</span>
        <span className="text-sm font-medium text-white hidden sm:block">{current.name}</span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-48 rounded-xl border border-white/10 bg-dark-2 shadow-2xl z-50 overflow-hidden">
          {countryList.map((c) => (
            <button
              key={c.code}
              onClick={() => select(c.code as CountryCode)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 cursor-pointer ${
                c.code === countryCode
                  ? 'bg-yellow/10 text-yellow'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <span className="font-medium">{c.name}</span>
              <span className="ml-auto text-xs text-gray-500">{c.currencySymbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

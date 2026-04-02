'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useReveal } from '@/lib/hooks/useReveal';
import { useCountry } from '@/lib/contexts/CountryContext';
import { formatPrice } from '@/lib/countries';
import { products } from '@/lib/products';

const rows: Array<{ label: string; key: keyof typeof products[0] | 'price' | 'cycles' | 'chargeTime' | 'solarIn' | 'ports' }> = [
  { label: 'Capacity',       key: 'capacity'  },
  { label: 'AC Output',      key: 'wattage'   },
  { label: 'Charge Time',    key: 'chargeTime' },
  { label: 'Solar Input',    key: 'solarIn'   },
  { label: 'Total Ports',    key: 'ports'     },
  { label: 'Battery Cycles', key: 'cycles'    },
  { label: 'Price',          key: 'price'     },
];

// Extra metadata not in the Product type — sourced from products.json
const meta: Record<string, { chargeTime: string; solarIn: string; ports: string; cycles: string }> = {
  'q-08': { chargeTime: '1.5 hrs', solarIn: '200W', ports: '8', cycles: '4,000+' },
  'q-12': { chargeTime: '1.2 hrs', solarIn: '200W', ports: '8', cycles: '3,500+' },
  'q-24': { chargeTime: '1.8 hrs', solarIn: '500W', ports: '13', cycles: '4,000+' },
  'q-36': { chargeTime: '3 hrs',   solarIn: '2000W', ports: '15', cycles: '4,000+' },
};

export default function ComparisonTable() {
  const { ref, inView } = useReveal();
  const { countryCode } = useCountry();

  return (
    <section
      className="py-24 bg-black"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className="text-center mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Full Lineup</p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            COMPARE ALL MODELS
          </h2>
          <p className="text-gray-400 mt-3 max-w-lg mx-auto">
            All units: LiFePO₄ · Pure Sine Wave · UPS &lt;10ms · BMS · Fireproof Shell
          </p>
        </div>

        {/* Table wrapper */}
        <div
          className="overflow-x-auto rounded-2xl border border-white/10"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s ease 0.2s',
          }}
        >
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-dark-2">
                <th className="text-left px-5 py-4 text-gray-500 font-semibold w-36">Model</th>
                {products.map((p, i) => (
                  <th key={p.id} className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      {p.badge && (
                        <span className="text-xs px-2 py-0.5 bg-yellow text-black font-bold rounded-full">
                          {p.badge}
                        </span>
                      )}
                      <span
                        className={`font-black text-base ${i === 3 ? 'text-yellow' : 'text-white'}`}
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {p.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={row.label}
                  className={ri % 2 === 0 ? 'bg-surface' : 'bg-dark-2'}
                >
                  <td className="px-5 py-3.5 text-gray-400 font-medium whitespace-nowrap">{row.label}</td>
                  {products.map((p, pi) => {
                    let value: string;
                    if (row.key === 'price') {
                      value = formatPrice(p.price[countryCode], countryCode);
                    } else if (row.key === 'chargeTime' || row.key === 'solarIn' || row.key === 'ports' || row.key === 'cycles') {
                      value = meta[p.id]?.[row.key] ?? '—';
                    } else {
                      value = String(p[row.key as keyof typeof p] ?? '—');
                    }

                    return (
                      <td
                        key={p.id}
                        className={`px-4 py-3.5 text-center font-semibold ${
                          pi === 3
                            ? 'text-yellow'
                            : row.key === 'price'
                            ? 'text-white'
                            : 'text-gray-200'
                        }`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Shared features row */}
              <tr className="bg-surface">
                <td className="px-5 py-3.5 text-gray-400 font-medium">Included</td>
                {products.map((p) => (
                  <td key={p.id} className="px-4 py-3.5">
                    <div className="flex flex-col items-center gap-1 text-xs text-gray-400">
                      {['LFP Battery', 'Pure Sine', 'UPS', 'BMS', 'LED Light'].map((f) => (
                        <div key={f} className="flex items-center gap-1">
                          <CheckCircle size={11} className="text-yellow" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              {/* CTA row */}
              <tr className="bg-dark-3">
                <td className="px-5 py-4" />
                {products.map((p, pi) => (
                  <td key={p.id} className="px-4 py-4 text-center">
                    <Link
                      href={`/products/${p.slug}`}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                        pi === 3
                          ? 'btn-primary'
                          : 'border border-white/20 text-gray-300 hover:border-yellow/50 hover:text-yellow'
                      }`}
                    >
                      View <ArrowRight size={12} />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

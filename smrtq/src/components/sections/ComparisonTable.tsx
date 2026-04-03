'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCountry } from '@/lib/contexts/CountryContext';
import { formatPrice } from '@/lib/countries';
import { products } from '@/lib/products';

type RowKey = 'capacity' | 'wattage' | 'chargeTime' | 'solarIn' | 'ports' | 'cycles' | 'price';

const rows: Array<{ label: string; key: RowKey }> = [
  { label: 'Capacity',       key: 'capacity'   },
  { label: 'AC Output',      key: 'wattage'    },
  { label: 'Charge Time',    key: 'chargeTime' },
  { label: 'Solar Input',    key: 'solarIn'    },
  { label: 'Total Ports',    key: 'ports'      },
  { label: 'Battery Cycles', key: 'cycles'     },
  { label: 'Price',          key: 'price'      },
];

const SHARED_FEATURES = ['LFP Battery', 'Pure Sine', 'UPS', 'BMS', 'LED Light'] as const;

export default function ComparisonTable() {
  const { countryCode } = useCountry();

  const staticCells = useMemo(
    () =>
      products.map((p) => ({
        capacity:   p.capacity  ?? '—',
        wattage:    p.wattage   ?? '—',
        chargeTime: p.compareData?.chargeTime ?? '—',
        solarIn:    p.compareData?.solarIn    ?? '—',
        ports:      p.compareData?.ports      ?? '—',
        cycles:     p.compareData?.cycles     ?? '—',
      })),
    []
  );

  return (
    <section className="py-24 bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Full Lineup</p>
          <h2
            className="text-4xl sm:text-5xl font-black text-gray-900"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            COMPARE ALL MODELS
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            All units: LiFePO₄ · Pure Sine Wave · UPS &lt;10ms · BMS · Fireproof Shell
          </p>
        </motion.div>

        <motion.div
          className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-4 text-gray-400 font-semibold w-36">Model</th>
                {products.map((p) => (
                  <th key={p.id} className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      {p.badge && (
                        <span className="text-xs px-2 py-0.5 bg-yellow text-black font-bold rounded-full">
                          {p.badge}
                        </span>
                      )}
                      <span
                        className={`font-black text-base ${p.isFlagship ? 'text-yellow' : 'text-gray-900'}`}
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
                <tr key={row.label} className={`border-b border-gray-100 ${ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-5 py-3.5 text-gray-500 font-medium whitespace-nowrap">{row.label}</td>
                  {products.map((p, pi) => {
                    const value =
                      row.key === 'price'
                        ? formatPrice(p.price[countryCode], countryCode)
                        : staticCells[pi][row.key];
                    return (
                      <td
                        key={p.id}
                        className={`px-4 py-3.5 text-center font-semibold ${
                          p.isFlagship ? 'text-yellow' : row.key === 'price' ? 'text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="border-b border-gray-100 bg-white">
                <td className="px-5 py-3.5 text-gray-500 font-medium">Included</td>
                {products.map((p) => (
                  <td key={p.id} className="px-4 py-3.5">
                    <div className="flex flex-col items-center gap-1 text-xs text-gray-500">
                      {SHARED_FEATURES.map((f) => (
                        <div key={f} className="flex items-center gap-1">
                          <CheckCircle size={11} className="text-yellow" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-5 py-4" />
                {products.map((p) => (
                  <td key={p.id} className="px-4 py-4 text-center">
                    <Link
                      href={`/products/${p.slug}`}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                        p.isFlagship
                          ? 'btn-primary'
                          : 'border border-gray-300 text-gray-600 hover:border-yellow/60 hover:text-yellow'
                      }`}
                    >
                      View <ArrowRight size={12} />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

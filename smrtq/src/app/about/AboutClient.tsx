'use client';

import Link from 'next/link';
import { ArrowRight, Target, Globe, Lightbulb, Users } from 'lucide-react';

const milestones = [
  { year: '2020', event: 'smrtQ Solutions founded in Lagos, Nigeria with a mission to end generator dependency.' },
  { year: '2021', event: 'First product line launched — 500Wh and 1,000Wh power stations for the Nigerian market.' },
  { year: '2022', event: 'Expanded to the UAE and Saudi Arabia. Surpassed 2,000 units sold.' },
  { year: '2023', event: 'Launched proprietary smrtQ App with real-time monitoring and smart charging.' },
  { year: '2024', event: 'Ultra 2000 flagship launched. Hit 10,000+ customers across 3 countries.' },
  { year: '2025', event: 'Solar panel range expanded. Dealer network growing across West Africa and GCC.' },
];

const values = [
  {
    icon: Target,
    title: 'Mission First',
    desc: 'We exist to solve a real problem — unreliable power — with clean, dependable technology.',
  },
  {
    icon: Lightbulb,
    title: 'Smart Innovation',
    desc: 'We constantly improve our tech, from battery chemistry to app intelligence.',
  },
  {
    icon: Globe,
    title: 'Local Roots',
    desc: 'We understand the power challenges of Nigeria, UAE, and Saudi Arabia because we live them.',
  },
  {
    icon: Users,
    title: 'Customer Obsessed',
    desc: '5-year warranty and 24/7 local support is not a perk — it is our baseline commitment.',
  },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero */}
      <div className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(245,197,24,0.1) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,197,24,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-4">Our Story</p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            BORN FROM<br />
            <span className="gradient-text">BLACKOUTS</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            smrtQ Solutions started because our founders were fed up. Fed up with generator fumes, fuel queues, and the noise of a problem that technology had already solved — just not for our region.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-4">Our Mission</p>
            <h2
              className="text-4xl sm:text-5xl font-black text-white mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              CLEAN POWER FOR EVERY HOME AND BUSINESS
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We believe access to reliable, clean power is a right — not a privilege. Every product we build is designed to replace the generator: cleaner, quieter, smarter, and cheaper in the long run.
            </p>
            <p className="text-gray-300 leading-relaxed">
              From a Lagos apartment surviving daily blackouts, to a Riyadh chalet off the grid, to a Dubai glamping site in the desert — smrtQ powers real lives with real technology.
            </p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { value: '10,000+', label: 'Customers' },
              { value: '3', label: 'Countries' },
              { value: '5yr', label: 'Warranty' },
              { value: '4.9★', label: 'Avg Rating' },
            ].map((s) => (
              <div key={s.label} className="p-8 rounded-2xl border border-white/5 bg-dark-2 text-center">
                <div
                  className="text-4xl font-black gradient-text mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {s.value}
                </div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">What We Stand For</p>
            <h2
              className="text-4xl font-black text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              OUR VALUES
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl border border-white/5 bg-dark-2 text-center">
                <div className="w-12 h-12 rounded-xl bg-yellow/10 border border-yellow/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-yellow" />
                </div>
                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Our Journey</p>
            <h2
              className="text-4xl font-black text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              MILESTONES
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-yellow/20" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-6">
                  <div className="w-14 flex-shrink-0 text-right">
                    <span className="text-yellow font-black text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      {m.year}
                    </span>
                  </div>
                  {/* Dot */}
                  <div className="relative flex-shrink-0 w-8 flex items-start justify-center mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-yellow border-2 border-black" />
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-gray-300 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-black border-t border-white/5 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl font-black text-white mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            READY TO JOIN THE MOVEMENT?
          </h2>
          <p className="text-gray-400 mb-8">Start your journey to clean, reliable power today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold">
              Shop Products <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-outline flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

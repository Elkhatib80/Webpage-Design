'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { useCountry } from '@/lib/contexts/CountryContext';
import { countries, countryList } from '@/lib/countries';

const officeInfo = {
  NG: {
    address: 'Victoria Island, Lagos, Nigeria',
    hours: 'Mon – Sat: 8:00 AM – 6:00 PM WAT',
  },
  AE: {
    address: 'Business Bay, Dubai, UAE',
    hours: 'Mon – Fri: 9:00 AM – 6:00 PM GST',
  },
  SA: {
    address: 'Al Olaya District, Riyadh, Saudi Arabia',
    hours: 'Sun – Thu: 9:00 AM – 5:00 PM AST',
  },
};

export default function ContactClient() {
  const { countryCode } = useCountry();
  const country = countries[countryCode];
  const office = officeInfo[countryCode];

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero */}
      <div className="relative py-24 bg-surface border-b border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,197,24,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Get in Touch</p>
          <h1
            className="text-5xl sm:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            WE&apos;RE HERE TO HELP
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Our local team in {country.name} is ready to assist — whether you need product advice, support, or dealer information.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact info */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2
              className="text-2xl font-black text-white mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {country.flag} {country.name} Office
            </h2>
            <div className="space-y-4">
              {[
                { icon: Mail, text: country.email, href: `mailto:${country.email}` },
                { icon: Phone, text: country.phone, href: `tel:${country.phone.replace(/\s/g, '')}` },
                { icon: MapPin, text: office.address, href: '#' },
                { icon: Clock, text: office.hours, href: undefined },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-yellow/10 border border-yellow/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-yellow" />
                  </div>
                  {href ? (
                    <a href={href} className="text-sm text-gray-300 hover:text-yellow transition-colors mt-2">
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-300 mt-2">{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Other countries */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Other Regions</h3>
            <div className="space-y-3">
              {countryList
                .filter((c) => c.code !== countryCode)
                .map((c) => (
                  <div key={c.code} className="p-4 rounded-xl border border-white/5 bg-dark-2">
                    <p className="text-sm font-semibold text-white mb-1">
                      {c.flag} {c.name}
                    </p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                    <p className="text-xs text-gray-500">{c.phone}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-2">
          <div className="p-8 rounded-3xl border border-white/5 bg-surface">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3
                  className="text-2xl font-black text-white mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Message Sent!
                </h3>
                <p className="text-gray-400">
                  Thank you for reaching out. Our {country.name} team will respond within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="mt-6 text-yellow text-sm hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <MessageSquare size={22} className="text-yellow" />
                  <h2
                    className="text-2xl font-black text-white"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    SEND US A MESSAGE
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Full Name <span className="text-yellow">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl bg-dark-2 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email Address <span className="text-yellow">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-dark-2 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={country.phone}
                      className="w-full px-4 py-3 rounded-xl bg-dark-2 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                      Subject <span className="text-yellow">*</span>
                    </label>
                    <select
                      id="subject"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-2 border border-white/10 text-white text-sm focus:outline-none focus:border-yellow/50 transition-colors cursor-pointer"
                    >
                      <option value="">Select a subject</option>
                      <option value="sales">Sales Enquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="warranty">Warranty Claim</option>
                      <option value="dealer">Become a Dealer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                      Message <span className="text-yellow">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 rounded-xl bg-dark-2 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow/50 transition-colors resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-4 rounded-xl font-bold text-base disabled:opacity-70"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      We typically respond within 24 hours on business days.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

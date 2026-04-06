'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCountry } from '@/lib/contexts/CountryContext';
import { countries, countryList } from '@/lib/countries';
import { analytics } from '@/lib/analytics';

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

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactClient() {
  const { countryCode } = useCountry();
  const country = countries[countryCode];
  const office = officeInfo[countryCode];
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    const body = `Name: ${data.name}\nPhone: ${data.phone || 'Not provided'}\n\n${data.message}`;
    const mailtoUrl = `mailto:${country.email}?subject=${encodeURIComponent(data.subject + ' — smrtQ Contact')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    analytics.quoteSubmitted(countryCode, data.subject);
    setSubmitted(true);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-gray-50 border text-gray-900 text-sm placeholder-gray-400 focus:outline-none transition-colors ${
      hasError ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-yellow/60'
    }`;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-16">
      {/* Hero */}
      <div className="relative py-24 bg-[#F7F6F2] border-b border-gray-200 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,166,35,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.8) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Get in Touch</p>
          <h1
            className="text-5xl sm:text-6xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            WE&apos;RE HERE TO HELP
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Our local team in {country.name} is ready to assist — whether you need product advice, support, or dealer information.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact info */}
        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <h2
              className="text-2xl font-black text-gray-900 mb-6"
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
                    <a href={href} className="text-sm text-gray-600 hover:text-yellow transition-colors mt-2">
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-600 mt-2">{text}</span>
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
                  <div key={c.code} className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      {c.flag} {c.name}
                    </p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                    <p className="text-xs text-gray-500">{c.phone}</p>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="p-8 rounded-3xl border border-gray-200 bg-white shadow-sm">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3
                  className="text-2xl font-black text-gray-900 mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Message Sent!
                </h3>
                <p className="text-gray-500">
                  Your email client has opened with your message. Our {country.name} team will respond within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); reset(); }}
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
                    className="text-2xl font-black text-gray-900"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    SEND US A MESSAGE
                  </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                      Full Name <span className="text-yellow">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      placeholder="Your full name"
                      className={inputClass(!!errors.name)}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                      Email Address <span className="text-yellow">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="you@example.com"
                      className={inputClass(!!errors.email)}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      placeholder={country.phone}
                      className={inputClass(false)}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-600 mb-2">
                      Subject <span className="text-yellow">*</span>
                    </label>
                    <select
                      id="subject"
                      {...register('subject')}
                      className={`${inputClass(!!errors.subject)} cursor-pointer`}
                    >
                      <option value="">Select a subject</option>
                      <option value="sales">Sales Enquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="warranty">Warranty Claim</option>
                      <option value="dealer">Become a Dealer</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-2">
                      Message <span className="text-yellow">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message')}
                      placeholder="Tell us how we can help you..."
                      className={`${inputClass(!!errors.message)} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-4 rounded-xl font-bold text-base disabled:opacity-70 cursor-pointer"
                      whileHover={isSubmitting ? {} : { scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isSubmitting ? 'Opening email...' : 'Send Message'}
                    </motion.button>
                    <p className="text-xs text-gray-400 mt-3 text-center">
                      We typically respond within 24 hours on business days.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

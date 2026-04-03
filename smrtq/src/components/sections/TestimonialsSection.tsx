'use client';

import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    name: 'Emeka Okafor',
    role: 'Small Business Owner',
    location: 'Lagos, Nigeria',
    flag: '🇳🇬',
    rating: 5,
    text: "Before smrtQ, I was spending ₦80,000 a month on generator fuel. Now I run my shop entirely on the Ultra 2000 with solar panels. It paid for itself in less than 4 months. Absolutely life-changing.",
  },
  {
    name: 'Khalid Al-Mansouri',
    role: 'Camping Enthusiast',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    rating: 5,
    text: "We take it to Hatta every weekend. Powers our camp kitchen, lights, portable AC, and a mini fridge for 2 days. The app is brilliant — I can see exactly how much power we have left in real time.",
  },
  {
    name: 'Sara Al-Harbi',
    role: 'Architect',
    location: 'Riyadh, Saudi Arabia',
    flag: '🇸🇦',
    rating: 5,
    text: "Purchased the Pro 1000 for our mountain chalet. It handles the air conditioning unit during the afternoon peak with ease. Silent, clean, and the 5-year warranty gave us real peace of mind.",
  },
  {
    name: 'Adaeze Ihejirika',
    role: 'Healthcare Worker',
    location: 'Abuja, Nigeria',
    flag: '🇳🇬',
    rating: 5,
    text: "I work from home and can't afford blackouts. The smrtQ Pro 1000 keeps my laptop, monitors, and internet router running all day. Customer service was outstanding too — very responsive.",
  },
  {
    name: 'Mohammed Al-Qahtani',
    role: 'Farmer',
    location: 'Tabuk, Saudi Arabia',
    flag: '🇸🇦',
    rating: 5,
    text: "Using two Ultra 2000 units with 400W solar panels to power our irrigation pumps and field office. Cut our diesel costs by 70%. The durability in our desert climate has been impressive.",
  },
  {
    name: 'Fatima Hassan',
    role: 'Restaurant Owner',
    location: 'Abu Dhabi, UAE',
    flag: '🇦🇪',
    rating: 5,
    text: "smrtQ keeps our outdoor dining area powered — lighting, fans, a sound system, and a blender. Completely silent so it doesn't disturb our guests. Couldn't recommend it more highly.",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
          <h2
            className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            REAL PEOPLE. REAL POWER.
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-yellow fill-yellow" />
            ))}
          </div>
          <p className="text-gray-400 text-sm">Rated 4.9 / 5 across 3 countries</p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              className="p-6 rounded-2xl border border-gray-200 bg-[#F7F6F2] hover:border-yellow/30 hover:shadow-md transition-all duration-300 flex flex-col"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
              whileHover={{ y: -3 }}
            >
              {/* Quote icon */}
              <Quote size={24} className="text-yellow/50 mb-4" />

              {/* Text */}
              <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">&ldquo;{t.text}&rdquo;</p>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center text-lg">
                    {t.flag}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.location}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={12} className="text-yellow fill-yellow" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

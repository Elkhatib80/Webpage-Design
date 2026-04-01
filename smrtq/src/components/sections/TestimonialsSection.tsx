'use client';

import { Star, Quote } from 'lucide-react';
import { useReveal } from '@/lib/hooks/useReveal';

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

export default function TestimonialsSection() {
  const { ref, inView } = useReveal();

  return (
    <section className="py-24 bg-surface overflow-hidden" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="text-yellow text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
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
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="p-6 rounded-2xl border border-white/5 bg-dark-2 hover:border-white/10 transition-all duration-300 flex flex-col"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${i * 80}ms, transform 0.7s ease ${i * 80}ms`,
              }}
            >
              {/* Quote icon */}
              <Quote size={24} className="text-yellow/40 mb-4" />

              {/* Text */}
              <p className="text-sm text-gray-300 leading-relaxed flex-1 mb-5">&ldquo;{t.text}&rdquo;</p>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center text-lg">
                    {t.flag}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role} · {t.location}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={12} className="text-yellow fill-yellow" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

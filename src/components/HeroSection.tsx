'use client';

import React from 'react';
import { Language, PageRoute } from '../types';
import { translations } from '../data/translations';
import { HERO_IMAGE } from '../data/content';
import { ArrowRight, Sparkles, MapPin, Award, Users, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  currentLang: Language;
  onNavigate: (page: PageRoute) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang, onNavigate }) => {
  const t = translations.hero;

  const statIcons = [
    { icon: Users, color: 'text-[#0284c7]', bg: 'bg-[#0284c7]/10' },
    { icon: MapPin, color: 'text-[#f97316]', bg: 'bg-[#f97316]/10' },
    { icon: Calendar, color: 'text-[#0284c7]', bg: 'bg-[#0284c7]/10' },
    { icon: Award, color: 'text-[#10b981]', bg: 'bg-[#10b981]/10' },
  ];

  const stats = [
    t.stats.trained,
    t.stats.cities,
    t.stats.days,
    t.stats.satisfaction,
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#f0f9ff]/60 via-[#f8fafc] to-[#fff7ed]/50">
      {/* Soft Background Blur Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0ea5e9]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#f97316]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff7ed] border border-[#fed7aa] text-[#ea580c] text-xs font-extrabold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#f97316]" />
              <span>
                {currentLang === 'en'
                  ? 'Nepal’s #1 Practical Digital Marketing Academy'
                  : 'नेपालको न. १ व्यावहारिक डिजिटल मार्केटिङ एकेडेमी'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-[1.12]">
              <span className="block">{t.headingPart1[currentLang]}</span>
              <span className="block text-[#0284c7]">{t.headingPart2[currentLang]}</span>
              <span className="block text-[#f97316]">{t.headingPart3[currentLang]}</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl font-normal leading-relaxed">
              {t.description[currentLang]}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('book')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white font-extrabold text-base btn-orange-hover flex items-center justify-center gap-3 shadow-lg shadow-orange-500/25"
              >
                <span>{t.ctaBook[currentLang]}</span>
                <ArrowRight className="w-5 h-5 text-amber-200" />
              </button>

              <button
                onClick={() => onNavigate('programs')}
                className="px-7 py-4 rounded-xl bg-white text-[#0f172a] border-2 border-slate-200 hover:border-[#0284c7] hover:text-[#0284c7] font-bold text-base transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{t.ctaPrograms[currentLang]}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex items-center gap-6 text-xs font-semibold text-[#64748b]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                <span>{currentLang === 'en' ? 'Live Campaign Practice' : 'लाइभ क्याम्पेन अभ्यास'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                <span>{currentLang === 'en' ? 'Certified Instructors' : 'प्रमाणित प्रशिक्षकहरू'}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white ring-1 ring-slate-900/5">
              <img
                src={HERO_IMAGE}
                alt="BYOM Classroom Workshop"
                className="w-full h-[380px] sm:h-[450px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080e1a]/80 via-transparent to-transparent" />

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0284c7]/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentLang === 'en' ? 'Baneshwor Hub, Kathmandu' : 'बानेश्वर हब, काठमाडौँ'}</span>
                </div>
                <h3 className="text-xl font-bold text-white font-heading">
                  {currentLang === 'en'
                    ? 'Interactive Workshop in Action'
                    : 'सक्रिय अन्तर्क्रियात्मक कार्यशाला'}
                </h3>
              </div>
            </div>

            {/* Floating Batch Info Pill */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 sm:-left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#fff7ed] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#f97316]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider">
                  {currentLang === 'en' ? 'Next Cohort' : 'अर्को टोली'}
                </p>
                <p className="text-sm font-extrabold text-[#0f172a]">
                  {currentLang === 'en' ? 'Limited Seats Open' : 'सीमित सिटहरू बाँकी'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const Icon = statIcons[idx].icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
                >
                  <div className={`p-3 rounded-xl ${statIcons[idx].bg}`}>
                    <Icon className={`w-6 h-6 ${statIcons[idx].color}`} />
                  </div>
                  <div>
                    <span className="block text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-heading">
                      {stat.count}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#64748b]">
                      {stat.label[currentLang]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Language, PageRoute } from '../types';
import { translations } from '../data/translations';
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Award,
  Users,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  currentLang: Language;
  onNavigate: (page: PageRoute) => void;
}

interface HeroSlide {
  id: number;
  image: string;
  tag: { en: string; np: string };
  title: { en: string; np: string };
  desc: { en: string; np: string };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDIdDRjpqzKAwCWyq8Z99r3UsGpbf3DIjXhhG_FF6NIzV42cpO0Fkd8d_mClHg27QTughLAFpFEMaGM_Kyq15LA3aLFuT84jaIT5SlvyZdwDD7wWBBXmxgKNObyrYPYEsr9s6NyG9KsxLr4nuekOQrn8qzyaSNrkULzHYMnWpDSKE8XDDSqWQveilNPGpaHMTgx7aqLVAo7jJt3ZbRPGw309aYJXn2waIVUxOgeJ1665DiU3iFm72EY',
    tag: { en: 'Baneshwor Hub, Kathmandu', np: 'बानेश्वर हब, काठमाडौँ' },
    title: { en: 'Interactive Workshop in Action', np: 'सक्रिय अन्तर्क्रियात्मक कार्यशाला' },
    desc: {
      en: 'Live Ads Manager, campaign testing & practical execution',
      np: 'प्रत्यक्ष विज्ञापन व्यवस्थापक, क्याम्पेन परीक्षण र व्यावहारिक प्रयोग',
    },
  },
  {
    id: 2,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUqZE2OgBpiPbuXw4lK3k8C_JjT0U6Zop_unq2xQJ4yqV5mmDkujlSFkkIb11EtSc2lz7ucBmzBLGqHGLTzQsp6jiqXRM439qOYylqdxa3OzFqs0Q9tFBvd8QjV19Qs6p969E5lm27Le38yacCHdUMWV6SvqKOuJWFVJhiDOZnpnG4qfWIfEzZhzQcJvAawKzinzbdqELDmFxWlp2vG0ByeTaUtAFvT1xCLA7BnUlsCFnT-8oN47-W',
    tag: { en: '1-on-1 Mentorship', np: '१-मा-१ मेन्टरसिप' },
    title: { en: 'Real-Time Ad Audit & ROAS Optimization', np: 'प्रत्यक्ष विज्ञापन अडिट र ROAS अनुकूलन' },
    desc: {
      en: 'Personalized funnel breakdowns with lead trainer Anish Sharma',
      np: 'प्रमुख प्रशिक्षक अनीश शर्मासँग व्यक्तिगत फनेल समीक्षा',
    },
  },
  {
    id: 3,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDV-sNM1JrvLkgm_RMKJGhIrXZmFUCTGRbpuarcLToHyDaKqukUCCjnr9mMXmgRsMDn7csVO1oRVivVkz52rC9mNt79O5XvES-llrzGMIE6yJN02yKNT8fUU8HETkvTU5CKWXNB9N6aXayE_Tynj-IsZkemanBKN9m9DjGUUFyb4q8UjN4qfZJOKXaNvt5qwos65rIGqVIU6xHsnLzt4i3t02sluEF8nphZnE9BuKFLFzFELLkQBANV',
    tag: { en: 'Classroom Hub', np: 'कक्षाकोठा हब' },
    title: { en: 'Hands-on Laptop Masterclass', np: 'प्रत्यक्ष ल्यापटप मास्टरक्लास' },
    desc: {
      en: '25 dedicated workstations for live audience targeting',
      np: 'प्रत्यक्ष दर्शक लक्षित गर्न २५ समर्पित कार्यस्थलहरू',
    },
  },
  {
    id: 4,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpbe6fHnrOoqHXoOtv-RamN-fa55EedPhegCgUSMqv_08EAefxA4L0Vv4Ch7yK4HkXSv1O9q-vSzPnHha0maQe4nqHH5hUIHXKU9jDzeBnouDuDetL-y00i3nioSh_r5_WSj4x0_4F9GZ5KcnJ6T4wx4Nus41lKYhZRv4EaoGY2MfDMJbBm9Ik_c3n6wLfIL8AUfEpXRxzMIhOmVWUmoQKHrj0WOeB9lF8MDqKqxLb3SEhlrshdYC7',
    tag: { en: 'Creative Lab', np: 'रचनात्मक ल्याब' },
    title: { en: 'High-Converting Video Scripting & Production', np: 'उच्च रूपान्तरण भिडियो स्क्रिप्टिङ र उत्पादन' },
    desc: {
      en: 'Master phone videography, hooks, and Nepali copywriting',
      np: 'मोबाइल भिडियोग्राफी, हुक र नेपाली विज्ञापन लेखनमा निपुणता',
    },
  },
  {
    id: 5,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEK4VgmcYmTKjGcJ1TrX_SzaApc2LK4WO2Hi_mbQCWoHnxN2xvORhovKo3gk2xwqPmN_3Dy4Y0DTe9zeu84oCt4bg8NyStOvubwdaYi7X6Is9LgEjqq5Rl4gfuSoECp8hR78oQSmKg1RU_ePJ5rDbaQxYB6y49C8sQA114eL8lnt_pHEe-VhmorLD96JX9n9BGch86FHAgNfS7bS4EI4pfF10eIhOYXqLscmD1Rb5cONHFjBpnWNfu',
    tag: { en: 'Graduation Day', np: 'दीक्षान्त दिवस' },
    title: { en: 'Cohort Graduation & Certificate Ceremony', np: 'दीक्षान्त तथा प्रमाणपत्र वितरण समारोह' },
    desc: {
      en: 'Over 500+ successful agency owners and business marketers trained',
      np: '५००+ भन्दा बढी सफल व्यवसायी र मार्केटरहरू दीक्षित',
    },
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang, onNavigate }) => {
  const t = translations.hero;

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay slideshow every 4.5 seconds (paused on hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

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

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#f0f9ff]/60 via-[#f8fafc] to-[#fff7ed]/50">
      {/* Soft Background Blur Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0ea5e9]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#f97316]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 text-left"
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
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0f172a] tracking-tight leading-[1.12]">
              <span className="block">{t.headingPart1[currentLang]}</span>
              <span className="block text-[#0284c7]">{t.headingPart2[currentLang]}</span>
              <span className="block text-[#f97316]">{t.headingPart3[currentLang]}</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#475569] max-w-xl font-normal leading-relaxed">
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

          {/* Right Column: Hero Visual 5-Photo Carousel Card (Enlarged) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative mx-auto w-full rounded-[32px] overflow-hidden shadow-2xl border-[5px] border-white bg-[#080e1a] ring-1 ring-slate-900/10 group">
              
              {/* Slide Images with Smooth Crossfade Transitions */}
              <div className="relative h-[440px] sm:h-[520px] lg:h-[580px] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSlide.id}
                    src={activeSlide.image}
                    alt={activeSlide.title[currentLang]}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-center absolute inset-0"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Dark Vignette Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080e1a]/95 via-[#080e1a]/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Top Badge: Slide Counter */}
                <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-extrabold shadow-md">
                  <span>{currentSlideIndex + 1}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-400">{HERO_SLIDES.length}</span>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/80 text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 shadow-xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/80 text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 shadow-xl"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Bottom Card Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 text-white space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0284c7]/90 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider backdrop-blur-md shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-sky-200" />
                    <span>{activeSlide.tag[currentLang]}</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-1.5"
                    >
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight drop-shadow-md">
                        {activeSlide.title[currentLang]}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-200 line-clamp-2 leading-relaxed">
                        {activeSlide.desc[currentLang]}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Bullet Navigation Dots */}
                  <div className="pt-2 flex items-center gap-2">
                    {HERO_SLIDES.map((slide, idx) => {
                      const isActive = idx === currentSlideIndex;
                      return (
                        <button
                          key={slide.id}
                          onClick={() => setCurrentSlideIndex(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? 'w-10 bg-gradient-to-r from-[#ff6b00] to-[#f97316] shadow-md shadow-orange-500/60'
                              : 'w-2.5 bg-white/40 hover:bg-white/75'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Batch Info Pill */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 sm:-left-6 bg-white p-4 sm:p-4.5 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 z-30"
            >
              <div className="w-11 h-11 rounded-xl bg-[#fff7ed] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#f97316]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider">
                  {currentLang === 'en' ? 'Next Cohort' : 'अर्को टोली'}
                </p>
                <p className="text-sm sm:text-base font-extrabold text-[#0f172a]">
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

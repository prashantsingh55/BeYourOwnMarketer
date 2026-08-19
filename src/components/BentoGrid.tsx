'use client';

import React from 'react';
import { Language, PageRoute } from '../types';
import { translations } from '../data/translations';
import { Video, Camera, Palette, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface BentoGridProps {
  currentLang: Language;
  onNavigate: (page: PageRoute) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ currentLang, onNavigate }) => {
  const t = translations.bento;

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider bg-[#0284c7]/10 px-3.5 py-1.5 rounded-full border border-[#0284c7]/20">
            {currentLang === 'en' ? 'Core Curriculum' : 'मुख्य पाठ्यक्रम'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] font-heading tracking-tight">
            {t.title[currentLang]}
          </h2>
          <p className="text-base text-[#64748b] leading-relaxed">
            {t.subtitle[currentLang]}
          </p>
        </div>

        {/* Bento Grid Layout using CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1 (Large Span) - Content Creation */}
          <motion.div
            whileHover={{ y: -4 }}
            className="md:col-span-2 bg-gradient-to-br from-[#f0f9ff]/70 via-white to-[#fff7ed]/40 p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-5 max-w-xl relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-heading">
                {t.card1Title[currentLang]}
              </h3>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                {t.card1Desc[currentLang]}
              </p>

              {/* Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-[#1e293b]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0284c7] flex-shrink-0" />
                  <span>{currentLang === 'en' ? '30-Day Content Planner' : '३०-दिने सामग्री क्यालेन्डर'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0284c7] flex-shrink-0" />
                  <span>{currentLang === 'en' ? 'Nepali Hook Writing' : 'नेपाली भाषामा हुक लेखन'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0284c7] flex-shrink-0" />
                  <span>{currentLang === 'en' ? 'Brand Aesthetics & Tone' : 'ब्रान्ड शैली र टोन'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#0284c7] flex-shrink-0" />
                  <span>{currentLang === 'en' ? 'Copywriting Frameworks' : 'कपिट्राइटिङ ढाँचा'}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('programs')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] hover:bg-[#0284c7] text-white font-extrabold text-sm btn-hover shadow-md transition-colors"
                >
                  <span>{t.card1Cta[currentLang]}</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
              </div>
            </div>

            {/* Decorative Card Illustration Preview */}
            <div className="mt-8 md:mt-0 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-[#64748b]">
              <span className="font-semibold">{currentLang === 'en' ? 'Module 01' : 'मोड्युल ०१'}</span>
              <span className="font-bold text-[#0284c7]">{currentLang === 'en' ? 'Hands-on Scripting' : 'व्यावहारिक स्क्रिप्टिङ'}</span>
            </div>
          </motion.div>

          {/* Card 2 - Video Editing (Hover transitions to light blue #2D9EDE) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0b132b] hover:bg-[#2D9EDE] text-white p-8 sm:p-10 rounded-3xl border border-slate-800 hover:border-[#2D9EDE] shadow-md hover:shadow-2xl hover:shadow-[#2D9EDE]/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 group-hover:bg-white/20 text-[#f97316] group-hover:text-amber-200 flex items-center justify-center backdrop-blur-md transition-colors">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">
                {t.card2Title[currentLang]}
              </h3>
              <p className="text-sm text-slate-300 group-hover:text-white/90 leading-relaxed transition-colors">
                {t.card2Desc[currentLang]}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-white/15 border border-white/10 group-hover:border-white/20 space-y-2 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#f97316] group-hover:text-amber-200 font-bold transition-colors">CapCut & Premiere</span>
                  <Play className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#ff6b00] to-[#f97316] h-full w-4/5 rounded-full" />
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 group-hover:border-white/20 flex items-center justify-between text-xs text-slate-400 group-hover:text-white/80 transition-colors">
              <span>{currentLang === 'en' ? 'Module 02' : 'मोड्युल ०२'}</span>
              <span className="font-bold text-[#f97316] group-hover:text-white transition-colors">{currentLang === 'en' ? 'Vertical Reels & TikTok' : 'रिल्स र टिकटक भिडियो'}</span>
            </div>
          </motion.div>

          {/* Card 3 - Master Mobile Videography */}
          <motion.div
            whileHover={{ y: -4 }}
            className="md:col-span-3 bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0b132b] text-white p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-xs font-extrabold tracking-wide backdrop-blur-sm">
                <Camera className="w-4 h-4 text-amber-200" />
                <span>{currentLang === 'en' ? 'Mobile Cinema & Production' : 'मोबाइल भिडियोग्राफी र प्रोडक्सन'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
                {t.card3Title[currentLang]}
              </h3>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                {t.card3Desc[currentLang]}
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => onNavigate('programs')}
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-white text-[#0f172a] hover:bg-[#fff7ed] hover:text-[#ea580c] font-extrabold text-sm btn-hover flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                <span>{currentLang === 'en' ? 'Master Mobile Videography' : 'मोबाइल भिडियोग्राफी सिक्नुहोस्'}</span>
                <ArrowRight className="w-4 h-4 text-[#0284c7]" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};


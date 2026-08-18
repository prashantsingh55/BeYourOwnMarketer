'use client';

import React, { useState, useEffect } from 'react';
import { Language, PageRoute, OnlineCourse } from '../types';
import { translations } from '../data/translations';
import { curriculumDays,  WORKSHOP_IMAGE } from '../data/content';
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  BookOpen,
  User,
  Sun,
  Sunrise,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProgramsPageProps {
  currentLang: Language;
  onNavigate: (page: PageRoute) => void;
  onSelectCourseEnroll: (course: OnlineCourse) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  currentLang,
  onNavigate,
  onSelectCourseEnroll,
}) => {
  const [activeTab, setActiveTab] = useState<'physical' | 'online'>('physical');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [activeShift, setActiveShift] = useState<'daytime' | 'morning'>('daytime');
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/sessions')
      .then((r) => r.json())
      .then((d) => { if (d.sessions) setSessions(d.sessions); })
      .catch(() => {});
  }, []);

  const t = translations.programs;

  const categories = [
    { id: 'all', label: { en: 'All Courses', np: 'सबै पाठ्यक्रमहरू' } },
    { id: 'Content Creation', label: { en: 'Content Creation', np: 'सामग्री सिर्जना' } },
    { id: 'Video Editing', label: { en: 'Video Editing', np: 'भिडियो सम्पादन' } },
    { id: 'Meta Ads', label: { en: 'Meta Ads', np: 'मेटा विज्ञापन' } },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-extrabold text-[#0284c7] uppercase tracking-wider bg-[#0284c7]/10 px-3.5 py-1.5 rounded-full border border-[#0284c7]/20">
            {currentLang === 'en' ? 'Practical & Online Learning' : 'व्यावहारिक तथा अनलाइन सिकाइ'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] font-heading tracking-tight">
            {t.headerTitle[currentLang]}
          </h1>
          <p className="text-base text-[#64748b] leading-relaxed">
            {t.headerSub[currentLang]}
          </p>

          {/* Program Format Switcher Tabs */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 mt-4">
            <button
              onClick={() => setActiveTab('physical')}
              className={`px-16 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'physical'
                  ? 'bg-[#0f172a] text-white shadow-md'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              {t.tabPhysical[currentLang]}
            </button>
          </div>
        </div>

        {/* Tab 1: Physical Training Flagship */}
        {activeTab === 'physical' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Flagship Program Banner Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff7ed] border border-[#fed7aa] text-[#ea580c] text-xs font-extrabold shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#f97316]" />
                    <span>{t.flagshipBadge[currentLang]}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-heading">
                    {t.flagshipTitle[currentLang]}
                  </h2>

                  <p className="text-base text-[#475569] leading-relaxed">
                    {t.flagshipDesc[currentLang]}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-[#0f172a] pt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0284c7]" />
                      <span>{t.flagshipDuration[currentLang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#f97316]" />
                      <span>{t.flagshipLocation[currentLang]}</span>
                    </div>
                    {sessions.length > 0 && (() => {
                      const s = sessions[0];
                      const fmt = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                      return (
                        <div className="flex items-center gap-2 bg-[#0284c7]/10 px-3 py-1.5 rounded-xl border border-[#0284c7]/20">
                          <Calendar className="w-4 h-4 text-[#0284c7] flex-shrink-0" />
                          <span className="text-[#0284c7] font-extrabold text-xs">
                            {fmt(s.startDate)} to {fmt(s.endDate)}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="block text-xs font-semibold text-[#64748b] uppercase">
                      {currentLang === 'en' ? 'Total Program Fee' : 'कुल कार्यक्रम शुल्क'}
                    </span>
                    <span className="text-2xl font-extrabold text-[#0f172a] font-heading">
                      Rs. 15,000
                    </span>
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Pay Rs. 5,000 now
                      </span>
                      <span className="text-[#64748b]">+ Rs. 10,000 after session</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('book')}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white font-extrabold text-sm btn-orange-hover flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
                  >
                    <span>{currentLang === 'en' ? 'Book Your Spot' : 'सिट सुरक्षित गर्नुहोस्'}</span>
                    <ArrowRight className="w-4 h-4 text-amber-200" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[300px]">
                <img
                  src={WORKSHOP_IMAGE}
                  alt="Physical Marketing Workshop"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:hidden" />
              </div>
            </div>

            {/* Curriculum Breakdown Section */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              
              {/* Header Banner & Official Location / Time Info from Routine */}
              <div className="bg-gradient-to-r from-[#0b132b] via-[#0f172a] to-[#0284c7] text-white p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full inline-block backdrop-blur-sm">
                      {currentLang === 'en' ? '7 Days Workshop Routine' : '७-दिने कार्यशाला समय तालिका'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                      Be Your Own Marketer
                    </h3>
                  </div>

                  {/* Shift Selector Switcher */}
                  <div className="flex flex-wrap items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/15 self-start lg:self-auto backdrop-blur-sm">
                    <button
                      onClick={() => setActiveShift('morning')}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                        activeShift === 'morning'
                          ? 'bg-[#ff6b00] text-white shadow-md'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Sunrise className="w-4 h-4 text-amber-200" />
                      <span>{currentLang === 'en' ? 'Morning (6 am - 9 am)' : 'बिहानी (६ बजे - ९ बजे)'}</span>
                    </button>
                    <button
                      onClick={() => setActiveShift('daytime')}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                        activeShift === 'daytime'
                          ? 'bg-[#ff6b00] text-white shadow-md'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Sun className="w-4 h-4 text-amber-200" />
                      <span>{currentLang === 'en' ? 'Daytime (12 noon - 3 pm)' : 'दिवा (१२ बजे - ३ बजे)'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-300" />
                    <span>ROKPA Guest House, Boudha</span>
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl bg-[#ff6b00] text-white font-extrabold flex items-center gap-1.5 shadow-md">
                    <Clock className="w-4 h-4" />
                    <span>{activeShift === 'daytime' ? '12:00 PM - 3:00 PM' : '6:00 AM - 9:00 AM'}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentLang === 'en'
                    ? 'Hands-on daily sessions with warm-ups, expert instructor-led sessions, Raw & Real / Open-Up dialogues, and practical labs.'
                    : 'न्यानो-अप, विज्ञ प्रशिक्षक सत्रहरू, रो र रियल / ओपन-अप संवादहरू, र व्यावहारिक अभ्यासका साथ दैनिक सत्रहरू।'}
                </p>

                {/* Instructors Lineup Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-amber-300 font-bold mr-1">
                    {currentLang === 'en' ? 'Instructors:' : 'प्रशिक्षकहरू:'}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-medium">Chris Gurung</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-medium">Umesh Tamang</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-medium">Prashant Ghimire</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-medium">Prashant B. Singh</span>
                </div>
              </div>

              {/* Day-by-Day Accordion Schedule */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-xl font-extrabold text-[#0f172a] font-heading">
                    {t.curriculumTitle[currentLang]}
                  </h4>
                  <span className="text-xs text-[#64748b] font-semibold">
                    {currentLang === 'en' ? 'Click day to view sessions' : 'सत्रहरू हेर्न दिनमा क्लिक गर्नुहोस्'}
                  </span>
                </div>

                {curriculumDays.map((item) => {
                  const isOpen = expandedDay === item.day;
                  const currentSessions = activeShift === 'daytime'
                    ? (item.sessionsDaytime || item.sessions)
                    : (item.sessionsMorning || item.sessions);
                  const currentRange = activeShift === 'daytime'
                    ? (item.timeRangeDaytime || '12:00 pm - 3:00 pm')
                    : (item.timeRangeMorning || '6:00 am - 9:00 am');

                  return (
                    <div
                      key={item.day}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isOpen
                          ? 'border-[#0284c7] bg-white shadow-md ring-1 ring-[#0284c7]/20'
                          : 'border-slate-200 bg-[#f8fafc] hover:border-slate-300'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedDay(isOpen ? null : item.day)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-14 h-11 rounded-2xl font-extrabold text-xs flex items-center justify-center flex-shrink-0 transition-all ${
                              isOpen
                                ? 'bg-[#0284c7] text-white shadow-md shadow-sky-500/20'
                                : 'bg-slate-200 text-[#0f172a]'
                            }`}
                          >
                            <span>{currentLang === 'en' ? `Day ${item.day}` : `दिन ${item.day}`}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wide">
                                {currentLang === 'en' ? `Day ${item.day}` : `दिन ${item.day}`}
                              </span>
                              <span className="text-slate-400">•</span>
                              <span className="text-xs font-semibold text-[#64748b]">
                                {currentRange}
                              </span>
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-[#0f172a] font-heading mt-0.5">
                              {item.title[currentLang]}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="hidden sm:inline-block text-xs font-bold text-[#0284c7] bg-[#0284c7]/10 px-3 py-1 rounded-full">
                            {currentSessions.length} {currentLang === 'en' ? 'Sessions' : 'सत्रहरू'}
                          </span>
                          <div className="p-2 rounded-xl bg-white border border-slate-200 text-[#0f172a]">
                            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-6"
                          >
                            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                              {item.description[currentLang]}
                            </p>

                            {/* Session Schedule Timetable */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-3 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-[#0284c7]" />
                                <span>{currentLang === 'en' ? 'Detailed Session Breakdown' : 'विस्तृत सत्र तालिका'}</span>
                              </h5>

                              <div className="divide-y divide-slate-200/80 border border-slate-200/80 rounded-2xl overflow-hidden bg-[#f8fafc]">
                                {currentSessions.map((sess, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 hover:bg-white transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="px-2.5 py-1 rounded-lg bg-[#0f172a] text-white font-mono text-[11px] font-bold flex-shrink-0">
                                        {sess.time}
                                      </span>
                                      <span className="font-bold text-xs sm:text-sm text-[#0f172a]">
                                        {sess.title[currentLang]}
                                      </span>
                                    </div>

                                    {sess.instructor && (
                                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0284c7] bg-[#0284c7]/10 px-3 py-1 rounded-full self-start sm:self-auto">
                                        <User className="w-3.5 h-3.5" />
                                        <span>- {sess.instructor}</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Practical Topics learned */}
                            {item.topics && (
                              <div className="pt-2">
                                <h5 className="text-xs font-bold text-[#0f172a] mb-2.5">
                                  {currentLang === 'en' ? 'Key Practical Takeaways:' : 'मुख्य व्यावहारिक उपलब्धिहरू:'}
                                </h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {item.topics[currentLang].map((topic, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#0f172a] bg-white p-2.5 rounded-xl border border-slate-200">
                                      <CheckCircle className="w-4 h-4 text-[#0284c7] flex-shrink-0" />
                                      <span>{topic}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};


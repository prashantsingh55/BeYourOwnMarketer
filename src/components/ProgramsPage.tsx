'use client';

import React, { useState } from 'react';
import { Language, PageRoute, OnlineCourse } from '../types';
import { translations } from '../data/translations';
import { curriculumDays, onlineCourses, WORKSHOP_IMAGE } from '../data/content';
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

  const t = translations.programs;

  const categories = [
    { id: 'all', label: { en: 'All Courses', np: 'सबै पाठ्यक्रमहरू' } },
    { id: 'Content Creation', label: { en: 'Content Creation', np: 'सामग्री सिर्जना' } },
    { id: 'Video Editing', label: { en: 'Video Editing', np: 'भिडियो सम्पादन' } },
    { id: 'Meta Ads', label: { en: 'Meta Ads', np: 'मेटा विज्ञापन' } },
  ];

  const filteredCourses = onlineCourses.filter((course) => {
    if (selectedCategory === 'all') return true;
    return course.category.en === selectedCategory;
  });

  return (
    <div className="py-12 md:py-20 bg-[#fcf9f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-[#265cb3] uppercase tracking-wider bg-[#265cb3]/10 px-3 py-1.5 rounded-full border border-[#265cb3]/20">
            {currentLang === 'en' ? 'Practical & Online Learning' : 'व्यावहारिक तथा अनलाइन सिकाइ'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#091b3b] font-heading tracking-tight">
            {t.headerTitle[currentLang]}
          </h1>
          <p className="text-base text-[#5c5d63] leading-relaxed">
            {t.headerSub[currentLang]}
          </p>

          {/* Program Format Switcher Tabs */}
          <div className="inline-flex p-1.5 bg-[#ebe7e5] rounded-2xl border border-[#d6d0cc] mt-4">
            <button
              onClick={() => setActiveTab('physical')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'physical'
                  ? 'bg-[#091b3b] text-white shadow-md'
                  : 'text-[#5c5d63] hover:text-[#091b3b]'
              }`}
            >
              {t.tabPhysical[currentLang]}
            </button>
            <button
              onClick={() => setActiveTab('online')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'online'
                  ? 'bg-[#091b3b] text-white shadow-md'
                  : 'text-[#5c5d63] hover:text-[#091b3b]'
              }`}
            >
              {t.tabOnline[currentLang]}
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
            <div className="bg-white rounded-3xl border border-[#e2dedc] shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f6b996]/30 border border-[#ac7859]/30 text-[#422108] text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#ac7859]" />
                    <span>{t.flagshipBadge[currentLang]}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#091b3b] font-heading">
                    {t.flagshipTitle[currentLang]}
                  </h2>

                  <p className="text-base text-[#5c5d63] leading-relaxed">
                    {t.flagshipDesc[currentLang]}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#091b3b] pt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#265cb3]" />
                      <span>{t.flagshipDuration[currentLang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#ac7859]" />
                      <span>{t.flagshipLocation[currentLang]}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#e2dedc] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs font-semibold text-[#5c5d63] uppercase">
                      {currentLang === 'en' ? 'Registration Fee' : 'रजिस्ट्रेशन शुल्क'}
                    </span>
                    <span className="text-2xl font-extrabold text-[#091b3b] font-heading">
                      Rs. 15,000
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('book')}
                    className="px-8 py-3.5 rounded-xl bg-[#091b3b] text-white font-extrabold text-sm btn-hover flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>{currentLang === 'en' ? 'Book Your Spot' : 'सिट सुरक्षित गर्नुहोस्'}</span>
                    <ArrowRight className="w-4 h-4 text-[#f6b996]" />
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
              </div>
            </div>

            {/* Curriculum Breakdown Section */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#e2dedc] shadow-sm space-y-8">
              
              {/* Header Banner & Official Location / Time Info from Routine */}
              <div className="bg-gradient-to-r from-[#091b3b] to-[#1e3a6a] text-white p-6 sm:p-8 rounded-2xl space-y-5 shadow-md">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#f6b996] bg-white/10 px-3 py-1 rounded-full inline-block">
                      {currentLang === 'en' ? '7 Days Workshop Routine' : '७-दिने कार्यशाला समय तालिका'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                      Be Your Own Marketer
                    </h3>
                  </div>

                  {/* Shift Selector Switcher */}
                  <div className="flex flex-wrap items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/15 self-start lg:self-auto">
                    <button
                      onClick={() => setActiveShift('daytime')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                        activeShift === 'daytime'
                          ? 'bg-[#f6b996] text-[#321300] shadow-sm'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <Sun className="w-4 h-4 text-[#321300]" />
                      <span>{currentLang === 'en' ? 'Daytime Shift (12 noon - 3pm)' : 'दिवा सत्र (१२ बजे - ३ बजे)'}</span>
                    </button>
                    <button
                      onClick={() => setActiveShift('morning')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                        activeShift === 'morning'
                          ? 'bg-[#f6b996] text-[#321300] shadow-sm'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <Sunrise className="w-4 h-4 text-[#321300]" />
                      <span>{currentLang === 'en' ? 'Morning Shift (6 am - 9 am)' : 'बिहानी सत्र (६ बजे - ९ बजे)'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#f6b996]" />
                    <span>ROKPA Guest House, Boudha</span>
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl bg-[#f6b996] text-[#321300] font-extrabold flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-4 h-4" />
                    <span>{activeShift === 'daytime' ? '12 noon - 3pm' : '6:00 am - 9:00 am'}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#c5c6cf] leading-relaxed">
                  {currentLang === 'en'
                    ? 'Hands-on daily sessions with warm-ups, expert instructor-led sessions, Raw & Real / Open-Up dialogues, and practical labs.'
                    : 'न्यानो-अप, विज्ञ प्रशिक्षक सत्रहरू, रो र रियल / ओपन-अप संवादहरू, र व्यावहारिक अभ्यासका साथ दैनिक सत्रहरू।'}
                </p>

                {/* Instructors Lineup Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[#f6b996] font-bold mr-1">
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
                  <h4 className="text-xl font-extrabold text-[#091b3b] font-heading">
                    {t.curriculumTitle[currentLang]}
                  </h4>
                  <span className="text-xs text-[#5c5d63] font-semibold">
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
                          ? 'border-[#265cb3] bg-white shadow-md ring-1 ring-[#265cb3]/20'
                          : 'border-[#e2dedc] bg-[#fcf9f8] hover:border-[#c5c6cf]'
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
                                ? 'bg-[#091b3b] text-white shadow-sm'
                                : 'bg-[#e2dedc] text-[#091b3b]'
                            }`}
                          >
                            <span>{currentLang === 'en' ? `Day ${item.day}` : `दिन ${item.day}`}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#265cb3] uppercase tracking-wide">
                                {currentLang === 'en' ? `Day ${item.day}` : `दिन ${item.day}`}
                              </span>
                              <span className="text-[#8e8f99]">•</span>
                              <span className="text-xs font-semibold text-[#5c5d63]">
                                {currentRange}
                              </span>
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-[#091b3b] font-heading mt-0.5">
                              {item.title[currentLang]}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="hidden sm:inline-block text-xs font-bold text-[#265cb3] bg-[#265cb3]/10 px-3 py-1 rounded-full">
                            {currentSessions.length} {currentLang === 'en' ? 'Sessions' : 'सत्रहरू'}
                          </span>
                          <div className="p-2 rounded-xl bg-white border border-[#e2dedc] text-[#091b3b]">
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
                            className="px-5 pb-6 pt-2 border-t border-[#e2dedc] space-y-6"
                          >
                            <p className="text-xs sm:text-sm text-[#5c5d63] leading-relaxed">
                              {item.description[currentLang]}
                            </p>

                            {/* Session Schedule Timetable */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-[#091b3b] mb-3 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-[#265cb3]" />
                                <span>{currentLang === 'en' ? 'Detailed Session Breakdown' : 'विस्तृत सत्र तालिका'}</span>
                              </h5>

                              <div className="divide-y divide-[#e2dedc] border border-[#e2dedc] rounded-2xl overflow-hidden bg-[#fcf9f8]">
                                {currentSessions.map((sess, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 hover:bg-white transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="px-2.5 py-1 rounded-lg bg-[#091b3b] text-white font-mono text-[11px] font-bold flex-shrink-0">
                                        {sess.time}
                                      </span>
                                      <span className="font-bold text-xs sm:text-sm text-[#091b3b]">
                                        {sess.title[currentLang]}
                                      </span>
                                    </div>

                                    {sess.instructor && (
                                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#265cb3] bg-[#265cb3]/10 px-3 py-1 rounded-full self-start sm:self-auto">
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
                                <h5 className="text-xs font-bold text-[#091b3b] mb-2.5">
                                  {currentLang === 'en' ? 'Key Practical Takeaways:' : 'मुख्य व्यावहारिक उपलब्धिहरू:'}
                                </h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {item.topics[currentLang].map((topic, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#091b3b] bg-white p-2.5 rounded-xl border border-[#e2dedc]">
                                      <CheckCircle className="w-4 h-4 text-[#265cb3] flex-shrink-0" />
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

        {/* Tab 2: Online Courses */}
        {activeTab === 'online' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#091b3b] text-white shadow-sm'
                      : 'bg-white text-[#5c5d63] border border-[#e2dedc] hover:bg-[#ebe7e5]'
                  }`}
                >
                  {cat.label[currentLang]}
                </button>
              ))}
            </div>

            {/* Courses Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-[#e2dedc] shadow-sm hover:shadow-xl transition-all card-hover overflow-hidden flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Course Image */}
                    <div className="relative h-48 overflow-hidden bg-[#e2dedc]">
                      <img
                        src={course.image}
                        alt={course.title[currentLang]}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {course.badge && (
                        <span className="absolute top-3 right-3 bg-[#091b3b] text-[#f6b996] px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                          {course.badge[currentLang]}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#5c5d63]">
                        <span className="bg-[#265cb3]/10 text-[#265cb3] px-2.5 py-0.5 rounded-md font-bold">
                          {course.category[currentLang]}
                        </span>
                        <div className="flex items-center gap-1 text-[#f59e0b]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold text-[#091b3b]">{course.rating}</span>
                          <span className="text-[#61626a]">({course.reviewCount})</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-[#091b3b] font-heading leading-snug">
                        {course.title[currentLang]}
                      </h3>

                      <p className="text-xs text-[#5c5d63] line-clamp-2">
                        {course.description[currentLang]}
                      </p>

                      <div className="flex items-center justify-between text-xs font-semibold text-[#5c5d63] pt-2 border-t border-[#e2dedc]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#265cb3]" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-[#ac7859]" />
                          <span>{course.level[currentLang]}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Price & Enroll */}
                  <div className="p-6 pt-0 flex items-center justify-between border-t border-[#e2dedc]/60 mt-4">
                    <div>
                      <span className="text-xl font-extrabold text-[#091b3b] font-heading">
                        Rs. {course.priceNpr.toLocaleString()}
                      </span>
                      {course.originalPriceNpr && (
                        <span className="block text-xs text-[#8e8f99] line-through">
                          Rs. {course.originalPriceNpr.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectCourseEnroll(course)}
                      className="px-5 py-2.5 rounded-xl bg-[#265cb3] text-white text-xs font-bold hover:bg-[#1a4488] transition-colors shadow-sm"
                    >
                      {t.enrollNow[currentLang]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

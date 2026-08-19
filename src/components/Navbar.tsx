'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Language, PageRoute } from '../types';
import { translations } from '../data/translations';
import {
  Globe,
  Menu,
  X,
  User,
  Sparkles,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: string;
} | null;

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenAuth: () => void;
  authUser?: AuthUser;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentPage,
  onNavigate,
  onOpenAuth,
  authUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = translations.nav;

  // ── Top-bar Sub-zones (Left inside the curved blue bar)
  const topZones = [
    { label: currentLang === 'en' ? 'PRACTICAL COHORT' : 'व्यावहारिक टोली', route: 'programs' as PageRoute },
    { label: currentLang === 'en' ? 'CREATIVE LABS' : 'क्रिएटिभ ल्याब', route: 'gallery' as PageRoute },
  ];

  // ── Main nav items (Exact content on bottom white row)
  const navItems = [
    { route: 'home' as PageRoute, label: { en: 'HOME', np: 'गृहपृष्ठ' } },
    { route: 'programs' as PageRoute, label: { en: 'PROGRAMS', np: 'कार्यक्रमहरू' } },
    { route: 'book' as PageRoute, label: { en: 'WORKSHOPS', np: 'कार्यशालाहरू' } },
    { route: 'blog' as PageRoute, label: { en: 'BLOG', np: 'ब्लग' } },
    { route: 'gallery' as PageRoute, label: { en: 'GALLERY', np: 'ग्यालरी' } },
    { route: 'contact' as PageRoute, label: { en: 'CONTACT US', np: 'सम्पर्क' } },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    try { await fetch('/api/auth/logout', { method: 'POST' }); } catch (_) {}
    if (onLogout) onLogout();
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200/90">
      
      {/* ════════════════════════════════════════════════════════════════════════════
          1. MOBILE & TABLET NAVBAR (< lg / < 1024px)
          - Left: Full-height Logo Area (flush top alignment)
          - Right: Upper Curved Blue Bar with White Bar seen just below
         ════════════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden flex items-stretch">
        
        {/* Left: Full-height Logo Corner (Flush Top-Edge Alignment) */}
        <div className="flex items-start pl-3 sm:pl-4 pr-2 sm:pr-3 pt-0 pb-1 flex-shrink-0 bg-white z-10">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-start focus:outline-none"
            aria-label="Be Your Own Marketer"
          >
            <img
              src="/byom-logo.png"
              alt="Be Your Own Marketer"
              className="h-12 sm:h-15 w-auto object-contain -mt-1 sm:-mt-1.5"
            />
          </button>
        </div>

        {/* Right: Two-Tier Section (Top Curved Blue Bar + Bottom White Strip) */}
        <div className="flex-1 flex flex-col justify-between min-w-0 bg-white">
          
          {/* Top: Curved Blue Bar (Decreased vertical height) */}
          <div>
            <div className="w-full bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0b132b] text-white rounded-tl-none rounded-tr-none rounded-br-none rounded-bl-2xl sm:rounded-bl-3xl px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center justify-end space-x-1.5 sm:space-x-2.5 shadow-xs">
              
              {/* Mobile Language Selector Pill */}
              <div className="flex items-center bg-white/20 rounded-full p-0.5 border border-white/30 backdrop-blur-xs">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black transition-all ${
                    currentLang === 'en'
                      ? 'bg-white text-[#2D9EDE] shadow-xs'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => onLanguageChange('np')}
                  className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black transition-all flex items-center gap-0.5 ${
                    currentLang === 'np'
                      ? 'bg-white text-[#2D9EDE] shadow-xs'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  <Globe className="w-2.5 h-2.5" />
                  <span>नेपाली</span>
                </button>
              </div>

              {/* Mobile Book CTA */}
              <button
                onClick={() => handleNavClick('book')}
                className="px-2.5 sm:px-3 py-1 rounded-full bg-[#EF7B3A] hover:bg-[#E06A29] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 active:scale-95 flex-shrink-0"
              >
                <Sparkles className="w-2.5 h-2.5 text-amber-100" />
                <span>{currentLang === 'en' ? 'Book' : 'सिट'}</span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border border-white/30 shadow-xs active:scale-95 transition-all flex-shrink-0"
              >
                {mobileMenuOpen ? (
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                ) : (
                  <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                )}
              </button>

            </div>
          </div>

          {/* Bottom: Visible White Bar Strip just below the curved blue bar (Interactive button redirecting to book page) */}
          <div className="py-1.5 sm:py-2.5 bg-white flex items-center justify-end px-3.5 sm:px-4">
            <button
              onClick={() => handleNavClick('book')}
              className="text-[10px] sm:text-[11px] font-black text-[#EF7B3A] hover:text-[#E06A29] active:scale-95 tracking-wider uppercase transition-all flex items-center gap-1 focus:outline-none cursor-pointer"
            >
              <span>{currentLang === 'en' ? '✦ ADMISSIONS OPEN 2026 →' : '✦ भर्ना खुला २०२६ →'}</span>
            </button>
          </div>

        </div>

      </div>


      {/* ════════════════════════════════════════════════════════════════════════════
          2. DESKTOP TWO-TIER INTERTWINED NAVBAR (>= lg / >= 1024px)
          - Full-height logo block on top-left corner (flush top alignment)
          - Master Mobile Videography gradient curved bar on top right
          - Seamless white navigation bar directly below with active underline
         ════════════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex items-stretch">

          {/* ── LOGO CORNER (Spans top to bottom on left, flush top edge) ── */}
          <div className="flex items-start pr-4 lg:pr-6 pt-0 pb-1 flex-shrink-0 z-20">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-start focus:outline-none group"
              aria-label="Be Your Own Marketer"
            >
              <img
                src="/byom-logo.png"
                alt="Be Your Own Marketer"
                className="h-16 lg:h-[78px] xl:h-[82px] w-auto object-contain -mt-1 lg:-mt-1.5 transition-transform duration-200 group-hover:scale-105"
              />
            </button>
          </div>

          {/* ── RIGHT TWO-TIER CONTAINER ── */}
          <div className="flex-1 flex flex-col justify-between min-w-0">

            {/* ── TOP TIER: Gradient Curved Bar ── */}
            <div>
              <div className="bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0b132b] text-white rounded-tl-none rounded-tr-none rounded-br-none rounded-bl-3xl lg:rounded-bl-[36px] px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between shadow-md">
                
                {/* Left: Category Sub-Zones */}
                <div className="flex items-center space-x-6 lg:space-x-8">
                  {topZones.map((zone, i) => (
                    <button
                      key={i}
                      onClick={() => handleNavClick(zone.route)}
                      className="text-xs font-black uppercase tracking-wider text-white/90 hover:text-white transition-colors focus:outline-none"
                    >
                      {zone.label}
                    </button>
                  ))}
                </div>

                {/* Right: Language Selector + Login + Orange CTA */}
                <div className="flex items-center space-x-3.5 lg:space-x-4 flex-shrink-0">
                  
                  {/* Language Selector Pill */}
                  <div className="flex items-center bg-white/20 rounded-full p-1 border border-white/30 backdrop-blur-xs">
                    <button
                      onClick={() => onLanguageChange('en')}
                      className={`px-3.5 py-1 rounded-full text-[11px] font-black transition-all ${
                        currentLang === 'en'
                          ? 'bg-white text-[#2D9EDE] shadow-xs'
                          : 'text-white/85 hover:text-white'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => onLanguageChange('np')}
                      className={`px-3.5 py-1 rounded-full text-[11px] font-black transition-all flex items-center gap-1 ${
                        currentLang === 'np'
                          ? 'bg-white text-[#2D9EDE] shadow-xs'
                          : 'text-white/85 hover:text-white'
                      }`}
                    >
                      <Globe className="w-3 h-3" />
                      <span>नेपाली</span>
                    </button>
                  </div>

                  {/* Login / Profile Button */}
                  {authUser ? (
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setProfileDropdownOpen((p) => !p)}
                        className="flex items-center gap-2 pl-1.5 pr-3.5 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold transition-all"
                        aria-label="Open profile menu"
                      >
                        {authUser.avatar ? (
                          <img
                            src={authUser.avatar}
                            alt={authUser.name}
                            referrerPolicy="no-referrer"
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-white"
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-[#EF7B3A] flex items-center justify-center text-white text-[9px] font-black">
                            {getInitials(authUser.name)}
                          </div>
                        )}
                        <span className="max-w-[80px] truncate">{authUser.name.split(' ')[0]}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-white/90 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {profileDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.96 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 text-slate-900"
                          >
                            <div className="px-4 py-3 border-b border-slate-100 bg-[#F5F9FC]">
                              <p className="text-xs font-black text-[#172033] truncate">{authUser.name}</p>
                              <p className="text-[11px] text-slate-500 truncate">{authUser.email}</p>
                            </div>
                            <div className="py-1.5">
                              <button
                                onClick={() => handleNavClick('dashboard' as PageRoute)}
                                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-[#172033] hover:bg-[#F5F9FC] text-left transition-colors"
                              >
                                <LayoutDashboard className="w-4 h-4 text-[#2D9EDE]" />
                                <span>{currentLang === 'en' ? 'My Dashboard' : 'मेरो ड्यासबोर्ड'}</span>
                              </button>
                              <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 text-left transition-colors"
                              >
                                <LogOut className="w-4 h-4" />
                                <span>{currentLang === 'en' ? 'Sign Out' : 'साइन आउट'}</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      onClick={onOpenAuth}
                      className="px-4 lg:px-5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-black tracking-wide border border-white/25 transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <User className="w-3.5 h-3.5 text-white" />
                      <span>MyBYOM Login</span>
                    </button>
                  )}

                  {/* Primary Orange CTA Pill */}
                  <button
                    onClick={() => handleNavClick('book')}
                    className="px-5 lg:px-6 py-2 rounded-full bg-[#EF7B3A] hover:bg-[#E06A29] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-100" />
                    <span>{currentLang === 'en' ? 'Book Seat' : 'सिट बुक'}</span>
                  </button>

                </div>

              </div>
            </div>

            {/* ── BOTTOM TIER: Seamless White Row with Nav Links + Right Orange Accent ── */}
            <div className="flex items-center justify-between py-2.5 lg:py-3 pl-4 lg:pl-6">
              
              {/* Navigation Links with active indicator */}
              <nav className="flex items-center space-x-4 lg:space-x-6">
                {navItems.map((item) => {
                  const isActive = currentPage === item.route;
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleNavClick(item.route)}
                      className={`relative px-3.5 py-1.5 text-xs font-black tracking-wider uppercase transition-colors focus:outline-none ${
                        isActive
                          ? 'text-[#2D9EDE]'
                          : 'text-[#172033] hover:text-[#2D9EDE]'
                      }`}
                    >
                      {item.label[currentLang]}
                      {isActive && (
                        <motion.div
                          layoutId="byomActiveBar"
                          className="absolute -bottom-1.5 left-2 right-2 h-[3px] bg-[#2D9EDE] rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Right Side: Admissions Open Accent */}
              <div className="flex items-center">
                <button
                  onClick={() => handleNavClick('book')}
                  className="flex items-center border-l-2 border-[#EF7B3A] pl-5 py-1 group focus:outline-none text-left"
                >
                  <span className="text-[11px] font-black text-[#EF7B3A] uppercase tracking-widest group-hover:text-[#E06A29] transition-colors">
                    {currentLang === 'en' ? 'ADMISSIONS OPEN 2026 →' : 'भर्ना खुला २०२६ →'}
                  </span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════════════════
          3. FULL-FEATURED MOBILE DRAWER MENU
         ════════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-5 space-y-4">
              
              {/* User Profile / Login status in Mobile Menu */}
              <div className="p-3.5 rounded-2xl bg-[#F5F9FC] border border-[#E2EEF7] flex items-center justify-between">
                {authUser ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      {authUser.avatar ? (
                        <img
                          src={authUser.avatar}
                          alt={authUser.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-[#2D9EDE]"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#EF7B3A] text-white flex items-center justify-center text-xs font-black">
                          {getInitials(authUser.name)}
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-black text-[#172033]">{authUser.name}</p>
                        <p className="text-[10px] text-slate-500">{authUser.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNavClick('dashboard' as PageRoute)}
                      className="px-3 py-1.5 bg-[#2D9EDE] text-white text-xs font-bold rounded-xl shadow-xs"
                    >
                      {currentLang === 'en' ? 'Dashboard' : 'ड्यासबोर्ड'}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <User className="w-4 h-4 text-[#2D9EDE]" />
                      <span>{currentLang === 'en' ? 'MyBYOM Student Portal' : 'MyBYOM विद्यार्थी पोर्टल'}</span>
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="px-4 py-1.5 bg-[#2D9EDE] text-white text-xs font-black rounded-xl shadow-xs"
                    >
                      {currentLang === 'en' ? 'Sign In' : 'साइन इन'}
                    </button>
                  </div>
                )}
              </div>

              {/* Category Quick Zones */}
              <div className="grid grid-cols-2 gap-2 text-center">
                {topZones.map((zone, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavClick(zone.route)}
                    className="py-2 px-2 bg-slate-50 hover:bg-[#EBF6FD] rounded-xl text-[11px] font-black text-[#2D9EDE] uppercase border border-slate-200/80 transition-colors"
                  >
                    ✦ {zone.label}
                  </button>
                ))}
              </div>

              {/* Main Nav Items */}
              <div className="space-y-1 pt-1">
                {navItems.map((item) => {
                  const isActive = currentPage === item.route;
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleNavClick(item.route)}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-[#EBF6FD] text-[#2D9EDE] shadow-xs'
                          : 'text-[#172033] hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label[currentLang]}</span>
                      {isActive ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#2D9EDE]" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleNavClick('book')}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#EF7B3A] to-[#E06A29] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#EF7B3A]/30 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-100" />
                  <span>{t.bookSeat[currentLang]}</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};

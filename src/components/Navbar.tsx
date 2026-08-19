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
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* ════════════════════════════════════════════════════════════════════════════
            TWO-TIER SEAMLESS INTERTWINED STRUCTURE:
            - Full-height logo block on top-left corner
            - Blue curved bar starting to the right of logo with rounded left curvature
            - Seamless white navigation bar directly below holding nav items & accent
           ════════════════════════════════════════════════════════════════════════════ */}
        <div className="flex items-stretch">

          {/* ── 1. LOGO CORNER (Occupies full top-to-bottom left corner) ── */}
          <div className="flex items-center pr-2 sm:pr-4 lg:pr-5 py-1.5 flex-shrink-0 z-20">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center focus:outline-none group"
              aria-label="Be Your Own Marketer"
            >
              <img
                src="/byom-logo.png"
                alt="Be Your Own Marketer"
                className="h-14 sm:h-[68px] lg:h-[76px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </button>
          </div>

          {/* ── 2. RIGHT AREA (Top Curved Blue Bar + Bottom White Nav Bar) ── */}
          <div className="flex-1 flex flex-col justify-between min-w-0">

            {/* ── TOP TIER: Gradient Curved Bar (Master Mobile Videography Color Combination: #0284c7 -> #0369a1 -> #0b132b) ── */}
            <div>
              <div className="bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0b132b] text-white rounded-tl-none rounded-tr-none rounded-br-none rounded-bl-2xl sm:rounded-bl-3xl lg:rounded-bl-[36px] px-5 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between shadow-md">
                
                {/* Left inside curved blue bar: Category Zones */}
                <div className="hidden md:flex items-center space-x-5 lg:space-x-8">
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

                {/* Mobile tagline */}
                <div className="md:hidden flex items-center gap-1 text-[11px] font-bold text-white/95 truncate">
                  <span>✦ 25 Seats Cohort 2026</span>
                </div>

                {/* Right inside blue bar: Language Toggle + Login + Orange CTA */}
                <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
                  
                  {/* Language Selector Pill */}
                  <div className="flex items-center bg-white/20 rounded-full p-1 border border-white/30 backdrop-blur-xs">
                    <button
                      onClick={() => onLanguageChange('en')}
                      className={`px-3.5 sm:px-4 py-1 rounded-full text-[11px] font-black transition-all ${
                        currentLang === 'en'
                          ? 'bg-white text-[#2D9EDE] shadow-xs'
                          : 'text-white/85 hover:text-white'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => onLanguageChange('np')}
                      className={`px-3.5 sm:px-4 py-1 rounded-full text-[11px] font-black transition-all flex items-center gap-1 ${
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
                        <span className="hidden sm:block max-w-[70px] truncate">{authUser.name.split(' ')[0]}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-white/90 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {profileDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.96 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 w-54 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 text-slate-900"
                          >
                            <div className="px-4 py-2.5 border-b border-slate-100 bg-[#F5F9FC]">
                              <p className="text-xs font-black text-[#172033] truncate">{authUser.name}</p>
                              <p className="text-[11px] text-slate-500 truncate">{authUser.email}</p>
                            </div>
                            <div className="py-1">
                              <button
                                onClick={() => handleNavClick('dashboard' as PageRoute)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#172033] hover:bg-[#F5F9FC] text-left transition-colors"
                              >
                                <LayoutDashboard className="w-3.5 h-3.5 text-[#2D9EDE]" />
                                <span>{currentLang === 'en' ? 'My Dashboard' : 'मेरो ड्यासबोर्ड'}</span>
                              </button>
                              <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 text-left transition-colors"
                              >
                                <LogOut className="w-3.5 h-3.5" />
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
                      className="px-4 sm:px-5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-black tracking-wide border border-white/25 transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <User className="w-3.5 h-3.5 text-white" />
                      <span className="hidden sm:block">MyBYOM Login</span>
                      <span className="sm:hidden">Login</span>
                    </button>
                  )}

                  {/* Primary Orange CTA Pill (Matches CONTACT US in reference screenshot) */}
                  <button
                    onClick={() => handleNavClick('book')}
                    className="px-5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#EF7B3A] hover:bg-[#E06A29] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-100" />
                    <span>{currentLang === 'en' ? 'Book Seat' : 'सिट बुक'}</span>
                  </button>

                  {/* Mobile Hamburger toggle */}
                  <button
                    onClick={() => setMobileMenuOpen((p) => !p)}
                    className="lg:hidden w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20 ml-0.5"
                    aria-label="Toggle Navigation"
                  >
                    {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
                  </button>
                </div>

              </div>
            </div>

            {/* ── BOTTOM TIER: Seamless White Row with Nav Links + Right Orange Accent ── */}
            <div className="flex items-center justify-between py-2.5 sm:py-3 pl-3 sm:pl-6">
              
              {/* Center/Left Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-3 xl:space-x-6">
                {navItems.map((item) => {
                  const isActive = currentPage === item.route;
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleNavClick(item.route)}
                      className={`relative px-3.5 sm:px-4 py-1.5 text-xs font-black tracking-wider uppercase transition-colors focus:outline-none ${
                        isActive
                          ? 'text-[#2D9EDE]'
                          : 'text-[#172033] hover:text-[#2D9EDE]'
                      }`}
                    >
                      {item.label[currentLang]}
                      {/* Active underline bar (matching Southwestern blue underline) */}
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

              {/* Right Side: Orange Accent Bar (matching RESEARCH & INNOVATION in screenshot) */}
              <div className="hidden lg:flex items-center">
                <button
                  onClick={() => handleNavClick('book')}
                  className="flex items-center border-l-2 border-[#EF7B3A] pl-4 sm:pl-6 py-1 group focus:outline-none text-left"
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

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="px-5 py-5 space-y-3">
              
              {/* Category Quick Zones */}
              <div className="grid grid-cols-3 gap-1.5 pb-2 border-b border-slate-100 text-center">
                {topZones.map((zone, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavClick(zone.route)}
                    className="py-1.5 px-1 bg-[#F5F9FC] hover:bg-[#EBF6FD] rounded-lg text-[10px] font-black text-[#2D9EDE] uppercase border border-[#E2EEF7]"
                  >
                    {zone.label}
                  </button>
                ))}
              </div>

              {/* Main Nav Items */}
              <div className="space-y-0.5">
                {navItems.map((item) => {
                  const isActive = currentPage === item.route;
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleNavClick(item.route)}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-[#EBF6FD] text-[#2D9EDE]'
                          : 'text-[#172033] hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label[currentLang]}</span>
                      {isActive && <div className="w-2 h-2 rounded-full bg-[#2D9EDE]" />}
                    </button>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleNavClick('book')}
                  className="w-full py-3 rounded-full bg-[#EF7B3A] hover:bg-[#E06A29] text-white font-black text-xs uppercase tracking-wider shadow-md shadow-[#EF7B3A]/25 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-100" />
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

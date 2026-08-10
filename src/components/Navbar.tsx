'use client';

import React, { useState } from 'react';
import { Language, PageRoute } from '../types';
import { translations } from '../data/translations';
import { Globe, Menu, X, User, Sparkles, ChevronRight, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentPage,
  onNavigate,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations.nav;

  const navItems: { route: PageRoute; label: string }[] = [
    { route: 'programs', label: t.programs[currentLang] },
    { route: 'book', label: t.workshops[currentLang] },
    { route: 'blog', label: t.blog[currentLang] },
    { route: 'gallery', label: t.gallery[currentLang] },
    { route: 'contact', label: t.contactUs[currentLang] },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-nav border-b border-[#e2dedc]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group text-left focus:outline-none"
            aria-label="BYOM Home"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#091b3b] to-[#265cb3] flex items-center justify-center text-white font-black text-xl tracking-wider shadow-md group-hover:scale-105 transition-transform">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-[#091b3b] font-heading flex items-center gap-1.5">
                BYOM
                <span className="text-[10px] font-semibold bg-[#f6b996]/40 text-[#522900] px-2 py-0.5 rounded-full border border-[#ac7859]/30">
                  NEPAL
                </span>
              </span>
              <span className="text-[11px] font-medium text-[#5c5d63] tracking-wide">
                Be Your Own Marketer
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-[#265cb3] bg-[#265cb3]/10 font-bold'
                      : 'text-[#3c3e44] hover:text-[#091b3b] hover:bg-[#f0eded]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#265cb3] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls: Language Toggle + Auth + CTA */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Dual Language Toggle Button */}
            <div className="relative bg-[#ebe7e5] p-1 rounded-xl flex items-center border border-[#d6d0cc]">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  currentLang === 'en'
                    ? 'bg-white text-[#091b3b] shadow-sm'
                    : 'text-[#61626a] hover:text-[#091b3b]'
                }`}
                aria-label="Switch to English"
              >
                <span>English</span>
              </button>
              <button
                onClick={() => onLanguageChange('np')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  currentLang === 'np'
                    ? 'bg-[#265cb3] text-white shadow-sm'
                    : 'text-[#61626a] hover:text-[#091b3b]'
                }`}
                aria-label="नेपालीमा फेर्नुहोस्"
              >
                <Globe className="w-3 h-3" />
                <span>नेपाली</span>
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-sm font-semibold text-[#091b3b] hover:bg-[#ebe7e5] rounded-xl transition-colors flex items-center gap-1.5"
            >
              <User className="w-4 h-4 text-[#265cb3]" />
              <span>{t.login[currentLang]}</span>
            </button>

            {/* Book Seat Primary CTA */}
            <button
              onClick={() => handleNavClick('book')}
              className="px-5 py-2.5 rounded-xl bg-[#091b3b] text-white text-sm font-bold btn-hover flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#f6b996]" />
              <span>{t.bookSeat[currentLang]}</span>
            </button>
          </div>

          {/* Mobile Menu & Language Toggle Bar */}
          <div className="flex md:hidden items-center space-x-2">
            
            {/* Compact Mobile Language Switcher */}
            <button
              onClick={() => onLanguageChange(currentLang === 'en' ? 'np' : 'en')}
              className="px-2.5 py-1.5 rounded-lg bg-[#ebe7e5] text-xs font-bold text-[#091b3b] border border-[#d6d0cc] flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-[#265cb3]" />
              <span>{currentLang === 'en' ? 'नेपाली' : 'EN'}</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#091b3b] hover:bg-[#ebe7e5] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#e2dedc] bg-white px-4 pt-3 pb-6 shadow-xl space-y-3"
          >
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  currentPage === 'home'
                    ? 'bg-[#265cb3]/10 text-[#265cb3]'
                    : 'text-[#1b1c1c] hover:bg-[#f0eded]'
                }`}
              >
                Home
              </button>
              {navItems.map((item) => {
                const isActive = currentPage === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#265cb3]/10 text-[#265cb3] font-bold'
                        : 'text-[#3c3e44] hover:bg-[#f0eded]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#e2dedc] space-y-2">
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl border border-[#c5c6cf] text-[#091b3b] font-bold text-center flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>{t.login[currentLang]}</span>
              </button>

              <button
                onClick={() => handleNavClick('book')}
                className="w-full py-3.5 rounded-xl bg-[#091b3b] text-white font-bold text-center shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#f6b996]" />
                <span>{t.bookSeat[currentLang]}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

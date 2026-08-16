'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Language, PageRoute } from '../types';
import { translations } from '../data/translations';
import {
  Globe, Menu, X, User, Sparkles, ChevronRight, FileText,
  LogOut, LayoutDashboard, ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type AuthUser = { id: string; name: string; email: string; avatar?: string | null; role: string } | null;

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
    setProfileDropdownOpen(false);
  };

  // Close dropdown when clicking outside
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
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (_) {}
    if (onLogout) onLogout();
  };

  // Get initials for fallback avatar
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-nav border-b border-[#e2dedc]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center focus:outline-none group"
            aria-label="BE YOUR OWN MARKETER Home"
          >
            <img
              src="/byom-logo.png"
              alt="Be Your Own Marketer"
              className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            />
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

            {/* Admin Portal Link */}
         

            {/* ── Logged IN: Profile Avatar Dropdown ── */}
            {authUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen((p) => !p)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-[#ebe7e5] hover:bg-[#e0dbd7] border border-[#d6d0cc] transition-all group"
                  aria-label="Open profile menu"
                >
                  {/* Avatar */}
                  {authUser.avatar ? (
                    <img
                      src={authUser.avatar}
                      alt={authUser.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#265cb3] flex items-center justify-center text-white text-xs font-extrabold">
                      {getInitials(authUser.name)}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-[#091b3b] max-w-[100px] truncate">
                    {authUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#5c5d63] transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-[#e2dedc] shadow-xl overflow-hidden z-50"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-[#f0eded] bg-[#fcf9f8]">
                        <div className="flex items-center gap-3">
                          {authUser.avatar ? (
                            <img
                              src={authUser.avatar}
                              alt={authUser.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#265cb3]/20"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#265cb3] flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0">
                              {getInitials(authUser.name)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-extrabold text-[#091b3b] truncate">{authUser.name}</p>
                            <p className="text-[11px] text-[#8e8f99] truncate">{authUser.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1.5">
                        <button
                          onClick={() => { handleNavClick('dashboard' as PageRoute); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#091b3b] hover:bg-[#f0eded] transition-colors text-left"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#265cb3]" />
                          {currentLang === 'en' ? 'My Dashboard' : 'मेरो ड्यासबोर्ड'}
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          {currentLang === 'en' ? 'Sign Out' : 'साइन आउट'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* ── Logged OUT: Login Button ── */
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-sm font-semibold text-[#091b3b] hover:bg-[#ebe7e5] rounded-xl transition-colors flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-[#265cb3]" />
                <span>{t.login[currentLang]}</span>
              </button>
            )}

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

            {/* Mobile: Show avatar if logged in */}
            {authUser && (
              <button
                onClick={() => handleNavClick('dashboard' as PageRoute)}
                className="mr-1"
                aria-label="Go to dashboard"
              >
                {authUser.avatar ? (
                  <img
                    src={authUser.avatar}
                    alt={authUser.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#265cb3]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#265cb3] flex items-center justify-center text-white text-xs font-extrabold">
                    {getInitials(authUser.name)}
                  </div>
                )}
              </button>
            )}

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
              {authUser ? (
                <>
                  {/* Mobile: User Info */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#fcf9f8] rounded-xl border border-[#e2dedc]">
                    {authUser.avatar ? (
                      <img
                        src={authUser.avatar}
                        alt={authUser.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[#265cb3]/20"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#265cb3] flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0">
                        {getInitials(authUser.name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-[#091b3b] truncate">{authUser.name}</p>
                      <p className="text-[11px] text-[#8e8f99] truncate">{authUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNavClick('dashboard' as PageRoute)}
                    className="w-full py-3 rounded-xl border border-[#265cb3]/30 bg-[#265cb3]/5 text-[#265cb3] font-bold text-center flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {currentLang === 'en' ? 'My Dashboard' : 'मेरो ड्यासबोर्ड'}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl border border-rose-200 text-rose-600 font-bold text-center flex items-center justify-center gap-2 hover:bg-rose-50"
                  >
                    <LogOut className="w-4 h-4" />
                    {currentLang === 'en' ? 'Sign Out' : 'साइन आउट'}
                  </button>
                </>
              ) : (
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
              )}

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

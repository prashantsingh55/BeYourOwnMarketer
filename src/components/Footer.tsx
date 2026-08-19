'use client';

import React from 'react';
import { Language, PageRoute } from '../types';
import { translations } from '../data/translations';
import { MapPin, Mail, Phone, ArrowUpRight, Sparkles } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onNavigate: (page: PageRoute) => void;
  onLanguageChange: (lang: Language) => void;
}

// Social media SVG icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onNavigate,
  onLanguageChange,
}) => {
  const t = translations.footer;
  const navT = translations.nav;

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      hoverClass: 'hover:bg-[#1877F2] hover:shadow-blue-500/40',
      icon: <FacebookIcon />,
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      hoverClass: 'hover:bg-gradient-to-tr hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:shadow-pink-500/40',
      icon: <InstagramIcon />,
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      hoverClass: 'hover:bg-[#FF0000] hover:shadow-red-500/40',
      icon: <YouTubeIcon />,
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com',
      hoverClass: 'hover:bg-black hover:shadow-cyan-500/30',
      icon: <TikTokIcon />,
    },
  ];

  return (
    <footer className="bg-[#080e1a] text-white pt-16 pb-12 border-t border-slate-800/80 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-[#2D9EDE]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 bg-[#EF7B3A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="block focus:outline-none group"
              aria-label="BE YOUR OWN MARKETER Home"
            >
              <div className="bg-white rounded-2xl p-2 inline-block shadow-sm transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/byom-logo.png"
                  alt="Be Your Own Marketer"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed">
              {currentLang === 'en'
                ? 'Empowering Nepali entrepreneurs and professionals with practical hands-on marketing skills.'
                : 'नेपाली उद्यमी र व्यवसायीहरूलाई व्यावहारिक मार्केटिङ सीपका साथ सशक्त बनाउँदै।'}
            </p>

            {/* Modern Animated Social Icons (Facebook, Instagram, YouTube, TikTok) */}
            <div className="pt-2">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#EF7B3A] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#EF7B3A]" />
                <span>{currentLang === 'en' ? 'Follow Us' : 'हामीलाई फलो गर्नुहोस्'}</span>
              </p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow BYOM on ${social.name}`}
                    className={`group w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md ${social.hoverClass}`}
                  >
                    <span className="transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#EF7B3A]">
              {currentLang === 'en' ? 'Programs' : 'कार्यक्रमहरू'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                { label: navT.programs[currentLang], route: 'programs' as PageRoute },
                { label: navT.workshops[currentLang], route: 'book' as PageRoute },
                { label: navT.blog[currentLang], route: 'blog' as PageRoute },
                { label: navT.gallery[currentLang], route: 'gallery' as PageRoute },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.route)}
                    className="group inline-flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#2D9EDE] transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#EF7B3A]">
              {currentLang === 'en' ? 'Kathmandu Hub' : 'काठमाडौँ हब'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#2D9EDE]" />
                <span>Baneshwor, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#2D9EDE]" />
                <span>+977 980-8193078</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#2D9EDE]" />
                <span>hello@byom.com.np</span>
              </li>
            </ul>
          </div>

          {/* Language Switcher */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#EF7B3A]">
              {currentLang === 'en' ? 'Language' : 'भाषा'}
            </h4>
            <div className="inline-flex p-1 bg-white/10 rounded-2xl border border-white/20">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  currentLang === 'en' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-white/70 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('np')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  currentLang === 'np' ? 'bg-[#2D9EDE] text-white shadow-sm' : 'text-white/70 hover:text-white'
                }`}
              >
                नेपाली
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t.tagline[currentLang]}</p>
          <div className="flex space-x-4">
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">{t.contactUs[currentLang]}</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">{t.privacy[currentLang]}</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">{t.terms[currentLang]}</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">{t.helpCenter[currentLang]}</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

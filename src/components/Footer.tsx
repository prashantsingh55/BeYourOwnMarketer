'use client';

import React from 'react';
import { Language, PageRoute } from '../types';
import { translations } from '../data/translations';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onNavigate: (page: PageRoute) => void;
  onLanguageChange: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onNavigate,
  onLanguageChange,
}) => {
  const t = translations.footer;
  const navT = translations.nav;

  return (
    <footer className="bg-[#091b3b] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#265cb3] to-[#f6b996] flex items-center justify-center text-[#091b3b] font-black text-xl">
                B
              </div>
              <span className="font-extrabold text-xl font-heading text-white">
                BYOM
              </span>
            </div>
            <p className="text-xs text-[#c5c6cf] leading-relaxed">
              {currentLang === 'en'
                ? 'Empowering Nepali entrepreneurs and professionals with practical hands-on marketing skills.'
                : 'नेपाली उद्यमी र व्यवसायीहरूलाई व्यावहारिक मार्केटिङ सीपका साथ सशक्त बनाउँदै।'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f6b996]">
              {currentLang === 'en' ? 'Programs' : 'कार्यक्रमहरू'}
            </h4>
            <ul className="space-y-2 text-xs text-[#c5c6cf]">
              <li>
                <button onClick={() => onNavigate('programs')} className="hover:text-white transition-colors">
                  {navT.programs[currentLang]}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('book')} className="hover:text-white transition-colors">
                  {navT.workshops[currentLang]}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  {navT.blog[currentLang]}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">
                  {navT.gallery[currentLang]}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f6b996]">
              {currentLang === 'en' ? 'Kathmandu Hub' : 'काठमाडौँ हब'}
            </h4>
            <ul className="space-y-2 text-xs text-[#c5c6cf]">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#265cb3]" />
                <span>Baneshwor, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#265cb3]" />
                <span>+977 980-0000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#265cb3]" />
                <span>hello@byom.com.np</span>
              </li>
            </ul>
          </div>

          {/* Language Switcher */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f6b996]">
              {currentLang === 'en' ? 'Language' : 'भाषा'}
            </h4>
            <div className="inline-flex p-1 bg-white/10 rounded-xl border border-white/20">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'en' ? 'bg-white text-[#091b3b]' : 'text-white/70 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('np')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'np' ? 'bg-[#265cb3] text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                नेपाली
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8e8f99] gap-4">
          <p>{t.tagline[currentLang]}</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">{t.privacy[currentLang]}</a>
            <a href="#" className="hover:text-white transition-colors">{t.terms[currentLang]}</a>
            <a href="#" className="hover:text-white transition-colors">{t.helpCenter[currentLang]}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

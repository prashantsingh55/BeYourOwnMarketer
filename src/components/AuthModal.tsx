'use client';

import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { X, Mail, Lock, User, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentLang }) => {
  const t = translations.auth;

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      setLoggedIn(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white max-w-md w-full rounded-3xl shadow-2xl overflow-hidden relative p-8 space-y-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#091b3b] hover:bg-[#ebe7e5]"
        >
          <X className="w-5 h-5" />
        </button>

        {!loggedIn ? (
          <>
            {/* Header Banner */}
            <div className="space-y-1 text-center">
              <h3 className="text-2xl font-extrabold text-[#091b3b] font-heading">
                {t.empoweringHeading[currentLang]}
              </h3>
              <p className="text-xs text-[#5c5d63]">
                {t.empoweringSub[currentLang]}
              </p>
            </div>

            {/* Login / Register Switch */}
            <div className="grid grid-cols-2 p-1 bg-[#ebe7e5] rounded-xl text-xs font-bold border border-[#d6d0cc]">
              <button
                onClick={() => setActiveTab('login')}
                className={`py-2 rounded-lg transition-all ${
                  activeTab === 'login' ? 'bg-[#091b3b] text-white shadow-sm' : 'text-[#5c5d63]'
                }`}
              >
                {t.loginTab[currentLang]}
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`py-2 rounded-lg transition-all ${
                  activeTab === 'register' ? 'bg-[#091b3b] text-white shadow-sm' : 'text-[#5c5d63]'
                }`}
              >
                {t.createAccountTab[currentLang]}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-[#091b3b] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8e8f99] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Anish Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d6d0cc] text-sm outline-none focus:border-[#265cb3]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#091b3b] mb-1">
                  {t.emailLabel[currentLang]}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8e8f99] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@byom.com.np"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d6d0cc] text-sm outline-none focus:border-[#265cb3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#091b3b] mb-1">
                  {t.passwordLabel[currentLang]}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8e8f99] absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d6d0cc] text-sm outline-none focus:border-[#265cb3]"
                  />
                </div>
              </div>

              {activeTab === 'login' && (
                <div className="flex justify-end">
                  <a href="#" className="text-xs text-[#265cb3] font-bold hover:underline">
                    {t.forgotPassword[currentLang]}
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#091b3b] text-white font-extrabold text-sm btn-hover shadow-md"
              >
                {activeTab === 'login' ? t.signInBtn[currentLang] : t.signUpBtn[currentLang]}
              </button>
            </form>

            <div className="relative text-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e2dedc]" />
              </div>
              <span className="relative bg-white px-3 text-[11px] font-bold text-[#8e8f99]">
                {t.orContinueWith[currentLang]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="py-2.5 rounded-xl border border-[#d6d0cc] hover:bg-[#fcf9f8] text-xs font-bold text-[#091b3b] flex items-center justify-center gap-2"
              >
                <span>{t.google[currentLang]}</span>
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="py-2.5 rounded-xl border border-[#d6d0cc] hover:bg-[#fcf9f8] text-xs font-bold text-[#091b3b] flex items-center justify-center gap-2"
              >
                <span>{t.facebook[currentLang]}</span>
              </button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#10b981] mx-auto" />
            <h4 className="text-xl font-bold text-[#091b3b]">
              {currentLang === 'en' ? 'Welcome Back!' : 'पुनः स्वागत छ!'}
            </h4>
            <p className="text-xs text-[#5c5d63]">
              {currentLang === 'en' ? 'Redirecting to your student dashboard...' : 'तपाईंको ड्यासबोर्डमा लाँदैछ...'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

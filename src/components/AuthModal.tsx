'use client';

import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { X, Mail, Lock, User, Phone, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { isValidGmail, isValidNepalPhone } from '../lib/validation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onLoginSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentLang, onLoginSuccess }) => {
  const t = translations.auth;

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();
    if (!isValidGmail(cleanEmail)) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter a valid Gmail address (must end with @gmail.com)'
          : 'कृपया मान्य Gmail ठेगाना प्रविष्ट गर्नुहोस् (@gmail.com आवश्यक)'
      );
      return;
    }

    if (activeTab === 'register') {
      if (!fullName.trim()) {
        setErrorMsg(currentLang === 'en' ? 'Full Name is required' : 'पूरा नाम आवश्यक छ');
        return;
      }
      if (!phone.trim()) {
        setErrorMsg(
          currentLang === 'en'
            ? 'Nepal phone number is required (e.g. 98XXXXXXXX or 97XXXXXXXX)'
            : 'नेपाली फोन नम्बर आवश्यक छ (उदा. ९८XXXXXXXX वा ९७XXXXXXXX)'
        );
        return;
      }
      if (!isValidNepalPhone(phone)) {
        setErrorMsg(
          currentLang === 'en'
            ? 'Please enter a valid 10-digit Nepal mobile number starting with 98 or 97'
            : 'कृपया मान्य १०-अङ्कको नेपाली मोबाइल नम्बर प्रविष्ट गर्नुहोस् (९८ वा ९७ बाट सुरु)'
        );
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body =
        activeTab === 'login'
          ? { email: cleanEmail, password }
          : { name: fullName.trim(), email: cleanEmail, password, phone: phone.trim() };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setLoggedIn(true);
      setTimeout(() => {
        setLoggedIn(false);
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          onClose();
        }
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white max-w-md w-full rounded-3xl shadow-2xl overflow-hidden relative p-8 space-y-6 max-h-[90vh] overflow-y-auto"
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
              <h3 className="text-2xl font-extrabold text-[#0f172a] font-heading">
                {t.empoweringHeading[currentLang]}
              </h3>
              <p className="text-xs text-[#64748b]">
                {t.empoweringSub[currentLang]}
              </p>
            </div>

            {/* Login / Register Switch */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold border border-slate-200">
              <button
                onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
                className={`py-2.5 rounded-xl transition-all ${
                  activeTab === 'login' ? 'bg-[#0284c7] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                {t.loginTab[currentLang]}
              </button>
              <button
                onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
                className={`py-2.5 rounded-xl transition-all ${
                  activeTab === 'register' ? 'bg-[#0284c7] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                {t.createAccountTab[currentLang]}
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-center font-bold">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    {currentLang === 'en' ? 'Full Name' : 'पूरा नाम'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Anish Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#0f172a]">
                    {t.emailLabel[currentLang]}
                  </label>
                  <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                    @gmail.com
                  </span>
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
                  />
                </div>
              </div>

              {activeTab === 'register' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#0f172a]">
                      {currentLang === 'en' ? 'Nepal Phone Number' : 'नेपाली फोन नम्बर'}
                    </label>
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                      🇳🇵 98 / 97 (10 digits)
                    </span>
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      maxLength={14}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  {t.passwordLabel[currentLang]}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
                  />
                </div>
              </div>

              {activeTab === 'login' && (
                <div className="flex justify-end">
                  <a href="#" className="text-xs text-[#0284c7] font-bold hover:underline">
                    {t.forgotPassword[currentLang]}
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white font-extrabold text-sm btn-orange-hover shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
              >
                {loading ? 'Processing...' : (activeTab === 'login' ? t.signInBtn[currentLang] : t.signUpBtn[currentLang])}
              </button>
            </form>

            <div className="relative text-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-[11px] font-bold text-slate-400">
                {t.orContinueWith[currentLang]}
              </span>
            </div>

            {/* Google OAuth — real redirect flow */}
            <a
              href="/api/auth/google"
              className="w-full py-3 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-xs font-bold text-slate-700 flex items-center justify-center gap-2.5 transition-all group shadow-sm"
            >
              {/* Official Google G logo */}
              <svg width="18" height="18" viewBox="0 0 48 48" className="flex-shrink-0">
                <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.1-6.1C34.37 3.02 29.45 1 24 1 14.82 1 6.97 6.48 3.18 14.31l7.1 5.52C12.06 13.84 17.59 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.52 24.5c0-1.6-.15-3.15-.42-4.65H24v9.3h12.65c-.55 2.95-2.2 5.45-4.7 7.12l7.3 5.68c4.27-3.94 6.77-9.74 6.77-17.45z"/>
                <path fill="#FBBC05" d="M10.28 28.17A14.56 14.56 0 0 1 9.5 24c0-1.45.2-2.85.56-4.17l-7.1-5.52A23.94 23.94 0 0 0 0 24c0 3.87.93 7.54 2.57 10.77l7.71-6.6z"/>
                <path fill="#34A853" d="M24 47c5.45 0 10.02-1.8 13.35-4.9l-7.3-5.68c-1.84 1.23-4.2 1.95-6.05 1.95-6.41 0-11.85-4.34-13.72-10.2l-7.71 6.6C6.97 41.52 14.82 47 24 47z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              <span className="group-hover:text-slate-900">
                {currentLang === 'en' ? 'Continue with Google' : 'Google मार्फत जारी राख्नुहोस्'}
              </span>
            </a>
          </>
        ) : (
          <div className="py-12 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#0f172a]">
                {activeTab === 'login' ? 'Signed in successfully!' : 'Account created successfully!'}
              </h3>
              <p className="text-xs text-slate-500">Welcome to BYOM Academy.</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

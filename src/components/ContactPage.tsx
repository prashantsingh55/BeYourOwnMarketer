'use client';

import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Mail, Phone, Clock, Send, MessageSquare, CheckCircle2, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { isValidGmail, isValidNepalPhone } from '../lib/validation';

interface ContactPageProps {
  currentLang: Language;
  onOpenMentorModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentLang, onOpenMentorModal }) => {
  const t = translations.contact;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    org: '',
    message: '',
  });

  const WHATSAPP_NUMBER = '9779808193078';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMsg(currentLang === 'en' ? 'Please fill in all required fields.' : 'कृपया आवश्यक विवरण भर्नुहोस्।');
      return;
    }

    const cleanEmail = formData.email.trim().toLowerCase();
    if (!isValidGmail(cleanEmail)) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter a valid Gmail address (must end with @gmail.com)'
          : 'कृपया मान्य Gmail ठेगाना प्रविष्ट गर्नुहोस् (@gmail.com आवश्यक)'
      );
      return;
    }

    if (!isValidNepalPhone(formData.phone)) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter a valid 10-digit Nepal mobile number starting with 98 or 97'
          : 'कृपया मान्य १०-अङ्कको नेपाली मोबाइल नम्बर प्रविष्ट गर्नुहोस् (९८ वा ९७ बाट सुरु)'
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: cleanEmail,
          phone: formData.phone.trim(),
          subject: formData.org ? `Inquiry from ${formData.org}` : 'General Inquiry',
          message: formData.message || 'Contact request from website',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit contact message');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong while sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold text-[#0284c7] uppercase tracking-wider bg-[#0284c7]/10 px-3.5 py-1.5 rounded-full border border-[#0284c7]/20">
            {currentLang === 'en' ? 'Kathmandu Office & Mentors' : 'काठमाडौँ कार्यालय र मेन्टरहरू'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] font-heading tracking-tight">
            {t.headerTitle[currentLang]}
          </h1>
          <p className="text-base text-[#64748b] leading-relaxed">
            {t.headerSub[currentLang]}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold text-[#0f172a] font-heading border-b border-slate-200 pb-4">
                  {t.formTitle[currentLang]}
                </h3>

                {errorMsg && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-bold text-center">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                    {t.fullName[currentLang]} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anish Gurung"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-sm font-semibold outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-[#0f172a]">
                        {t.emailAddress[currentLang]} *
                      </label>
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                        @gmail.com
                      </span>
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="yourname@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-sm font-semibold outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-[#0f172a]">
                        {t.phoneNumber[currentLang]} *
                      </label>
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                        🇳🇵 98 / 97 (10 digits)
                      </span>
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="98XXXXXXXX"
                      maxLength={14}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-sm font-semibold outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                    {t.businessOrg[currentLang]}
                  </label>
                  <input
                    type="text"
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                    placeholder="e.g. Kathmandu Coffee Co."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-sm font-semibold outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                    {t.yourMessage[currentLang]} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={currentLang === 'en' ? 'How can our mentors help your growth?' : 'हाम्रा मेन्टरहरूले तपाईंको व्यवसाय बढाउन कसरी सहयोग गर्न सक्छन्?'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-sm font-semibold outline-none transition-all"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white font-extrabold text-sm btn-orange-hover flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 disabled:opacity-60 transition-all"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>{loading ? (currentLang === 'en' ? 'Sending via Email...' : 'इमेल पठाउँदैछ...') : t.sendMsgBtn[currentLang]}</span>
                  </button>

                  {/* Optional direct WhatsApp shortcut */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi BYOM! I'm ${formData.name || 'interested in BYOM'}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1db955] transition-colors shadow-md hover:scale-105"
                    title="Chat directly on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] font-heading">
                  {currentLang === 'en' ? 'Message Sent & Email Delivered!' : 'सन्देश पठाइयो र इमेल डेलिभर भयो!'}
                </h3>
                <p className="text-sm text-[#64748b] max-w-md mx-auto leading-relaxed">
                  {currentLang === 'en'
                    ? `A confirmation email has been sent to our team. Our team will review your message and reach out shortly.`
                    : `पुष्टिकरण इमेल पठाइएको छ। हाम्रो टोलीले चाँडै सम्पर्क गर्नेछ।`}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', org: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-[#0f172a] font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  {currentLang === 'en' ? 'Send Another Message' : 'अर्को सन्देश पठाउनुहोस्'}
                </button>
              </motion.div>
            )}
          </div>

          {/* Contact Info & Office Hours Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Info Card */}
            <div className="bg-[#080e1a] text-white p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold font-heading border-b border-white/10 pb-4">
                {t.contactInfoTitle[currentLang]}
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-white/10 text-amber-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">
                      {t.officeAddressLabel[currentLang]}
                    </span>
                    <p className="font-semibold text-white whitespace-pre-line mt-1">
                      {t.officeAddressValue[currentLang]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-white/10 text-amber-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">
                      {t.emailLabel[currentLang]}
                    </span>
                    <p className="font-semibold text-white mt-1">{t.emailValue[currentLang]}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-2xl bg-white/10 text-amber-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">
                      {t.phoneLabel[currentLang]}
                    </span>
                    <p className="font-semibold text-white mt-1">{t.phoneValue[currentLang]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours & Mentor Box */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 text-[#0f172a]">
                <Clock className="w-5 h-5 text-[#0284c7]" />
                <h3 className="text-lg font-bold font-heading">{t.officeHoursTitle[currentLang]}</h3>
              </div>

              <p className="text-xs text-[#475569] whitespace-pre-line leading-relaxed font-semibold">
                {t.officeHoursDays[currentLang]}
              </p>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <p className="text-xs font-bold text-[#0f172a]">
                  {t.mentorPrompt[currentLang]}
                </p>
                <button
                  onClick={onOpenMentorModal}
                  className="w-full py-3.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-extrabold transition-colors shadow-md shadow-sky-500/20 flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{t.talkToMentorBtn[currentLang]}</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

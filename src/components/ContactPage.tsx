'use client';

import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Mail, Phone, Clock, Send, MessageSquare, CheckCircle2, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactPageProps {
  currentLang: Language;
  onOpenMentorModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentLang, onOpenMentorModal }) => {
  const t = translations.contact;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    org: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(currentLang === 'en' ? 'Please fill in required fields.' : 'कृपया आवश्यक विवरण भर्नुहोस्।');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 bg-[#fcf9f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#265cb3] uppercase tracking-wider bg-[#265cb3]/10 px-3 py-1.5 rounded-full border border-[#265cb3]/20">
            {currentLang === 'en' ? 'Kathmandu Office & Mentors' : 'काठमाडौँ कार्यालय र मेन्टरहरू'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#091b3b] font-heading tracking-tight">
            {t.headerTitle[currentLang]}
          </h1>
          <p className="text-base text-[#5c5d63] leading-relaxed">
            {t.headerSub[currentLang]}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#e2dedc] shadow-sm space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold text-[#091b3b] font-heading border-b border-[#e2dedc] pb-4">
                  {t.formTitle[currentLang]}
                </h3>

                <div>
                  <label className="block text-xs font-bold text-[#091b3b] mb-1.5">
                    {t.fullName[currentLang]} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anish Gurung"
                    className="w-full px-4 py-3 rounded-xl border border-[#d6d0cc] focus:border-[#265cb3] focus:ring-2 focus:ring-[#265cb3]/20 text-sm font-semibold outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#091b3b] mb-1.5">
                      {t.emailAddress[currentLang]}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="anish@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#d6d0cc] focus:border-[#265cb3] focus:ring-2 focus:ring-[#265cb3]/20 text-sm font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#091b3b] mb-1.5">
                      {t.phoneNumber[currentLang]} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9801234567"
                      className="w-full px-4 py-3 rounded-xl border border-[#d6d0cc] focus:border-[#265cb3] focus:ring-2 focus:ring-[#265cb3]/20 text-sm font-semibold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#091b3b] mb-1.5">
                    {t.businessOrg[currentLang]}
                  </label>
                  <input
                    type="text"
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                    placeholder="e.g. Kathmandu Coffee Co."
                    className="w-full px-4 py-3 rounded-xl border border-[#d6d0cc] focus:border-[#265cb3] focus:ring-2 focus:ring-[#265cb3]/20 text-sm font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#091b3b] mb-1.5">
                    {t.yourMessage[currentLang]}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={currentLang === 'en' ? 'How can our mentors help your growth?' : 'हाम्रा मेन्टरहरूले तपाईंको व्यवसाय बढाउन कसरी सहयोग गर्न सक्छन्?'}
                    className="w-full px-4 py-3 rounded-xl border border-[#d6d0cc] focus:border-[#265cb3] focus:ring-2 focus:ring-[#265cb3]/20 text-sm font-semibold outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#091b3b] text-white font-extrabold text-sm btn-hover flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4 text-[#f6b996]" />
                  <span>{t.sendMsgBtn[currentLang]}</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#10b981]/10 text-[#10b981] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#091b3b] font-heading">
                  {currentLang === 'en' ? 'Message Sent Successfully!' : 'सन्देश सफलतापूर्वक पठाइयो!'}
                </h3>
                <p className="text-sm text-[#5c5d63] max-w-md mx-auto">
                  {currentLang === 'en'
                    ? 'Our team in Kathmandu will contact you via WhatsApp/Phone within 2 hours.'
                    : 'हाम्रो काठमाडौँ टोलीले २ घण्टाभित्र ह्वाट्सएप/फोनमार्फत सम्पर्क गर्नेछ।'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-[#091b3b] text-[#091b3b] font-bold text-xs"
                >
                  {currentLang === 'en' ? 'Send Another Message' : 'अर्को सन्देश पठाउनुहोस्'}
                </button>
              </motion.div>
            )}
          </div>

          {/* Contact Info & Office Hours Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Info Card */}
            <div className="bg-[#091b3b] text-white p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="text-xl font-bold font-heading border-b border-white/10 pb-4">
                {t.contactInfoTitle[currentLang]}
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-white/10 text-[#f6b996]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#c5c6cf] uppercase">
                      {t.officeAddressLabel[currentLang]}
                    </span>
                    <p className="font-semibold text-white whitespace-pre-line mt-1">
                      {t.officeAddressValue[currentLang]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-white/10 text-[#f6b996]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#c5c6cf] uppercase">
                      {t.emailLabel[currentLang]}
                    </span>
                    <p className="font-semibold text-white mt-1">{t.emailValue[currentLang]}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-white/10 text-[#f6b996]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#c5c6cf] uppercase">
                      {t.phoneLabel[currentLang]}
                    </span>
                    <p className="font-semibold text-white mt-1">{t.phoneValue[currentLang]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours & Mentor Box */}
            <div className="bg-white p-8 rounded-3xl border border-[#e2dedc] shadow-sm space-y-6">
              <div className="flex items-center space-x-3 text-[#091b3b]">
                <Clock className="w-5 h-5 text-[#265cb3]" />
                <h3 className="text-lg font-bold font-heading">{t.officeHoursTitle[currentLang]}</h3>
              </div>

              <p className="text-xs text-[#5c5d63] whitespace-pre-line leading-relaxed font-semibold">
                {t.officeHoursDays[currentLang]}
              </p>

              <div className="pt-4 border-t border-[#e2dedc] space-y-3">
                <p className="text-xs font-bold text-[#091b3b]">
                  {t.mentorPrompt[currentLang]}
                </p>
                <button
                  onClick={onOpenMentorModal}
                  className="w-full py-3 rounded-xl bg-[#265cb3] text-white text-xs font-bold hover:bg-[#1a4488] transition-colors shadow-sm flex items-center justify-center gap-2"
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

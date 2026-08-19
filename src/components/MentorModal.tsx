'use client';

import React, { useState } from 'react';
import { Language } from '../types';
import { mentors } from '../data/content';
import { X, Send, MessageCircle, Sparkles, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface MentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const MentorModal: React.FC<MentorModalProps> = ({ isOpen, onClose, currentLang }) => {
  const [selectedMentor, setSelectedMentor] = useState(mentors[0].id);
  const [userMessage, setUserMessage] = useState('');

  if (!isOpen) return null;

  const mentorObj = mentors.find((m) => m.id === selectedMentor) || mentors[0];
  const rawPhone = (mentorObj.whatsappNumber || '+9779808193078').replace(/[^0-9]/g, '');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultMsg = userMessage.trim()
      ? encodeURIComponent(`Hello ${mentorObj.name}, I found your profile on BYOM website.\n\nMy Message: ${userMessage.trim()}`)
      : encodeURIComponent(`Hello ${mentorObj.name}, I would like to inquire about your BYOM training sessions and mentorship.`);
    
    // Open WhatsApp directly with the mentor
    window.open(`https://wa.me/${rawPhone}?text=${defaultMsg}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white max-w-xl w-full rounded-3xl shadow-2xl overflow-hidden relative p-6 sm:p-8 space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#0f172a] hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold text-[#EF7B3A] uppercase tracking-wider bg-[#FFF5EE] px-3 py-0.5 rounded-full border border-[#EF7B3A]/30">
              {currentLang === 'en' ? 'Direct Mentor Support' : 'प्रत्यक्ष मेन्टर परामर्श'}
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-[#172033] font-heading pt-1">
            {currentLang === 'en' ? 'Talk to a BYOM Mentor' : 'BYOM मेन्टरसँग कुरा गर्नुहोस्'}
          </h3>
          <p className="text-xs text-[#64748b]">
            {currentLang === 'en'
              ? 'Connect directly with our curriculum instructors on WhatsApp for guidance.'
              : 'मार्गदर्शनका लागि ह्वाट्सएपमा हाम्रा पाठ्यक्रम प्रशिक्षकहरूसँग सीधा सम्पर्क गर्नुहोस्।'}
          </p>
        </div>

        {/* Select Mentor Grid (4 Teachers from Curriculum) */}
        <div className="space-y-2.5">
          <label className="block text-xs font-extrabold text-[#172033] uppercase tracking-wider">
            {currentLang === 'en' ? 'Select Instructor' : 'प्रशिक्षक छान्नुहोस्'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {mentors.map((m) => {
              const isSel = selectedMentor === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMentor(m.id)}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    isSel
                      ? 'border-[#2D9EDE] bg-[#2D9EDE]/10 ring-2 ring-[#2D9EDE]/40 shadow-sm'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'
                  }`}
                >
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-11 h-11 rounded-full mx-auto mb-1.5 object-cover ring-2 ring-white shadow-xs"
                  />
                  <span className="block font-bold text-xs text-[#172033] truncate">{m.name}</span>
                  <span className="block text-[9px] font-semibold text-[#64748b] line-clamp-1">{m.expertise[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Mentor Details & WhatsApp Number Badge */}
        <div className="p-4 rounded-2xl bg-[#F5F9FC] border border-[#E2EEF7] space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="font-extrabold text-sm text-[#172033]">{mentorObj.name}</span>
              <p className="text-[11px] text-[#2D9EDE] font-bold">{mentorObj.role[currentLang]}</p>
            </div>
            {/* Mentor WhatsApp Number Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold">
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>{mentorObj.whatsappNumber || '+977 9808193078'}</span>
            </div>
          </div>
          <p className="text-xs text-[#475569] leading-relaxed">{mentorObj.bio[currentLang]}</p>
        </div>

        {/* Send Message Form */}
        <form onSubmit={handleSendMessage} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-[#172033] mb-1">
              {currentLang === 'en' ? 'Your Question / Message' : 'तपाईंको प्रश्न / सन्देश'}
            </label>
            <textarea
              rows={3}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder={
                currentLang === 'en'
                  ? `Write your message to ${mentorObj.name}...`
                  : `${mentorObj.name} लाई आफ्नो सन्देश लेख्नुहोस्...`
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-[#2D9EDE] focus:ring-2 focus:ring-[#2D9EDE]/20 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{currentLang === 'en' ? `Send Message on WhatsApp` : `ह्वाट्सएपमा सन्देश पठाउनुहोस्`}</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

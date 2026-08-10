'use client';

import React, { useState } from 'react';
import { Language } from '../types';
import { mentors } from '../data/content';
import { X, Calendar, CheckCircle2, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

interface MentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const MentorModal: React.FC<MentorModalProps> = ({ isOpen, onClose, currentLang }) => {
  const [selectedMentor, setSelectedMentor] = useState(mentors[0].id);
  const [scheduled, setScheduled] = useState(false);

  if (!isOpen) return null;

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduled(true);
    setTimeout(() => {
      setScheduled(false);
      onClose();
    }, 2000);
  };

  const mentorObj = mentors.find((m) => m.id === selectedMentor) || mentors[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white max-w-xl w-full rounded-3xl shadow-2xl overflow-hidden relative p-8 space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#091b3b] hover:bg-[#ebe7e5]"
        >
          <X className="w-5 h-5" />
        </button>

        {!scheduled ? (
          <>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#ac7859] uppercase tracking-wider bg-[#f6b996]/30 px-3 py-1 rounded-full">
                1-on-1 Consultation
              </span>
              <h3 className="text-2xl font-extrabold text-[#091b3b] font-heading pt-2">
                {currentLang === 'en' ? 'Talk to a BYOM Mentor' : 'BYOM मेन्टरसँग कुरा गर्नुहोस्'}
              </h3>
              <p className="text-xs text-[#5c5d63]">
                {currentLang === 'en'
                  ? 'Get personalized marketing career or business growth advice.'
                  : 'व्यक्तिगत मार्केटिङ करियर वा व्यापार वृद्धिका लागि सल्लाह लिनुहोस्।'}
              </p>
            </div>

            {/* Select Mentor */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#091b3b]">
                {currentLang === 'en' ? 'Select Mentor' : 'मेन्टर छान्नुहोस्'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {mentors.map((m) => {
                  const isSel = selectedMentor === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMentor(m.id)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isSel
                          ? 'border-[#265cb3] bg-[#265cb3]/5 ring-2 ring-[#265cb3]/30'
                          : 'border-[#e2dedc] bg-[#fcf9f8]'
                      }`}
                    >
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                      />
                      <span className="block font-bold text-xs text-[#091b3b]">{m.name}</span>
                      <span className="block text-[10px] text-[#5c5d63] line-clamp-1">{m.role[currentLang]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mentor Bio Box */}
            <div className="p-4 rounded-2xl bg-[#fcf9f8] border border-[#d6d0cc] space-y-2">
              <span className="text-xs font-bold text-[#091b3b]">{mentorObj.name} Bio</span>
              <p className="text-xs text-[#5c5d63]">{mentorObj.bio[currentLang]}</p>
            </div>

            <form onSubmit={handleSchedule} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#091b3b] mb-1">
                    {currentLang === 'en' ? 'Preferred Date' : 'मनपर्ने मिति'}
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-[#d6d0cc] text-xs font-semibold outline-none focus:border-[#265cb3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#091b3b] mb-1">
                    {currentLang === 'en' ? 'Preferred Time' : 'मनपर्ने समय'}
                  </label>
                  <select className="w-full px-3 py-2 rounded-xl border border-[#d6d0cc] text-xs font-semibold outline-none focus:border-[#265cb3]">
                    <option>10:00 AM - 10:30 AM</option>
                    <option>2:00 PM - 2:30 PM</option>
                    <option>5:00 PM - 5:30 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#091b3b] text-white font-extrabold text-sm btn-hover flex items-center justify-center gap-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4 text-[#f6b996]" />
                <span>{currentLang === 'en' ? 'Book 15-Min Free Call' : '१५-मिनेटको नि:शुल्क कल बुक गर्नुहोस्'}</span>
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#10b981] mx-auto" />
            <h4 className="text-xl font-bold text-[#091b3b]">
              {currentLang === 'en' ? 'Call Scheduled!' : 'कल निश्चित भयो!'}
            </h4>
            <p className="text-xs text-[#5c5d63]">
              {currentLang === 'en'
                ? `A Google Meet invitation with ${mentorObj.name} has been sent to your calendar.`
                : `गूगल मिटको निमन्त्रणा इमेल पठाइएको छ।`}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

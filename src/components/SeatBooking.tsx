'use client';

import React, { useState, useEffect } from 'react';
import { Language, Seat, SeatStatus, PageRoute } from '../types';
import { translations } from '../data/translations';
import { initialSeatData } from '../data/content';
import {
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  CreditCard,
  ShieldCheck,
  Building,
  User,
  Mail,
  Phone,
  Check,
  Ticket,
  Calendar,
  ArrowRight,
  Printer,
  QrCode,
} from 'lucide-react';
import { motion } from 'motion/react';

import { isValidGmail, isValidNepalPhone } from '../lib/validation';

interface SeatBookingProps {
  currentLang: Language;
  onNavigate?: (route: PageRoute) => void;
  onBookingSuccess?: (user: any) => void;
}

interface ClassSessionItem {
  id: string;
  nameEn: string;
  nameNp: string;
  city: string;
  batch: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export const SeatBooking: React.FC<SeatBookingProps> = ({
  currentLang,
  onNavigate,
  onBookingSuccess,
}) => {
  const t = translations.booking;

  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedCity, setSelectedCity] = useState<string>('Kathmandu Hub');
  const [selectedBatch, setSelectedBatch] = useState<string>('Daytime / Afternoon (12:00 PM - 3:00 PM)');
  const [seats, setSeats] = useState<Seat[]>(initialSeatData);
  const [selectedSeatId, setSelectedSeatId] = useState<string>('B4');

  // Active Sessions / Dates from backend
  const [sessions, setSessions] = useState<ClassSessionItem[]>([]);
  const [currentSessionDate, setCurrentSessionDate] = useState<string>('Sept 1, 2026 – Sept 7, 2026');
  const [currentSessionName, setCurrentSessionName] = useState<string>('7-Day Marketing Mastery Cohort');

  // Contact Details & Inline Field Errors
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
  }>({});

  // Payment & Booking Confirmation State
  const [paymentMethod, setPaymentMethod] = useState<'fonepay'>('fonepay');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Fee split constants
  const DEPOSIT_AMOUNT = 5000;
  const REMAINING_AMOUNT = 10000;
  const TOTAL_FEE = 15000;

  // Fetch live upcoming sessions to display exact updated dates
  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await fetch('/api/sessions');
        if (res.ok) {
          const data = await res.json();
          if (data.sessions && data.sessions.length > 0) {
            setSessions(data.sessions);
          }
        }
      } catch (err) {
        console.error('Failed to load session dates:', err);
      }
    }
    fetchSessions();
  }, []);

  // Update active session dates when city or batch changes
  useEffect(() => {
    const matched = sessions.find(
      (s) => s.city.includes(selectedCity.split(' ')[0]) && s.isActive !== false
    );
    if (matched && matched.startDate && matched.endDate) {
      setCurrentSessionDate(`${matched.startDate} to ${matched.endDate}`);
      setCurrentSessionName(matched.nameEn || '7-Day Marketing Mastery Cohort');
    } else {
      setCurrentSessionDate('Sept 1, 2026 – Sept 7, 2026');
      setCurrentSessionName('7-Day Marketing Mastery Cohort');
    }
  }, [selectedCity, selectedBatch, sessions]);

  // Fetch seats dynamically from backend whenever city, batch, or sessionDate changes
  const fetchSeats = React.useCallback(async () => {
    try {
      const res = await fetch(
        `/api/seats?city=${encodeURIComponent(selectedCity)}&batch=${encodeURIComponent(selectedBatch)}&sessionDate=${encodeURIComponent(currentSessionDate)}`
      );
      const data = await res.json();
      if (res.ok && data.seats && data.seats.length > 0) {
        setSeats(data.seats);
        const currentSelected = data.seats.find(
          (s: Seat) => s.id === selectedSeatId || s.seatLabel === selectedSeatId
        );
        if (!currentSelected || currentSelected.status === 'booked' || currentSelected.status === 'reserved') {
          const avail = data.seats.find(
            (s: Seat) => s.status === 'available' || s.status === 'vip'
          );
          if (avail) setSelectedSeatId(avail.seatLabel || avail.id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch dynamic seats:', err);
    }
  }, [selectedCity, selectedBatch, currentSessionDate, selectedSeatId]);

  useEffect(() => {
    fetchSeats();
  }, [selectedCity, selectedBatch, currentSessionDate]);

  const cities = [
    { name: 'Kathmandu Hub', address: 'Tech Park, Baneshwor' },
    { name: 'Pokhara Campus', address: 'Lakeside, Ward 6' },
    { name: 'Chitwan Center', address: 'Lions Chowk, Narayangarh' },
    { name: 'Butwal Hub', address: 'Traffic Chowk' },
  ];

  const batches = [
    { id: 'morning', label: 'Morning (6:00 AM - 9:00 AM)', slots: '4 Seats Left' },
    { id: 'daytime', label: 'Daytime / Afternoon (12:00 PM - 3:00 PM)', slots: '3 Seats Left' },
  ];

  const selectedSeatObj = seats.find(
    (s) => s.id === selectedSeatId || s.seatLabel === selectedSeatId
  );
  const totalAmount = selectedSeatObj ? selectedSeatObj.priceNpr : TOTAL_FEE;
  const depositAmount = selectedSeatObj?.isVip ? 6000 : DEPOSIT_AMOUNT;

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked' || seat.status === 'reserved') return;

    const seatIdToSelect = seat.seatLabel || seat.id;
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id === seat.id || s.seatLabel === seatIdToSelect) return { ...s, status: 'selected' };
        if (s.id === selectedSeatId || s.seatLabel === selectedSeatId) return { ...s, status: s.isVip ? 'vip' : 'available' };
        return s;
      })
    );
    setSelectedSeatId(seatIdToSelect);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const errors: { fullName?: string; email?: string; phone?: string } = {};

    if (!fullName.trim()) {
      errors.fullName = currentLang === 'en' ? 'Full name is required' : 'पूरा नाम आवश्यक छ';
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      errors.email = currentLang === 'en' ? 'Gmail address is required' : 'Gmail ठेगाना आवश्यक छ';
    } else if (!isValidGmail(cleanEmail)) {
      errors.email =
        currentLang === 'en'
          ? 'Please enter a valid Gmail address (must end with @gmail.com)'
          : 'कृपया मान्य Gmail ठेगाना (@gmail.com) प्रविष्ट गर्नुहोस्';
    }

    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      errors.phone = currentLang === 'en' ? 'Nepal phone number is required' : 'नेपाली फोन नम्बर आवश्यक छ';
    } else if (!isValidNepalPhone(cleanPhone)) {
      errors.phone =
        currentLang === 'en'
          ? 'Please enter a valid 10-digit Nepal mobile number starting with 98 or 97 (e.g. 98XXXXXXXX)'
          : 'कृपया ९८ वा ९७ बाट सुरु हुने मान्य १०-अङ्कको नेपाली मोबाइल नम्बर प्रविष्ट गर्नुहोस्';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setActiveStep(5);
  };

  const handleConfirmPay = async () => {
    setIsProcessing(true);
    setErrorMsg('');

    try {
      const cleanSeatToSend = selectedSeatObj?.seatLabel || (selectedSeatId.includes('-') ? selectedSeatId.split('-').pop()! : selectedSeatId);

      // Create Booking Record in Backend DB & auto create/link user account
      const bookingRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: selectedCity,
          batch: selectedBatch,
          selectedSeatId: cleanSeatToSend,
          fullName,
          email,
          phone,
          organization,
          sessionDate: currentSessionDate,
          sessionName: currentSessionName,
          paymentMethod: 'fonepay',
          depositAmount,
        }),
      });

      const bookingData = await bookingRes.json();
      if (!bookingRes.ok) {
        throw new Error(bookingData.error || 'Failed to create booking');
      }

      setConfirmedBooking(bookingData.booking || {
        id: bookingData.bookingId,
        sessionDate: currentSessionDate,
        createdAt: new Date().toISOString(),
      });

      // Update parent auth state if user was auto-created or logged in
      if (bookingData.user && onBookingSuccess) {
        onBookingSuccess(bookingData.user);
      }

      // Refresh seats to ensure booked seat is immediately locked on the grid
      await fetchSeats();

      setIsCompleted(true);
    } catch (err: any) {
      console.error('Booking error:', err);
      setErrorMsg(err.message || 'Booking failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div className="py-12 md:py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-extrabold text-[#ea580c] uppercase tracking-wider bg-[#fff7ed] px-3.5 py-1.5 rounded-full border border-[#fed7aa] shadow-sm">
            {currentLang === 'en' ? 'Physical Classroom Reservation' : 'भौतिक कक्षाकोठा आरक्षण'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] font-heading tracking-tight">
            {t.headerTitle[currentLang]}
          </h1>
          <p className="text-base text-[#64748b]">
            {t.headerSub[currentLang]}
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-10" />
            {[
              { num: 1, label: t.steps.step1[currentLang] },
              { num: 2, label: t.steps.step2[currentLang] },
              { num: 3, label: t.steps.step3[currentLang] },
              { num: 4, label: t.steps.step4[currentLang] },
              { num: 5, label: t.steps.step5[currentLang] },
            ].map((step) => {
              const isPast = activeStep > step.num;
              const isCurrent = activeStep === step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => !isCompleted && setActiveStep(step.num)}
                  disabled={isCompleted}
                  className="flex flex-col items-center gap-1.5 focus:outline-none"
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${
                      isPast
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : isCurrent
                        ? 'bg-[#0284c7] text-white shadow-md shadow-sky-500/25 ring-4 ring-[#0284c7]/20'
                        : 'bg-white text-[#64748b] border-2 border-slate-200'
                    }`}
                  >
                    {isPast ? <Check className="w-5 h-5" /> : step.num}
                  </div>
                  <span className={`text-xs font-semibold ${isCurrent ? 'text-[#0f172a] font-bold' : 'text-[#64748b]'}`}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Layout */}
        {!isCompleted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Active Step Controls */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              
              {/* Step 1: City Selection */}
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#0f172a] font-heading">
                      {currentLang === 'en' ? 'Step 1: Choose City & Campus' : 'चरण १: शहर र क्याम्पस छान्नुहोस्'}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7] bg-[#0284c7]/10 px-3 py-1 rounded-xl">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{currentSessionDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cities.map((c) => {
                      const isKathmandu = c.name === 'Kathmandu Hub';
                      const isSel = selectedCity === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => isKathmandu && setSelectedCity(c.name)}
                          disabled={!isKathmandu}
                          className={`p-5 rounded-2xl border text-left transition-all relative ${
                            !isKathmandu
                              ? 'border-slate-200 bg-slate-100/70 opacity-60 cursor-not-allowed'
                              : isSel
                              ? 'border-[#0284c7] bg-[#0284c7]/5 shadow-sm ring-2 ring-[#0284c7]/30'
                              : 'border-slate-200 bg-[#f8fafc] hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-base text-[#0f172a]">{c.name}</span>
                            <MapPin className={`w-5 h-5 ${isSel ? 'text-[#0284c7]' : 'text-slate-400'}`} />
                          </div>
                          <span className="text-xs text-[#64748b]">{c.address}</span>
                          {!isKathmandu && (
                            <span className="mt-2 inline-block text-[10px] font-extrabold uppercase tracking-wider bg-[#fff7ed] text-[#ea580c] px-2 py-0.5 rounded-full border border-[#fed7aa]">
                              Coming Soon
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-7 py-3.5 rounded-xl bg-[#0f172a] hover:bg-[#0284c7] text-white font-extrabold text-sm btn-hover transition-colors shadow-sm"
                    >
                      {currentLang === 'en' ? 'Next: Choose Batch' : 'अर्को: ब्याच छान्नुहोस्'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Batch Selection */}
              {activeStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#0f172a] font-heading">
                      {currentLang === 'en' ? 'Step 2: Select Preferred Batch Time' : 'चरण २: मनपर्ने ब्याच समय छान्नुहोस्'}
                    </h3>
                    <span className="text-xs font-bold text-[#f97316] bg-[#fff7ed] px-3 py-1 rounded-xl border border-[#fed7aa]">
                      7-Day Program
                    </span>
                  </div>

                  <div className="space-y-3">
                    {batches.map((b) => {
                      const isSel = selectedBatch === b.label;
                      return (
                        <button
                          key={b.id}
                          onClick={() => setSelectedBatch(b.label)}
                          className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                            isSel
                              ? 'border-[#0284c7] bg-[#0284c7]/5 shadow-sm ring-2 ring-[#0284c7]/30'
                              : 'border-slate-200 bg-[#f8fafc] hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Clock className={`w-5 h-5 ${isSel ? 'text-[#0284c7]' : 'text-slate-400'}`} />
                            <span className="font-bold text-sm text-[#0f172a]">{b.label}</span>
                          </div>
                          <span className="text-xs font-extrabold bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa] px-3 py-1 rounded-full">
                            {b.slots}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-[#0f172a] font-bold text-sm hover:bg-slate-50"
                    >
                      {currentLang === 'en' ? 'Back' : 'पछाडि'}
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      className="px-7 py-3.5 rounded-xl bg-[#0f172a] hover:bg-[#0284c7] text-white font-extrabold text-sm btn-hover transition-colors shadow-sm"
                    >
                      {currentLang === 'en' ? 'Next: Pick Seat' : 'अर्को: सिट छान्नुहोस्'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Interactive 5x5 Physical Seat Grid */}
              {activeStep === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#0f172a] font-heading">
                        {currentLang === 'en' ? 'Step 3: Select Your Physical Seat' : 'चरण ३: आफ्नो भौतिक सिट छान्नुहोस्'}
                      </h3>
                      <p className="text-xs text-[#64748b] mt-0.5">
                        {currentLang === 'en' ? 'Kathmandu Hub • 25 Capacity Classroom' : 'काठमाडौँ हब • २५ क्षमताको कक्षाकोठा'}
                      </p>
                    </div>
                  </div>

                  {/* Stage / Trainer Podium */}
                  <div className="w-full py-3 bg-[#080e1a] text-white rounded-2xl text-center shadow-inner border border-slate-800">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#38bdf8]">
                      {currentLang === 'en' ? '🖥️ TRAINER STAGE & LIVE SCREEN' : '🖥️ प्रशिक्षक स्टेज र स्क्रिन'}
                    </span>
                  </div>

                  {/* Seat Grid Layout (5 Rows x 5 Cols) */}
                  <div className="grid grid-cols-5 gap-3 max-w-md mx-auto p-4 bg-slate-100/60 rounded-3xl border border-slate-200">
                    {seats.map((seat) => {
                      const isSelected = seat.id === selectedSeatId || seat.seatLabel === selectedSeatId;
                      const isBooked = seat.status === 'booked' || seat.status === 'reserved';
                      const isVip = seat.isVip;

                      return (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat)}
                          disabled={isBooked}
                          className={`h-12 sm:h-14 rounded-2xl font-black text-xs sm:text-sm flex flex-col items-center justify-center transition-all ${
                            isBooked
                              ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-50'
                              : isSelected
                              ? 'bg-gradient-to-br from-[#ff6b00] to-[#ea580c] text-white shadow-lg shadow-orange-500/30 scale-105 ring-4 ring-orange-500/20'
                              : isVip
                              ? 'bg-[#f0f9ff] text-[#0284c7] border-2 border-[#0284c7] hover:bg-[#e0f2fe]'
                              : 'bg-white text-[#0f172a] border border-slate-200 hover:border-[#0284c7] hover:shadow-sm'
                          }`}
                        >
                          <span>{seat.seatLabel || seat.id}</span>
                          {isVip && !isSelected && !isBooked && (
                            <span className="text-[9px] font-bold text-[#ea580c]">VIP</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#64748b] pt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-md bg-white border border-slate-200" />
                      <span>{currentLang === 'en' ? 'Available' : 'उपलब्ध'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-md bg-[#f0f9ff] border-2 border-[#0284c7]" />
                      <span>{currentLang === 'en' ? 'Front Row VIP' : 'अघिल्लो सिट VIP'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-md bg-gradient-to-r from-[#ff6b00] to-[#ea580c]" />
                      <span>{currentLang === 'en' ? 'Selected' : 'छानिएको'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-md bg-slate-300 opacity-50" />
                      <span>{currentLang === 'en' ? 'Reserved' : 'आरक्षित'}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-[#0f172a] font-bold text-sm hover:bg-slate-50"
                    >
                      {currentLang === 'en' ? 'Back' : 'पछाडि'}
                    </button>
                    <button
                      onClick={() => setActiveStep(4)}
                      className="px-7 py-3.5 rounded-xl bg-[#0f172a] hover:bg-[#0284c7] text-white font-extrabold text-sm btn-hover transition-colors shadow-sm"
                    >
                      {currentLang === 'en' ? 'Next: Contact Info' : 'अर्को: सम्पर्क विवरण'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Contact & Registration Details Form */}
              {activeStep === 4 && (
                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="text-xl font-bold text-[#0f172a] font-heading">
                      {currentLang === 'en' ? 'Step 4: Student Details & Ticket Registration' : 'चरण ४: विद्यार्थी विवरण र टिकट दर्ता'}
                    </h3>
                    <p className="text-xs text-[#64748b] mt-0.5">
                      {currentLang === 'en'
                        ? 'An account will automatically be created so you can access your dashboard and ticket anytime.'
                        : 'तपाईंको खाता स्वचालित रूपमा सिर्जना हुनेछ जसले गर्दा तपाईं जुनसुकै बेला ड्यासबोर्ड र टिकट हेर्न सक्नुहुन्छ।'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                        {currentLang === 'en' ? 'Full Name *' : 'पूरा नाम *'}
                      </label>
                      <div className="relative">
                        <User className={`w-4 h-4 absolute left-3.5 top-3.5 ${fieldErrors.fullName ? 'text-rose-400' : 'text-slate-400'}`} />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (fieldErrors.fullName) setFieldErrors((prev) => ({ ...prev, fullName: undefined }));
                          }}
                          placeholder="e.g. Ramesh Thapa"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold outline-none transition-all ${
                            fieldErrors.fullName
                              ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-rose-900'
                              : 'border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-[#0f172a]'
                          }`}
                        />
                      </div>
                      {fieldErrors.fullName && (
                        <p className="mt-1.5 text-xs text-rose-600 font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block flex-shrink-0" />
                          <span>{fieldErrors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-[#0f172a]">
                            {currentLang === 'en' ? 'Email Address *' : 'इमेल ठेगाना *'}
                          </label>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            fieldErrors.email
                              ? 'text-rose-600 bg-rose-50 border-rose-200'
                              : 'text-sky-600 bg-sky-50 border-sky-200'
                          }`}>
                            @gmail.com
                          </span>
                        </div>
                        <div className="relative">
                          <Mail className={`w-4 h-4 absolute left-3.5 top-3.5 ${fieldErrors.email ? 'text-rose-400' : 'text-slate-400'}`} />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                            }}
                            placeholder="yourname@gmail.com"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold outline-none transition-all ${
                              fieldErrors.email
                                ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-rose-900'
                                : 'border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-[#0f172a]'
                            }`}
                          />
                        </div>
                        {fieldErrors.email && (
                          <p className="mt-1.5 text-xs text-rose-600 font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block flex-shrink-0" />
                            <span>{fieldErrors.email}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-[#0f172a]">
                            {currentLang === 'en' ? 'Nepal Mobile / WhatsApp *' : 'नेपाली मोबाइल / ह्वाट्सएप *'}
                          </label>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            fieldErrors.phone
                              ? 'text-rose-600 bg-rose-50 border-rose-200'
                              : 'text-orange-600 bg-orange-50 border-orange-200'
                          }`}>
                            🇳🇵 98 / 97 (10 digits)
                          </span>
                        </div>
                        <div className="relative">
                          <Phone className={`w-4 h-4 absolute left-3.5 top-3.5 ${fieldErrors.phone ? 'text-rose-400' : 'text-slate-400'}`} />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                            }}
                            placeholder="98XXXXXXXX"
                            maxLength={14}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold outline-none transition-all ${
                              fieldErrors.phone
                                ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-rose-900'
                                : 'border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-[#0f172a]'
                            }`}
                          />
                        </div>
                        {fieldErrors.phone && (
                          <p className="mt-1.5 text-xs text-rose-600 font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block flex-shrink-0" />
                            <span>{fieldErrors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                        {currentLang === 'en' ? 'Business or Organization (Optional)' : 'व्यवसाय वा संस्था (वैकल्पिक)'}
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="e.g. Kathmandu Apparel Co."
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 text-sm font-semibold outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-[#0f172a] font-bold text-sm hover:bg-slate-50"
                    >
                      {currentLang === 'en' ? 'Back' : 'पछाडि'}
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-3.5 rounded-xl bg-[#0f172a] hover:bg-[#0284c7] text-white font-extrabold text-sm btn-hover transition-colors shadow-sm"
                    >
                      {currentLang === 'en' ? 'Proceed to Payment' : 'भुक्तानीमा जानुहोस्'}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 5: Fonepay QR Deposit Confirmation */}
              {activeStep === 5 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="text-xl font-bold text-[#0f172a] font-heading">
                      {currentLang === 'en' ? 'Step 5: Confirm Deposit via Fonepay QR' : 'चरण ५: Fonepay QR मार्फत डिपोजिट पुष्टि'}
                    </h3>
                    <p className="text-xs text-[#64748b] mt-0.5">
                      {currentLang === 'en'
                        ? 'Pay Rs. 5,000 deposit to secure your seat. Remaining fee is due after session starts.'
                        : 'आफ्नो सिट सुरक्षित गर्न Rs. ५,००० डिपोजिट तिर्नुहोस्। बाँकी शुल्क सत्र सुरु भएपछि बुझाउनुहोस्।'}
                    </p>
                  </div>

                  {/* Fonepay QR Box */}
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex-shrink-0">
                      <img
                        src="/fonepay-qr.png"
                        alt="Fonepay QR Code"
                        className="w-44 h-44 object-contain rounded-xl"
                      />
                    </div>

                    <div className="space-y-3 text-left">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200 inline-block">
                        Fonepay Official Merchant
                      </span>
                      <h4 className="text-base font-extrabold text-[#0f172a]">
                        BE YOUR OWN MARKETER
                      </h4>
                      <div className="space-y-1 text-xs text-slate-600">
                        <p><strong>Merchant:</strong> BYOM Academy Pvt. Ltd.</p>
                        <p><strong>Session:</strong> {currentSessionDate}</p>
                        <p><strong>Amount:</strong> <span className="text-lg font-black text-[#0f172a]">Rs. {depositAmount.toLocaleString()}</span></p>
                      </div>
                      <p className="text-[11px] text-[#64748b]">
                        {currentLang === 'en'
                          ? 'Scan with any mobile banking or Fonepay app to complete deposit.'
                          : 'जुनसुकै मोबाइल बैंकिङ वा Fonepay एपबाट स्क्यान गरी डिपोजिट तिर्नुहोस्।'}
                      </p>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 text-xs bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-center font-bold">
                      {errorMsg}
                    </div>
                  )}

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setActiveStep(4)}
                      disabled={isProcessing}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-[#0f172a] font-bold text-sm disabled:opacity-50 hover:bg-slate-50"
                    >
                      {currentLang === 'en' ? 'Back' : 'पछाडि'}
                    </button>
                    <button
                      onClick={handleConfirmPay}
                      disabled={isProcessing}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-extrabold text-sm btn-hover shadow-lg flex items-center gap-2 disabled:opacity-50 transition-all"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>
                        {isProcessing
                          ? (currentLang === 'en' ? 'Confirming Ticket…' : 'पुष्टि गर्दैछ…')
                          : (currentLang === 'en' ? 'I Have Paid — Confirm Booking' : 'मैले तिरें — बुकिङ पुष्टि गर्नुहोस्')}
                      </span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Dynamic Real-time Booking Summary Panel */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#080e1a] via-[#0b132b] to-[#0f172a] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-extrabold font-heading text-white">
                  {t.summaryTitle[currentLang]}
                </h3>
                <span className="text-xs bg-[#ff6b00]/20 text-amber-300 border border-[#ff6b00]/30 px-3 py-1 rounded-full font-extrabold">
                  7-Day Mastery
                </span>
              </div>

              <div className="space-y-4 text-sm">
                
                {/* Cohort Dates Highlight */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-extrabold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Cohort Schedule</span>
                  </div>
                  <p className="font-extrabold text-white text-sm">{currentSessionDate}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t.campus[currentLang]}</span>
                  <span className="font-bold text-white">{selectedCity}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t.batch[currentLang]}</span>
                  <span className="font-bold text-white text-xs">{selectedBatch}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t.selectedSeat[currentLang]}</span>
                  <span className="font-extrabold text-white bg-gradient-to-r from-[#ff6b00] to-[#f97316] px-3.5 py-1 rounded-xl shadow-sm">
                    {selectedSeatObj?.seatLabel || selectedSeatId} {selectedSeatObj?.isVip ? '⭐ VIP' : ''}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{currentLang === 'en' ? 'Total Program Fee' : 'कुल कार्यक्रम शुल्क'}</span>
                    <span>Rs. {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#38bdf8] font-bold">{currentLang === 'en' ? '✓ Pay Now (Deposit)' : '✓ अहिले तिर्नुहोस् (डिपोजिट)'}</span>
                    <span className="text-[#38bdf8] font-extrabold">Rs. {depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{currentLang === 'en' ? 'After Session Starts' : 'सत्र सुरु भएपछि'}</span>
                    <span>Rs. {(totalAmount - depositAmount).toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{currentLang === 'en' ? 'Due Now' : 'अहिले तिर्नुपर्ने'}</span>
                    <span className="text-2xl font-extrabold text-amber-300 font-heading">
                      Rs. {depositAmount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {currentLang === 'en' ? `Rs. ${(totalAmount - depositAmount).toLocaleString()} payable after session starts` : `Rs. ${(totalAmount - depositAmount).toLocaleString()} सत्रपछि भुक्तान`}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-slate-300">
                <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <span>
                  {currentLang === 'en'
                    ? 'Includes physical kit, 1-on-1 mentor guidance & certificate.'
                    : 'भौतिक किट, १-मा-१ मेन्टरसिप र प्रमाणपत्र समावेश छ।'}
                </span>
              </div>
            </div>

          </div>
        ) : (
          /* Confirmation State / Printable Digital Receipt Ticket */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                ✓ Account Created & Ticket Confirmed
              </span>
              <h2 className="text-3xl font-extrabold text-[#0f172a] font-heading">
                {t.successMsg[currentLang]}
              </h2>
              <p className="text-sm text-[#64748b]">
                {currentLang === 'en'
                  ? `Your ticket has been issued and linked to your new student profile (${email}).`
                  : `तपाईंको टिकट जारी गरिएको छ र तपाईंको नयाँ विद्यार्थी खाता (${email}) मा सुरक्षित छ।`}
              </p>
            </div>

            {/* Official Digital Ticket Card */}
            <div className="bg-[#f8fafc] p-6 rounded-3xl border border-slate-200 text-left space-y-4 relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-[#0284c7]" />
                  <span className="font-extrabold text-sm text-[#0f172a]">BYOM OFFICIAL ADMISSION PASS</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#ea580c]">
                  #BYOM-{(confirmedBooking?.id || '8924').slice(-8).toUpperCase()}
                </span>
              </div>

              {/* Cohort Schedule Box */}
              <div className="p-3 rounded-xl bg-[#0284c7]/10 border border-[#0284c7]/20 flex items-center gap-2 text-xs font-bold text-[#0284c7]">
                <Calendar className="w-4 h-4" />
                <span>
                  {currentLang === 'en' ? 'Cohort Dates: ' : 'कक्षा मिति: '}
                  <strong className="text-[#0f172a] font-extrabold">
                    {confirmedBooking?.sessionDate || currentSessionDate}
                  </strong>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-[#64748b]">
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Student Name</span>
                  <span className="font-bold text-[#0f172a] text-sm">{fullName || 'Student'}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Campus Venue</span>
                  <span className="font-bold text-[#0f172a] text-sm">{selectedCity}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Batch Time</span>
                  <span className="font-bold text-[#0f172a]">{selectedBatch}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Assigned Seat</span>
                  <span className="font-extrabold text-[#0284c7] text-sm">Seat {selectedSeatId}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Deposit Paid</span>
                  <span className="font-bold text-emerald-700">Rs. {depositAmount.toLocaleString()} (Fonepay QR)</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Time of Purchase</span>
                  <span className="font-bold text-[#0f172a]">
                    {new Date().toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white font-extrabold text-sm btn-orange-hover shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <span>{currentLang === 'en' ? 'View in Student Dashboard' : 'विद्यार्थी ड्यासबोर्डमा हेर्नुहोस्'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={handlePrintTicket}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-200 text-[#0f172a] font-bold text-sm hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-[#0284c7]" />
                <span>{currentLang === 'en' ? 'Print Ticket' : 'टिकट प्रिन्ट'}</span>
              </button>

              <button
                onClick={() => {
                  setIsCompleted(false);
                  setActiveStep(1);
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-transparent text-slate-500 font-semibold text-xs hover:text-[#0f172a] transition-colors"
              >
                {currentLang === 'en' ? 'Book Another' : 'अर्को बुकिङ'}
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { Language, Seat, SeatStatus } from '../types';
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
} from 'lucide-react';
import { motion } from 'motion/react';

interface SeatBookingProps {
  currentLang: Language;
}

export const SeatBooking: React.FC<SeatBookingProps> = ({ currentLang }) => {
  const t = translations.booking;

  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedCity, setSelectedCity] = useState<string>('Kathmandu Hub');
  const [selectedBatch, setSelectedBatch] = useState<string>('Daytime / Afternoon (12:00 PM - 3:00 PM)');
  const [seats, setSeats] = useState<Seat[]>(initialSeatData);
  const [selectedSeatId, setSelectedSeatId] = useState<string>('B4');

  // Contact Details
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');

  // Payment State — Fonepay only
  const [paymentMethod, setPaymentMethod] = useState<'fonepay'>('fonepay');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Fee split constants
  const DEPOSIT_AMOUNT = 5000;
  const REMAINING_AMOUNT = 10000;
  const TOTAL_FEE = 15000;
  const [createdBookingId, setCreatedBookingId] = useState<string>('');

  // Fetch seats dynamically from backend whenever city or batch changes
  React.useEffect(() => {
    async function fetchSeats() {
      try {
        const res = await fetch(`/api/seats?city=${encodeURIComponent(selectedCity)}&batch=${encodeURIComponent(selectedBatch)}`);
        const data = await res.json();
        if (res.ok && data.seats && data.seats.length > 0) {
          setSeats(data.seats);
          // Set first available seat if current selected is invalid
          const found = data.seats.find((s: Seat) => s.id === selectedSeatId);
          if (!found || found.status === 'booked') {
            const avail = data.seats.find((s: Seat) => s.status === 'available' || s.status === 'vip');
            if (avail) setSelectedSeatId(avail.id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch dynamic seats:', err);
      }
    }
    fetchSeats();
  }, [selectedCity, selectedBatch]);

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

  const selectedSeatObj = seats.find((s) => s.id === selectedSeatId);
  const totalAmount = selectedSeatObj ? selectedSeatObj.priceNpr : TOTAL_FEE;
  const depositAmount = selectedSeatObj?.isVip ? 6000 : DEPOSIT_AMOUNT;

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;

    setSeats((prev) =>
      prev.map((s) => {
        if (s.id === seat.id) return { ...s, status: 'selected' };
        if (s.id === selectedSeatId) return { ...s, status: s.isVip ? 'vip' : 'available' };
        return s;
      })
    );
    setSelectedSeatId(seat.id);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) {
      alert(currentLang === 'en' ? 'Please fill in your full name, phone number, and email address.' : 'कृपया आफ्नो पूरा नाम, फोन नम्बर र इमेल ठेगाना भर्नुहोस्।');
      return;
    }
    setActiveStep(5);
  };

  const handleConfirmPay = async () => {
    setIsProcessing(true);
    setErrorMsg('');

    try {
      // Create Pending Booking Record in Backend DB (Fonepay — manual verification)
      const bookingRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: selectedCity,
          batch: selectedBatch,
          selectedSeatId,
          fullName,
          email,
          phone,
          organization,
          paymentMethod: 'fonepay',
          depositAmount,
        }),
      });

      const bookingData = await bookingRes.json();
      if (!bookingRes.ok) {
        throw new Error(bookingData.error || 'Failed to create booking');
      }

      setCreatedBookingId(bookingData.bookingId);
      setIsCompleted(true);
    } catch (err: any) {
      console.error('Booking error:', err);
      setErrorMsg(err.message || 'Booking failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#fcf9f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold text-[#ac7859] uppercase tracking-wider bg-[#f6b996]/30 px-3 py-1.5 rounded-full border border-[#ac7859]/30">
            {currentLang === 'en' ? 'Physical Classroom Reservation' : 'भौतिक कक्षाकोठा आरक्षण'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#091b3b] font-heading tracking-tight">
            {t.headerTitle[currentLang]}
          </h1>
          <p className="text-base text-[#5c5d63]">
            {t.headerSub[currentLang]}
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[#e2dedc] -z-10" />
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
                        ? 'bg-[#10b981] text-white shadow-sm'
                        : isCurrent
                        ? 'bg-[#091b3b] text-white shadow-md ring-4 ring-[#091b3b]/20'
                        : 'bg-white text-[#5c5d63] border-2 border-[#e2dedc]'
                    }`}
                  >
                    {isPast ? <Check className="w-5 h-5" /> : step.num}
                  </div>
                  <span className={`text-xs font-semibold ${isCurrent ? 'text-[#091b3b] font-bold' : 'text-[#8e8f99]'}`}>
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
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#e2dedc] shadow-sm space-y-8">
              
              {/* Step 1: City Selection */}
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-[#e2dedc] pb-4">
                    <h3 className="text-xl font-bold text-[#091b3b] font-heading">
                      {currentLang === 'en' ? 'Step 1: Choose City & Campus' : 'चरण १: शहर र क्याम्पस छान्नुहोस्'}
                    </h3>
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
                              ? 'border-[#e2dedc] bg-[#f5f5f5] opacity-60 cursor-not-allowed'
                              : isSel
                              ? 'border-[#265cb3] bg-[#265cb3]/5 shadow-sm ring-2 ring-[#265cb3]/30'
                              : 'border-[#e2dedc] bg-[#fcf9f8] hover:border-[#c5c6cf]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-base text-[#091b3b]">{c.name}</span>
                            <MapPin className={`w-5 h-5 ${isSel ? 'text-[#265cb3]' : 'text-[#8e8f99]'}`} />
                          </div>
                          <span className="text-xs text-[#5c5d63]">{c.address}</span>
                          {!isKathmandu && (
                            <span className="mt-2 inline-block text-[10px] font-extrabold uppercase tracking-wider bg-[#f6b996]/40 text-[#ac7859] px-2 py-0.5 rounded-full border border-[#ac7859]/30">
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
                      className="px-6 py-3 rounded-xl bg-[#091b3b] text-white font-bold text-sm btn-hover"
                    >
                      {currentLang === 'en' ? 'Next: Choose Batch' : 'अर्को: ब्याच छान्नुहोस्'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Batch Selection */}
              {activeStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-[#e2dedc] pb-4">
                    <h3 className="text-xl font-bold text-[#091b3b] font-heading">
                      {currentLang === 'en' ? 'Step 2: Select Preferred Batch Time' : 'चरण २: मनपर्ने ब्याच समय छान्नुहोस्'}
                    </h3>
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
                              ? 'border-[#265cb3] bg-[#265cb3]/5 shadow-sm ring-2 ring-[#265cb3]/30'
                              : 'border-[#e2dedc] bg-[#fcf9f8] hover:border-[#c5c6cf]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Clock className={`w-5 h-5 ${isSel ? 'text-[#265cb3]' : 'text-[#8e8f99]'}`} />
                            <span className="font-bold text-sm text-[#091b3b]">{b.label}</span>
                          </div>
                          <span className="text-xs font-extrabold bg-[#f6b996]/30 text-[#522900] px-3 py-1 rounded-full">
                            {b.slots}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="px-5 py-2.5 rounded-xl border border-[#e2dedc] text-[#091b3b] font-bold text-sm"
                    >
                      {currentLang === 'en' ? 'Back' : 'पछाडि'}
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      className="px-6 py-3 rounded-xl bg-[#091b3b] text-white font-bold text-sm btn-hover"
                    >
                      {currentLang === 'en' ? 'Next: Pick Seat' : 'अर्को: सिट छान्नुहोस्'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Visual Interactive Seat Selector */}
              {activeStep === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-[#e2dedc] pb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#091b3b] font-heading">
                      {t.selectSeatTitle[currentLang]}
                    </h3>
                    <span className="text-xs text-[#5c5d63] font-semibold">
                      {currentLang === 'en' ? 'Capacity: 25 Seats' : 'क्षमता: २५ सिट'}
                    </span>
                  </div>

                  {/* Stage Banner */}
                  <div className="w-full bg-[#091b3b] text-[#f6b996] py-2 rounded-xl text-center text-xs font-extrabold uppercase tracking-widest shadow-inner">
                    {t.stageLabel[currentLang]}
                  </div>

                  {/* Seat Map Grid */}
                  <div className="bg-[#fcf9f8] p-4 rounded-2xl border border-[#e2dedc] space-y-4">
                    {['A', 'B', 'C', 'D', 'E'].map((rowLetter) => {
                      const rowSeats = seats.filter((s) => s.row === rowLetter);
                      return (
                        <div key={rowLetter} className="flex items-center justify-center gap-2 sm:gap-3">
                          <span className="w-5 text-xs font-bold text-[#5c5d63] text-center flex-shrink-0">{rowLetter}</span>
                          <div className="flex gap-2 sm:gap-3">
                            {rowSeats.map((seat) => {
                              const isSel = selectedSeatId === seat.id;
                              return (
                                <button
                                  key={seat.id}
                                  onClick={() => handleSeatClick(seat)}
                                  disabled={seat.status === 'booked'}
                                  title={seat.isVip ? `VIP – Rs.${seat.priceNpr.toLocaleString()}` : `Rs.${seat.priceNpr.toLocaleString()}`}
                                  className={`seat-btn w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-xs font-bold flex flex-col items-center justify-center border shadow-sm transition-all ${
                                    seat.status === 'booked'
                                      ? 'booked'
                                      : isSel
                                      ? 'selected ring-2 ring-[#ac7859]'
                                      : seat.isVip
                                      ? 'bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100'
                                      : 'bg-white border-[#d6d0cc] text-[#091b3b] hover:bg-[#f0eded]'
                                  }`}
                                >
                                  <span className="text-[11px] font-extrabold leading-none">
                                    {seat.seatLabel || `${seat.row}${seat.number}`}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Seat Map Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#5c5d63] pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-white border border-[#d6d0cc]" />
                      <span>{t.legendAvailable[currentLang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#f6b996] border border-[#ac7859]" />
                      <span>{t.legendSelected[currentLang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#091b3b]" />
                      <span>{t.legendBooked[currentLang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-amber-50 border-2 border-amber-400" />
                      <span>{t.legendVip[currentLang]}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-5 py-2.5 rounded-xl border border-[#e2dedc] text-[#091b3b] font-bold text-sm"
                    >
                      {currentLang === 'en' ? 'Back' : 'पछाडि'}
                    </button>
                    <button
                      onClick={() => setActiveStep(4)}
                      className="px-6 py-3 rounded-xl bg-[#091b3b] text-white font-bold text-sm btn-hover"
                    >
                      {currentLang === 'en' ? 'Next: Enter Details' : 'अर्को: विवरण भर्नुहोस्'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Contact & Business Details Form */}
              {activeStep === 4 && (
                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  <div className="border-b border-[#e2dedc] pb-4">
                    <h3 className="text-xl font-bold text-[#091b3b] font-heading">
                      {currentLang === 'en' ? 'Step 4: Contact & Student Information' : 'चरण ४: सम्पर्क तथा विद्यार्थी विवरण'}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#091b3b] mb-1.5">
                        {currentLang === 'en' ? 'Full Name *' : 'पूरा नाम *'}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8e8f99] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Ramesh Bikram Thapa"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d6d0cc] focus:border-[#265cb3] focus:ring-2 focus:ring-[#265cb3]/20 text-sm font-semibold outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#091b3b] mb-1.5">
                          {currentLang === 'en' ? 'Phone Number *' : 'फोन नम्बर *'}
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#8e8f99] absolute left-3.5 top-3.5" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="9800000000"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d6d0cc] focus:border-[#265cb3] focus:ring-2 focus:ring-[#265cb3]/20 text-sm font-semibold outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#091b3b] mb-1.5">
                          {currentLang === 'en' ? 'Email Address *' : 'इमेल ठेगाना *'}
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#8e8f99] absolute left-3.5 top-3.5" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ramesh@gmail.com"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d6d0cc] focus:border-[#265cb3] focus:ring-2 focus:ring-[#265cb3]/20 text-sm font-semibold outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#091b3b] mb-1.5">
                        {currentLang === 'en' ? 'Business / Brand Name (Optional)' : 'व्यापार / ब्रान्डको नाम (ऐच्छिक)'}
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-[#8e8f99] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="e.g. Everest Handicrafts"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d6d0cc] focus:border-[#265cb3] focus:ring-2 focus:ring-[#265cb3]/20 text-sm font-semibold outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-5 py-2.5 rounded-xl border border-[#e2dedc] text-[#091b3b] font-bold text-sm"
                    >
                      {currentLang === 'en' ? 'Back' : 'पछाडि'}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#091b3b] text-white font-bold text-sm btn-hover"
                    >
                      {t.proceedPayBtn[currentLang]}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 5: Fonepay QR Payment */}
              {activeStep === 5 && (
                <div className="space-y-6">
                  <div className="border-b border-[#e2dedc] pb-4">
                    <h3 className="text-xl font-bold text-[#091b3b] font-heading">
                      {currentLang === 'en' ? 'Step 5: Pay via Fonepay QR' : 'चरण ५: Fonepay QR बाट भुक्तानी गर्नुहोस्'}
                    </h3>
                  </div>

                  {/* Fonepay QR Box */}
                  <div className="bg-gradient-to-br from-[#e63329]/5 to-[#e63329]/10 border-2 border-[#e63329]/30 rounded-2xl p-6 text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#e63329] flex items-center justify-center">
                        <span className="text-white font-extrabold text-xs">F</span>
                      </div>
                      <span className="font-extrabold text-lg text-[#091b3b]">Fonepay</span>
                    </div>

                    {/* QR Placeholder */}
                    <div className="mx-auto w-44 h-44 bg-white rounded-2xl border-2 border-[#e63329]/30 flex items-center justify-center shadow-inner">
                      <div className="text-center space-y-2">
                        <div className="w-32 h-32 bg-[#091b3b] rounded-lg mx-auto flex items-center justify-center">
                          {/* QR pattern placeholder */}
                          <div className="grid grid-cols-5 gap-0.5 p-2">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div key={i} className={`w-4 h-4 rounded-sm ${[0,1,2,5,10,12,14,19,22,23,24].includes(i) ? 'bg-white' : 'bg-transparent'}`} />
                            ))}
                          </div>
                        </div>
                        <span className="text-[10px] text-[#5c5d63] font-semibold">Scan QR Code</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-extrabold text-[#091b3b]">
                        {currentLang === 'en' ? 'Deposit Amount' : 'भुक्तानी रकम'}
                      </p>
                      <p className="text-3xl font-extrabold text-[#e63329]">
                        Rs. {depositAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-[#5c5d63]">
                        {currentLang === 'en'
                          ? 'Scan with any banking or Fonepay app'
                          : 'जुनसुकै बैंकिङ वा Fonepay एपबाट स्क्यान गर्नुहोस्'}
                      </p>
                    </div>
                  </div>

                  {/* Payment instructions */}
                  <div className="p-4 rounded-2xl bg-[#ebe7e5] border border-[#d6d0cc] space-y-2">
                    <p className="text-xs font-bold text-[#091b3b]">
                      {currentLang === 'en' ? '📋 Payment Instructions:' : '📋 भुक्तानी निर्देशनहरू:'}
                    </p>
                    <ol className="text-xs text-[#5c5d63] space-y-1 list-decimal list-inside">
                      <li>{currentLang === 'en' ? `Scan the QR and pay Rs. ${depositAmount.toLocaleString()} deposit` : `QR स्क्यान गरी Rs. ${depositAmount.toLocaleString()} डिपोजिट तिर्नुहोस्`}</li>
                      <li>{currentLang === 'en' ? 'Take a screenshot of the payment receipt' : 'भुक्तानी रसिदको स्क्रिनसट लिनुहोस्'}</li>
                      <li>{currentLang === 'en' ? 'Click "I have Paid" to submit your booking' : '"मैले तिरें" थिचेर बुकिङ पेश गर्नुहोस्'}</li>
                      <li>{currentLang === 'en' ? 'Remaining Rs. 10,000 is due after session starts' : 'बाँकी Rs. 10,000 सत्र सुरु भएपछि तिर्नुहोस्'}</li>
                    </ol>
                  </div>

                  {errorMsg && (
                    <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-center font-bold">
                      {errorMsg}
                    </div>
                  )}

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setActiveStep(4)}
                      disabled={isProcessing}
                      className="px-5 py-2.5 rounded-xl border border-[#e2dedc] text-[#091b3b] font-bold text-sm disabled:opacity-50"
                    >
                      {currentLang === 'en' ? 'Back' : 'पछाडि'}
                    </button>
                    <button
                      onClick={handleConfirmPay}
                      disabled={isProcessing}
                      className="px-8 py-3.5 rounded-xl bg-[#10b981] text-white font-extrabold text-sm btn-hover shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isProcessing ? (currentLang === 'en' ? 'Submitting...' : 'पेश गर्दैछ...') : (currentLang === 'en' ? 'I have Paid — Confirm Booking' : 'मैले तिरें — बुकिङ पुष्टि गर्नुहोस्')}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Dynamic Real-time Booking Summary Panel */}
            <div className="lg:col-span-5 bg-[#091b3b] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold font-heading text-white">
                  {t.summaryTitle[currentLang]}
                </h3>
                <span className="text-xs bg-[#f6b996]/20 text-[#f6b996] px-2.5 py-1 rounded-md font-bold">
                  7-Day Mastery
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#c5c6cf]">{t.campus[currentLang]}</span>
                  <span className="font-bold text-white">{selectedCity}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#c5c6cf]">{t.batch[currentLang]}</span>
                  <span className="font-bold text-white text-xs">{selectedBatch}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#c5c6cf]">{t.selectedSeat[currentLang]}</span>
                  <span className="font-extrabold text-[#f6b996] bg-white/10 px-3 py-1 rounded-lg">
                    {selectedSeatObj?.seatLabel || selectedSeatId} {selectedSeatObj?.isVip ? '⭐ VIP' : ''}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#c5c6cf]">
                    <span>{currentLang === 'en' ? 'Total Program Fee' : 'कुल कार्यक्रम शुल्क'}</span>
                    <span>Rs. {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#f6b996] font-bold">{currentLang === 'en' ? '✓ Pay Now (Deposit)' : '✓ अहिले तिर्नुहोस् (डिपोजिट)'}</span>
                    <span className="text-[#f6b996] font-extrabold">Rs. {depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#c5c6cf]">
                    <span>{currentLang === 'en' ? 'After Session Starts' : 'सत्र सुरु भएपछि'}</span>
                    <span>Rs. {(totalAmount - depositAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#c5c6cf]">
                    <span>{currentLang === 'en' ? 'Course Kit & Workbook' : 'पाठ्यक्रम किट र पुस्तक'}</span>
                    <span className="text-[#10b981] font-bold">Included</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#c5c6cf]">{currentLang === 'en' ? 'Due Now' : 'अहिले तिर्नुपर्ने'}</span>
                    <span className="text-2xl font-extrabold text-[#f6b996] font-heading">
                      Rs. {depositAmount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8e9ab0]">{currentLang === 'en' ? `Rs. ${(totalAmount - depositAmount).toLocaleString()} payable after session` : `Rs. ${(totalAmount - depositAmount).toLocaleString()} सत्रपछि`}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-[#c5c6cf]">
                <Sparkles className="w-5 h-5 text-[#f6b996] flex-shrink-0" />
                <span>
                  {currentLang === 'en'
                    ? 'Includes 1-on-1 mentor guidance & graduation certificate.'
                    : '१-मा-१ मेन्टर मार्गदर्शन र दीक्षान्त प्रमाण पत्र समावेश छ।'}
                </span>
              </div>
            </div>

          </div>
        ) : (
          /* Confirmation State / Printable Digital Receipt Ticket */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-[#e2dedc] shadow-2xl text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-[#10b981]/10 text-[#10b981] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-[#091b3b] font-heading">
                {t.successMsg[currentLang]}
              </h2>
              <p className="text-sm text-[#5c5d63]">
                {t.successDesc[currentLang]}
              </p>
            </div>

            {/* Ticket Graphic */}
            <div className="bg-[#fcf9f8] p-6 rounded-2xl border border-[#d6d0cc] text-left space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#e2dedc] pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-[#265cb3]" />
                  <span className="font-bold text-sm text-[#091b3b]">BYOM DIGITAL TICKET</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#ac7859]">#BYOM-8924</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-[#5c5d63]">
                <div>
                  <span className="block text-[10px] text-[#8e8f99] uppercase">Student</span>
                  <span className="font-bold text-[#091b3b] text-sm">{fullName || 'Ramesh Thapa'}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#8e8f99] uppercase">Campus</span>
                  <span className="font-bold text-[#091b3b] text-sm">{selectedCity}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#8e8f99] uppercase">Batch Time</span>
                  <span className="font-bold text-[#091b3b]">{selectedBatch}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#8e8f99] uppercase">Assigned Seat</span>
                  <span className="font-extrabold text-[#265cb3] text-sm">{selectedSeatId}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCompleted(false);
                setActiveStep(1);
              }}
              className="px-8 py-3.5 rounded-xl bg-[#091b3b] text-white font-bold text-sm btn-hover"
            >
              {currentLang === 'en' ? 'Book Another Seat' : 'अर्को सिट बुक गर्नुहोस्'}
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

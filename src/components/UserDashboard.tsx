'use client';

import React, { useEffect, useState } from 'react';
import { Language, PageRoute } from '../types';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Ticket,
  LogOut,
  CheckCircle,
  Clock,
  ArrowRight,
  Printer,
  Building2,
  Sparkles,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  avatar?: string | null;
  createdAt?: string;
}

interface BookingRecord {
  id: string;
  city: string;
  batch: string;
  selectedSeatId: string;
  sessionDate?: string | null;
  sessionName?: string | null;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  fullName: string;
  email: string;
  phone: string;
  organization?: string | null;
  createdAt: string;
}

interface UserDashboardProps {
  currentLang: Language;
  onLogout: () => void;
  onNavigate?: (route: PageRoute) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentLang,
  onLogout,
  onNavigate,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<BookingRecord | null>(null);

  useEffect(() => {
    async function fetchProfileAndBookings() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);
          if (data.bookings) {
            setBookings(data.bookings);
          }
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfileAndBookings();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      /* ignore */
    }
    onLogout();
  };

  const handlePrintTicket = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#f8fafc] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0284c7]/30 border-t-[#0284c7] rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-500">
            {currentLang === 'en' ? 'Loading Student Portal…' : 'विद्यार्थी पोर्टल खुल्दैछ…'}
          </p>
        </div>
      </div>
    );
  }

  // Derive latest booking details for quick overview
  const latestBooking = bookings[0] || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12 md:py-20 bg-[#f8fafc] min-h-screen"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt={userData.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-[#0284c7]/20 shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white flex items-center justify-center text-2xl font-black shadow-md shadow-sky-500/20">
                {userData?.name ? userData.name.slice(0, 2).toUpperCase() : 'B'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0284c7] bg-[#0284c7]/10 px-3 py-1 rounded-full border border-[#0284c7]/20">
                  {currentLang === 'en' ? 'Student Portal' : 'विद्यार्थी पोर्टल'}
                </span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {currentLang === 'en' ? 'Active Member' : 'सक्रिय सदस्य'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-heading mt-1">
                {currentLang === 'en'
                  ? `Welcome, ${userData?.name || 'Student'}!`
                  : `स्वागत छ, ${userData?.name || 'विद्यार्थी'}!`}
              </h1>
              <p className="text-xs text-slate-500">
                {currentLang === 'en'
                  ? 'Access your classroom tickets, cohort dates, and admission details.'
                  : 'आफ्नो कक्षा टिकट, समूह मिति र भर्ना विवरणहरू हेर्नुहोस्।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onNavigate && (
              <button
                onClick={() => onNavigate('book')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#0284c7] text-white text-xs font-extrabold transition-colors shadow-sm"
              >
                <Ticket className="w-4 h-4" />
                <span>{currentLang === 'en' ? 'Book Another Seat' : 'नयाँ सिट बुक'}</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Sign Out' : 'साइन आउट'}</span>
            </button>
          </div>
        </div>

        {/* User Information Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#0f172a] font-heading">
                {currentLang === 'en' ? 'Your Personal & Contact Information' : 'व्यक्तिगत तथा सम्पर्क विवरण'}
              </h2>
              <p className="text-xs text-slate-500">
                {currentLang === 'en'
                  ? 'All details provided during registration and classroom reservations'
                  : 'दर्ता र कक्षा बुकिङको क्रममा प्रदान गरिएका विवरणहरू'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                <User className="w-4 h-4 text-[#0284c7]" />
                <span>{currentLang === 'en' ? 'Full Name' : 'पूरा नाम'}</span>
              </div>
              <p className="text-sm font-extrabold text-[#0f172a]">{userData?.name || '—'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                <Mail className="w-4 h-4 text-[#0284c7]" />
                <span>{currentLang === 'en' ? 'Email Address' : 'इमेल'}</span>
              </div>
              <p className="text-sm font-extrabold text-[#0f172a] truncate">{userData?.email || '—'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                <Phone className="w-4 h-4 text-[#0284c7]" />
                <span>{currentLang === 'en' ? 'Phone Number' : 'फोन नम्बर'}</span>
              </div>
              <p className="text-sm font-extrabold text-[#0f172a]">
                {userData?.phone || latestBooking?.phone || '—'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                <Building2 className="w-4 h-4 text-[#0284c7]" />
                <span>{currentLang === 'en' ? 'Organization / Brand' : 'संस्था / ब्रान्ड'}</span>
              </div>
              <p className="text-sm font-extrabold text-[#0f172a] truncate">
                {latestBooking?.organization || (currentLang === 'en' ? 'Independent Learner' : 'स्वतन्त्र विद्यार्थी')}
              </p>
            </div>
          </div>
        </div>

        {/* ── SECTION: PURCHASED TICKETS & SEAT RESERVATIONS ── */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#0f172a] font-heading flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#f97316]" />
                <span>{currentLang === 'en' ? 'Purchased Tickets & Classroom Seats' : 'खरिद गरिएका टिकट तथा सिटहरू'}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentLang === 'en'
                  ? 'Your official BYOM physical cohort admission passes'
                  : 'तपाईंका आधिकारिक BYOM भौतिक कक्षा प्रवेश पत्रहरू'}
              </p>
            </div>
            <span className="text-xs font-bold text-[#0284c7] bg-[#0284c7]/10 px-3 py-1 rounded-full">
              {bookings.length} {bookings.length === 1 ? 'Ticket' : 'Tickets'}
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Ticket className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-[#0f172a]">
                  {currentLang === 'en' ? 'No Classroom Tickets Purchased Yet' : 'अहिलेसम्म कुनै टिकट खरिद गरिएको छैन'}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {currentLang === 'en'
                    ? 'Reserve your seat in the upcoming 7-day marketing cohort in Kathmandu and get your digital admission pass.'
                    : 'काठमाडौँमा हुने आगामी ७-दिने भौतिक टोलीमा आफ्नो सिट सुरक्षित गरी प्रवेश पत्र प्राप्त गर्नुहोस्।'}
                </p>
              </div>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('book')}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#ea580c] text-white text-xs font-extrabold btn-orange-hover shadow-lg shadow-orange-500/25 transition-all"
                >
                  {currentLang === 'en' ? 'Book Classroom Seat Now' : 'अहिले सिट सुरक्षित गर्नुहोस्'}
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking) => {
                const depositPaid = 5000;
                const remainingDue = (booking.amount || 15000) - depositPaid;
                const sessionDisplayDate = booking.sessionDate || 'Sept 1, 2026 – Sept 7, 2026';

                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all overflow-hidden"
                  >
                    {/* Top Ticket Header Banner */}
                    <div className="bg-[#080e1a] text-white px-6 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0369a1] flex items-center justify-center text-white font-black text-sm">
                          B
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            BE YOUR OWN MARKETER
                          </span>
                          <span className="text-sm font-extrabold text-white">
                            {booking.sessionName || '7-Day Marketing Mastery Cohort'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-xl border border-amber-400/20">
                          #BYOM-{booking.id.slice(-8).toUpperCase()}
                        </span>
                        <span className="text-[11px] font-extrabold uppercase px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {currentLang === 'en' ? 'Confirmed Pass' : 'पुष्टि भएको पास'}
                        </span>
                      </div>
                    </div>

                    {/* Ticket Body Details */}
                    <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      
                      {/* Left: Schedule, Campus & Seat Info */}
                      <div className="lg:col-span-8 space-y-4">
                        
                        {/* High-visibility Session Dates Box */}
                        <div className="p-4 rounded-2xl bg-[#0284c7]/5 border border-[#0284c7]/20 flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-[#0284c7] flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#0284c7]">
                              {currentLang === 'en' ? '📅 Cohort Schedule & Dates' : '📅 समूह तालिका र मितिहरू'}
                            </span>
                            <p className="text-base font-extrabold text-[#0f172a] mt-0.5">
                              {sessionDisplayDate}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {currentLang === 'en'
                                ? '7 Days of Intensive Physical Hands-on Training & Mentorship'
                                : '७ दिनको गहन भौतिक तालिम र मेन्टरसिप'}
                            </p>
                          </div>
                        </div>

                        {/* Grid info details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              {currentLang === 'en' ? 'Classroom Venue' : 'कक्षाकोठा स्थान'}
                            </span>
                            <div className="flex items-center gap-1.5 font-bold text-[#0f172a] text-sm">
                              <MapPin className="w-4 h-4 text-[#0284c7]" />
                              <span>{booking.city}</span>
                            </div>
                            <span className="text-[11px] text-slate-400">Tech Park, Baneshwor</span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              {currentLang === 'en' ? 'Shift / Batch Time' : 'ब्याच समय'}
                            </span>
                            <div className="flex items-center gap-1.5 font-bold text-[#0f172a] text-sm">
                              <Clock className="w-4 h-4 text-[#0284c7]" />
                              <span>{booking.batch.split('(')[0].trim()}</span>
                            </div>
                            <span className="text-[11px] text-slate-400">
                              {booking.batch.includes('(') ? `(${booking.batch.split('(')[1]}` : 'Standard Batch'}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              {currentLang === 'en' ? 'Reserved Seat' : 'सुरक्षित सिट'}
                            </span>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#f97316] text-white font-black text-sm shadow-sm">
                              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                              <span>Seat {booking.selectedSeatId}</span>
                            </div>
                          </div>
                        </div>

                        {/* Booking Timestamp */}
                        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#0284c7]" />
                            <span>
                              {currentLang === 'en' ? 'Time of Purchase: ' : 'खरिद समय: '}
                              <strong className="text-slate-700 font-bold">
                                {new Date(booking.createdAt).toLocaleString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true,
                                })}
                              </strong>
                            </span>
                          </span>
                          <span>
                            {currentLang === 'en' ? 'Payment: ' : 'भुक्तानी: '}
                            <strong className="text-emerald-700 font-bold uppercase">
                              {booking.paymentMethod} QR (Rs. {depositPaid.toLocaleString()} Deposit)
                            </strong>
                          </span>
                        </div>
                      </div>

                      {/* Right: Payment Breakdown Card & Action Buttons */}
                      <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between text-slate-500">
                            <span>{currentLang === 'en' ? 'Total Program Fee' : 'कुल शुल्क'}</span>
                            <span className="font-bold text-[#0f172a]">
                              Rs. {(booking.amount || 15000).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                            <span>{currentLang === 'en' ? '✓ Deposit Paid' : '✓ डिपोजिट भुक्तान'}</span>
                            <span>Rs. {depositPaid.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-500">
                            <span>{currentLang === 'en' ? 'Due at Classroom' : 'कक्षामा बुझाउनुपर्ने'}</span>
                            <span className="font-extrabold text-[#0f172a]">
                              Rs. {remainingDue.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
                          <button
                            onClick={handlePrintTicket}
                            className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[#0f172a] font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#0284c7]" />
                            <span>{currentLang === 'en' ? 'Print / Save Ticket PDF' : 'टिकट प्रिन्ट वा सुरक्षित गर्नुहोस्'}</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Program Kit & Mentorship Overview */}
        <div className="bg-gradient-to-br from-[#080e1a] via-[#0b132b] to-[#0f172a] text-white rounded-3xl p-8 space-y-6 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-extrabold font-heading text-white">
                {currentLang === 'en' ? 'Classroom Inclusion Checklist' : 'कक्षा समावेशी चेकलिस्ट'}
              </h3>
              <p className="text-xs text-slate-400">
                {currentLang === 'en'
                  ? 'All items provided upon arrival at Kathmandu Hub'
                  : 'काठमाडौँ हबमा आगमनमा उपलब्ध गराइने सामग्रीहरू'}
              </p>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-1">
              <p className="text-amber-300 font-extrabold text-sm">📦 Physical Workbooks & Kit</p>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentLang === 'en'
                  ? 'Official BYOM course workbook, templates, and high-converting Nepali copy frameworks.'
                  : 'आधिकारिक BYOM अभ्यास पुस्तिका र नेपाली कपी टेम्प्लेटहरू।'}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-1">
              <p className="text-[#38bdf8] font-extrabold text-sm">🎯 1-on-1 Ad Audit Session</p>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentLang === 'en'
                  ? 'Direct review of your live Facebook & Instagram ad campaigns with lead mentor Anish Sharma.'
                  : 'प्रमुख प्रशिक्षक अनीश शर्मासँग प्रत्यक्ष विज्ञापन अडिट।'}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-1">
              <p className="text-emerald-300 font-extrabold text-sm">🎓 BYOM Verified Certificate</p>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentLang === 'en'
                  ? 'Accredited physical certificate presented during graduation day.'
                  : 'दीक्षान्त समारोहमा प्रदान गरिने आधिकारिक प्रमाणपत्र।'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

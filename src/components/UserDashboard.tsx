'use client';

import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { User, Mail, Phone, MapPin, Calendar, Ticket, LogOut, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface Booking {
  id: string;
  city: string;
  batch: string;
  seatId: string;
  status: string;
  createdAt: string;
  depositAmount?: number;
  totalAmount?: number;
}

interface UserDashboardProps {
  currentLang: Language;
  onLogout: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ currentLang, onLogout }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);
        }
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {/* ignore */}
    onLogout();
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-[#f0eded] text-[#5c5d63] border-[#d6d0cc]';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0284c7]/30 border-t-[#0284c7] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12 md:py-20 bg-[#f8fafc] min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-[#0284c7] uppercase tracking-wider bg-[#0284c7]/10 px-3.5 py-1.5 rounded-full border border-[#0284c7]/20">
              {currentLang === 'en' ? 'Student Portal' : 'विद्यार्थी पोर्टल'}
            </span>
            <h1 className="text-3xl font-extrabold text-[#0f172a] font-heading mt-2">
              {currentLang === 'en' ? `Welcome back${userData?.name ? `, ${userData.name.split(' ')[0]}` : ''}!` : `पुनः स्वागत छ${userData?.name ? `, ${userData.name.split(' ')[0]}` : ''}!`}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {currentLang === 'en' ? 'Sign Out' : 'साइन आउट'}
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-base font-extrabold text-[#0f172a] mb-6 pb-3 border-b border-slate-200">
            {currentLang === 'en' ? 'Your Profile' : 'तपाईंको प्रोफाइल'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0284c7]/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[#0284c7]" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Full Name' : 'पूरा नाम'}
                </span>
                <span className="font-bold text-[#0f172a] text-sm">
                  {userData?.name || '—'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0284c7]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#0284c7]" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Email Address' : 'इमेल ठेगाना'}
                </span>
                <span className="font-bold text-[#0f172a] text-sm">
                  {userData?.email || '—'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0284c7]/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#0284c7]" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Phone Number' : 'फोन नम्बर'}
                </span>
                <span className="font-bold text-[#0f172a] text-sm">
                  {userData?.phone || '—'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0284c7]/10 flex items-center justify-center">
                <Ticket className="w-5 h-5 text-[#0284c7]" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Account Type' : 'खाता प्रकार'}
                </span>
                <span className="font-bold text-[#0f172a] text-sm capitalize">
                  {userData?.role || 'Student'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-base font-extrabold text-[#0f172a] mb-6 pb-3 border-b border-slate-200 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0284c7]" />
            {currentLang === 'en' ? 'Your Bookings' : 'तपाईंका बुकिङहरू'}
          </h2>

          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
                <Ticket className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-sm text-slate-600 font-semibold">
                {currentLang === 'en' ? 'No bookings yet' : 'अहिलेसम्म कुनै बुकिङ छैन'}
              </p>
              <p className="text-xs text-slate-400">
                {currentLang === 'en'
                  ? 'Reserve your seat in the upcoming cohort'
                  : 'आगामी ब्याचमा आफ्नो सिट सुरक्षित गर्नुहोस्'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-5 rounded-2xl border border-slate-200 bg-[#f8fafc] flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0284c7]" />
                      <span className="font-bold text-sm text-[#0f172a]">{booking.city}</span>
                    </div>
                    <p className="text-xs text-slate-600">{booking.batch}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>Seat: <strong className="text-[#0284c7]">{booking.seatId}</strong></span>
                      {booking.depositAmount && (
                        <span>Deposit: <strong className="text-[#0f172a]">Rs. {booking.depositAmount.toLocaleString()}</strong></span>
                      )}
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${statusColor(booking.status)}`}>
                    {booking.status === 'confirmed' ? (
                      <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Confirmed</span>
                    ) : (
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment Info */}
        <div className="bg-gradient-to-br from-[#080e1a] via-[#0b132b] to-[#0f172a] text-white rounded-3xl p-8 space-y-4 border border-slate-800 shadow-xl">
          <h3 className="font-extrabold text-base border-b border-white/10 pb-3">
            {currentLang === 'en' ? 'Fee Payment Summary' : 'शुल्क भुक्तानी सारांश'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: currentLang === 'en' ? 'Total Program Fee' : 'कुल शुल्क', value: 'Rs. 15,000', sub: '' },
              { label: currentLang === 'en' ? 'Deposit (Pay Now)' : 'डिपोजिट (अहिले)', value: 'Rs. 5,000', sub: currentLang === 'en' ? 'via Fonepay QR' : 'Fonepay QR बाट' },
              { label: currentLang === 'en' ? 'After Session Starts' : 'सत्र सुरुपछि', value: 'Rs. 10,000', sub: '' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-1">
                <p className="text-xs text-slate-400">{item.label}</p>
                <p className="text-xl font-extrabold text-amber-300">{item.value}</p>
                {item.sub && <p className="text-[10px] text-slate-400">{item.sub}</p>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};


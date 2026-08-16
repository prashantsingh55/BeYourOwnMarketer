'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Ticket, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const refId = searchParams.get('refId');

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center space-y-6 border border-[#e8dfd8]">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-[#091b3b]">Booking Confirmed!</h1>
          <p className="text-sm text-[#5c5d63]">
            Your physical seat reservation is successfully completed and payment verified.
          </p>
        </div>

        <div className="bg-[#f8f5f2] rounded-2xl p-4 text-left space-y-2 text-xs border border-[#e8dfd8]">
          <div className="flex justify-between py-1 border-b border-[#e8dfd8]">
            <span className="text-[#8e8f99]">Booking ID:</span>
            <span className="font-mono font-bold text-[#091b3b]">{bookingId || 'BYOM-SUCCESS'}</span>
          </div>
          {refId && (
            <div className="flex justify-between py-1 border-b border-[#e8dfd8]">
              <span className="text-[#8e8f99]">Payment Ref:</span>
              <span className="font-mono font-bold text-[#265cb3]">{refId}</span>
            </div>
          )}
          <div className="flex justify-between py-1">
            <span className="text-[#8e8f99]">Status:</span>
            <span className="font-bold text-emerald-600 uppercase">Paid & Locked</span>
          </div>
        </div>

        <div className="pt-2 space-y-3">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#091b3b] text-white rounded-xl font-bold shadow-lg hover:bg-[#122b5e] transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm">Loading reservation summary...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

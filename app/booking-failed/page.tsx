'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

function FailedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center space-y-6 border border-[#e8dfd8]">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-[#091b3b]">Payment Unsuccessful</h1>
          <p className="text-sm text-[#5c5d63]">
            We could not complete your booking payment at this time.
          </p>
          {reason && (
            <p className="text-xs text-rose-500 font-mono bg-rose-50 p-2 rounded-lg">
              Reason: {reason}
            </p>
          )}
        </div>

        <div className="pt-2 space-y-3">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#091b3b] text-white rounded-xl font-bold shadow-lg hover:bg-[#122b5e] transition-all text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Try Booking Again
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingFailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm">Loading payment details...</div>}>
      <FailedContent />
    </Suspense>
  );
}

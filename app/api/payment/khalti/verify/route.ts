import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { lookupKhaltiPayment } from '@/lib/khalti';

export async function GET(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const { searchParams } = new URL(req.url);
    const pidx = searchParams.get('pidx');
    const transactionId = searchParams.get('transaction_id');

    if (!pidx) {
      return NextResponse.redirect(`${baseUrl}/booking-failed?reason=missing_pidx`);
    }

    const secretKey = process.env.KHALTI_SECRET_KEY || 'Key live_secret_key_689290f5c5e24b61944e99f0e136d812';
    const lookupUrl = process.env.KHALTI_LOOKUP_URL || 'https://dev.khalti.com/api/v2/epayment/lookup/';

    // Perform lookup verification
    const lookupResult = await lookupKhaltiPayment({
      lookupUrl,
      secretKey,
      pidx,
    });

    if (lookupResult.status === 'Completed') {
      const tx = await db.paymentTransaction.findUnique({
        where: { transactionUuid: pidx },
        include: { booking: true },
      });

      if (tx) {
        // Update Transaction
        await db.paymentTransaction.update({
          where: { id: tx.id },
          data: {
            status: 'COMPLETE',
            refId: transactionId || lookupResult.transaction_id || null,
            rawPayload: JSON.stringify(lookupResult),
          },
        });

        // Update Booking & Seat
        await db.booking.update({
          where: { id: tx.bookingId },
          data: { paymentStatus: 'completed' },
        });

        if (tx.booking.seatId) {
          await db.seat.update({
            where: { id: tx.booking.seatId },
            data: { status: 'booked' },
          });
        }

        return NextResponse.redirect(
          `${baseUrl}/booking-success?bookingId=${tx.bookingId}&refId=${transactionId || lookupResult.transaction_id || ''}`
        );
      }
    }

    return NextResponse.redirect(`${baseUrl}/booking-failed?reason=payment_not_completed`);
  } catch (error: any) {
    console.error('Khalti verification error:', error);
    return NextResponse.redirect(
      `${baseUrl}/booking-failed?reason=${encodeURIComponent(error?.message || 'verification_error')}`
    );
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { decodeEsewaResponse, verifyEsewaTransaction } from '@/lib/esewa';

export async function GET(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const { searchParams } = new URL(req.url);
    const dataParam = searchParams.get('data');

    if (!dataParam) {
      return NextResponse.redirect(`${baseUrl}/booking-failed?reason=missing_data`);
    }

    const decoded = decodeEsewaResponse(dataParam);
    const { transaction_uuid, total_amount, product_code, ref_id } = decoded;

    const merchantCode = process.env.ESEWA_MERCHANT_CODE || 'EPAYTEST';
    const statusUrl = process.env.ESEWA_STATUS_URL || 'https://rc-epay.esewa.com.np/api/epay/main/v2/decoded';

    // Verify transaction server-side with eSewa
    const verifyResult = await verifyEsewaTransaction({
      statusUrl,
      productCode: product_code || merchantCode,
      totalAmount: total_amount.toString().replace(/,/g, ''),
      transactionUuid: transaction_uuid,
    });

    if (verifyResult.status === 'COMPLETE') {
      const tx = await db.paymentTransaction.findUnique({
        where: { transactionUuid: transaction_uuid },
        include: { booking: true },
      });

      if (tx) {
        // Update Transaction
        await db.paymentTransaction.update({
          where: { id: tx.id },
          data: {
            status: 'COMPLETE',
            refId: ref_id || verifyResult.ref_id || null,
            rawPayload: JSON.stringify(decoded),
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

        return NextResponse.redirect(`${baseUrl}/booking-success?bookingId=${tx.bookingId}&refId=${ref_id || ''}`);
      }
    }

    return NextResponse.redirect(`${baseUrl}/booking-failed?reason=payment_not_completed`);
  } catch (error: any) {
    console.error('eSewa verification error:', error);
    return NextResponse.redirect(`${baseUrl}/booking-failed?reason=${encodeURIComponent(error?.message || 'verification_error')}`);
  }
}

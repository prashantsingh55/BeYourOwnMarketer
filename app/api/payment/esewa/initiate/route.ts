import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { buildEsewaFormFields } from '@/lib/esewa';

export async function POST(req: Request) {
  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ error: 'bookingId is required' }, { status: 400 });
    }

    const booking = await db.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const merchantCode = process.env.ESEWA_MERCHANT_CODE || 'EPAYTEST';
    const secretKey = process.env.ESEWA_SECRET_KEY || '8gBmpyzU26aW6g==';
    const gatewayUrl = process.env.ESEWA_GATEWAY_URL || 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/api/payment/esewa/verify`;
    const failureUrl = `${baseUrl}/booking-failed?bookingId=${bookingId}`;

    const transactionUuid = `BYOM-${bookingId.substring(0, 8)}-${Date.now()}`;

    // Create payment transaction record
    await db.paymentTransaction.create({
      data: {
        bookingId: booking.id,
        gateway: 'esewa',
        transactionUuid,
        amount: booking.amount,
        status: 'PENDING',
      },
    });

    const formFields = buildEsewaFormFields({
      amount: booking.amount,
      transactionUuid,
      merchantCode,
      secretKey,
      successUrl,
      failureUrl,
    });

    return NextResponse.json({
      gatewayUrl,
      formFields,
      transactionUuid,
    });
  } catch (error: any) {
    console.error('eSewa initiate error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to initiate eSewa payment' },
      { status: 500 }
    );
  }
}

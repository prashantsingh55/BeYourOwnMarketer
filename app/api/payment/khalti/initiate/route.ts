import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { initiateKhaltiPayment } from '@/lib/khalti';

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

    const secretKey = process.env.KHALTI_SECRET_KEY || 'Key live_secret_key_689290f5c5e24b61944e99f0e136d812';
    const initiateUrl = process.env.KHALTI_INITIATE_URL || 'https://dev.khalti.com/api/v2/epayment/initiate/';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const returnUrl = `${baseUrl}/api/payment/khalti/verify`;
    const websiteUrl = baseUrl;

    const khaltiResult = await initiateKhaltiPayment({
      initiateUrl,
      secretKey,
      payload: {
        return_url: returnUrl,
        website_url: websiteUrl,
        amount: Math.round(booking.amount * 100), // convert NPR to paisa
        purchase_order_id: booking.id,
        purchase_order_name: `BYOM Seat Reservation (${booking.city} - ${booking.selectedSeatId})`,
        customer_info: {
          name: booking.fullName,
          email: booking.email || undefined,
          phone: booking.phone,
        },
      },
    });

    // Create payment transaction record with pidx
    await db.paymentTransaction.create({
      data: {
        bookingId: booking.id,
        gateway: 'khalti',
        transactionUuid: khaltiResult.pidx,
        amount: booking.amount,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      paymentUrl: khaltiResult.payment_url,
      pidx: khaltiResult.pidx,
    });
  } catch (error: any) {
    console.error('Khalti initiate error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to initiate Khalti payment' },
      { status: 500 }
    );
  }
}

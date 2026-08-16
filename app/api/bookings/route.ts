import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { sendBookingConfirmationEmail } from '@/src/lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { city, batch, selectedSeatId, fullName, email, phone, organization, paymentMethod, depositAmount } = body;

    if (!city || !batch || !selectedSeatId || !fullName || !phone || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required booking details' },
        { status: 400 }
      );
    }

    const authUser = await getAuthUser();

    // Check seat status in DB
    const compositeSeatId = `${city}-${batch}-${selectedSeatId}`;
    const dbSeat = await db.seat.findUnique({
      where: { id: compositeSeatId },
    });

    if (dbSeat && dbSeat.status === 'booked') {
      return NextResponse.json(
        { error: 'This seat is already booked. Please choose another seat.' },
        { status: 409 }
      );
    }

    const totalAmount = dbSeat ? dbSeat.priceNpr : 15000;
    const deposit = depositAmount || 5000;
    const remaining = totalAmount - deposit;

    // Create booking record
    const booking = await db.booking.create({
      data: {
        userId: authUser?.userId || null,
        seatId: dbSeat?.id || null,
        city,
        batch,
        selectedSeatId,
        fullName,
        email: email || '',
        phone,
        organization: organization || '',
        amount: totalAmount,
        paymentMethod,
        paymentStatus: 'pending',
      },
    });

    // Update seat to reserved
    if (dbSeat) {
      await db.seat.update({
        where: { id: dbSeat.id },
        data: { status: 'reserved' },
      });
    }

    // Send confirmation email (graceful — does not break booking if mail fails)
    if (email) {
      try {
        await sendBookingConfirmationEmail({
          toEmail: email,
          toName: fullName,
          bookingId: booking.id,
          city,
          batch,
          seatId: selectedSeatId,
          depositAmount: deposit,
          remainingAmount: remaining,
          totalAmount,
        });
      } catch (mailErr) {
        console.error('[Mailer] Failed to send confirmation email:', mailErr);
        // Do NOT rethrow — booking still succeeds
      }
    }

    return NextResponse.json({
      message: 'Booking created successfully',
      bookingId: booking.id,
      booking,
    });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await db.booking.findMany({
      where: { userId: authUser.userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

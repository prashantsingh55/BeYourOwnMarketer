import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUser, hashPassword, signJwtToken, getAuthTokenName } from '@/lib/auth';
import { sendBookingConfirmationEmail } from '@/src/lib/mailer';
import { isValidGmail, isValidNepalPhone, normalizeNepalPhone } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      city,
      batch,
      selectedSeatId,
      fullName,
      email,
      phone,
      organization,
      paymentMethod,
      depositAmount,
      sessionDate,
      sessionName,
    } = body;

    if (!city || !batch || !selectedSeatId || !fullName || !phone || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required booking details' },
        { status: 400 }
      );
    }

    const trimmedEmail = (email || '').toLowerCase().trim();
    if (!isValidGmail(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid Gmail address (must end with @gmail.com)' },
        { status: 400 }
      );
    }

    if (!isValidNepalPhone(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid Nepal mobile number (e.g. 98XXXXXXXX or 97XXXXXXXX)' },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizeNepalPhone(phone);

    // 1. Resolve Session Dates
    let resolvedSessionDate = sessionDate;
    let resolvedSessionName = sessionName;

    if (!resolvedSessionDate) {
      // Find active class session for this city or batch
      const activeSession = await db.classSession.findFirst({
        where: {
          city: { contains: city.split(' ')[0] },
          isActive: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      if (activeSession && activeSession.startDate && activeSession.endDate) {
        resolvedSessionDate = `${activeSession.startDate} to ${activeSession.endDate}`;
        resolvedSessionName = activeSession.nameEn;
      } else {
        resolvedSessionDate = 'Sept 1, 2026 – Sept 7, 2026';
        resolvedSessionName = '7-Day Marketing Mastery Cohort';
      }
    }

    // 2. Resolve User Account (Auto-create if user doesn't exist)
    let authUser = await getAuthUser();
    let targetUser: any = null;

    if (authUser && authUser.email.toLowerCase() === trimmedEmail) {
      targetUser = await db.user.findUnique({ where: { id: authUser.userId } });
    }

    if (!targetUser) {
      // Look up by email
      targetUser = await db.user.findUnique({
        where: { email: trimmedEmail },
      });

      if (targetUser) {
        // Update user phone if empty
        if (!targetUser.phone && phone) {
          targetUser = await db.user.update({
            where: { id: targetUser.id },
            data: { phone },
          });
        }
      } else {
        // Automatically create account for user
        const autoPassword = `Byom@${Math.random().toString(36).slice(-6)}`;
        const passwordHash = await hashPassword(autoPassword);
        
        targetUser = await db.user.create({
          data: {
            name: fullName,
            email: trimmedEmail,
            phone: phone || null,
            passwordHash,
            role: 'user',
          },
        });
      }
    }

    // 3. Resolve Clean Seat Number & Check Session Seat Conflict
    const cleanSeatNumber = selectedSeatId.includes('-')
      ? selectedSeatId.split('-').pop()!.toUpperCase().trim()
      : selectedSeatId.toUpperCase().trim();
    const compositeSeatId = `${city}-${batch}-${cleanSeatNumber}`;

    // Check if another student has already booked this seat for this specific session
    const existingSessionBooking = await db.booking.findFirst({
      where: {
        city,
        batch,
        sessionDate: resolvedSessionDate,
        paymentStatus: { not: 'cancelled' },
        OR: [
          { selectedSeatId: cleanSeatNumber },
          { selectedSeatId: compositeSeatId },
          { seatId: compositeSeatId },
        ],
      },
    });

    if (existingSessionBooking) {
      return NextResponse.json(
        {
          error: `Seat ${cleanSeatNumber} is already booked for this cohort session (${resolvedSessionDate}). Please select another seat.`,
        },
        { status: 409 }
      );
    }

    // Upsert seat record to ensure it exists and mark as booked
    const dbSeat = await db.seat.upsert({
      where: { id: compositeSeatId },
      update: { status: 'booked' },
      create: {
        id: compositeSeatId,
        city,
        batch,
        seatNumber: cleanSeatNumber,
        row: cleanSeatNumber.charAt(0),
        status: 'booked',
        isVip: cleanSeatNumber.charAt(0) === 'A',
        priceNpr: 15000,
      },
    });

    const totalAmount = dbSeat ? dbSeat.priceNpr : 15000;
    const deposit = depositAmount || 5000;
    const remaining = totalAmount - deposit;

    // 4. Create booking record
    const booking = await db.booking.create({
      data: {
        userId: targetUser?.id || null,
        seatId: dbSeat.id,
        city,
        batch,
        selectedSeatId: cleanSeatNumber,
        fullName,
        email: trimmedEmail,
        phone,
        organization: organization || null,
        sessionDate: resolvedSessionDate,
        sessionName: resolvedSessionName,
        amount: totalAmount,
        paymentMethod,
        paymentStatus: 'pending',
      },
    });

    // 6. Send confirmation email (graceful — does not break booking if mail fails)
    const purchaseTimeFormatted = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    try {
      await sendBookingConfirmationEmail({
        toEmail: trimmedEmail,
        toName: fullName,
        phone,
        organization: organization || undefined,
        bookingId: booking.id,
        city,
        batch,
        seatId: cleanSeatNumber,
        sessionDate: resolvedSessionDate,
        sessionName: resolvedSessionName,
        depositAmount: deposit,
        remainingAmount: remaining,
        totalAmount,
        purchaseTime: purchaseTimeFormatted,
      });
    } catch (mailErr) {
      console.error('[Mailer] Failed to send confirmation email:', mailErr);
    }

    // 7. Generate auth token and attach cookie so user is auto-logged in
    const token = signJwtToken({
      userId: targetUser.id,
      email: targetUser.email,
      name: targetUser.name,
      role: targetUser.role,
      avatar: targetUser.avatar || undefined,
    });

    const response = NextResponse.json({
      message: 'Booking created successfully and account configured.',
      bookingId: booking.id,
      booking,
      user: {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
        phone: targetUser.phone,
        role: targetUser.role,
        avatar: targetUser.avatar,
      },
    });

    response.cookies.set(getAuthTokenName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
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
      where: {
        OR: [
          { userId: authUser.userId },
          { email: authUser.email.toLowerCase().trim() },
        ],
      },
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


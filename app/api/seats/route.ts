import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city') || 'Kathmandu Hub';
    const batch = searchParams.get('batch') || 'Daytime / Afternoon (12:00 PM - 3:00 PM)';
    const sessionDate = searchParams.get('sessionDate');

    let seats = await db.seat.findMany({
      where: { city, batch },
      orderBy: [{ row: 'asc' }, { seatNumber: 'asc' }],
    });

    // If no seats exist for this city + batch combination, seed a standard 5×5 grid (rows A–E, seats 1–5)
    if (seats.length === 0) {
      const rows = ['A', 'B', 'C', 'D', 'E'];
      const seatsPerRow = 5;

      const createdSeats = [];
      for (const row of rows) {
        for (let i = 1; i <= seatsPerRow; i++) {
          const seatNumber = `${row}${i}`;
          const seatId = `${city}-${batch}-${seatNumber}`;
          const isVip = row === 'A'; // Front row = VIP

          createdSeats.push({
            id: seatId,
            city,
            batch,
            seatNumber,
            row,
            status: isVip ? 'vip' : 'available',
            isVip,
            priceNpr: 15000,
          });
        }
      }

      for (const seat of createdSeats) {
        await db.seat.upsert({
          where: { id: seat.id },
          update: {},
          create: seat,
        });
      }

      seats = await db.seat.findMany({
        where: { city, batch },
        orderBy: [{ row: 'asc' }, { seatNumber: 'asc' }],
      });
    }

    // Query active Bookings for this city, batch, and session date to block booked seats
    const bookingWhere: any = {
      city,
      batch,
      paymentStatus: { not: 'cancelled' },
    };

    if (sessionDate) {
      bookingWhere.sessionDate = sessionDate;
    }

    const activeBookings = await db.booking.findMany({
      where: bookingWhere,
      select: {
        selectedSeatId: true,
        seatId: true,
      },
    });

    // Create a Set of all booked seat identifiers
    const bookedSeatSet = new Set<string>();
    for (const b of activeBookings) {
      if (b.selectedSeatId) {
        const shortNum = b.selectedSeatId.includes('-')
          ? b.selectedSeatId.split('-').pop()!
          : b.selectedSeatId;
        bookedSeatSet.add(shortNum.toUpperCase().trim());
        bookedSeatSet.add(b.selectedSeatId.trim());
      }
      if (b.seatId) {
        bookedSeatSet.add(b.seatId.trim());
      }
    }

    // Format seats and set status dynamically per session
    const formattedSeats = seats.map((s) => {
      const isSeatBooked =
        bookedSeatSet.has(s.seatNumber.toUpperCase().trim()) ||
        bookedSeatSet.has(s.id.trim()) ||
        s.status === 'booked' ||
        s.status === 'reserved';

      return {
        id: s.id, // Full composite DB key
        seatLabel: s.seatNumber, // Short label like "A1", "B4"
        row: s.row,
        number: parseInt(s.seatNumber.replace(/[^\d]/g, ''), 10) || 1,
        status: isSeatBooked ? 'booked' : s.isVip ? 'vip' : 'available',
        isVip: s.isVip,
        priceNpr: s.priceNpr,
      };
    });

    return NextResponse.json({ seats: formattedSeats });
  } catch (error: any) {
    console.error('Error fetching seats:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch seats' },
      { status: 500 }
    );
  }
}

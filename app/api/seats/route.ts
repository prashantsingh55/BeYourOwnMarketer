import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city') || 'Kathmandu Hub';
    const batch = searchParams.get('batch') || 'Daytime / Afternoon (12:00 PM - 3:00 PM)';

    let seats = await db.seat.findMany({
      where: { city, batch },
      orderBy: [{ row: 'asc' }, { seatNumber: 'asc' }],
    });

    // If no seats exist, seed a 5×5 grid (rows A–E, seats 1–5)
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
            priceNpr: isVip ? 15000 : 15000, // Same price, VIP = front row
          });
        }
      }

      // SQLite doesn't support skipDuplicates — use upsert to safely handle re-seeding
      for (const seat of createdSeats) {
        await db.seat.upsert({
          where: { id: seat.id },
          update: {},      // Don't overwrite if already exists
          create: seat,
        });
      }

      seats = await db.seat.findMany({
        where: { city, batch },
        orderBy: [{ row: 'asc' }, { seatNumber: 'asc' }],
      });
    }

    // Format seats — always return seatLabel (short ID) separately from composite db id
    const formattedSeats = seats.map((s) => ({
      id: s.id,              // Full composite DB key (used for API calls)
      seatLabel: s.seatNumber, // Short label like "A1" (used for display)
      row: s.row,
      number: parseInt(s.seatNumber.replace(/[^\d]/g, ''), 10) || 1,
      status: s.status,
      isVip: s.isVip,
      priceNpr: s.priceNpr,
    }));

    return NextResponse.json({ seats: formattedSeats });
  } catch (error: any) {
    console.error('Error fetching seats:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch seats' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const DEFAULT_SESSION = {
  nameEn: '7-Day Marketing Mastery Cohort',
  nameNp: '७-दिने मार्केटिङ मास्टरी',
  city: 'Kathmandu Hub',
  batch: 'Daytime / Afternoon (12:00 PM - 3:00 PM)',
  startDate: '2026-09-01',
  endDate: '2026-09-07',
  totalSeats: 25,
  availableSeats: 25,
  isActive: true,
};

// GET — return all active sessions (or seed default)
export async function GET() {
  try {
    let sessions = await db.classSession.findMany({
      where: { isActive: true },
      orderBy: { startDate: 'asc' },
    });

    // Seed a default upcoming session if none exist
    if (sessions.length === 0) {
      const created = await db.classSession.create({ data: DEFAULT_SESSION });
      sessions = [created];
    }

    return NextResponse.json({ sessions });
  } catch (error: any) {
    console.error('Sessions GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST — create a new session (admin only — middleware guards /api/admin/*)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nameEn, nameNp, city, batch, startDate, endDate, totalSeats } = body;

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
    }

    const session = await db.classSession.create({
      data: {
        nameEn: nameEn || DEFAULT_SESSION.nameEn,
        nameNp: nameNp || DEFAULT_SESSION.nameNp,
        city: city || DEFAULT_SESSION.city,
        batch: batch || DEFAULT_SESSION.batch,
        startDate,
        endDate,
        totalSeats: totalSeats || 25,
        availableSeats: totalSeats || 25,
        isActive: true,
      },
    });

    return NextResponse.json({ session }, { status: 201 });
  } catch (error: any) {
    console.error('Sessions POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

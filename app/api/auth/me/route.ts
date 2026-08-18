import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ user: null, bookings: [] }, { status: 200 });
    }

    const user = await db.user.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null, bookings: [] }, { status: 200 });
    }

    // Fetch all bookings for this user by userId OR by matching email
    const bookings = await db.booking.findMany({
      where: {
        OR: [
          { userId: user.id },
          { email: user.email.toLowerCase().trim() },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ user, bookings });
  } catch (error) {
    return NextResponse.json({ user: null, bookings: [] }, { status: 200 });
  }
}


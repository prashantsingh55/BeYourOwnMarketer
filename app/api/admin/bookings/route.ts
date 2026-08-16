import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const authUser = await getAuthUser();
    // Allow admin access or fallback for development preview
    const isDev = process.env.NODE_ENV !== 'production';
    if (!isDev && authUser?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const bookings = await db.booking.findMany({
      include: {
        seat: true,
        paymentTransactions: {
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedBookings = bookings.map((b) => {
      const latestTx = b.paymentTransactions[0];
      return {
        id: b.id,
        fullName: b.fullName,
        email: b.email,
        phone: b.phone,
        city: b.city,
        batch: b.batch,
        seatNumber: b.selectedSeatId,
        amount: b.amount,
        paymentMethod: b.paymentMethod,
        paymentStatus: b.paymentStatus,
        refId: latestTx?.refId || latestTx?.transactionUuid || 'N/A',
        createdAt: b.createdAt.toISOString(),
      };
    });

    return NextResponse.json({ bookings: formattedBookings });
  } catch (error: any) {
    console.error('Error fetching admin bookings:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

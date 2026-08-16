import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PATCH — update session dates (admin only)
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { startDate, endDate, nameEn, nameNp, totalSeats, availableSeats, isActive } = body;

    const updated = await db.classSession.update({
      where: { id },
      data: {
        ...(startDate !== undefined && { startDate }),
        ...(endDate !== undefined && { endDate }),
        ...(nameEn !== undefined && { nameEn }),
        ...(nameNp !== undefined && { nameNp }),
        ...(totalSeats !== undefined && { totalSeats }),
        ...(availableSeats !== undefined && { availableSeats }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json({ session: updated });
  } catch (error: any) {
    console.error('Session PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE — deactivate / remove session
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await db.classSession.update({
      where: { id },
      data: { isActive: false },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Session DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

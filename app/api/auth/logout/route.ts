import { NextResponse } from 'next/server';
import { getAuthTokenName } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.delete(getAuthTokenName());
  return response;
}

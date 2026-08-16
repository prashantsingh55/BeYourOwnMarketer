import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const validUsername = process.env.ADMIN_USERNAME || 'byomadmin';
    const validPassword = process.env.ADMIN_PASSWORD || 'Byom@Admin2026!';

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create a simple token (base64 encoded timestamp + secret)
    const tokenPayload = Buffer.from(
      JSON.stringify({ user: username, ts: Date.now(), role: 'admin' })
    ).toString('base64');

    const response = NextResponse.json({ success: true });
    response.cookies.set('byom_admin_token', tokenPayload, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

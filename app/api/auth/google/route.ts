import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId ||
      clientId === 'your_google_client_id_here' ||
      clientId.trim() === '') {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/?auth_error=google_not_configured`);
  }

  // Use the Host header (sent by the browser) — this is always "localhost:3000"
  // NOT the internal binding address "0.0.0.0:3000" which Google rejects
  const reqUrl = new URL(req.url);
  const host = req.headers.get('host') || 'localhost:3000';
  const protocol = host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return NextResponse.redirect(googleAuthUrl);
}

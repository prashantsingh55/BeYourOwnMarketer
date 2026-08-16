import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { db } from '@/lib/db';
import { signJwtToken } from '@/lib/auth';

function getRedirectUri(req: Request): string {
  // Use Host header (browser-facing "localhost:3000") NOT the internal binding "0.0.0.0:3000"
  const host = req.headers.get('host') || 'localhost:3000';
  const protocol = host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https';
  return `${protocol}://${host}/api/auth/google/callback`;
}

export async function GET(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDesc = searchParams.get('error_description');

    // User denied or Google error
    if (error || !code) {
      console.error('[Google OAuth] Google returned error:', error, errorDesc);
      return NextResponse.redirect(`${baseUrl}/?auth_error=google_denied`);
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret ||
        clientId === 'your_google_client_id_here' ||
        clientSecret === 'your_google_client_secret_here') {
      console.error('[Google OAuth] Credentials not configured in .env');
      return NextResponse.redirect(`${baseUrl}/?auth_error=google_not_configured`);
    }

    // Use the actual request URL to derive redirect_uri — must match Google Console exactly
    const redirectUri = getRedirectUri(req);
    console.log('[Google OAuth] Using redirectUri:', redirectUri);

    const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

    // Exchange authorization code for tokens
    let tokens;
    try {
      const tokenResponse = await oauth2Client.getToken(code);
      tokens = tokenResponse.tokens;
    } catch (tokenErr: any) {
      console.error('[Google OAuth] Token exchange failed:', tokenErr.message, tokenErr.response?.data);
      // Most common cause: redirect_uri_mismatch
      const isRedirectMismatch = tokenErr.message?.includes('redirect_uri_mismatch') ||
        tokenErr.response?.data?.error === 'redirect_uri_mismatch';
      if (isRedirectMismatch) {
        console.error('[Google OAuth] Add this URI to Google Console:', redirectUri);
        return NextResponse.redirect(`${baseUrl}/?auth_error=google_redirect_mismatch&uri=${encodeURIComponent(redirectUri)}`);
      }
      return NextResponse.redirect(`${baseUrl}/?auth_error=google_failed`);
    }

    if (!tokens.id_token) {
      console.error('[Google OAuth] No id_token received — check scopes include openid');
      return NextResponse.redirect(`${baseUrl}/?auth_error=google_failed`);
    }

    oauth2Client.setCredentials(tokens);

    // Verify the ID token and extract user info
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.redirect(`${baseUrl}/?auth_error=google_no_email`);
    }

    const { email, name, sub: googleId, picture: avatar } = payload;
    const displayName = name || email.split('@')[0];

    // Find or create user in DB
    let user = await db.user.findUnique({ where: { email } });

    if (!user) {
      user = await db.user.create({
        data: {
          name: displayName,
          email,
          passwordHash: `google_oauth_${googleId}`,
          avatar: avatar || null,
          role: 'user',
        },
      });
    } else if (avatar && user.avatar !== avatar) {
      user = await db.user.update({
        where: { id: user.id },
        data: { avatar },
      });
    }

    // Issue our JWT cookie (same as email/password login — 7 day expiry)
    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar || undefined,
    });

    const response = NextResponse.redirect(`${baseUrl}/?google_login=success`);
    response.cookies.set('byom_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (err: any) {
    console.error('[Google OAuth callback] Unhandled error:', err?.message || err);
    return NextResponse.redirect(`${baseUrl}/?auth_error=google_failed`);
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, signJwtToken, getAuthTokenName } from '@/lib/auth';
import { isValidGmail, isValidNepalPhone, normalizeNepalPhone } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.toLowerCase().trim();
    if (!isValidGmail(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid Gmail address (must end with @gmail.com)' },
        { status: 400 }
      );
    }

    if (phone && !isValidNepalPhone(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid Nepal mobile number (e.g. 98XXXXXXXX or 97XXXXXXXX)' },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email: trimmedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const normalizedPhone = phone ? normalizeNepalPhone(phone) : null;

    const user = await db.user.create({
      data: {
        name: name.trim(),
        email: trimmedEmail,
        passwordHash,
        phone: normalizedPhone,
      },
    });

    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

    response.cookies.set({
      name: getAuthTokenName(),
      value: token,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to register user' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const submission = await db.contactSubmission.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        phone: phone || null,
        subject: subject || 'General Inquiry',
        message,
        status: 'new',
      },
    });

    return NextResponse.json({
      message: 'Thank you for reaching out! We have received your message.',
      id: submission.id,
    });
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

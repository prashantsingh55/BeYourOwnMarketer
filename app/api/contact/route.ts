import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendContactEmails } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.toLowerCase().trim();

    // 1. Save to Database
    const submission = await db.contactSubmission.create({
      data: {
        name,
        email: trimmedEmail,
        phone: phone || null,
        subject: subject || 'General Inquiry',
        message,
        status: 'new',
      },
    });

    // 2. Send email using Nodemailer (sender: chelseasilverman7@gmail.com, receiver: user's provided email)
    await sendContactEmails({
      name,
      email: trimmedEmail,
      phone,
      subject,
      message,
    }).catch((mailErr) => {
      console.error('Failed to dispatch contact email via Nodemailer:', mailErr);
    });

    return NextResponse.json({
      message: 'Thank you for reaching out! We have received your message and sent a confirmation email.',
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


import nodemailer from 'nodemailer';

export function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false';
  const user = process.env.SMTP_USER || 'chelseasilverman7@gmail.com';
  const pass = process.env.SMTP_PASS || '';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendContactEmails({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}) {
  const senderEmail = process.env.SMTP_USER || 'chelseasilverman7@gmail.com';
  const fromAddress = process.env.SMTP_FROM || `BYOM <${senderEmail}>`;

  // 1. Email to the user who filled in details (Receiver: user's email)
  const userMailOptions = {
    from: fromAddress,
    to: email,
    subject: `Thank you for contacting BYOM - ${name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background-color: #f8fafc; border-radius: 20px; border: 1px solid #e2e8f0;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-block; background-color: #080e1a; padding: 12px 24px; border-radius: 12px; margin-bottom: 12px;">
            <span style="color: #38bdf8; font-weight: 900; font-size: 20px; letter-spacing: -0.5px;">BE YOUR OWN MARKETER</span>
          </div>
          <p style="color: #64748b; font-size: 13px; margin: 0; font-weight: 600;">Practical Marketing Academy • Kathmandu, Nepal</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 28px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <h2 style="color: #0f172a; font-size: 18px; margin-top: 0; font-weight: 800;">Namaste ${name},</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.7; margin-bottom: 20px;">
            Thank you for reaching out to <strong>BE YOUR OWN MARKETER (BYOM)</strong>. We have successfully received your inquiry and our team will get in touch with you shortly.
          </p>
          
          <div style="background-color: #f0f9ff; padding: 18px; border-radius: 12px; border: 1px solid #bae6fd; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px;">📋 Submission Summary</p>
            <p style="margin: 0 0 6px 0; font-size: 13px; color: #334155;"><strong>Full Name:</strong> ${name}</p>
            <p style="margin: 0 0 6px 0; font-size: 13px; color: #334155;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0 0 6px 0; font-size: 13px; color: #334155;"><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p style="margin: 0 0 6px 0; font-size: 13px; color: #334155;"><strong>Topic / Brand:</strong> ${subject || 'General Inquiry'}</p>
            <p style="margin: 0; font-size: 13px; color: #334155;"><strong>Your Message:</strong><br/><span style="color: #475569; font-style: italic;">"${message}"</span></p>
          </div>

          <p style="color: #475569; font-size: 13px; line-height: 1.6;">
            Have immediate questions? You can call or WhatsApp us directly at <strong style="color: #0284c7;">+977 980-8193078</strong> or reply directly to this email.
          </p>
        </div>

        <div style="text-align: center; margin-top: 24px; color: #94a3b8; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} BE YOUR OWN MARKETER (BYOM). All rights reserved.</p>
          <p style="margin: 4px 0 0 0;">Baneshwor, Kathmandu, Nepal • hello@byom.com.np</p>
        </div>
      </div>
    `,
  };

  // 2. Notification to BYOM Team / Admin
  const adminMailOptions = {
    from: fromAddress,
    to: senderEmail,
    subject: `[BYOM Contact Lead] ${name} (${phone || 'No phone'}) - ${subject || 'Inquiry'}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
        <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">🔔 New Website Contact Form Submission</h2>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 14px; color: #334155;">
          <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0284c7;">${email}</a></p>
          <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> <a href="tel:${phone || ''}" style="color: #0284c7;">${phone || 'N/A'}</a></p>
          <p style="margin: 0 0 8px 0;"><strong>Subject / Org:</strong> ${subject || 'General Inquiry'}</p>
          <p style="margin: 12px 0 4px 0;"><strong>Message:</strong></p>
          <div style="background-color: #f1f5f9; padding: 12px; border-radius: 8px; border-left: 4px solid #0284c7; color: #1e293b; font-size: 13px;">
            ${message}
          </div>
        </div>
      </div>
    `,
  };

  try {
    const transporter = getTransporter();
    const results = await Promise.allSettled([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);
    return results;
  } catch (err) {
    console.error('Nodemailer send error:', err);
    return null;
  }
}

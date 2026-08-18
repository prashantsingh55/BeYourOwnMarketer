import nodemailer from 'nodemailer';

export function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false';
  const user = process.env.SMTP_USER || 'leolion565185@gmail.com';
  const pass = process.env.SMTP_PASS || 'tuxy onof mtsu hnzu';

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

export interface BookingConfirmationParams {
  toEmail: string;
  toName: string;
  bookingId: string;
  city: string;
  batch: string;
  seatId: string;
  sessionDate?: string;
  sessionName?: string;
  depositAmount: number;
  remainingAmount: number;
  totalAmount: number;
  phone?: string;
  organization?: string;
  purchaseTime?: string;
}

export async function sendBookingConfirmationEmail(params: BookingConfirmationParams) {
  const {
    toEmail,
    toName,
    bookingId,
    city,
    batch,
    seatId,
    sessionDate = 'Sept 1, 2026 – Sept 7, 2026',
    sessionName = '7-Day Marketing Mastery Cohort',
    depositAmount,
    remainingAmount,
    totalAmount,
    phone,
    organization,
    purchaseTime = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  } = params;

  const smtpSender = process.env.SMTP_USER || 'leolion565185@gmail.com';
  const fromAddress = process.env.SMTP_FROM || `BYOM Academy <${smtpSender}>`;
  const adminNotificationEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'leolion565185@gmail.com';
  const bookingRef = `#BYOM-${bookingId.slice(-8).toUpperCase()}`;
  const cleanRecipientEmail = (toEmail || '').trim().toLowerCase();

  if (!cleanRecipientEmail) {
    console.error('[Mailer] No recipient email provided for booking confirmation.');
    return;
  }

  // User Email: Rich Digital Ticket Pass
  const userHtmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BYOM Official Admission Pass</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:36px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
          
          <!-- Brand Header -->
          <tr>
            <td style="background:#080e1a;padding:32px 36px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;background:#0f172a;padding:8px 16px;border-radius:12px;border:1px solid #1e293b;margin-bottom:8px;">
                      <span style="color:#38bdf8;font-weight:900;font-size:18px;letter-spacing:-0.5px;">BE YOUR OWN</span>
                      <span style="color:#f97316;font-weight:900;font-size:18px;margin-left:4px;">MARKETER</span>
                    </div>
                    <p style="color:#94a3b8;font-size:12px;margin:4px 0 0 0;font-weight:600;">7-Day Physical Marketing Cohort • Kathmandu, Nepal</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confirmation Badge -->
          <tr>
            <td style="padding:32px 36px 0;text-align:center;">
              <div style="display:inline-block;background:#10b981;border-radius:50%;width:56px;height:56px;line-height:56px;text-align:center;font-size:28px;color:#ffffff;margin-bottom:12px;">✓</div>
              <h1 style="color:#0f172a;font-size:24px;font-weight:800;margin:0 0 6px;">Classroom Seat Confirmed!</h1>
              <p style="color:#64748b;font-size:14px;margin:0;line-height:1.5;">
                Namaste <strong>${toName}</strong>, your seat has been reserved and your digital admission pass is ready.
              </p>
            </td>
          </tr>

          <!-- Ticket Graphic Box -->
          <tr>
            <td style="padding:24px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:18px;padding:24px;border:1px solid #e2e8f0;">
                
                <!-- Ticket Top Row -->
                <tr>
                  <td style="border-bottom:1px dashed #cbd5e1;padding-bottom:14px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#64748b;">OFFICIAL ADMISSION TICKET</span><br/>
                          <span style="font-size:15px;font-weight:800;color:#0f172a;">${sessionName}</span>
                        </td>
                        <td align="right">
                          <span style="display:inline-block;background:#ffedd5;color:#ea580c;font-size:12px;font-weight:800;font-family:monospace;padding:4px 10px;border-radius:8px;border:1px solid #fed7aa;">
                            ${bookingRef}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Session Schedule Box -->
                <tr>
                  <td style="padding:16px 0;">
                    <div style="background:#e0f2fe;border:1px solid #bae6fd;padding:12px 16px;border-radius:12px;">
                      <span style="display:block;font-size:11px;font-weight:800;color:#0369a1;text-transform:uppercase;letter-spacing:0.5px;">📅 COHORT SCHEDULE & DATES</span>
                      <span style="display:block;font-size:15px;font-weight:800;color:#0f172a;margin-top:2px;">${sessionDate}</span>
                      <span style="display:block;font-size:11px;color:#0369a1;margin-top:2px;">7-Day In-Person Practical Training</span>
                    </div>
                  </td>
                </tr>

                <!-- Ticket Details Matrix -->
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:50%;padding:6px 0;">
                          <span style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;display:block;">Student Name</span>
                          <span style="font-size:13px;font-weight:700;color:#0f172a;">${toName}</span>
                        </td>
                        <td style="width:50%;padding:6px 0;">
                          <span style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;display:block;">Assigned Seat</span>
                          <span style="display:inline-block;background:#0284c7;color:#ffffff;font-size:12px;font-weight:800;padding:2px 8px;border-radius:6px;">
                            Seat ${seatId}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:50%;padding:6px 0;">
                          <span style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;display:block;">Classroom Campus</span>
                          <span style="font-size:13px;font-weight:700;color:#0f172a;">${city}</span>
                        </td>
                        <td style="width:50%;padding:6px 0;">
                          <span style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;display:block;">Shift / Batch</span>
                          <span style="font-size:13px;font-weight:700;color:#0f172a;">${batch}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:50%;padding:6px 0;">
                          <span style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;display:block;">Time of Purchase</span>
                          <span style="font-size:13px;font-weight:700;color:#0f172a;">${purchaseTime}</span>
                        </td>
                        <td style="width:50%;padding:6px 0;">
                          <span style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;display:block;">Deposit Status</span>
                          <span style="font-size:13px;font-weight:700;color:#10b981;">Rs. ${depositAmount.toLocaleString()} Paid (Fonepay QR)</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Fee Summary Card -->
          <tr>
            <td style="padding:0 36px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#080e1a;border-radius:18px;padding:20px 24px;">
                <tr>
                  <td colspan="2" style="border-bottom:1px solid #1e293b;padding-bottom:10px;">
                    <span style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;">FEE PAYMENT SUMMARY</span>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;color:#cbd5e1;padding:8px 0 4px;">Total Program Fee</td>
                  <td align="right" style="font-size:12px;color:#cbd5e1;padding:8px 0 4px;">Rs. ${totalAmount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#f97316;font-weight:800;padding:4px 0;">✓ Deposit Paid (Fonepay QR)</td>
                  <td align="right" style="font-size:13px;color:#f97316;font-weight:800;padding:4px 0;">Rs. ${depositAmount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top:1px solid #1e293b;padding-top:8px;margin-top:4px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:12px;color:#94a3b8;">Remaining Balance (due at venue)</td>
                        <td align="right" style="font-size:14px;color:#ffffff;font-weight:800;">Rs. ${remainingAmount.toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Links & Guidance -->
          <tr>
            <td style="padding:0 36px 32px;text-align:center;">
              <p style="color:#64748b;font-size:12px;line-height:1.6;margin:0 0 16px 0;">
                Please bring this email or your booking reference on Day 1.<br/>
                Our team will also reach out via WhatsApp at <strong>+977 980-8193078</strong>.
              </p>

              <a href="https://wa.me/9779808193078" style="display:inline-block;background:#25D366;color:#ffffff;font-weight:800;font-size:12px;padding:12px 24px;border-radius:12px;text-decoration:none;margin-right:8px;">
                💬 Contact Support on WhatsApp
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 36px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="color:#94a3b8;font-size:11px;margin:0;line-height:1.5;">
                © ${new Date().getFullYear()} BE YOUR OWN MARKETER (BYOM) • Baneshwor, Kathmandu, Nepal<br/>
                Questions? Reply directly to this email or write to hello@byom.com.np
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Admin Notification Email
  const adminHtmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
      <h2 style="color: #0f172a; margin-top: 0;">🎉 New Physical Seat Reservation</h2>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 14px; color: #334155;">
        <p><strong>Student Name:</strong> ${toName}</p>
        <p><strong>Email:</strong> <a href="mailto:${cleanRecipientEmail}">${cleanRecipientEmail}</a></p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Organization:</strong> ${organization || 'N/A'}</p>
        <p><strong>Time of Purchase:</strong> ${purchaseTime}</p>
        <p><strong>Cohort Schedule:</strong> ${sessionDate}</p>
        <p><strong>Campus & Batch:</strong> ${city} · ${batch}</p>
        <p><strong>Assigned Seat:</strong> <strong style="color:#0284c7;">Seat ${seatId}</strong></p>
        <p><strong>Deposit Paid:</strong> Rs. ${depositAmount.toLocaleString()} (Fonepay QR)</p>
        <p><strong>Booking Ref:</strong> ${bookingRef}</p>
      </div>
    </div>
  `;

  const userTextBody = `BE YOUR OWN MARKETER (BYOM) — Official Admission Pass

Namaste ${toName},

Your physical seat reservation has been confirmed!

Booking Summary:
- Program: ${sessionName}
- Cohort Schedule & Dates: ${sessionDate}
- Campus / Venue: ${city} (Tech Park, Baneshwor)
- Shift / Batch: ${batch}
- Assigned Seat: Seat ${seatId}
- Time of Purchase: ${purchaseTime}
- Deposit Paid: Rs. ${depositAmount.toLocaleString()} (Fonepay QR)
- Remaining Fee (due at venue): Rs. ${remainingAmount.toLocaleString()}
- Total Program Fee: Rs. ${totalAmount.toLocaleString()}
- Booking Reference: ${bookingRef}

Important Notes:
1. Please bring a valid photo ID and this confirmation on Day 1.
2. Our team will also reach out via WhatsApp at +977 980-8193078.

Need Assistance?
- WhatsApp Support: +977 980-8193078
- Email: hello@byom.com.np

© ${new Date().getFullYear()} BE YOUR OWN MARKETER (BYOM) • Kathmandu, Nepal
`;

  const transporter = getTransporter();

  // 1. Dispatch directly to user (buyer)
  try {
    const userResult = await transporter.sendMail({
      from: fromAddress,
      to: cleanRecipientEmail,
      replyTo: adminNotificationEmail,
      subject: `Your BYOM Admission Pass - Seat ${seatId} (${sessionDate}) | Ref ${bookingRef}`,
      text: userTextBody,
      html: userHtmlBody,
    });
    console.log('[Mailer] Ticket email sent successfully to user:', cleanRecipientEmail, userResult.messageId);
  } catch (userErr) {
    console.error('[Mailer] Error sending ticket email to user:', cleanRecipientEmail, userErr);
  }

  // 2. Dispatch to admin
  try {
    const adminResult = await transporter.sendMail({
      from: fromAddress,
      to: adminNotificationEmail,
      replyTo: cleanRecipientEmail,
      subject: `[New Student Seat] ${toName} booked Seat ${seatId} for ${city}`,
      text: `New Booking Confirmed:\nName: ${toName}\nEmail: ${cleanRecipientEmail}\nPhone: ${phone || 'N/A'}\nTime of Purchase: ${purchaseTime}\nSeat: Seat ${seatId}\nCohort: ${sessionDate}\nCampus: ${city}\nBatch: ${batch}\nRef: ${bookingRef}`,
      html: adminHtmlBody,
    });
    console.log('[Mailer] Lead alert sent successfully to admin:', adminNotificationEmail, adminResult.messageId);
  } catch (adminErr) {
    console.error('[Mailer] Error sending lead alert to admin:', adminNotificationEmail, adminErr);
  }
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
  const smtpSender = process.env.SMTP_USER || 'leolion565185@gmail.com';
  const fromAddress = process.env.SMTP_FROM || `BYOM Academy <${smtpSender}>`;
  const adminNotificationEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'leolion565185@gmail.com';
  const cleanRecipientEmail = (email || '').trim().toLowerCase();

  const userMailOptions = {
    from: fromAddress,
    to: cleanRecipientEmail,
    replyTo: adminNotificationEmail,
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
            <p style="margin: 0 0 6px 0; font-size: 13px; color: #334155;"><strong>Email:</strong> ${cleanRecipientEmail}</p>
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

  const adminMailOptions = {
    from: fromAddress,
    to: adminNotificationEmail,
    replyTo: cleanRecipientEmail,
    subject: `[BYOM Contact Lead] ${name} (${phone || 'No phone'}) - ${subject || 'Inquiry'}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
        <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">🔔 New Website Contact Form Submission</h2>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 14px; color: #334155;">
          <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${cleanRecipientEmail}">${cleanRecipientEmail}</a></p>
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

  const transporter = getTransporter();

  // Send to user
  try {
    await transporter.sendMail(userMailOptions);
    console.log('[Mailer] Contact confirmation sent to user:', cleanRecipientEmail);
  } catch (userErr) {
    console.error('[Mailer] Contact mail failed to user:', cleanRecipientEmail, userErr);
  }

  // Send to admin
  try {
    await transporter.sendMail(adminMailOptions);
    console.log('[Mailer] Contact alert sent to admin:', adminNotificationEmail);
  } catch (adminErr) {
    console.error('[Mailer] Contact mail failed to admin:', adminNotificationEmail, adminErr);
  }
}

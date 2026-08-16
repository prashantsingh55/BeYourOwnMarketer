import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface BookingConfirmationParams {
  toEmail: string;
  toName: string;
  bookingId: string;
  city: string;
  batch: string;
  seatId: string;
  depositAmount: number;
  remainingAmount: number;
  totalAmount: number;
}

export async function sendBookingConfirmationEmail(params: BookingConfirmationParams): Promise<void> {
  const {
    toEmail, toName, bookingId, city, batch, seatId,
    depositAmount, remainingAmount, totalAmount,
  } = params;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BYOM Booking Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#f4eee9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4eee9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#091b3b;padding:32px 40px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;">
                      <span style="background:#2196F3;color:white;font-weight:900;font-size:20px;padding:10px 16px;border-radius:12px;">B</span>
                      <span style="color:white;font-size:18px;font-weight:800;margin-left:8px;">BE YOUR OWN</span>
                      <span style="color:#f6b996;font-size:18px;font-weight:800;"> MARKETER</span>
                    </div>
                    <p style="color:#c5c6cf;font-size:12px;margin-top:8px;">7-Day Physical Marketing Cohort · Kathmandu, Nepal</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confirmation Badge -->
          <tr>
            <td style="padding:40px 40px 0;text-align:center;">
              <div style="display:inline-block;background:#10b981;border-radius:50%;width:64px;height:64px;line-height:64px;text-align:center;font-size:32px;margin-bottom:16px;">✓</div>
              <h1 style="color:#091b3b;font-size:26px;font-weight:800;margin:0 0 8px;">Booking Confirmed!</h1>
              <p style="color:#5c5d63;font-size:14px;margin:0;">Your seat has been reserved at BYOM. Here are your details:</p>
            </td>
          </tr>

          <!-- Booking Details -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fcf9f8;border-radius:12px;padding:24px;border:1px solid #e2dedc;">
                <tr>
                  <td colspan="2" style="border-bottom:1px solid #e2dedc;padding-bottom:12px;margin-bottom:12px;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#8e8f99;">BOOKING REFERENCE</span><br/>
                    <span style="font-size:16px;font-weight:800;color:#265cb3;font-family:monospace;">#${bookingId.slice(-8).toUpperCase()}</span>
                  </td>
                </tr>
                <tr><td height="12"></td></tr>
                <tr>
                  <td style="font-size:12px;color:#5c5d63;padding:6px 0;font-weight:700;width:40%;">Student Name</td>
                  <td style="font-size:13px;color:#091b3b;font-weight:700;padding:6px 0;">${toName}</td>
                </tr>
                <tr>
                  <td style="font-size:12px;color:#5c5d63;padding:6px 0;font-weight:700;">Campus</td>
                  <td style="font-size:13px;color:#091b3b;font-weight:700;padding:6px 0;">${city}</td>
                </tr>
                <tr>
                  <td style="font-size:12px;color:#5c5d63;padding:6px 0;font-weight:700;">Batch</td>
                  <td style="font-size:13px;color:#091b3b;font-weight:700;padding:6px 0;">${batch}</td>
                </tr>
                <tr>
                  <td style="font-size:12px;color:#5c5d63;padding:6px 0;font-weight:700;">Assigned Seat</td>
                  <td style="font-size:13px;color:#265cb3;font-weight:800;padding:6px 0;">Seat ${seatId}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Fee Summary -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#091b3b;border-radius:12px;padding:24px;">
                <tr>
                  <td colspan="2" style="border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:12px;margin-bottom:12px;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#c5c6cf;">PAYMENT SUMMARY</span>
                  </td>
                </tr>
                <tr><td height="12"></td></tr>
                <tr>
                  <td style="font-size:12px;color:#c5c6cf;padding:5px 0;">Total Program Fee</td>
                  <td align="right" style="font-size:12px;color:#c5c6cf;padding:5px 0;">Rs. ${totalAmount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#f6b996;font-weight:700;padding:5px 0;">✓ Deposit Paid (Fonepay)</td>
                  <td align="right" style="font-size:13px;color:#f6b996;font-weight:700;padding:5px 0;">Rs. ${depositAmount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top:1px solid rgba(255,255,255,0.1);padding-top:10px;margin-top:5px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:12px;color:#8e9ab0;">Remaining (due after session starts)</td>
                        <td align="right" style="font-size:14px;color:white;font-weight:800;">Rs. ${remainingAmount.toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <p style="color:#5c5d63;font-size:13px;line-height:1.6;">
                Please bring a valid photo ID and your booking reference on the first day.<br/>
                Our team will contact you on WhatsApp to confirm the venue details.
              </p>
              <a href="https://wa.me/9779808193078" style="display:inline-block;margin-top:16px;background:#25D366;color:white;font-weight:700;font-size:13px;padding:12px 28px;border-radius:10px;text-decoration:none;">
                💬 Chat on WhatsApp
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4eee9;padding:20px 40px;text-align:center;border-top:1px solid #e2dedc;">
              <p style="color:#8e8f99;font-size:11px;margin:0;">
                © 2026 Be Your Own Marketer · Kathmandu, Nepal<br/>
                If you have questions, reply to this email or WhatsApp us.
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

  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'BYOM <chelseasilverman7@gmail.com>',
    to: `${toName} <${toEmail}>`,
    subject: `✅ Booking Confirmed — BYOM Seat ${seatId} | Ref #${bookingId.slice(-8).toUpperCase()}`,
    html: htmlBody,
  });
}

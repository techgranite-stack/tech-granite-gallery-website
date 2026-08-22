import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    let body: any = {};
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    }

    const { name, email, phone, location, message, application_interest } = body;

    // Server-side Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email is required' }, { status: 400 });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return NextResponse.json({ success: false, error: 'Valid phone number is required' }, { status: 400 });
    }

    const formattedName = name.trim();
    const formattedEmail = email.trim();
    const formattedPhone = phone.trim();
    const formattedLocation = (location && typeof location === 'string') ? location.trim() : 'Not specified';
    const formattedMessage = (message && typeof message === 'string') ? message.trim() : 'No notes provided';
    const spaceInterest = (application_interest && typeof application_interest === 'string') ? application_interest.trim() : 'General Natural Stone Enquiry';

    // Get fresh environment variables per request
    const rawApiKey = process.env.RESEND_API_KEY || '';
    const resendApiKey = rawApiKey.replace(/['"]/g, '').trim();
    const notificationEmail = (process.env.ENQUIRY_NOTIFICATION_EMAIL || 'tech.granitegalleryindia@gmail.com').trim();
    const fromEmail = (process.env.RESEND_FROM_EMAIL || 'Granite Gallery <onboarding@resend.dev>').trim();

    const resend = resendApiKey ? new Resend(resendApiKey) : null;

    // ── Resend Email Submission ──────────────────────────────────────────────────
    if (resend) {
      // 1. Send Internal Lead Notification to Sales / Admin Inbox
      const adminEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7f4f0; color: #2A1A17; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2d7cd; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
            .header { background: #2A1A17; color: #FFF8F0; padding: 30px; text-align: center; border-bottom: 3px solid #C08552; }
            .header h1 { font-family: Georgia, serif; font-size: 22px; font-weight: normal; margin: 0; letter-spacing: 0.05em; color: #FFF8F0; }
            .header p { font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #C08552; margin-top: 6px; }
            .body { padding: 30px; }
            .lead-box { background: #FAF6F0; border-left: 4px solid #C08552; padding: 20px; border-radius: 8px; margin-bottom: 24px; }
            .lead-row { display: flex; margin-bottom: 12px; font-size: 14px; line-height: 1.5; border-bottom: 1px solid #F0E6DC; padding-bottom: 10px; }
            .lead-row:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
            .label { font-weight: bold; width: 140px; color: #6D4C41; flex-shrink: 0; }
            .value { color: #2A1A17; flex: 1; }
            .footer { background: #FAF6F0; padding: 20px; text-align: center; font-size: 12px; color: #8A7060; border-top: 1px solid #EAE0D5; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>GRANITE GALLERY</h1>
              <p>NEW WEBSITE ENQUIRY RECEIVED</p>
            </div>
            <div class="body">
              <div class="lead-box">
                <div class="lead-row">
                  <div class="label">Customer Name:</div>
                  <div class="value"><strong>${formattedName}</strong></div>
                </div>
                <div class="lead-row">
                  <div class="label">Phone / WhatsApp:</div>
                  <div class="value"><a href="tel:${formattedPhone}" style="color:#C08552; font-weight:bold;">${formattedPhone}</a></div>
                </div>
                <div class="lead-row">
                  <div class="label">Email Address:</div>
                  <div class="value"><a href="mailto:${formattedEmail}" style="color:#2A1A17;">${formattedEmail}</a></div>
                </div>
                <div class="lead-row">
                  <div class="label">Project Location:</div>
                  <div class="value">${formattedLocation}</div>
                </div>
                <div class="lead-row">
                  <div class="label">Space / Application:</div>
                  <div class="value"><strong>${spaceInterest}</strong></div>
                </div>
              </div>

              <h3 style="font-family: Georgia, serif; font-size: 16px; color: #2A1A17; margin-bottom: 10px;">Project Message / Notes:</h3>
              <p style="background: #F8F5F0; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #3E2723; margin-top: 0;">
                "${formattedMessage}"
              </p>
            </div>
            <div class="footer">
              Granite Gallery Web Lead System · Kishangarh, Rajasthan, India
            </div>
          </div>
        </body>
        </html>
      `;

      const sendResult = await resend.emails.send({
        from: fromEmail,
        to: [notificationEmail],
        subject: `New Lead: ${formattedName} — ${spaceInterest}`,
        html: adminEmailHtml,
        replyTo: formattedEmail,
      });

      if (sendResult.error) {
        console.error('Resend Lead Email Error:', sendResult.error);
        return NextResponse.json({
          success: false,
          error: `Resend Error: ${sendResult.error.message || 'Failed to dispatch email'}`,
        }, { status: 500 });
      }

      // 2. Customer Auto-Acknowledgement (only when domain verified or sending to account email)
      try {
        const customerEmailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7f4f0; color: #2A1A17; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2d7cd; overflow: hidden; }
              .header { background: #2A1A17; color: #FFF8F0; padding: 36px 30px; text-align: center; border-bottom: 3px solid #C08552; }
              .header h1 { font-family: Georgia, serif; font-size: 24px; font-weight: normal; margin: 0; letter-spacing: 0.05em; color: #FFF8F0; }
              .header p { font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #C08552; margin-top: 8px; }
              .body { padding: 36px 30px; line-height: 1.7; font-size: 14.5px; color: #3E2723; }
              .highlight-card { background: #FAF6F0; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid #EAE0D5; }
              .btn { display: inline-block; background: #C08552; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 13px; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 10px; }
              .footer { background: #2A1A17; color: #FAF6F0; padding: 24px; text-align: center; font-size: 12px; border-top: 1px solid #3E2723; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>GRANITE GALLERY</h1>
                <p>EXQUISITE NATURAL STONE SOLUTIONS</p>
              </div>
              <div class="body">
                <p>Dear <strong>${formattedName}</strong>,</p>
                <p>Thank you for expressing interest in Granite Gallery's natural stone collection. We have received your enquiry for <strong>${spaceInterest}</strong>.</p>
                
                <div class="highlight-card">
                  <h4 style="margin-top:0; color:#C08552; font-family:Georgia, serif;">What Happens Next?</h4>
                  <p style="margin-bottom:0; font-size:13.5px;">Our senior stone consultant in Kishangarh will review your requirement and reach out within <strong>2 hours</strong> with catalogues, pricing, and available slab stock.</p>
                </div>

                <p>For immediate assistance or to view live slab videos, you can also reach our team directly via WhatsApp:</p>
                <p style="text-align:center;">
                  <a href="https://wa.me/919116622422?text=Hello%2C%20following%20up%20on%20my%20website%20enquiry%20for%20${encodeURIComponent(spaceInterest)}" class="btn">Connect on WhatsApp →</a>
                </p>
                <p style="margin-top:30px;">Warm regards,<br><strong>Founders &amp; Executive Team</strong><br>Granite Gallery India</p>
              </div>
              <div class="footer">
                Khasra No.948, MEGA Highway, Tehsil Ralawata, Kishangarh, Rajasthan 305801<br>
                Phone: +91 91166 22422 · Email: sales.granitegalleryindia@gmail.com
              </div>
            </div>
          </body>
          </html>
        `;

        await resend.emails.send({
          from: fromEmail,
          to: [formattedEmail],
          subject: `Enquiry Received — Granite Gallery India`,
          html: customerEmailHtml,
        });
      } catch (custErr) {
        // Log notice for unverified domain mode without failing lead submission
        console.info('Customer receipt skipped (requires verified domain at resend.com/domains):', custErr);
      }
    } else {
      console.log('Resend API key missing in environment variables. Lead details received:', {
        name: formattedName,
        email: formattedEmail,
        phone: formattedPhone,
        location: formattedLocation,
        spaceInterest,
        message: formattedMessage,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully. Our stone consultant will reach out within 2 hours.',
    });
  } catch (err: any) {
    console.error('Error processing enquiry form:', err);
    return NextResponse.json({ success: false, error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

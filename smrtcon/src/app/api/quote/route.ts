import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function buildEmailTemplate(data: Record<string, unknown>): string {
  const categories = Array.isArray(data.categories)
    ? data.categories.join(', ')
    : String(data.categories || 'Not specified');

  return `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1E1B18; padding: 32px; text-align: center;">
        <h1 style="color: #C49A3C; font-size: 24px; margin: 0;">New Quote Request</h1>
        <p style="color: #C4BDB4; margin-top: 8px;">smrtCON Website</p>
      </div>
      <div style="padding: 32px; background: #F8F4EE; color: #1E1B18;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #3A3830;">Name</td><td style="padding: 8px 0;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #3A3830;">Company</td><td style="padding: 8px 0;">${data.company || '—'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #3A3830;">Email</td><td style="padding: 8px 0;">${data.email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #3A3830;">Phone</td><td style="padding: 8px 0;">${data.phone || '—'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #3A3830;">Country</td><td style="padding: 8px 0;">${data.country}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #3A3830;">Categories</td><td style="padding: 8px 0;">${categories}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #3A3830;">Description</td><td style="padding: 8px 0;">${data.description || '—'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #3A3830;">Quantity</td><td style="padding: 8px 0;">${data.quantity || '—'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #3A3830;">Timeline</td><td style="padding: 8px 0;">${data.timeline || '—'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #3A3830;">Referral</td><td style="padding: 8px 0;">${data.referral || '—'}</td></tr>
        </table>
      </div>
    </div>
  `;
}

function buildAutoReplyTemplate(data: Record<string, unknown>): string {
  return `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1E1B18; padding: 32px; text-align: center;">
        <h1 style="color: #C49A3C; font-size: 24px; margin: 0;">smrtCON</h1>
        <p style="color: #C4BDB4; margin-top: 4px; font-size: 12px;">PREMIUM CONSTRUCTION MATERIALS</p>
      </div>
      <div style="padding: 32px; background: #F8F4EE; color: #1E1B18;">
        <p style="font-size: 16px;">Hi ${data.name},</p>
        <p>Thank you for your quote request! Our team will review your requirements and get back to you within <strong>48 hours</strong> with a detailed quote.</p>
        <p>In the meantime, feel free to reach us on WhatsApp for any urgent questions.</p>
        <div style="margin-top: 24px; padding: 16px; background: #1E1B18; text-align: center; border-radius: 4px;">
          <p style="color: #C49A3C; margin: 0; font-size: 14px;">smrtCON — Smart Construction Materials</p>
          <p style="color: #7A7168; margin-top: 4px; font-size: 12px;">Mississauga, Ontario, Canada</p>
          <p style="color: #7A7168; margin-top: 4px; font-size: 12px;">info@smrtcon.com</p>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Send notification to smrtCON team
    await resend.emails.send({
      from: 'smrtCON Website <noreply@smrtcon.com>',
      to: 'info@smrtcon.com',
      subject: `New Quote Request — ${data.company || data.name} (${data.country})`,
      html: buildEmailTemplate(data),
    });

    // Send auto-reply to client
    await resend.emails.send({
      from: 'smrtCON <info@smrtcon.com>',
      to: data.email,
      subject: 'We received your quote request — smrtCON',
      html: buildAutoReplyTemplate(data),
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}

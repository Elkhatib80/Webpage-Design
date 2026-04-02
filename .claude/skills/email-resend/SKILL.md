---
name: email-resend
description: Email sending via Resend API for contact forms and booking requests with locale-aware templates. Use when implementing email notifications, contact form submissions, or transactional emails.
---

# Email with Resend

## Environment Setup

```bash
# .env.local
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=hello@studioname.com
```

## Resend Client

```tsx
// lib/resend.ts
import { Resend } from 'resend';

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export function hasResend(): boolean {
  return resend !== null;
}
```

## Contact Form Email

```tsx
// lib/emails/contact.ts
import { resend } from '@/lib/resend';
import type { Locale } from '@/i18n.config';

interface ContactEmailParams {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale: Locale;
}

export async function sendContactEmail({
  name,
  email,
  phone,
  message,
  locale,
}: ContactEmailParams) {
  if (!resend) {
    console.log('Resend not configured, skipping email');
    return { success: false, error: 'Email not configured' };
  }

  const toEmail = process.env.CONTACT_TO_EMAIL!;

  try {
    await resend.emails.send({
      from: 'Studio Contact <noreply@studioname.com>',
      to: toEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted from: ${locale} locale</small></p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
```

## Server Action with Email

```tsx
// lib/actions/contact.ts
'use server';

import { contactFormSchema } from '@/lib/validations';
import { sendContactEmail } from '@/lib/emails/contact';
import type { Locale } from '@/i18n.config';

export async function submitContactForm(formData: FormData, locale: Locale) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  };

  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const emailResult = await sendContactEmail({
    ...result.data,
    locale,
  });

  if (!emailResult.success) {
    return {
      success: false,
      errors: { _form: ['Failed to send message. Please try again.'] },
    };
  }

  return { success: true };
}
```

## Fallback Without Resend

```tsx
// When RESEND_API_KEY is not set
export function ContactForm() {
  const hasEmail = hasResend();

  if (!hasEmail) {
    return (
      <div className="text-center p-8">
        <p>Contact us directly at:</p>
        <a href="mailto:hello@studioname.com" className="text-primary">
          hello@studioname.com
        </a>
      </div>
    );
  }

  return <ContactFormWithEmail />;
}
```

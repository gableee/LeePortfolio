export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || '17leegab@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    return res.status(500).json({ ok: false, error: 'Missing email configuration' });
  }

  const name = (req.body?.name || '').slice(0, 100);
  const email = (req.body?.email || '').slice(0, 200);
  const subject = (req.body?.subject || 'Portfolio Contact').slice(0, 200);
  const body = (req.body?.body || '').slice(0, 2000);
  const pageUrl = (req.body?.pageUrl || 'unknown').slice(0, 500);

  if (!name.trim() || !email.trim() || !body.trim()) {
    return res.status(400).json({ ok: false, error: 'Name, email, and message are required' });
  }

  const text = [
    `From: ${name} <${email}>`,
    `Page: ${pageUrl}`,
    `Timestamp (UTC): ${new Date().toISOString()}`,
    '',
    '--- Message ---',
    body,
  ].join('\n');

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `[Portfolio] ${subject}`,
        text,
        reply_to: email.trim() || undefined,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      return res.status(502).json({ ok: false, error: `Email provider error: ${errText}` });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error?.message || 'Unexpected server error' });
  }
}

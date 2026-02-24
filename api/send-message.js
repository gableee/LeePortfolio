export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    return res.status(500).json({ ok: false, error: 'Missing email configuration' });
  }

  const sourcePath = req.body?.sourcePath || '/';
  const pageUrl = req.body?.pageUrl || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  const subject = 'New portfolio quick-connect message';
  const text = [
    'Someone clicked the direct-send message button on your portfolio.',
    '',
    `Path: ${sourcePath}`,
    `URL: ${pageUrl}`,
    `User-Agent: ${userAgent}`,
    `Timestamp (UTC): ${new Date().toISOString()}`,
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
        subject,
        text,
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

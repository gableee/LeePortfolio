import { useState } from 'react';
import { profile } from '../data/profile';

// Sends straight to my inbox through Web3Forms (no backend of my own).
// Set VITE_WEB3FORMS_KEY in .env.local / the host's env to enable it; the key is
// public by design (it only allows sending to the email it was created for).
// Without a key, the form opens the visitor's email app with the message filled in.
const KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | mailto

  const submit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // honeypot: humans never fill this in

    if (!KEY) {
      const body = `${data.message}\n\n${data.name}${data.email ? ` · ${data.email}` : ''}`;
      location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio: message from ${data.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, access_key: KEY, subject: `Portfolio: message from ${data.name}`, from_name: 'Portfolio contact form' }),
      });
      const res = await r.json();
      if (!res.success) throw new Error(res.message);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="card contact sent" role="status">
        <h4>Message sent</h4>
        <p>Thanks for reaching out. I'll reply to the email address you gave.</p>
        <button className="linkbtn" onClick={() => setStatus('idle')}>Send another message</button>
      </div>
    );
  }

  return (
    <form className="card contact" onSubmit={submit}>
      <h4>Send me a message</h4>
      <div className="contact-row">
        <label>Name<input name="name" required autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <label>Message<textarea name="message" rows="4" required placeholder="The role, your team, or a question about my projects" /></label>
      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="contact-foot">
        <button className="pen solid" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
        <p className="contact-note" aria-live="polite">
          {status === 'error' && <>Your message didn't send. Email me directly at <a href={`mailto:${profile.email}`}>{profile.email}</a>.</>}
          {status === 'mailto' && <>Your email app opened with the message ready. Press send there.</>}
        </p>
      </div>
    </form>
  );
}

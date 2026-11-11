import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import ContactForm from './ContactForm';

function Links({ home }) {
  return (
    <div className="links">
      <a className="pen solid" href={`mailto:${profile.email}`}>{profile.email}</a>
      <a className="pen" href={profile.linkedin}>LinkedIn</a>
      <a className="pen" href={profile.githubUrl}>GitHub</a>
      {home
        ? <a className="pen" href={profile.resume}>Résumé</a>
        : <Link className="pen" to="/">Back to home</Link>}
    </div>
  );
}

// Home: the full contact section with a form. Story pages: a short invitation and links.
export default function Footer({ title, text, home = false }) {
  if (!home) {
    return (
      <footer className="site" id="contact">
        <div className="wrap">
          <div><h2>{title}</h2><p>{text}</p></div>
          <Links />
        </div>
      </footer>
    );
  }
  return (
    <footer className="site home" id="contact">
      <div className="wrap">
        <div className="pitch">
          <h2>Hiring an ML, AI or full&#8209;stack intern?</h2>
          <p>I'd love to hear about your team and the problems you're working on.</p>
          <dl className="avail">
            <div><dt>Available</dt><dd>From December 2026, for an internship (OJT)</dd></div>
            <div><dt>Where</dt><dd>Remote, or on-site anywhere in Metro Manila</dd></div>
            <div><dt>Roles</dt><dd>ML / AI engineering, or full-stack development</dd></div>
          </dl>
          <Links home />
        </div>
        <ContactForm />
      </div>
    </footer>
  );
}

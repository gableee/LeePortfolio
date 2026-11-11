import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { store } from '../lib/shared';

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.set('theme', next);
    setTheme(next);
  };
  return [theme, toggle];
}

// links: [{ label, href }] — "#id" stays on the page, "/path#id" goes through the router.
// spy: highlight the link of the section being read. progress: reading bar for story pages.
export default function Nav({ links, spy = false, progress = false }) {
  const [theme, toggle] = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(null);
  const bar = useRef(null);

  useEffect(() => {
    const on = () => {
      setScrolled(scrollY > 8);
      if (bar.current) {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.current.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
      }
    };
    addEventListener('scroll', on, { passive: true });
    on();
    return () => removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!spy) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setCurrent(e.target.id); }), { rootMargin: '-35% 0px -60% 0px' });
    links.forEach(l => { const el = l.href.startsWith('#') && document.getElementById(l.href.slice(1)); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [spy, links]);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap">
        <Link className="home" to="/">{profile.name}</Link>
        <div className="links">
          {links.map(l => l.href.startsWith('#')
            ? <a key={l.href} href={l.href} aria-current={current === l.href.slice(1) ? 'location' : undefined}>{l.label}</a>
            : <Link key={l.href} to={l.href}>{l.label}</Link>)}
          <button className="pen" onClick={toggle} aria-pressed={theme === 'dark'}>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
        </div>
        {progress && <span className="progress" ref={bar} aria-hidden="true" />}
      </div>
    </nav>
  );
}

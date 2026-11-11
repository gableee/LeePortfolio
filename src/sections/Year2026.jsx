import { useEffect, useRef, useState } from 'react';

// 2026 at a glance: the thesis build as a bar, each ML course as a dot on top of it.
// Positions are day-of-year, so the picture is exact, not decorative.
const YEAR = 2026;
const pos = iso => {
  const d = new Date(iso + 'T00:00:00'), start = new Date(`${YEAR}-01-01T00:00:00`), end = new Date(`${YEAR + 1}-01-01T00:00:00`);
  return ((d - start) / (end - start)) * 100;
};
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const COURSES = [
  { date: '2026-03-31', label: 'Supervised ML', track: 'ml' },
  { date: '2026-05-09', label: 'Advanced Learning Algorithms', track: 'ml' },
  { date: '2026-06-13', label: 'ML Specialization complete', track: 'ml', big: true },
  { date: '2026-07-15', label: 'Neural Networks and Deep Learning', track: 'dl' },
  { date: '2026-08-17', label: 'Improving Deep Neural Networks', track: 'dl' },
];
const THESIS = { from: '2026-01-01', to: '2026-09-30' };

export default function Year2026() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const left = pos(THESIS.from), width = pos(THESIS.to) - left;
  return (
    <figure className={`y26 card${shown ? ' in' : ''}`} ref={ref}>
      <figcaption>
        <b>2026: five ML courses, finished while building my thesis</b>
        <span className="y26-key"><i className="k-ml" />Machine Learning Specialization <i className="k-dl" />Deep Learning Specialization</span>
      </figcaption>
      <div className="y26-scroll">
        <div className="y26-chart" role="img" aria-label="Timeline of 2026. VoteX was built from January to September. Five courses were completed inside that period: March 31, May 9, June 13, July 15 and August 17.">
          {COURSES.map((c, i) => (
            <div key={c.date} className={`y26-pin ${c.track}${i % 2 ? ' low' : ''}${c.big ? ' big' : ''}`} style={{ left: `${pos(c.date)}%`, '--d': `${0.5 + i * 0.18}s` }}>
              <span className="y26-label"><small>{new Date(c.date + 'T00:00:00').toLocaleString('en', { month: 'short', day: 'numeric' })}</small>{c.label}</span>
              <i className="y26-dot" />
            </div>
          ))}
          <div className="y26-bar" style={{ left: `${left}%`, width: `${width}%` }}><span>Building VoteX, my thesis · Jan – Sept</span></div>
          <div className="y26-months">{MONTHS.map(m => <span key={m}>{m}</span>)}</div>
        </div>
      </div>
    </figure>
  );
}

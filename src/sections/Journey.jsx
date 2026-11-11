import { journey, upNext } from '../data/profile';
import { SHOW_TODOS } from '../lib/shared';

export default function Journey() {
  return (
    <section id="journey" className="sec">
      <div className="sec-head">
        <h2>Journey</h2>
        <p className="intro">Where I've been, newest first, and what I'm working toward next.</p>
      </div>
      <div className="journey">
        <ul className="log">
          {journey.filter(j => !j.todo || SHOW_TODOS).map(j => <li key={j.title} className={j.todo ? 'todo' : undefined}><time>{j.when}</time><b>{j.title}</b><span>{j.text}</span></li>)}
        </ul>
        <aside className="card upnext-card">
          <h4>Up next</h4>
          <ul>{upNext.map(u => <li key={u.title}><b>{u.title}</b><span>{u.text}</span></li>)}</ul>
        </aside>
      </div>
    </section>
  );
}

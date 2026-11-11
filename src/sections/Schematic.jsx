import { useState } from 'react';
import { Link } from 'react-router-dom';
import { votex } from '../data/projects';
import AutoVideo from '../components/AutoVideo';

const W = 160, H = 66;

// VoteX's architecture as a clickable diagram. Opens on the API:
// VoteX is first a piece of software engineering, the model is one part of it.
export default function Schematic() {
  const [sel, setSel] = useState(1);
  const n = votex.nodes[sel];
  return (
    <figure className="schematic">
      <div className="scroller">
        <svg viewBox="0 0 1000 350" role="group" aria-label="How VoteX is built. Select a part to see it working.">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" /></marker>
          </defs>
          <g>
            {votex.edges.map((d, j) => (
              <path key={d} d={d} className={`edge${n.edges.includes(j) ? ' on' : ''}`} markerEnd="url(#arrow)" />
            ))}
          </g>
          <g>
            {votex.nodes.map((m, i) => (
              <g
                key={m.title}
                className={`node${i === sel ? ' on' : ''}`}
                tabIndex={0}
                role="button"
                aria-pressed={i === sel}
                aria-label={`${m.title}: ${m.sub}`}
                onClick={() => setSel(i)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(i); } }}
              >
                <rect x={m.x} y={m.y} width={W} height={H} />
                <text className="t" x={m.x + 14} y={m.y + 28}>{m.title}</text>
                <text className="s" x={m.x + 14} y={m.y + 49}>{m.sub}</text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <p className="hint">Click any box to see that part working.</p>
      <div className="detail" aria-live="polite">
        <div className="frame swap" key={n.video + 'v'}><AutoVideo name={n.video} label={n.head} /></div>
        <div className="swap" key={n.video + 't'}>
          <p className="label">{n.sub}</p>
          <h3>{n.head}</h3>
          <p>{n.text}</p>
          <Link className="linkbtn" to={`/votex#${n.chapter}`}>See this part of the story</Link>
        </div>
      </div>
    </figure>
  );
}

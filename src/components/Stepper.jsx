import { useRef, useState } from 'react';
import AutoVideo from './AutoVideo';

// Tabs that swap one shared video. steps: [{ video, tag, title, caption }]
export default function Stepper({ label, steps }) {
  const [i, setI] = useState(0);
  const tabs = useRef([]);
  const go = (n, focus) => {
    const next = (n + steps.length) % steps.length;
    setI(next);
    if (focus) tabs.current[next]?.focus();
  };
  const onKey = (e, j) => {
    const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (k) { e.preventDefault(); go(j + k, true); }
  };
  const s = steps[i];
  return (
    <div className="stepper">
      <div className="steps" role="tablist" aria-label={label}>
        {steps.map((st, j) => (
          <button
            key={st.video}
            ref={el => { tabs.current[j] = el; }}
            role="tab"
            aria-selected={i === j}
            tabIndex={i === j ? 0 : -1}
            onClick={() => go(j)}
            onKeyDown={e => onKey(e, j)}
          >
            <span className="mono">{st.tag}</span><b>{st.title}</b>
          </button>
        ))}
      </div>
      <div className="frame"><AutoVideo name={s.video} label={s.caption} /></div>
      <p className="cap" aria-live="polite">{s.caption}</p>
    </div>
  );
}

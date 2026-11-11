import { useEffect, useRef, useState } from 'react';

// A silent screen recording that plays as soon as it is on screen, with a pause button
// (a pause control is required for auto-playing media, WCAG 2.2.2).
// `name` maps to /media/<name>.mp4 with a poster at /frames/<name>.jpg.
export default function AutoVideo({ name, label, eager = false }) {
  const ref = useRef(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, [name]);

  const toggle = () => {
    const v = ref.current;
    if (v.paused) { userPaused.current = false; v.play().catch(() => {}); }
    else { userPaused.current = true; v.pause(); }
  };

  return (
    <div className="vid">
      <video
        key={name}
        ref={ref}
        src={`/media/${name}.mp4`}
        poster={`/frames/${name}.jpg`}
        muted loop playsInline
        preload={eager ? 'auto' : 'none'}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className="vid-btn"
        onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(); }}
        aria-label={playing ? 'Pause video' : 'Play video'}
      >
        {playing
          ? <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="4" y="3" width="3" height="10" rx="1" /><rect x="9" y="3" width="3" height="10" rx="1" /></svg>
          : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5z" /></svg>}
        <span>{playing ? 'Pause' : 'Play'}</span>
      </button>
    </div>
  );
}

import { certItem, others, tracks } from '../data/certificates';
import { useLightbox } from '../lib/shared';
import Year2026 from './Year2026';

export default function Certificates() {
  const open = useLightbox();
  return (
    <section id="certificates" className="sec">
      <div className="sec-head">
        <h2>Certificates</h2>
        <p className="intro">I finished five machine learning courses while building VoteX. Click any certificate to see it full size or verify it on Coursera.</p>
      </div>
      <Year2026 />
      <div className="tracks">
        {tracks.map(tr => (
          <div className="track" key={tr.name}>
            <div className="track-head"><b>{tr.name}</b><span className="label">{tr.by}</span></div>
            <div className="stops">
              {tr.stops.map(s => s.upNext ? (
                <button key={s.title} className="stop upnext" disabled>
                  <div className="thumb">up next</div><time>{s.date}</time><span>{s.title}</span>
                </button>
              ) : (
                <button key={s.title} className="stop" onClick={() => open(certItem(s))} aria-label={`View certificate: ${s.title}`}>
                  <div className="thumb"><img src={`/certs/${s.img}.jpg`} alt="" loading="lazy" /></div>
                  <time>{s.date}</time><span>{s.title}</span>{s.done && <em>{s.done}</em>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="others">
        {others.map(c => (
          <button key={c.title} className="other" onClick={() => open(certItem(c))}>
            <img src={`/certs/${c.img}.jpg`} alt="" loading="lazy" />
            <div><b>{c.title}</b><small>{c.meta}</small></div>
          </button>
        ))}
      </div>
    </section>
  );
}

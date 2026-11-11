import { useCallback, useEffect, useRef, useState } from 'react';
import { LightboxContext } from '../lib/shared';

// One <dialog> for the whole app. Children call useLightbox()(item) to open it.
export default function LightboxProvider({ children }) {
  const ref = useRef(null);
  const [item, setItem] = useState(null);
  const open = useCallback(next => setItem(next), []);

  useEffect(() => { if (item && !ref.current.open) ref.current.showModal(); }, [item]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        className={`lightbox${item?.figure ? ' figure' : ''}`}
        aria-label={item?.title || 'Preview'}
        onClose={() => setItem(null)}
        onClick={e => { if (e.target === ref.current) ref.current.close(); }}
      >
        {item && <>
          <img src={item.img} alt={item.figure ? item.title : `Certificate: ${item.title}`} />
          <div className="lb">
            <div><b>{item.title}</b><small>{item.meta}</small></div>
            <div className="acts">
              {item.verify && <a className="pen" href={item.verify} target="_blank" rel="noopener noreferrer">Verify on Coursera</a>}
              {item.pdf && <a className="pen" href={item.pdf} target="_blank" rel="noopener noreferrer">Open PDF</a>}
              <button className="pen solid" onClick={() => ref.current.close()} autoFocus>Close</button>
            </div>
          </div>
        </>}
      </dialog>
    </LightboxContext.Provider>
  );
}

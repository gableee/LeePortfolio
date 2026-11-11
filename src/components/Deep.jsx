import { useDepth } from '../lib/shared';

// An "Under the hood" panel. Opens with the page's technical-detail switch, or on its own.
export default function Deep({ topic, wide = false, children }) {
  const depth = useDepth();
  return (
    // remount when the switch flips so every panel follows it; the reader can still toggle each one
    <details key={depth ? 'open' : 'closed'} className={`deep${wide ? ' wide' : ''}`} open={depth}>
      <summary>Under the hood <small>{topic}</small></summary>
      <div className="in">{children}</div>
    </details>
  );
}

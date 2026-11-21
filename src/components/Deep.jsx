// An "Under the hood" panel. Closed by default; the reader opens it.
export default function Deep({ topic, wide = false, children }) {
  return (
    <details className={`deep${wide ? ' wide' : ''}`}>
      <summary>Under the hood <small>{topic}</small></summary>
      <div className="in">{children}</div>
    </details>
  );
}

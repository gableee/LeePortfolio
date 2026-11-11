import { useEffect, useRef } from 'react';
import { profile } from '../data/profile';
import { ago } from '../lib/useGitHub';

const Failed = ({ what }) => (
  <p className="gh-empty">Couldn't load {what} right now. <a href={profile.githubUrl}>See it on GitHub</a>.</p>
);

function Calendar({ data }) {
  const scroller = useRef(null);
  // on small screens the grid scrolls sideways: start at the newest weeks
  useEffect(() => { const s = scroller.current; if (s && data && data !== 'error') s.scrollLeft = s.scrollWidth; }, [data]);
  let body;
  if (data === undefined) body = <p className="gh-empty">Loading contributions…</p>;
  else if (data === 'error') body = <Failed what="the contribution calendar" />;
  else body = (
    <div data-cal style={{ '--weeks': data.weeks }}>
      <div className="gh-months">{data.months.map(m => <span key={m.w} style={{ gridColumn: m.w + 1 }}>{m.name}</span>)}</div>
      <div className="gh-grid" role="img" aria-label={`${data.total} contributions in the last year`}>
        {data.cells.map((d, i) => d
          ? <i key={i} data-l={d.level} className={d.date === data.busiest.date ? 'peak' : undefined} title={`${d.count} contribution${d.count === 1 ? '' : 's'} on ${d.date}`} />
          : <i key={i} className="pad" />)}
      </div>
    </div>
  );
  return (
    <div className="card gh-cal">
      <div className="gh-top"><span className="mono">&gt;_ github.com/{profile.github}</span><a className="pen" href={profile.githubUrl}>View profile</a></div>
      {data && data !== 'error' && (
        <dl className="gh-stats">
          <div><dt>Contributions</dt><dd>{data.total.toLocaleString()}</dd><span>in the last year</span></div>
          <div><dt>Active days</dt><dd>{data.active}</dd><span>of the last 365</span></div>
          <div><dt>Longest streak</dt><dd>{data.longest} days</dd><span>{data.current > 1 ? `current streak: ${data.current} days` : 'in a row'}</span></div>
          <div className="peak"><dt>Busiest day</dt><dd>{data.busiest.count}</dd><span>contributions on {data.busiest.label}</span></div>
        </dl>
      )}
      <div className="gh-scroll" ref={scroller}>{body}</div>
      <div className="gh-foot">
        <span>{data && data !== 'error' ? <><i className="peak-key" aria-hidden="true" /> busiest day</> : ''}</span>
        <span className="gh-legend" aria-hidden="true">Less {[0, 1, 2, 3, 4].map(l => <i key={l} data-l={l} />)} More</span>
      </div>
    </div>
  );
}

function Feed({ commits }) {
  let body;
  if (commits === undefined) body = <li className="gh-empty">Loading…</li>;
  else if (commits === 'error') body = <li className="gh-empty"><Failed what="recent commits" /></li>;
  else if (!commits.length) body = <li className="gh-empty">No public commits in the last 90 days. Most of my recent work is in private repositories.</li>;
  else body = commits.map(c => (
    <li key={c.sha + c.when}><a href={c.url}>{c.msg}</a><small>{c.repo.split('/')[1]} · {ago(c.when)}</small></li>
  ));
  return (
    <div className="card gh-feedcard">
      <h4>Latest commits</h4>
      <ul className="gh-feed">{body}</ul>
    </div>
  );
}

export default function GitHubActivity({ calendar, commits }) {
  return (
    <section id="github" className="sec">
      <div className="sec-head">
        <h2>On GitHub</h2>
        <p className="intro">Live from my public GitHub profile: contributions over the past year and my latest commits.</p>
      </div>
      <div className="gh">
        <Calendar data={calendar} />
        <Feed commits={commits} />
      </div>
    </section>
  );
}

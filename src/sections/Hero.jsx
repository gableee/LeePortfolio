import { profile, proof } from '../data/profile';
import { ago } from '../lib/useGitHub';

function LatestCommit({ commits }) {
  if (commits === undefined) return <span className="now-commit">Loading my latest commit…</span>;
  if (commits === 'error') return <span className="now-commit"><a href={profile.githubUrl}>See my latest commits on GitHub</a></span>;
  if (!commits.length) return <span className="now-commit">Most recent work is in private repositories.</span>;
  const c = commits[0];
  return <span className="now-commit">Latest commit: <a href={c.url}>{c.msg}</a> · {ago(c.when)}</span>;
}

export default function Hero({ commits }) {
  return (
    <>
      <header className="hero">
        <div>
          <div className="who">
            <figure className="photo"><img src={profile.photo} alt={`Portrait of ${profile.name}`} width="320" height="320" /></figure>
            <h1>{profile.name}</h1>
          </div>
          <p className="lede">{profile.lede}</p>
          <div className="ctas">
            <a className="pen solid" href={profile.resume}>Download résumé</a>
            <a className="pen" href={`mailto:${profile.email}`}>Email me</a>
            <a className="pen" href={profile.githubUrl}>GitHub</a>
            <a className="pen" href={profile.linkedin}>LinkedIn</a>
          </div>
        </div>
        <aside className="card now" aria-label="What I'm doing right now">
          <h4><span className="live-dot" aria-hidden="true" />Right now</h4>
          <dl>
            <dt>Building</dt>
            <dd><b>Eryysyn</b>, an AI research platform that will answer questions from your own documents, with citations. <a href="#eryysyn">Phase 1 of 9</a>.<LatestCommit commits={commits} /></dd>
            <dt>Looking for</dt>
            <dd>An ML / AI engineering internship (OJT), or a full-stack role. <b>Available from December 2026</b>, remote or on-site.</dd>
            <dt>Based in</dt>
            <dd>Bataan, Philippines. Open to on-site work anywhere in Metro Manila: Taguig (BGC), Makati, Pasig, Quezon City and more.</dd>
          </dl>
        </aside>
      </header>

      <ul className="proof" aria-label="Highlights">
        {proof.map(p => <li key={p.big}><b>{p.big}</b><span>{p.small}</span></li>)}
      </ul>
    </>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DepthContext, store } from '../lib/shared';
import { profile } from '../data/profile';
import AutoVideo from './AutoVideo';
import Footer from './Footer';
import Nav from './Nav';

// Frame for a project story page: nav with reading progress, hero, facts, depth switch, footer.
export function StoryPage({ title, lede, heroVideo, facts, readTime, links, footer, children }) {
  const [depth, setDepth] = useState(() => store.get('depth') === '1');
  const flip = () => { const on = !depth; setDepth(on); store.set('depth', on ? '1' : '0'); };
  useEffect(() => { document.title = `${title} · ${profile.name}`; }, [title]);
  return (
    <DepthContext.Provider value={depth}>
      <a className="skip" href="#main">Skip to content</a>
      <Nav links={links} progress />
      <main className="wrap" id="main">
        <header className="story-hero">
          <Link className="back" to="/#projects">Back to projects</Link>
          <div className="story-top">
            <div>
              <h1>{title}</h1>
              <p className="lede" style={{ marginTop: 18, maxWidth: '40ch' }}>{lede}</p>
            </div>
            <div className="frame"><AutoVideo name={heroVideo} label={`${title} overview`} eager /></div>
          </div>
          <dl className="facts">
            {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <div className="toolbar">
            <span className="label">{readTime}</span>
            <button className="switch" role="switch" aria-checked={depth} onClick={flip}><i />Show technical detail</button>
          </div>
        </header>
        {children}
      </main>
      <Footer title={footer.title} text={footer.text} />
    </DepthContext.Provider>
  );
}

export function Chapter({ id, n, of, title, children }) {
  return (
    <section className="chapter" id={id}>
      <div className="ch-head"><span className="label">Chapter {n} of {of}</span><h2>{title}</h2></div>
      {children}
    </section>
  );
}

export function NextStory({ to, title, text, frame }) {
  return (
    <Link className="next-story" to={to}>
      <div><span className="label">Next story</span><h3>{title}</h3><p>{text}</p></div>
      <img src={`/frames/${frame}.jpg`} alt="" loading="lazy" />
    </Link>
  );
}

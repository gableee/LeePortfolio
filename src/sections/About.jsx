import { beyond, facts } from '../data/profile';
import { SHOW_TODOS } from '../lib/shared';

export default function About() {
  const shown = facts.filter(f => !f.todo || SHOW_TODOS);
  return (
    <section id="about" className="sec">
      <div className="about">
        <div className="story">
          <h2>About me</h2>
          <p className="big">I'm a full-stack developer who got hooked on machine learning.</p>
          <p>I started on the front end, building interfaces in React. Then I moved to the back end to understand what happens behind them: APIs, databases and sign-in. Doing both is how I became a full-stack developer.</p>
          <p>While building projects, I started exploring machine learning and deep learning, and I was fascinated: instead of writing every rule yourself, you let the data teach the model. It came together in my thesis, VoteX, a full election system with an AI model reading voter feedback, which I built as the only developer on a team of three.</p>
          <p>While building VoteX, I also finished the Machine Learning Specialization and two deep learning courses, one after another from March to August 2026. Because I can build the whole application around a model, what I train doesn't have to stay in a notebook.</p>
        </div>
        <aside className="card facts-card">
          <h4>Quick facts</h4>
          <dl>
            {shown.map(f => [
              <dt key={f.k + 't'}>{f.k}</dt>,
              <dd key={f.k + 'd'} className={f.todo ? 'todo' : undefined}>{f.v}</dd>,
            ])}
          </dl>
        </aside>
      </div>

      <div className="beyond">
        <h3>Outside the classroom</h3>
        <div className="beyond-row">
          {beyond.map(b => (
            <div className="card" key={b.title}><p className="label">{b.when}</p><h4>{b.url ? <a className="plain-link" href={b.url} target="_blank" rel="noopener noreferrer">{b.title}</a> : b.title}</h4><p>{b.text}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

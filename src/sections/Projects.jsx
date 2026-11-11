import { Link } from 'react-router-dom';
import { eryysyn, fraud, smaller, votex } from '../data/projects';
import { certItem, hackathonCert } from '../data/certificates';
import { useLightbox } from '../lib/shared';
import AutoVideo from '../components/AutoVideo';
import Logo from '../components/Logo';
import Todo from '../components/Todo';
import Schematic from './Schematic';

function VoteX() {
  return (
    <article className="vx">
      <div className="vx-head">
        <div>
          <h3>VoteX</h3>
          <p className="label">{votex.label} · <a href={votex.url}>vote-x.app</a></p>
          <p className="line">{votex.line}</p>
        </div>
        <Link className="pen solid" to="/votex">Read the VoteX story</Link>
      </div>
      <div className="scope">
        <span className="label">What I built</span>
        <ul>{votex.scope.map(s => <li key={s}>{s}</li>)}</ul>
      </div>
      <Schematic />
      <div className="stats">
        {votex.stats.map(s => <div key={s.small}><b>{s.big}</b><span>{s.small}</span></div>)}
      </div>
    </article>
  );
}

// 1 red dot among 578: the real fraud rate (492 of 284,807)
const WAFFLE = Array.from({ length: 578 }, (_, i) => i === 337);

function Compare() {
  const max = { caught: 98, alarms: Math.max(...fraud.models.map(m => m.alarms)) };
  const row = (label, k) => (
    <div className="cmp-row">
      <span className="cmp-l">{label}</span>
      <div className="cmp-bars">
        {fraud.models.map(m => (
          <span key={m.key} className={`cmp-${m.key}`} style={{ '--w': `${(m[k] / max[k]) * 100}%` }}>
            <i /><em>{m.chosen ? <b>{m[k]}</b> : m[k]}</em>
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <div className="cmp" role="group" aria-label="Three versions of the model on the test set">
      <div className="cmp-key">
        {fraud.models.map(m => <span key={m.key} className={`k-${m.key}`}>{m.name}{m.chosen ? ', chosen' : ''}</span>)}
      </div>
      {row('Frauds caught, of 98', 'caught')}
      {row('False alarms', 'alarms')}
    </div>
  );
}

// How the test set stayed untouched: 5-fold CV on the training data for every choice.
function CrossValidation() {
  return (
    <div className="card cv">
      <div className="cv-fig" role="img" aria-label="Data split: 80% training data used in five folds, each fold held out once for validation; 20% test data used once at the end.">
        <div className="cv-cols"><span>Training data · 80%</span><span>Test · 20%</span></div>
        {[0, 1, 2, 3, 4].map(f => (
          <div className="cv-row" key={f}>
            <span className="cv-n">Fold {f + 1}</span>
            <div className="cv-train">{[0, 1, 2, 3, 4].map(k => <i key={k} className={k === f ? 'val' : undefined} />)}</div>
            <div className="cv-test" />
          </div>
        ))}
        <div className="cv-key"><span className="k-tr">train</span><span className="k-val">validate</span><span className="k-te">test, used once at the end</span></div>
      </div>
      <div className="cv-text">
        <p className="label">How I kept the test honest</p>
        <h4>Every decision was made with 5-fold cross-validation</h4>
        <ul>
          <li><b>Hyperparameters:</b> a grid search over 8 settings, each trained 5 times on different folds (40 fits), scored on AUPRC.</li>
          <li><b>Threshold:</b> picked from out-of-fold predictions, as the highest cutoff that still catches 85% of fraud.</li>
          <li><b>Test set:</b> 56,962 transactions the model never saw until the final evaluation.</li>
        </ul>
      </div>
    </div>
  );
}

function Fraud() {
  const open = useLightbox();
  return (
    <article className="feat" id="fraud">
      <div className="vx-head">
        <div>
          <h3>Credit card fraud detection</h3>
          <p className="label">{fraud.label} · <a href={fraud.repo}>GitHub</a></p>
          <p className="line">{fraud.line}</p>
        </div>
        <a className="pen" href={fraud.repo}>View the code</a>
      </div>
      <div className="fx">
        <div className="card fx-card">
          <p className="label">The challenge</p>
          <h4>Only 1 in 578 transactions is fraud</h4>
          <div className="waffle" role="img" aria-label="578 dots, one of them red: 492 frauds among 284,807 transactions">
            {WAFFLE.map((hit, i) => <i key={i} className={hit ? 'hit' : undefined} />)}
          </div>
          <p className="fx-note">492 frauds in 284,807 transactions. A model that always says "legit" is 99.83% accurate and catches nothing, so I optimised for AUPRC instead of accuracy.</p>
        </div>
        <figure className="card fx-card">
          <p className="label">What the data showed</p>
          <h4>Fraud peaks at 2 AM</h4>
          <img src="/fraud/fraud-rate-by-hour.jpg" alt="Bar chart of fraud rate by hour of day from my EDA notebook. The rate peaks at 2 AM at about 1.7 percent." loading="lazy" />
          <figcaption className="fx-note">From my EDA notebook. The fraud rate hits 1.71% at 2 AM against 0.17% overall, so I engineered an hour-of-day feature.</figcaption>
        </figure>
        <div className="card fx-card">
          <p className="label">The trade-off</p>
          <h4>Where to draw the line</h4>
          <Compare />
          <p className="fx-note">Tuning cut false alarms from 168 to 15 but missed 4 more frauds. So I picked a lower threshold, 0.037, using cross-validation. It catches all 86 again, with fewer false alarms than the baseline.</p>
          <p className="fx-auprc">Tuning raised AUPRC from <b>{fraud.auprc.baseline.toFixed(3)}</b> to <b>{fraud.auprc.tuned.toFixed(3)}</b>.</p>
          <button className="linkbtn" onClick={() => open({ ...fraud.prCurve, figure: true })}>See the precision-recall curve</button>
        </div>
      </div>
      <CrossValidation />
      <ol className="pipeline" aria-label="Pipeline steps">
        {fraud.pipeline.map(p => <li key={p.step}><Logo name={p.icon} /><b>{p.step}</b><span>{p.how}</span></li>)}
      </ol>
    </article>
  );
}

function Eryysyn() {
  return (
    <article className="feat" id="eryysyn">
      <div className="vx-head">
        <div>
          <h3>Eryysyn <span className="badge">in progress</span></h3>
          <p className="label">{eryysyn.label} · <a href={eryysyn.repo}>GitHub</a></p>
          <p className="line">{eryysyn.line}</p>
        </div>
        <a className="pen" href={eryysyn.repo}>Follow the build</a>
      </div>
      <ol className="phases">
        {eryysyn.phases.map((p, i) => {
          const state = i < eryysyn.current ? 'done' : i === eryysyn.current ? 'now' : undefined;
          return (
            <li key={p} className={state} aria-current={state === 'now' ? 'step' : undefined}>
              <span className="n">{i}</span><b>{p}</b>{state === 'now' && <em>in progress</em>}
            </li>
          );
        })}
      </ol>
    </article>
  );
}

function More() {
  const open = useLightbox();
  return (
    <div className="more">
      <Link className="tile" to="/liwanag">
        <AutoVideo name="street-illumination" label="LIWANAG: a street's light poles coloured by light level" />
        <div className="body">
          <p className="label">Hackathon · Oct 2025 · front end</p>
          <h3>LIWANAG</h3>
          <p>A dashboard that shows Balanga City which streets are too dark, down to a single light pole.</p>
          <span className="go">Read the LIWANAG story</span>
        </div>
      </Link>
      <div className="tile">
        <img src={`/certs/${hackathonCert.img}.jpg`} alt="SiKAPTala 2026 certificate of participation" loading="lazy" />
        <div className="body">
          <p className="label">SiKAPTala 2026 · Top 10 of 70+ teams</p>
          <h3>AGAPAY</h3>
          <p>A medication companion app our team extended in a five-day national hackathon.</p>
          <button className="linkbtn go" onClick={() => open(certItem(hackathonCert))}>View certificate</button>
        </div>
      </div>
      <div className="smaller">
        <h4>Smaller builds</h4>
        <ul>
          {smaller.map(s => (
            <li key={s.name}>
              <a href={s.url}><b>{s.name}</b></a>
              <span>{s.todo ? <Todo fallback={s.meta}>{s.text} · {s.meta}</Todo> : `${s.text} · ${s.meta}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="sec">
      <div className="sec-head">
        <h2>Projects</h2>
        <p className="intro">What I've built, shown working. Each one has a full story one click away.</p>
      </div>
      <VoteX />
      <Fraud />
      <Eryysyn />
      <More />
    </section>
  );
}

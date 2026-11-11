import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chapter, NextStory, StoryPage } from '../components/Story';
import { reducedMotion } from '../lib/shared';
import AutoVideo from '../components/AutoVideo';
import Deep from '../components/Deep';
import Stepper from '../components/Stepper';

const LINKS = [
  { label: 'Projects', href: '/#projects' },
  { label: 'LIWANAG', href: '/liwanag' },
  { label: 'Contact', href: '#contact' },
];

const FACTS = [
  ['What', 'Undergraduate thesis'],
  ['My role', 'Sole developer, team of 3'],
  ['When', 'Jan – Sept 2026'],
  ['Status', <a key="live" href="https://vote-x.app">Live at vote-x.app</a>],
];

const VOTER_STEPS = [
  { video: 'VX_Login', tag: 'step 1', title: 'Sign in securely', caption: 'Failed sign-ins are counted, and the account locks after repeated attempts.' },
  { video: 'VX_BrowseCandidates', tag: 'step 2', title: 'Compare candidates', caption: 'Voters pick two candidates per position and compare their platforms side by side.' },
  { video: 'VX_FileCandidacy', tag: 'step 3', title: 'File a candidacy', caption: 'Candidates file for a position through a guided checklist instead of paper forms.' },
];

const ORGANISER_STEPS = [
  { video: 'VX_Dashboard', tag: 'now', title: 'Results', caption: 'Live results: rankings per position and voting activity by hour.' },
  { video: 'VX_VoterPulse', tag: 'trend', title: 'Voter pulse', caption: 'Voter pulse: how support for each candidate moves across survey rounds.' },
  { video: 'VX_Forecast', tag: 'ahead', title: 'Forecast', caption: 'Forecast: an advisory leaderboard built from pre-election survey rounds.' },
];

// Real GPT-OSS 20B output (prompt sentiment-v2) for these comments, trimmed to the main fields.
// The tier is derived on the server from overall_score (scoreToLabel5).
const EXAMPLES = [
  { text: '"She always replies to our messages and finished the projects she promised last year."', out: { language: 'english', overall_score: 0.8, targets: [], criteria_tags: ['keeps_promises', 'communication'], abstained: false, model_self_confidence: 0.9 }, tier: 'very_positive', agg: "Stored with its tier and tags. No candidate is named, so it doesn't change any candidate's average score." },
  { text: '"Good ideas, but I never see him at student council meetings."', out: { language: 'english', overall_score: 0, targets: [], criteria_tags: ['other'], abstained: true, model_self_confidence: 0.6 }, tier: 'neutral', agg: 'The model abstained instead of guessing, on both runs. It is stored as neutral with the abstain flag, and no candidate is scored.' },
  { text: '"The platform sounds copied from last year and nothing changed."', out: { language: 'english', overall_score: -0.5, targets: [], criteria_tags: ['platform'], abstained: false, model_self_confidence: 0.8 }, tier: 'negative', agg: 'Stored as negative, tagged platform. A comment that names a candidate would also be added to that candidate\'s average.' },
];

function SentimentDemo() {
  const [ex, setEx] = useState(0);
  const [lit, setLit] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  // start the first run when the demo scrolls into view
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // light the three stages one after another
  useEffect(() => {
    if (!started) return;
    const still = reducedMotion();
    const timers = [1, 2, 3].map(k => setTimeout(() => setLit(k), still ? 0 : (k - 1) * 550));
    return () => { timers.forEach(clearTimeout); setLit(0); };
  }, [ex, started]);

  const e = EXAMPLES[ex];
  const stage = (k, label, body) => (
    <div className={`stage${lit >= k ? ' lit' : ''}`}><div className="lab">{label}</div>{body}</div>
  );
  return (
    <div className="demo wide" ref={ref}>
      <div className="demo-head">
        <div className="opts" role="group" aria-label="Example comment">
          {EXAMPLES.map((_, i) => (
            <button key={i} className="pen" aria-pressed={ex === i} onClick={() => setEx(i)}>Example {i + 1}</button>
          ))}
        </div>
        <span className="label">Real GPT-OSS 20B output, trimmed</span>
      </div>
      <div className="stages">
        {stage(1, '1 · a voter writes', <p>{e.text}</p>)}
        <div className="arrow" aria-hidden="true">→</div>
        {stage(2, '2 · the model scores it', <><pre>{JSON.stringify(e.out, null, 1)}</pre><p>Server tier: <b>{e.tier}</b></p></>)}
        <div className="arrow" aria-hidden="true">→</div>
        {stage(3, '3 · what gets stored', <p>{e.agg}</p>)}
      </div>
      <p className="plain">In plain terms: the model turns free text into scores and tags a computer can count. For each named candidate, the dashboard then shows an average score and how many comments it comes from.</p>
    </div>
  );
}

const BALLOT = 'VX-2026-0412 | SSG Election 2026-2027 | President: Candidate B';

async function sha256(text) {
  if (!globalThis.crypto?.subtle) return null;
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, '0')).join('');
}

// Real SHA-256 in the browser: edit the ballot and watch the fingerprint stop matching.
function HashDemo() {
  const [ballot, setBallot] = useState(BALLOT);
  const [anchored, setAnchored] = useState('');
  const [now, setNow] = useState('');
  useEffect(() => { sha256(BALLOT).then(h => setAnchored(h ?? 'unavailable')); }, []);
  useEffect(() => {
    let live = true;
    sha256(ballot).then(h => { if (live) setNow(h ?? 'Hashing needs a secure (https) page.'); });
    return () => { live = false; };
  }, [ballot]);
  const ok = now && now === anchored;
  return (
    <div className="hashdemo">
      <span className="label">Simplified illustration: the real commitment also includes a salt and the election key</span>
      <label>Ballot as recorded (change any character)
        <input value={ballot} onChange={e => setBallot(e.target.value)} spellCheck={false} autoComplete="off" />
      </label>
      <div className="hashrow"><span className="muted">Fingerprint on chain</span><code>{anchored}</code></div>
      <div className="hashrow"><span className="muted">Fingerprint now</span><code>{now}</code></div>
      <div className={`verdict ${ok ? 'ok' : 'bad'}`} aria-live="polite">
        {ok
          ? <>Matches<span>This ballot hasn't changed since it was cast.</span></>
          : <>Doesn't match<span>Even a one-letter change gives a completely different fingerprint.</span></>}
      </div>
    </div>
  );
}

// Thesis Table 18, summary of project evaluation (mean of 1–5 ratings)
const SCORES = [
  { name: 'Effectiveness', v: 4.10 },
  { name: 'Efficiency', v: 3.98 },
  { name: 'Satisfaction', v: 3.92 },
  { name: 'Freedom from risk', v: 4.20 },
  { name: 'Context coverage', v: 4.13 },
];

function Results() {
  return (
    <div className="cols">
      <div className="text">
        <p className="lede">110 people evaluated VoteX: 100 students and 10 IT professionals. The overall mean was 4.06 out of 5, which the thesis rating scale interprets as "Very Acceptable".</p>
        <div className="stats">
          <div><b>110</b><span>people evaluated it</span></div>
          <div><b>4.06</b><span>overall mean, out of 5</span></div>
          <div><b>Very Acceptable</b><span>rating on the thesis scale</span></div>
        </div>
        <p>All five quality factors were rated Very Acceptable. The highest was freedom from risk (4.20), and the lowest was satisfaction (3.92).</p>
      </div>
      <div className="card">
        <h4 style={{ marginBottom: 14 }}>Scores by quality factor</h4>
        <div className="bars">
          {SCORES.map(s => (
            <div key={s.name} className="barrow">
              <span>{s.name}</span><i style={{ '--v': s.v }} /><b>{s.v.toFixed(2)}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VoteX() {
  const of = 8;
  return (
    <StoryPage
      title="VoteX"
      lede="An election platform I designed, built and shipped. Every vote can be checked, and every voter comment gets read."
      heroVideo="VX_Hero"
      facts={FACTS}
      readTime="About 6 minutes · 8 short chapters"
      links={LINKS}
      footer={{ title: 'Want to talk about VoteX?', text: "I'm happy to walk through any part of it." }}
    >
      <Chapter id="problem" n={1} of={of} title="The problem">
        <div className="cols">
          <div className="text">
            <p className="lede">Student elections at Bataan Christian College still run on paper ballots that are counted by hand.</p>
            <p>That leaves two gaps. Voters can't see how the count was done, and organisers learn nothing about what voters think of each candidate beyond the final tally.</p>
          </div>
          <div className="aims">
            <div className="card"><h4>Goal 1: elections people can trust</h4><p>Recorded ballots are anchored on a public ledger, so ballot receipts can be checked against it and any later change shows up.</p></div>
            <div className="card"><h4>Goal 2: feedback organisers can use</h4><p>Every voter comment, summarised so organisers can act on it.</p></div>
          </div>
        </div>
      </Chapter>

      <Chapter id="architecture" n={2} of={of} title="How I built it">
        <div className="cols">
          <div className="text">
            <p className="lede">VoteX is a complete piece of software, not a class demo. It covers every layer, from the database schema to the deployed app, tested end to end with many voter, candidate and admin accounts.</p>
            <p>I was the only developer on a team of three. I designed and built the whole system, while my two teammates ran user testing and wrote the thesis documentation.</p>
            <p>Four layers, each with one job, so a slow model or a busy blockchain never stops someone from voting. <Link to="/#projects">Explore the interactive diagram</Link>.</p>
          </div>
          <div className="card eng">
            <h4>Engineering highlights</h4>
            <ul>
              <li><b>Role-based access</b> for admins, voters and candidates, enforced in the API</li>
              <li><b>Secure sign-in</b> with lockout after repeated failed attempts</li>
              <li><b>Audit log</b> on every admin action</li>
              <li><b>Schema and migrations</b> designed in Supabase and PostgreSQL</li>
              <li><b>Background sentiment processing</b>, batched and retried, so voting never waits on the model</li>
              <li><b>Model fallback</b>: hosted GPT-OSS 20B (via Groq) as primary, with DeepSeek as automatic fallback</li>
              <li><b>Tamper-evident ledger</b> of ballot commitments on the Ethereum Sepolia testnet</li>
              <li><b>Deployed and live</b> at vote-x.app</li>
              <li><b>Evaluated</b> by 110 people: 100 students and 10 IT professionals</li>
            </ul>
          </div>
        </div>
        <div className="stats four wide">
          <div><b>Interface</b><span>React apps for voters, candidates and admins</span></div>
          <div><b>API and data</b><span>Node.js on Supabase and PostgreSQL</span></div>
          <div><b>Model</b><span>Background sentiment jobs calling GPT-OSS 20B, with DeepSeek as fallback</span></div>
          <div><b>Ledger</b><span>Ballot commitments in a Solidity contract on Ethereum Sepolia (testnet)</span></div>
        </div>
        <Deep wide topic="engineering decisions"><ul>
          <li><b>Schema and migrations</b> designed in Supabase, with an audit log on every admin action.</li>
          <li><b>Receipts that never show the vote.</b> Voters need proof that their ballot was recorded, but a receipt showing who they chose could be sold or demanded by someone pressuring them. So a receipt only carries a receipt number, a verification code and the ballot's on-chain status, and the chain stores a salted commitment, never the vote. The trade-off: a voter can confirm their ballot was recorded and anchored, but can't confirm on their own what it says.</li>
          <li><b>Anchoring off the voting path.</b> A background worker anchors ballots with retries and backoff, one transaction each, so a slow blockchain never blocks voting. The cost is that on-chain confirmation arrives a little later.</li>
        </ul></Deep>
      </Chapter>

      <Chapter id="journey" n={3} of={of} title="A voter's path">
        <div className="cols">
          <div className="text">
            <p className="lede">Three screens cover most of what a student or candidate does. Pick one to watch it.</p>
            <Deep topic="access control"><ul>
              <li><b>Three roles</b> (admin, voter, candidate), each with its own permissions, enforced in the API rather than only in the interface.</li>
              <li><b>Lockout</b> after repeated failed sign-ins, with remaining attempts shown to the user.</li>
              <li><b>Sessions:</b> custom JWTs signed by the API, expiring after 2 hours. A first-login token lasts 15 minutes and can only be used to finish account setup.</li>
              <li><b>Lockout schedule:</b> stored in the database. Three failures lock the account for 1 minute, rising to 5, 10 and 30 minutes, and 60 minutes from the seventh failure.</li>
              <li><b>Hardening:</b> the server refuses to start in production with a placeholder or short signing secret.</li>
            </ul></Deep>
          </div>
          <Stepper label="Voter journey" steps={VOTER_STEPS} />
        </div>
      </Chapter>

      <Chapter id="ledger" n={4} of={of} title="Proving the count">
        <div className="cols">
          <div className="text">
            <p className="lede">Every ballot gets a fingerprint, called a hash, that is published on the Ethereum Sepolia testnet. If anyone changes a vote later, its fingerprint stops matching.</p>
            <figure>
              <div className="frame"><AutoVideo name="VX_BchainExplo" label="VoteX public ledger explorer" /></div>
              <figcaption className="cap">The public ledger: anyone can look up a receipt and see it was confirmed on chain. Receipts never show the vote itself.</figcaption>
            </figure>
          </div>
          <div className="text">
            <HashDemo />
            <Deep topic="hashing and anchoring"><ul>
              <li><b>Only fingerprints go on chain</b>, never the vote itself, so the ledger proves nothing changed without revealing anyone's choice.</li>
              <li><b>Contract:</b> VoteChainV2.sol, deployed to the Ethereum Sepolia testnet (chain ID 11155111), not mainnet.</li>
              <li><b>Commitments:</b> keccak256 over the ballot with a salt, the election key and domain separation, so a commitment can't be guessed from the vote or reused in another election.</li>
              <li>The demo above is a simplified illustration. It hashes plain text with SHA-256 in your browser, while the real commitment also includes the salt and election key.</li>
              <li><b>Anchoring:</b> a background worker checks for new ballots every 30 seconds. Each ballot is anchored in its own transaction, so voting never waits on the blockchain.</li>
              <li><b>Receipts:</b> each one has a receipt number, a verification code, the election, and the transaction hash, block and confirmation time. It never shows who the voter chose, so nobody can be pressured into proving their vote.</li>
            </ul></Deep>
          </div>
        </div>
      </Chapter>

      <Chapter id="sentiment" n={5} of={of} title="Reading every comment">
        <p className="lede" style={{ marginTop: 18, maxWidth: '62ch' }}>In a real election there are too many comments for an organiser to read one by one. An AI model reads each one and reports how voters feel and what they care about.</p>
        <SentimentDemo />
        <div className="cols">
          <div className="text">
            <p>The result is a dashboard organisers can scan in a minute: which values voters mention most, how each candidate is perceived, and how that changes over time.</p>
            <Deep topic="model, output, checking">
              <ul>
                <li><b>Model:</b> GPT-OSS 20B, an open-weight model hosted on Groq. Comments are processed in batches with retries as a background job inside the Node.js API, so voting never waits on it.</li>
                <li><b>Fallback:</b> if the primary model fails, the pipeline automatically falls back to DeepSeek. Both keys are held on the server.</li>
                <li><b>Before the model:</b> personal details (IDs, emails, phone numbers, names) are stripped and the text is capped at 2,000 characters. The prompt says comments may mix English and Tagalog and may be sarcastic. The candidate list is sent too, so the model can tell who each comment is about.</li>
                <li><b>Output:</b> strict JSON, with the schema enforced by the provider. The server validates it and derives a five-tier label from the score, then stores it in PostgreSQL. The demo above simplifies this to three labels.</li>
                <li><b>When it goes wrong:</b> rate-limited calls are retried, then sent to DeepSeek, then held for the next batch. Low-confidence or ambiguous results go to an admin review queue instead of being counted silently.</li>
                <li><b>Checking the labels:</b> I hand-labelled 50 Taglish comments for a bake-off. The earlier model, Llama 3.1 8B on Groq, got 45 of 50 right (90%), against 46% for a keyword baseline. A second run by language scored 44 of 45. Groq has since retired that model. On the same 45-comment set, GPT-OSS 20B labelled all 45 correctly as positive, neutral or negative (15 each in English, Tagalog and Taglish). This checks the overall direction only, not the finer five tiers. The set is small and the comments are fairly clear, with no sarcasm or typos.</li>
              </ul>
              <pre>{`// output schema, trimmed
{ "language": "english" | "tagalog" | "taglish",
  "overall_score": -1.0 … 1.0,      // step 0.1
  "targets": [ /* each named candidate: character and role scores */ ],
  "criteria_tags": ["honesty", "keeps_promises", "platform", …],
  "abstained": false, "model_self_confidence": 0.9 }

// tiers, derived on the server
very_negative ≤ -0.6 < negative ≤ -0.15 < neutral < 0.15 ≤ positive < 0.6 ≤ very_positive`}</pre>
            </Deep>
          </div>
          <figure>
            <div className="frame"><AutoVideo name="VX_SentimentAn" label="VoteX sentiment dashboard" /></div>
            <figcaption className="cap">The sentiment dashboard: what voters mention about each candidate, with trends over time.</figcaption>
          </figure>
        </div>
        <figure className="wide shot" style={{ marginTop: 28 }}>
          <div className="frame"><img src="/votex/principal-demo.webp" alt="A video call where I share the VoteX admin dashboard with the school's Junior High School principal and my teammates. Other participants are blurred." loading="lazy" width="1920" height="640" /></div>
          <figcaption className="cap">Showing VoteX to the Junior High School principal of Bataan Christian College. The principal saw the sentiment analysis as a way to guide students: staff can't hear everything, and the dashboard shows them what students think. The principal also liked how it would modernise the school's elections.</figcaption>
        </figure>
      </Chapter>

      <Chapter id="organisers" n={6} of={of} title="The organiser's view">
        <div className="cols">
          <div className="text">
            <p className="lede">While the polls are open, organisers see live rankings, how support shifts between survey rounds, and a forecast of who is leading.</p>
            <Deep topic="forecasting"><ul>
              <li><b>Inputs:</b> VoterPulse survey rounds, which are mock ballots taken before the election, not real votes.</li>
              <li><b>Composite score (0–100):</b> 55% vote share in the latest round, 25% momentum across rounds (later rounds weigh more), and 20% approval breadth from 1–5 ratings. Ratings only count once enough people have rated a candidate.</li>
              <li><b>Leader:</b> the candidate with the most mock-ballot votes across rounds, with the composite score shown alongside.</li>
              <li><b>Limits:</b> it is labelled advisory. The weights are starting values, and I haven't checked the forecast against final results yet.</li>
            </ul></Deep>
          </div>
          <Stepper label="Organiser screens" steps={ORGANISER_STEPS} />
        </div>
      </Chapter>

      <Chapter id="results" n={7} of={of} title="How it went">
        <Results />
      </Chapter>

      <Chapter id="next-steps" n={8} of={of} title="What I'd improve">
        <div className="cols">
          <p className="lede">If I kept going, this is where I'd start.</p>
          <ul className="todo-list">
            <li>Build a larger hand-labelled test set with sarcasm, typos and slang, and score the five tiers, not just positive, neutral or negative.</li>
            <li>Compare GPT-OSS 20B with a small, purpose-trained classifier on cost, speed and accuracy.</li>
            <li>Load-test voting at peak turnout.</li>
            <li>Revoke sessions on logout and when an account is disabled, instead of waiting for the 2-hour expiry.</li>
            <li>Check the forecast against real election results, then tune its weights.</li>
          </ul>
        </div>
        <NextStory to="/liwanag" title="LIWANAG" text="Finding the dark streets of Balanga City, built in a hackathon." frame="street-illumination" />
      </Chapter>
    </StoryPage>
  );
}

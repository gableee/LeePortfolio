import { useEffect, useState } from 'react';
import { cached } from './useGitHub';
import { eryysyn } from '../data/projects';

// Eryysyn's progress, read live from the roadmap table in the repo's docs/CONTEXT.md:
//   | Phase | Subject | Status |
//   | 3     | RAG from scratch | In progress |
// Updating that table (already done after every step) updates the portfolio.
// Until it loads, or if the file moves, the copy in src/data/projects.js is shown.

const stateOf = status =>
  /^done/i.test(status) ? 'done'
  : /^in progress/i.test(status) ? 'now'
  : /^skip/i.test(status) ? 'skipped'
  : 'planned';

// "LangChain (optional, compare)" -> "LangChain"
const tidy = name => name.replace(/\s*\(.*\)\s*$/, '');

export function parseRoadmap(md) {
  const lines = md.split('\n');
  const head = lines.findIndex(l => /^\|\s*Phase\s*\|.*\|\s*Status\s*\|/i.test(l));
  if (head < 0) throw new Error('no roadmap table');
  const phases = [];
  for (let i = head + 2; i < lines.length && lines[i].trim().startsWith('|'); i++) {
    const [n, name, status] = lines[i].split('|').slice(1, -1).map(s => s.trim());
    if (!name || Number.isNaN(Number(n))) continue;
    phases.push({ n: Number(n), name: tidy(name), status, state: stateOf(status) });
  }
  if (!phases.length) throw new Error('empty roadmap');
  // "Phase 3 progress: extraction, chunking ... all work end to end through the API. Left in ..."
  const m = md.match(/^Phase (\d+) progress:\s*([^\n]*?\.)(?:\s|$)/m);
  const note = m ? m[2].charAt(0).toUpperCase() + m[2].slice(1) : null;
  return { phases, note };
}

export default function useEryysyn() {
  const [data, setData] = useState({ phases: eryysyn.phases, note: eryysyn.note, live: false });
  useEffect(() => {
    let alive = true;
    cached('eryysyn-roadmap', eryysyn.roadmapRaw, undefined, 'text')
      .then(parseRoadmap)
      .then(v => alive && setData({ ...v, live: true }), () => { /* keep the fallback */ });
    return () => { alive = false; };
  }, []);
  const now = data.phases.find(p => p.state === 'now') || [...data.phases].reverse().find(p => p.state === 'done');
  return { ...data, now, last: data.phases[data.phases.length - 1]?.n };
}

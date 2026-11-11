import { useEffect, useState } from 'react';

// Live GitHub activity, no token needed.
//   heatmap → github-contributions-api.jogruber.de (reads the public profile calendar; private
//             contributions appear only as anonymous counts if enabled on the profile)
//   commits → api.github.com public events (official API, 60 requests/hour per visitor IP)
// Responses are cached in sessionStorage for 10 minutes so reloads don't burn the rate limit.
const TTL = 10 * 60 * 1000;

async function cached(key, url) {
  try {
    const hit = JSON.parse(sessionStorage.getItem(key));
    if (hit && Date.now() - hit.t < TTL) return hit.v;
  } catch { /* storage blocked or empty */ }
  const r = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(String(r.status));
  const v = await r.json();
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v })); } catch { /* full or blocked */ }
  return v;
}

export function ago(d) {
  const s = (Date.now() - new Date(d)) / 1000;
  for (const [n, u] of [[31536000, 'year'], [2592000, 'month'], [604800, 'week'], [86400, 'day'], [3600, 'hour'], [60, 'minute']])
    if (s >= n) { const k = Math.floor(s / n); return `${k} ${u}${k > 1 ? 's' : ''} ago`; }
  return 'just now';
}

const day = s => new Date(s + 'T00:00:00');

function shapeCalendar(data) {
  const days = data.contributions || [];
  if (!days.length) throw new Error('empty');
  const cells = Array(day(days[0].date).getDay()).fill(null).concat(days); // weeks start on Sunday, like GitHub
  const weeks = Math.ceil(cells.length / 7);
  const months = [];
  let last = -1;
  for (let w = 0; w < weeks; w++) {
    const d = cells.slice(w * 7, w * 7 + 7).find(Boolean);
    if (!d) continue;
    const m = day(d.date).getMonth();
    if (m !== last) { months.push({ w, name: day(d.date).toLocaleString('en', { month: 'short' }) }); last = m; }
  }
  // drop a first month label that would collide with the next one
  if (months.length > 1 && months[1].w - months[0].w < 3) months.shift();
  const total = data.total?.lastYear ?? days.reduce((a, d) => a + d.count, 0);

  // streaks and the busiest day, for the stats row
  let longest = 0, run = 0, active = 0, best = days[0];
  for (const d of days) {
    if (d.count > 0) { run++; active++; longest = Math.max(longest, run); } else run = 0;
    if (d.count > best.count) best = d;
  }
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i === days.length - 1) continue; // today may not have a commit yet
    else break;
  }
  const busiest = { count: best.count, date: best.date, label: day(best.date).toLocaleString('en', { month: 'short', day: 'numeric' }) };
  return { cells, weeks, months, total, active, longest, current, busiest };
}

async function loadCommits(user) {
  const events = await cached('gh-ev:' + user, `https://api.github.com/users/${encodeURIComponent(user)}/events/public?per_page=50`);
  const items = [];
  for (const e of events) {
    if (e.type !== 'PushEvent') continue;
    const repo = e.repo.name;
    const commits = e.payload.commits || [];
    if (commits.length) {
      commits.slice().reverse().forEach(c => items.push({ msg: c.message.split('\n')[0], repo, sha: c.sha, when: e.created_at }));
    } else {
      // newer payloads only carry the head SHA; the message is looked up below
      const branch = (e.payload.ref || '').replace('refs/heads/', '');
      items.push({ msg: null, fallback: `Pushed to ${branch || 'a branch'}`, repo, sha: e.payload.head, when: e.created_at });
    }
    if (items.length >= 6) break;
  }
  const top = await Promise.all(items.slice(0, 6).map(async c => {
    if (c.msg) return c;
    try {
      const d = await cached('gh-c:' + c.sha, `https://api.github.com/repos/${c.repo}/commits/${c.sha}`);
      return { ...c, msg: d.commit.message.split('\n')[0] };
    } catch {
      return { ...c, msg: c.fallback };
    }
  }));
  return top
    .map(c => ({ ...c, url: `https://github.com/${c.repo}/commit/${c.sha}` }))
    .sort((a, b) => new Date(b.when) - new Date(a.when));
}

// calendar / commits: undefined while loading, 'error' on failure, otherwise data
export default function useGitHub(user) {
  const [calendar, setCalendar] = useState();
  const [commits, setCommits] = useState();
  useEffect(() => {
    let live = true;
    cached('gh-cal:' + user, `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`)
      .then(shapeCalendar)
      .then(v => live && setCalendar(v), () => live && setCalendar('error'));
    loadCommits(user)
      .then(v => live && setCommits(v), () => live && setCommits('error'));
    return () => { live = false; };
  }, [user]);
  return { calendar, commits };
}

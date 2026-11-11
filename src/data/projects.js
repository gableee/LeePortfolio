// Projects shown on the home page. Story pages (VoteX, LIWANAG) live in src/pages.

export const votex = {
  label: 'Thesis · sole developer on a team of 3 · Jan–Sept 2026',
  url: 'https://vote-x.app',
  line: 'An election platform I designed, built and shipped end to end as the only developer on my thesis team. It is deployed and live, was evaluated by 110 people, and includes an AI pipeline that reads voter feedback.',
  scope: ['React front end', 'Node.js REST API', 'PostgreSQL schema', 'Auth and user roles', 'Audit logging', 'Blockchain vote ledger (Sepolia testnet)', 'AI sentiment pipeline', 'LLM with automatic fallback', 'Deployed and live', 'Evaluated by 110 users'],
  stats: [
    { big: '110', small: 'people evaluated it' },
    { big: '4.06 / 5', small: 'their average rating' },
    { big: 'Live', small: 'at vote-x.app' },
  ],
  // the clickable system diagram: boxes, which edges light up, and the clip each one plays
  nodes: [
    { x: 40, y: 142, title: 'VoteX app', sub: 'React · CSS', edges: [0], video: 'VX_BrowseCandidates', head: 'Voters compare candidates, then vote', text: 'Students sign in, compare candidates side by side, cast a ballot and leave feedback.', chapter: 'journey' },
    { x: 290, y: 142, title: 'Election API', sub: 'Node.js · REST', edges: [0, 1, 2], video: 'VX_FileCandidacy', head: 'One service for the whole election', text: 'Setup, candidacy filing, voting and results all go through one Node.js API, with separate access for admins, voters and candidates.', chapter: 'architecture' },
    { x: 560, y: 47, title: 'Election data', sub: 'Supabase · Postgres', edges: [1, 3, 5], video: 'VX_VoterPulse', head: 'Data built for audits', text: 'Elections, candidates, ballots and feedback live in PostgreSQL, with an audit log on every admin action.', chapter: 'architecture' },
    { x: 560, y: 237, title: 'Sentiment model', sub: 'GPT-OSS 20B · DeepSeek fallback', edges: [2, 4], video: 'VX_SentimentAn', head: 'An AI model reads every comment', text: 'Each voter comment is scored from -1 to 1, placed in one of five tiers, and tagged with what voters care about, like honesty or keeping promises.', chapter: 'sentiment' },
    { x: 810, y: 47, title: 'Public ledger', sub: 'Solidity · Sepolia', edges: [3], video: 'VX_BchainExplo', head: 'Ballots anyone can audit', text: 'Each ballot gets a fingerprint published on the Ethereum Sepolia testnet. Change one vote and its fingerprint stops matching.', chapter: 'ledger' },
    { x: 810, y: 237, title: 'Admin dashboard', sub: 'Results · forecast', edges: [4, 5], video: 'VX_Dashboard', head: 'Live results for organisers', text: 'Turnout by hour, rankings per position and what voters are saying, refreshed every 20 seconds.', chapter: 'organisers' },
  ],
  edges: [
    'M200 175 L288 175',
    'M450 175 C505 175 505 80 558 80',
    'M450 175 C505 175 505 270 558 270',
    'M720 80 L808 80',
    'M720 270 L808 270',
    'M720 80 C765 80 765 270 808 270',
  ],
};

export const fraud = {
  repo: 'https://github.com/gableee/fraud-detection-mlops',
  label: 'Machine learning pipeline · Nov 2026',
  line: 'An end-to-end pipeline that flags fraudulent card transactions: from exploring the data, to a tuned and tracked model, to an API packaged in Docker.',
  // test set: 98 frauds among 56,962 transactions
  models: [
    { key: 'b', name: 'Baseline @ 0.50', caught: 86, alarms: 168 },
    { key: 't', name: 'Tuned @ 0.50', caught: 82, alarms: 15 },
    { key: 'c', name: 'Tuned @ 0.037', caught: 86, alarms: 153, chosen: true },
  ],
  auprc: { baseline: 0.822, tuned: 0.870 },
  prCurve: {
    img: '/fraud/pr_curve_operating_points.png',
    title: 'Precision-recall on the test set',
    meta: '98 frauds among 56,962 transactions · each dot is an operating point',
  },
  pipeline: [
    { step: 'Explore', how: 'EDA in Jupyter', icon: 'jupyter' },
    { step: 'Prepare', how: 'pandas, stratified split', icon: 'pandas' },
    { step: 'Train', how: 'XGBoost', icon: null },
    { step: 'Tune', how: 'Grid search, 5-fold CV', icon: 'scikitlearn' },
    { step: 'Track', how: 'MLflow runs', icon: 'mlflow' },
    { step: 'Serve', how: 'FastAPI endpoint', icon: 'fastapi' },
    { step: 'Ship', how: 'Docker image', icon: 'docker' },
  ],
};

export const eryysyn = {
  repo: 'https://github.com/gableee/eryysyn',
  label: 'AI engineering project · since Nov 2026',
  line: "An AI-powered knowledge and research platform that will answer questions grounded in your own documents, with citations. I'm building it in nine phases, implementing each layer myself instead of leaning only on high-level frameworks.",
  current: 1,
  phases: ['Product and architecture', 'Full-stack foundation', 'LLM integration', 'RAG from scratch', 'Evaluation and reliability', 'LangChain comparison', 'Web research', 'LangGraph agents', 'Production and MLOps'],
};

export const smaller = [
  { name: 'PracticeYOLO', url: 'https://github.com/gableee/PracticeYOLO', text: 'Counting cars in video with YOLOv8n and cvzone', meta: 'Python · 2026' },
  { name: 'Studystreak', url: 'https://github.com/gableee/Studystreak', text: 'A study app I built for Software Engineering 1. Upload a PDF, slide deck or document, and an AI service turns it into summaries, quizzes and flashcards. Also has a Pomodoro timer that saves each session. I stopped building it after the course', meta: 'React · Python · Sept–Nov 2025 · course prototype' },
  { name: 'Josephus Calculator', url: 'https://github.com/gableee/JosephusCalcu', text: 'Algorithms course final project', meta: 'Java · 2025' },
];

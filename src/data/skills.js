// Skills grouped by how much I've actually used them, each with its evidence.
// icon = file name in /public/icons (simple-icons), or null for no logo.
export const levels = [
  {
    name: 'Confident', dots: 3, sub: 'Used in shipped work',
    items: [
      { name: 'React', icon: 'react', where: 'VoteX, LIWANAG' },
      { name: 'JavaScript and TypeScript', icon: 'typescript', where: 'VoteX, LIWANAG' },
      { name: 'HTML and CSS', icon: 'css3', where: 'VoteX · Certiport certified' },
      { name: 'Tailwind CSS', icon: 'tailwindcss', where: 'Portfolio and side projects' },
      { name: 'Git and GitHub', icon: 'git', where: 'Daily, 500+ contributions this year' },
    ],
  },
  {
    name: 'Comfortable', dots: 2, sub: 'Used in projects, still deepening',
    items: [
      { name: 'Python', icon: 'python', where: 'Fraud detection, Eryysyn, ML coursework' },
      { name: 'Node.js and REST APIs', icon: 'nodedotjs', where: 'VoteX API and background sentiment jobs' },
      { name: 'PostgreSQL and Supabase', icon: 'postgresql', where: 'VoteX schema and migrations' },
      { name: 'FastAPI', icon: 'fastapi', where: 'Fraud detection API' },
      { name: 'LLM APIs', icon: 'openai', where: 'GPT-OSS 20B via Groq, DeepSeek as fallback' },
    ],
  },
  {
    name: 'Learning', dots: 1, sub: 'Studying and practising now',
    items: [
      { name: 'NumPy and pandas', icon: 'pandas', where: 'Fraud detection EDA' },
      { name: 'scikit-learn and XGBoost', icon: 'scikitlearn', where: 'Fraud detection model' },
      { name: 'MLflow', icon: 'mlflow', where: 'Fraud detection experiment tracking' },
      { name: 'Docker and Linux', icon: 'docker', where: 'VoteX, fraud detection API' },
      { name: 'Neural networks', icon: null, where: 'Deep Learning Specialization, 2 of 5' },
      { name: 'Solidity', icon: 'solidity', where: 'VoteX vote ledger' },
    ],
  },
];

export const tools = [
  { name: 'Claude', icon: 'claude' },
  { name: 'GitHub Copilot', icon: 'githubcopilot' },
  { name: 'OpenAI', icon: 'openai' },
  { name: 'DeepSeek', icon: 'deepseek' },
];

export const personalInfo = {
  name: 'Your Name',
  title: 'Aspiring AI Engineer | 3rd Year Student',
  tagline: 'Building practical AI projects with strong product and frontend fundamentals.',
  description:
    'I am a 3rd-year student aspiring to become an AI Engineer, focused on building practical, reliable, and user-centered intelligent products. I combine machine learning curiosity with strong frontend engineering to deliver end-to-end solutions people can actually use. I am actively preparing for internship opportunities next year.',
  email: 'your.email@example.com',
  location: 'Your City, Country',
  photo: '/profile-photo.jpg',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
};

export const aboutData = {
  summary: [
    "I'm a 3rd-year student and aspiring AI Engineer who enjoys turning complex problems into practical systems. I use frontend engineering as a strength to make AI experiences clear, usable, and trustworthy.",
    "Right now, my focus is strengthening ML fundamentals, building portfolio-ready AI projects, and improving the engineering practices needed to ship reliable products.",
    "When I'm not coding, you'll find me studying machine learning, joining hackathons, experimenting with new ideas, and preparing for internship opportunities.",
  ],
  highlights: [
    { label: 'Year Level', value: '3rd Year' },
    { label: 'Projects Built', value: '10+' },
    { label: 'Focus Area', value: 'AI + Product' },
  ],
};

export const frontendFocusData = {
  pillars: [
    {
      title: 'AI Product UX & Accessibility',
      whyItMatters:
        'Great AI products are only valuable when users can understand, trust, and act on model outputs.',
      sampleProof: 'Built keyboard-first navigation and WCAG 2.1 AA color-contrast tokens for a dashboard redesign.',
      status: 'Replace with your real case',
    },
    {
      title: 'ML Foundations & Iteration',
      whyItMatters:
        'AI teams value engineers who can move from problem framing to experiments, evaluation, and improvement loops.',
      sampleProof: 'Defined baseline metrics, compared model variants, and documented tradeoffs to guide the next iteration.',
      status: 'Replace with your real metric',
    },
    {
      title: 'Engineering for Production',
      whyItMatters:
        'Companies need AI engineers who can ship maintainable systems—not just notebooks—with reliability and observability in mind.',
      sampleProof: 'Built reusable app primitives and validation checks that reduced regressions and sped up feature delivery.',
      status: 'Replace with your real impact',
    },
  ],
  sectionsToAddLater: [
    {
      name: 'AI Case Study Deep-Dive',
      purpose: 'Show one AI project in depth: problem framing, dataset/constraints, modeling choices, tradeoffs, and measurable impact.',
      sample:
        'Example structure: Context → Data & Baseline → Model Experiments → Evaluation → Deployment/UX → Final Metrics.',
    },
    {
      name: 'Quality & Reliability',
      purpose: 'Prove how you prevent breakage and collaborate in real teams.',
      sample:
        'Include test strategy (unit/integration), CI checks, lint rules, and a short bug-prevention story.',
    },
    {
      name: 'Product Impact Snapshot',
      purpose: 'Translate AI + engineering work into business/user outcomes that non-engineers can understand quickly.',
      sample:
        'Use 3 concise metrics: model quality uplift, latency/cost reduction, and user/task success improvement.',
    },
  ],
};

export const skillsData = [
  {
    category: 'Frontend Core',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript (ES2024)', level: 95 },
      { name: 'HTML5 / CSS3', level: 95 },
    ],
  },
  {
    category: 'Styling & Design',
    skills: [
      { name: 'Tailwind CSS', level: 92 },
      { name: 'CSS Architecture', level: 88 },
      { name: 'Figma / Design Tools', level: 80 },
      { name: 'Responsive Design', level: 95 },
    ],
  },
  {
    category: 'Tools & Infrastructure',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Vite / Webpack', level: 85 },
      { name: 'Testing (Jest/Vitest)', level: 82 },
      { name: 'CI/CD Pipelines', level: 78 },
    ],
  },
  {
    category: 'Architecture & Patterns',
    skills: [
      { name: 'Component Design', level: 92 },
      { name: 'State Management', level: 88 },
      { name: 'Performance Optimization', level: 85 },
      { name: 'Accessibility (a11y)', level: 85 },
    ],
  },
];

export const projectsData = [
  {
    slug: 'ecommerce-platform-redesign',
    title: 'E-Commerce Platform Redesign',
    subtitle: 'Full-stack storefront with modern UX',
    tags: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
    image: '/projects/ecommerce.jpg',
    problem:
      'The existing e-commerce platform had a 68% cart abandonment rate and 4.2s average page load time, resulting in poor conversion rates and user satisfaction.',
    process:
      'Conducted UX audit and performance profiling. Identified critical rendering bottlenecks and friction points in the checkout flow. Designed component-driven architecture with lazy-loaded route splitting.',
    solution:
      'Rebuilt the frontend using React with TypeScript, implementing virtual scrolling for product catalogs, optimistic UI updates for cart interactions, and a streamlined 3-step checkout flow.',
    impact: [
      '40% reduction in cart abandonment',
      'Page load time reduced to 1.8s',
      '25% increase in conversion rate',
      'Lighthouse score improved from 52 to 96',
    ],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    slug: 'realtime-analytics-dashboard',
    title: 'Real-Time Analytics Dashboard',
    subtitle: 'Data visualization for business intelligence',
    tags: ['React', 'D3.js', 'WebSocket', 'REST API'],
    image: '/projects/dashboard.jpg',
    problem:
      'Business stakeholders relied on static daily reports, missing real-time insights that could drive faster decision-making and incident response.',
    process:
      'Mapped data flows and stakeholder needs. Designed a widget-based dashboard with configurable layouts. Established WebSocket connections for live data streaming.',
    solution:
      'Built a modular dashboard with drag-and-drop widgets, real-time charting via D3.js, and a custom caching layer to reduce API calls by 70%.',
    impact: [
      'Decision-making speed improved by 3x',
      '70% reduction in redundant API calls',
      'Adopted by 5 internal teams',
      'Zero downtime since launch',
    ],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    slug: 'design-system-component-library',
    title: 'Design System & Component Library',
    subtitle: 'Scalable UI foundation for product teams',
    tags: ['React', 'Storybook', 'Tailwind', 'a11y'],
    image: '/projects/design-system.jpg',
    problem:
      'Multiple product teams were building inconsistent UIs with duplicated components, leading to design drift, accessibility gaps, and slower development velocity.',
    process:
      'Audited 3 product codebases to catalog existing patterns. Created a token-based design system in Figma and translated it into a composable React component library.',
    solution:
      'Delivered 40+ accessible components in a Storybook-documented library with automated visual regression testing and semantic versioning.',
    impact: [
      'Development velocity increased 35%',
      'Design consistency score: 94%',
      'Full WCAG 2.1 AA compliance',
      'Adopted across 3 product teams',
    ],
    github: '#',
    featured: false,
  },
];

export const experienceData = [
  {
    role: 'Student Developer (AI + Web)',
    company: 'Academic & Personal Projects',
    period: '2024 \u2014 Present',
    description:
      'Building AI-focused and web-based projects while strengthening software engineering fundamentals, product thinking, and collaboration skills.',
    achievements: [
      'Built portfolio projects combining ML concepts with modern web interfaces',
      'Improved performance and accessibility across personal and school projects',
      'Practiced Git-based collaboration and code review in team projects',
      'Documented project decisions, tradeoffs, and measurable outcomes for case studies',
    ],
  },
  {
    role: 'Project Team Member',
    company: 'University Coursework',
    period: '2023 \u2014 2024',
    description:
      'Collaborated on course projects focused on software development, data processing, and UI implementation.',
    achievements: [
      'Delivered team milestones on time with clear task ownership',
      'Applied testing and debugging workflows to improve project quality',
      'Built reusable frontend components for faster implementation',
      'Presented technical solutions and project demos to peers and mentors',
    ],
  },
  {
    role: 'Early Developer Journey',
    company: 'Self-Directed Learning',
    period: '2022 \u2014 2023',
    description:
      'Built strong foundations in programming, web development, and problem-solving through consistent hands-on practice.',
    achievements: [
      'Completed multiple guided and independent coding projects',
      'Learned modern JavaScript, React, and core software engineering concepts',
      'Developed disciplined habits for documentation, iteration, and continuous learning',
    ],
  },
];

export const certificationsData = [
  {
    name: 'Blockchain Specialization',
    issuer: 'University at Buffalo (SUNY)',
    category: 'Software Development',
    featured: true,
    status: 'In Progress',
    notes: 'Currently completing this specialization to support our blockchain-focused thesis project.',
    certificates: [
      {
        title: 'Blockchain Basics',
        image: '/certificates/buffalo-blockchain-01-basics.jpg',
        credentialUrl: '#',
        status: 'Completed',
      },
      {
        title: 'Smart Contracts',
        image: '/certificates/buffalo-blockchain-02-smart-contracts.jpg',
        credentialUrl: '#',
        status: 'In Progress',
      },
      {
        title: 'Blockchain Security',
        image: '/certificates/buffalo-blockchain-03-security.jpg',
        credentialUrl: '#',
        status: 'Planned',
      },
      {
        title: 'Blockchain Applications',
        image: '/certificates/buffalo-blockchain-04-applications.jpg',
        credentialUrl: '#',
        status: 'Planned',
      },
    ],
  },
  {
    name: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI & Stanford Online (Coursera)',
    category: 'AI / ML',
    featured: true,
    status: 'Planned',
    notes: 'Planned next to strengthen classical ML foundations and model evaluation practices.',
    certificates: [
      {
        title: 'Supervised Machine Learning',
        image: '/certificates/coursera-ml-01-supervised.jpg',
        credentialUrl: '#',
        status: 'Planned',
      },
      {
        title: 'Advanced Learning Algorithms',
        image: '/certificates/coursera-ml-02-advanced.jpg',
        credentialUrl: '#',
        status: 'Planned',
      },
      {
        title: 'Unsupervised Learning & Recommenders',
        image: '/certificates/coursera-ml-03-unsupervised.jpg',
        credentialUrl: '#',
        status: 'Planned',
      },
    ],
  },
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI (Coursera)',
    category: 'AI / ML',
    featured: true,
    status: 'Planned',
    notes: 'Planned to deepen practical skills in neural networks, optimization, and deployment-ready deep learning workflows.',
    certificates: [
      {
        title: 'Neural Networks and Deep Learning',
        image: '/certificates/coursera-dl-01-neural-networks.jpg',
        credentialUrl: '#',
        status: 'Planned',
      },
      {
        title: 'Improving Deep Neural Networks',
        image: '/certificates/coursera-dl-02-improving-dnns.jpg',
        credentialUrl: '#',
        status: 'Planned',
      },
      {
        title: 'Structuring Machine Learning Projects',
        image: '/certificates/coursera-dl-03-structuring-ml-projects.jpg',
        credentialUrl: '#',
        status: 'Planned',
      },
      {
        title: 'Convolutional Neural Networks',
        image: '/certificates/coursera-dl-04-cnns.jpg',
        credentialUrl: '#',
        status: 'Planned',
      },
    ],
  },
  {
    name: 'IC3 Digital Literacy Certification',
    issuer: 'Certiport',
    category: 'Foundational IT',
    featured: false,
    status: 'Completed',
    notes: 'Foundational certification covering computing fundamentals, key applications, and online living concepts.',
    certificates: [
      {
        title: 'IC3 Digital Literacy',
        image: '/certificates/ic3-digital-literacy.jpg',
        credentialUrl: '#',
        status: 'Completed',
      },
    ],
  },
  {
    name: 'IT Specialist - Software Development',
    issuer: 'Certiport',
    category: 'Software Development',
    featured: false,
    status: 'Completed',
    notes: 'Validates practical software development skills and problem-solving through code.',
    certificates: [
      {
        title: 'IT Specialist: Software Development',
        image: '/certificates/it-specialist-software-development.jpg',
        credentialUrl: '#',
        status: 'Completed',
      },
    ],
  },
  {
    name: 'IT Specialist - Cybersecurity',
    issuer: 'Certiport',
    category: 'Security',
    featured: false,
    status: 'Completed',
    notes: 'Focuses on foundational cybersecurity concepts, secure practices, and risk awareness.',
    certificates: [
      {
        title: 'IT Specialist: Cybersecurity',
        image: '/certificates/it-specialist-cybersecurity.jpg',
        credentialUrl: '#',
        status: 'Completed',
      },
    ],
  },
  {
    name: 'freeCodeCamp Certifications',
    issuer: 'freeCodeCamp',
    category: 'Software Development',
    featured: false,
    status: 'In Progress',
    notes: 'Hands-on certification tracks to strengthen practical development skills through project-based learning.',
    certificates: [
      {
        title: 'Responsive Web Design',
        image: '/certificates/freecodecamp-responsive-web-design.jpg',
        credentialUrl: '#',
        status: 'Completed',
      },
      {
        title: 'JavaScript Algorithms and Data Structures',
        image: '/certificates/freecodecamp-javascript-algorithms.jpg',
        credentialUrl: '#',
        status: 'In Progress',
      },
    ],
  },
];

export const hackathonsData = [
  {
    event: 'University Hackathon',
    organizer: 'Your University',
    year: '2025',
    role: 'Participant',
    project: 'AI + Blockchain Thesis Prototype',
    highlights: [
      'Built an early prototype aligned with our thesis direction.',
      'Worked in a time-boxed, team-based environment to scope and ship quickly.',
      'Strengthened collaboration, rapid problem-solving, and demo presentation skills.',
    ],
    projectUrl: '#',
  },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'AI Focus', href: '#frontend' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export const personalInfo = {
  name: 'Your Name',
  title: 'Frontend Engineer',
  tagline: 'I build exceptional digital experiences.',
  description:
    'A detail-oriented Frontend Engineer with a passion for crafting performant, accessible, and visually refined web applications. I specialize in turning complex problems into elegant, user-centric interfaces.',
  email: 'your.email@example.com',
  location: 'Your City, Country',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
};

export const aboutData = {
  summary: [
    "I'm a Frontend Engineer who thrives at the intersection of design and engineering. I care deeply about the craft\u2014from pixel-perfect layouts to performant rendering pipelines.",
    "Over the past several years, I've worked across startups and mid-size companies building products used by thousands. My approach combines strong technical fundamentals with product thinking and a relentless focus on user experience.",
    "When I'm not coding, you'll find me exploring new design systems, contributing to open source, or diving into the latest web platform APIs.",
  ],
  highlights: [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Delivered', value: '20+' },
    { label: 'Technologies', value: '15+' },
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
    role: 'Senior Frontend Engineer',
    company: 'Company Name',
    period: '2022 \u2014 Present',
    description:
      'Leading frontend architecture for the core product platform. Driving technical decisions on performance, accessibility, and developer experience.',
    achievements: [
      'Architected a micro-frontend system serving 50K+ daily users',
      'Reduced bundle size by 40% through code splitting and tree shaking',
      'Mentored 3 junior engineers and established code review standards',
      'Introduced automated visual regression testing into CI/CD pipeline',
    ],
  },
  {
    role: 'Frontend Engineer',
    company: 'Previous Company',
    period: '2020 \u2014 2022',
    description:
      'Built and maintained customer-facing React applications for a B2B SaaS platform. Collaborated closely with design and product teams.',
    achievements: [
      'Delivered 5 major feature launches on schedule',
      'Improved Core Web Vitals across all product pages',
      'Built reusable component library used by 3 product teams',
      'Reduced production bugs by 60% through comprehensive testing',
    ],
  },
  {
    role: 'Junior Frontend Developer',
    company: 'First Company',
    period: '2019 \u2014 2020',
    description:
      'Gained foundational experience in modern web development, working on responsive landing pages and internal tools.',
    achievements: [
      'Converted legacy jQuery codebase to React',
      'Implemented responsive designs achieving 99% cross-browser consistency',
      'Automated repetitive tasks saving 10+ hours/week for the team',
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
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

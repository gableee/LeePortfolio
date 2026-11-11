# Lee Gabriel Isidro · Portfolio

My personal portfolio: a fourth-year Computer Science student who builds full-stack software and is bringing machine learning into it.

The site is designed like a lab notebook, with a light and a dark mode. Besides the project list, it has two longer case studies:

- **VoteX**: my thesis, an election platform with a public ballot ledger and AI sentiment analysis of voter comments
- **LIWANAG**: a hackathon project that maps dark streets in Balanga City

## Built with

React 19, React Router and Vite. Plain CSS, with no UI framework. Deployed on Vercel.

## Run it locally

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server |
| `npm run build` | Builds the site into `dist/` |
| `npm run preview` | Serves the built site |
| `npm run lint` | Runs ESLint |

The contact form uses [Web3Forms](https://web3forms.com). Copy `.env.example` to `.env.local` and add your access key. Without a key, the form opens the visitor's email app instead.

## Where things are

```
src/
  data/       profile, projects, skills and certificates: most text on the site lives here
  sections/   home page sections
  pages/      Home and the VoteX and LIWANAG story pages
  components/ shared pieces (nav, story layout, lightbox, video player)
public/       images, videos, certificates and resume
```

Unconfirmed text is wrapped in `<Todo>`. It shows underlined in development and is hidden in production builds. To preview it in a build, set `VITE_SHOW_TODOS=1`.

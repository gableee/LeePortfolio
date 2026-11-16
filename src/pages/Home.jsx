import { useEffect } from 'react';
import { profile } from '../data/profile';
import useGitHub from '../lib/useGitHub';
import useEryysyn from '../lib/useEryysyn';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import GitHubActivity from '../sections/GitHubActivity';
import Skills from '../sections/Skills';
import Certificates from '../sections/Certificates';
import Journey from '../sections/Journey';

const LINKS = ['About', 'Projects', 'GitHub', 'Skills', 'Certificates', 'Journey', 'Contact']
  .map(label => ({ label, href: '#' + label.toLowerCase() }));

export default function Home() {
  const { calendar, commits, updated } = useGitHub(profile.github);
  const roadmap = useEryysyn();
  useEffect(() => { document.title = `${profile.name} · CS student, ML and full-stack`; }, []);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav links={LINKS} spy />
      <main className="wrap" id="main">
        <Hero commits={commits} roadmap={roadmap} />
        <About />
        <Projects roadmap={roadmap} />
        <GitHubActivity calendar={calendar} commits={commits} updated={updated} />
        <Skills />
        <Certificates />
        <Journey />
      </main>
      <Footer home />
    </>
  );
}

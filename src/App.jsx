import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LightboxProvider from './components/Lightbox';
import Home from './pages/Home';

// story pages load on demand; the home page is what recruiters see first
const VoteX = lazy(() => import('./pages/VoteX'));
const Liwanag = lazy(() => import('./pages/Liwanag'));

// On a route change: jump to the #section if there is one, otherwise to the top.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0, raf;
    const go = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView();
      else if (tries++ < 60) raf = requestAnimationFrame(go); // lazy page still loading
    };
    go();
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <LightboxProvider>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/votex" element={<VoteX />} />
            <Route path="/liwanag" element={<Liwanag />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </LightboxProvider>
    </BrowserRouter>
  );
}

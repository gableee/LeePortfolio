import { createContext, useContext } from 'react';

// Draft copy marked as todo is shown (dashed underline) in development only,
// so a recruiter never sees a "[month]" placeholder. Set VITE_SHOW_TODOS=1 to preview them in a build.
export const SHOW_TODOS = import.meta.env.DEV || import.meta.env.VITE_SHOW_TODOS === '1';

export const reducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export const store = {
  get: k => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } },
};

// lightbox: open({ img, title, meta, pdf?, verify?, figure? })
export const LightboxContext = createContext(() => {});
export const useLightbox = () => useContext(LightboxContext);

// story pages: "Show technical detail" opens every under-the-hood panel
export const DepthContext = createContext(false);
export const useDepth = () => useContext(DepthContext);

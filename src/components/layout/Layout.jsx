import Header from './Header';
import Footer from './Footer';
import { CursorGlow, ScrollProgress } from '../effects';
import FloatingMessageBubble from './FloatingMessageBubble';
import SocialRail from './SocialRail';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <CursorGlow />
      <ScrollProgress />
      <SocialRail />
      <FloatingMessageBubble />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

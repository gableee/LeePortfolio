import Header from './Header';
import Footer from './Footer';
import { CursorGlow, ScrollProgress } from '../effects';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <CursorGlow />
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import Header from './Header';
import Footer from './Footer';
import SocialRail from './SocialRail';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SocialRail />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileActionBar from './components/layout/MobileActionBar';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';

/* Secondary routes are code-split so the landing view stays light. */
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite">
      <span className="border-forest-900/15 border-t-palm-500 size-8 animate-spin rounded-full border-2" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="bg-cream-50 flex min-h-dvh flex-col">
      <ScrollToTop />
      <Header />

      {/* `key` restarts the enter animation on every navigation */}
      <main id="main" key={pathname} className="page-enter flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <MobileActionBar />
    </div>
  );
}

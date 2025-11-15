import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MembershipPage from './pages/MembershipPage';
import ContactPage from './pages/ContactPage';
import IPSFPage from './pages/IPSFPage';

// Component to handle scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate dynamic gradient positions based on scroll
  const scrollProgress = Math.min(scrollY / 1000, 1); // Normalize scroll to 0-1
  const baseOpacity = 0.12 + (scrollProgress * 0.08); // Base opacity increases with scroll
  
  // Multiple gradient positions that move with scroll
  const gradient1X = 20 + (scrollProgress * 25);
  const gradient1Y = 15 + (scrollProgress * 20);
  const gradient2X = 50 + (scrollProgress * 20) - 10;
  const gradient2Y = 30 + (scrollProgress * 30);
  const gradient3X = 80 - (scrollProgress * 25);
  const gradient3Y = 60 + (scrollProgress * 25);
  const gradient4X = 35 + (scrollProgress * 15);
  const gradient4Y = 70 - (scrollProgress * 20);
  const gradient5X = 65 - (scrollProgress * 20);
  const gradient5Y = 25 + (scrollProgress * 35);
  const gradient6X = 15 + (scrollProgress * 30);
  const gradient6Y = 50 + (scrollProgress * 40);
  const gradient7X = 85 - (scrollProgress * 15);
  const gradient7Y = 40 + (scrollProgress * 30);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-teal-950 to-gray-900 text-gray-300 flex flex-col min-h-screen font-sans relative overflow-hidden">
      {/* Dynamic Illuminating Effect - Multiple Gradient Layers */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-300"
        style={{
          background: `
            radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(15, 107, 107, ${baseOpacity * 1.2}) 0%, transparent 60%),
            radial-gradient(circle 500px at ${gradient1X}% ${gradient1Y}%, rgba(15, 107, 107, ${baseOpacity * 0.9}) 0%, transparent 55%),
            radial-gradient(circle 550px at ${gradient2X}% ${gradient2Y}%, rgba(15, 107, 107, ${baseOpacity * 1.1}) 0%, transparent 58%),
            radial-gradient(circle 480px at ${gradient3X}% ${gradient3Y}%, rgba(15, 107, 107, ${baseOpacity * 0.8}) 0%, transparent 52%),
            radial-gradient(circle 520px at ${gradient4X}% ${gradient4Y}%, rgba(15, 107, 107, ${baseOpacity * 0.95}) 0%, transparent 56%),
            radial-gradient(circle 450px at ${gradient5X}% ${gradient5Y}%, rgba(15, 107, 107, ${baseOpacity * 0.85}) 0%, transparent 50%),
            radial-gradient(circle 580px at ${gradient6X}% ${gradient6Y}%, rgba(15, 107, 107, ${baseOpacity * 1.0}) 0%, transparent 60%),
            radial-gradient(circle 490px at ${gradient7X}% ${gradient7Y}%, rgba(15, 107, 107, ${baseOpacity * 0.75}) 0%, transparent 54%),
            radial-gradient(circle 400px at ${50 + (scrollProgress * 10)}% ${80 - (scrollProgress * 15)}%, rgba(15, 107, 107, ${baseOpacity * 0.7}) 0%, transparent 48%)
          `,
          filter: 'blur(80px)',
        }}
      />
      
      <div className="relative z-10">
        <Header />
        <main className="flex-grow pt-20 md:pt-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/ipsf" element={<IPSFPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <AppContent />
    </HashRouter>
  );
};

export default App;

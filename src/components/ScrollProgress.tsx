import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
      setShowBackToTop(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed z-40 right-6 bottom-24 w-12 h-12 rounded-full bg-[#0A0A3E] text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#12124F] hover:scale-110 btn-press ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};

export default ScrollProgress;

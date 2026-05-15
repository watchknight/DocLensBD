import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      // Fade out
      setIsVisible(false);

      // After fade-out, switch content and fade in
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        window.scrollTo(0, 0);
        setIsVisible(true);
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 150ms ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;

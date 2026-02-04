import { useState, useEffect } from 'react';

export function useOrientation() {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isLand = window.innerWidth > window.innerHeight;
      const isMobile = window.innerWidth < 1024; // Consider landscape on tablets/phones
      
      setIsLandscape(isLand);
      setIsMobileLandscape(isLand && isMobile && window.innerHeight < 500);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return { isLandscape, isMobileLandscape };
}

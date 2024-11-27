import { useState, useEffect } from 'react';

const useScreenWidth = () => {
  // Initialize state with current screen width
  const [screenWidth, setScreenWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      // Update only if the width changes
      setScreenWidth((prevWidth) => {
        return prevWidth !== currentWidth ? currentWidth : prevWidth;
      });
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Dependency array ensures the effect runs only once

  return screenWidth;
};

export default useScreenWidth;

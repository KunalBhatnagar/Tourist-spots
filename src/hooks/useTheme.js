import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDarkMode(saved === 'dark');
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = prev ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return !prev;
    });
  };

  return { isDarkMode, toggleTheme };
};

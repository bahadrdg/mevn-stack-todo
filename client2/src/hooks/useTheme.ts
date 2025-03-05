import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.style.setProperty('color-scheme', savedTheme);
      document.documentElement.classList.remove('light', 'dark'); // Ensure previous theme classes are removed
      document.documentElement.classList.add(savedTheme);
    }

    const observer = new MutationObserver(() => {
      const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      setTheme(current);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.style.setProperty('color-scheme', newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return { theme, toggleTheme };
}
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';

const DarkModeToggle = ({ compact = false, floating = false }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to 'light' mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  if (floating) {
    return (
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:cursor-pointer transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-110 group"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <div className="relative w-6 h-6">
          {isDark ? (
            <Icon 
              icon="material-symbols:light-mode-outline-rounded" 
              className="w-6 h-6 text-yellow-500 transition-transform duration-300 group-hover:rotate-12" 
            />
          ) : (
            <Icon 
              icon="material-symbols:dark-mode-outline-rounded" 
              className="w-6 h-6 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:rotate-12" 
            />
          )}
        </div>
      </button>
    );
  }

  if (compact) {
    return (
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg transition-colors text-gray-600 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700 hover:cursor-pointer"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggleDarkMode}
        className={`relative inline-flex hover:cursor-pointer h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${isDark ? 'bg-blue-800' : 'bg-gray-400'
          }`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${isDark ? 'translate-x-7' : 'translate-x-1'
            }`}
        >
          <span className="flex h-full w-full items-center justify-center">
            {isDark ? (
              <span className="flex items-center justify-center text-black">
                <Icon icon="material-symbols:dark-mode-outline-rounded" width="24" height="24" />
              </span>
            ) : (
              <span className="flex items-center justify-center text-yellow-500">
                <Icon icon="iconamoon:mode-light-bold" width="24" height="24" />
              </span>
            )}
          </span>
        </span>
      </button>
    </div>
  );
};

export default DarkModeToggle;

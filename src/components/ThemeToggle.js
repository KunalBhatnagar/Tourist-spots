import React from 'react';

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={onToggle}
      aria-label="Toggle theme"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-icon">
        {isDarkMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
};

export default ThemeToggle;

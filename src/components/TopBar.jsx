import React, { useEffect, useState } from 'react';
import './Topbar.css';

const Topbar = () => {
  const [isDark, setIsDark] = useState(() => {
    // Get from localStorage or default to true (dark)
    return localStorage.getItem('theme') !== 'light';
  });

  useEffect(() => {
    const theme = isDark ? 'dark-theme' : 'light-theme';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/'; // Change if needed
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1>
          <span className="kalam">Kalam</span> Studio
        </h1>
      </div>

      <div className="topbar-right">
        <div className="theme-logout-wrapper">
          <div className="theme-switch-wrapper">
            <span>{isDark ? 'Dark' : 'Light'}</span>
            <label className="switch">
              <input type="checkbox" checked={!isDark} onChange={handleThemeToggle} />
              <span className="slider round"></span>
            </label>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
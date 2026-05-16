import React from 'react';

const icons = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ds-icon" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  filter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ds-icon" aria-hidden="true">
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  ),
  movie: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ds-icon" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 4v16" />
      <path d="M17 4v16" />
      <path d="M3 9h18" />
    </svg>
  ),
  series: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ds-icon" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 19v2" />
    </svg>
  ),
  game: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ds-icon" aria-hidden="true">
      <path d="M6 12h4" />
      <path d="M8 10v4" />
      <path d="M15 11h.01" />
      <path d="M18 13h.01" />
      <path d="M8 5h8a6 6 0 0 1 6 6v2a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6v-2a6 6 0 0 1 6-6z" />
    </svg>
  ),
};

const Icon = ({ name, className = '' }) => {
  const icon = icons[name] || null;
  if (!icon) return null;

  return <span className={className}>{icon}</span>;
};

export default Icon;

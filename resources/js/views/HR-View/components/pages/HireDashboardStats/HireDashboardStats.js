import React from 'react';
import './HireDashboardStats.scss';

const stats = [
  {
    label: 'Total Postings',
    value: '16',
    sub: '+2 this week',
    action: 'listings',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1"/>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
        <line x1="9" y1="16" x2="13" y2="16"/>
      </svg>
    ),
  },
  {
    label: 'Applications',
    value: '48',
    sub: '+11 this week',
    action: 'all',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'Interviews Set',
    value: '12',
    sub: '4 this week',
    action: 'shortlisted',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Hires This Month',
    value: '3',
    sub: 'On track',
    action: 'shortlisted',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    ),
  },
];

const HireDashboardStats = ({ setActiveTab }) => {
  const handleClick = (action) => {
    if (action === 'listings') {
      document.getElementById('hire-listings-anchor')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'all') {
      setActiveTab('All');
      document.getElementById('hire-applications-anchor')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'shortlisted') {
      setActiveTab('Shortlisted');
      document.getElementById('hire-applications-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hire-dashboard-stats-section">
      <div className="hire-stats-wrapper">
        {stats.map((s) => (
          <div key={s.label} className="hire-stat-card" onClick={() => handleClick(s.action)}>
            <div className="hire-stat-icon">{s.icon}</div>
            <div className="hire-stat-info">
              <div className="hire-stat-value">{s.value}</div>
              <div className="hire-stat-label">{s.label}</div>
              <div className="hire-stat-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HireDashboardStats;
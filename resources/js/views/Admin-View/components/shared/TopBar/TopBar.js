import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import '../../shared/AdminShared.scss';
import './TopBar.scss';

const names = {
  '/admin-dashboard': 'Admin Overview',
  '/admin-dashboard/content': 'Content',
  '/admin-dashboard/users': 'HR Profiles',
  '/admin-dashboard/reports': 'Reports',
  '/admin-dashboard/logs': 'Activity Logs',
  '/admin-dashboard/settings': 'Platform Settings',
};

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="admin-topbar">
      <span className="admin-topbar-page">{names[location.pathname] || 'Admin Dashboard'}</span>
      <button className="admin-btn admin-btn-accent" onClick={() => navigate('/admin-dashboard/users')}>
        <FiMail />
        Invite HR
      </button>
    </header>
  );
};

export default TopBar;

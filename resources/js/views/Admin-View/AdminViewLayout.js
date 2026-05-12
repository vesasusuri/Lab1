import React from 'react';
import { Outlet } from 'react-router-dom';
import './components/shared/AdminShared.scss';
import TopBar from './components/shared/TopBar/TopBar';

const AdminViewLayout = () => {
  return (
    <div className="admin-layout">
      <div className="admin-layout-content">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminViewLayout;

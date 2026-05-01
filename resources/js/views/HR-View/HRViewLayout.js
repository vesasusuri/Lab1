import React from 'react';
import { Outlet } from 'react-router-dom';
import { HireDashboardProvider } from './HireDashboardContext';
import HireDashboardSidebar from './components/pages/HireDashboardSidebar/HireDashboardSidebar';

const HRViewLayout = () => {
  return (
    <HireDashboardProvider>
      <div className="hire-layout">
        <HireDashboardSidebar />
        <div className="hire-layout-content">
          <Outlet />
        </div>
      </div>
    </HireDashboardProvider>
  );
};

export default HRViewLayout;

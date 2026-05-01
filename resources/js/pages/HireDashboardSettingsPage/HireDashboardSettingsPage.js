import React from 'react';
import HireDashboardSidebar from '../../components/pages/HireDashboardSidebar/HireDashboardSidebar';
import HireDashboardSettings from '../../components/pages/HireDashboardSettings/HireDashboardSettings';

const HireDashboardSettingsPage = () => {
  return (
    <div className="hire-layout">
      <HireDashboardSidebar />
      <div className="hire-layout-content">
        <HireDashboardSettings />
      </div>
    </div>
  );
};

export default HireDashboardSettingsPage;
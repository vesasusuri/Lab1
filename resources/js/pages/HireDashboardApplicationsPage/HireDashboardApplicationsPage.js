import React, { useState } from 'react';
import HireDashboardSidebar from '../../components/pages/HireDashboardSidebar/HireDashboardSidebar';
import HireDashboardApplications from '../../components/pages/HireDashboardApplications/HireDashboardApplications';

const HireDashboardApplicationsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="hire-layout">
      <HireDashboardSidebar />
      <div className="hire-layout-content" style={{ paddingTop: '48px' }}>
        <HireDashboardApplications activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default HireDashboardApplicationsPage;
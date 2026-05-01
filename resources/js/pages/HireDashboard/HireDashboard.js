import React, { useState } from 'react';
import HireDashboardSidebar from '../../components/pages/HireDashboardSidebar/HireDashboardSidebar';
import HireDashboardHeader from '../../components/pages/HireDashboardHeader/HireDashboardHeader';
import HireDashboardStats from '../../components/pages/HireDashboardStats/HireDashboardStats';
import HireDashboardApplications from '../../components/pages/HireDashboardApplications/HireDashboardApplications';
import HireDashboardListings from '../../components/pages/HireDashboardListings/HireDashboardListings';

const HireDashboard = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="hire-layout">
      <HireDashboardSidebar />
      <div className="hire-layout-content">
        <HireDashboardHeader />
        <HireDashboardStats setActiveTab={setActiveTab} />
        <HireDashboardApplications activeTab={activeTab} setActiveTab={setActiveTab} />
        <HireDashboardListings />
      </div>
    </div>
  );
};

export default HireDashboard;
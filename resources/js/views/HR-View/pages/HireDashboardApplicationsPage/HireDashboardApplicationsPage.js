import React, { useState } from 'react';
import HireDashboardApplications from '../../components/pages/HireDashboardApplications/HireDashboardApplications';

const HireDashboardApplicationsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <HireDashboardApplications activeTab={activeTab} setActiveTab={setActiveTab} />
  );
};

export default HireDashboardApplicationsPage;

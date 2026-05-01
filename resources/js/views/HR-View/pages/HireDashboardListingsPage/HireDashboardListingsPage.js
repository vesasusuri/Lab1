import React from 'react';
import HireDashboardSidebar from '../../components/pages/HireDashboardSidebar/HireDashboardSidebar';
import HireDashboardListings from '../../components/pages/HireDashboardListings/HireDashboardListings';

const HireDashboardListingsPage = () => {
  return (
    <div className="hire-layout">
      <HireDashboardSidebar />
      <div className="hire-layout-content">
        <HireDashboardListings />
      </div>
    </div>
  );
};

export default HireDashboardListingsPage;
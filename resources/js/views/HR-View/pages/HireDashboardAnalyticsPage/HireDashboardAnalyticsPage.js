import React from 'react';
import HireDashboardSidebar from '../../components/pages/HireDashboardSidebar/HireDashboardSidebar';
import HireDashboardAnalytics from '../../components/pages/HireDashboardAnalytics/HireDashboardAnalytics';

const HireDashboardAnalyticsPage = () => {
  return (
    <div className="hire-layout">
      <HireDashboardSidebar />
      <div className="hire-layout-content">
        <HireDashboardAnalytics />
      </div>
    </div>
  );
};

export default HireDashboardAnalyticsPage;
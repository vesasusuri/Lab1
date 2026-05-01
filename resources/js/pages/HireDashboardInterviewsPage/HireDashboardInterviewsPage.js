import React from 'react';
import HireDashboardSidebar from '../../components/pages/HireDashboardSidebar/HireDashboardSidebar';
import HireDashboardInterviews from '../../components/pages/HireDashboardInterviews/HireDashboardInterviews';

const HireDashboardInterviewsPage = () => {
  return (
    <div className="hire-layout">
      <HireDashboardSidebar />
      <div className="hire-layout-content">
        <HireDashboardInterviews />
      </div>
    </div>
  );
};

export default HireDashboardInterviewsPage;
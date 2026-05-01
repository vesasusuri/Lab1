import React from 'react';
import HireDashboardSidebar from '../../components/pages/HireDashboardSidebar/HireDashboardSidebar';
import HireDashboardHires from '../../components/pages/HireDashboardHires/HireDashboardHires';

const HireDashboardHiresPage = () => {
  return (
    <div className="hire-layout">
      <HireDashboardSidebar />
      <div className="hire-layout-content">
        <HireDashboardHires />
      </div>
    </div>
  );
};

export default HireDashboardHiresPage;
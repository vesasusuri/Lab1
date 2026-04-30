import React from 'react';
import { Outlet } from 'react-router-dom';

const HRViewLayout = () => {
  return (
    <div className="hr-view">
      <Outlet />
    </div>
  );
};

export default HRViewLayout;

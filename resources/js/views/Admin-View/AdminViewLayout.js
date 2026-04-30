import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminViewLayout = () => {
  return (
    <div className="admin-view">
      <Outlet />
    </div>
  );
};

export default AdminViewLayout;

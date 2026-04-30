import React from 'react';
import { Outlet } from 'react-router-dom';

const UserViewLayout = () => {
  return (
    <div className="user-view">
      <Outlet />
    </div>
  );
};

export default UserViewLayout;

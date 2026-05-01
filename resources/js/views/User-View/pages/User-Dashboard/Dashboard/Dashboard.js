import React from 'react';
import Navbar from "../../../components/dashboard/shared/Navbar/Navbar";
import DashboardMain from '../../../components/dashboard/pages/dashboard/Dashboard';

const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <DashboardMain />
        </div>
    );
};

export default DashboardPage;

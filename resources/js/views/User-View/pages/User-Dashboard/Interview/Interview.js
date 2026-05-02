import React from 'react';
import Navbar from "../../../components/dashboard/shared/Navbar/Navbar";
import Interviews from "../../../components/dashboard/shared/Interviews/Interviews";


const Interview = () => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <Interviews />
        </div>
    );
};

export default Interview;

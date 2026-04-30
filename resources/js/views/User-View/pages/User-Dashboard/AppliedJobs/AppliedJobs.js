import React from 'react';
import Navbar from "../../../components/dashboard/shared/Navbar/Navbar";
import AppliedJobs from '../../../components/dashboard/pages/applied-jobs/AppliedJobs';


const AppliedJob = () => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <AppliedJobs/>
        </div>
    );
};

export default AppliedJob;

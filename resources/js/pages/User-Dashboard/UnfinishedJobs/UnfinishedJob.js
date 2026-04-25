import React from 'react';
import Navbar from "../../../components/dashboard/shared/Navbar/Navbar";
import UnfinishedJobs from '../../../components/dashboard/pages/unfinished-jobs/UnfinishedJobs';


const UnfinishedJob = () => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <UnfinishedJobs/>
        </div>
    );
};

export default UnfinishedJob;

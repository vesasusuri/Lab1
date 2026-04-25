import React from 'react';
import Navbar from "../../../components/dashboard/shared/Navbar/Navbar";
import SavedJobs from '../../../components/dashboard/pages/saved-jobs/SavedJobs';


const SavedJob = () => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <SavedJobs/>
        </div>
    );
};

export default SavedJob;

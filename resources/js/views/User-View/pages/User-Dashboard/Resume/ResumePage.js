import React from 'react';
import Navbar from "../../../components/dashboard/shared/Navbar/Navbar";
import ResumeUpload from '../../../components/dashboard/pages/resume-upload/ResumeUpload';
import Skills from '../../../components/dashboard/pages/skills/Skills';
import WorkExperience from '../../../components/dashboard/pages/work-experience/WorkExperience';
import Education from '../../../components/dashboard/pages/education/Education';
import Languages from '../../../components/dashboard/pages/languages/Languages';

const ResumePage = () => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="resume-page">
                <div className="resume-page__body">
                    <div className="resume-page__left">
                        <ResumeUpload />
                        <Languages />
                    </div>
                    <div className="resume-page__right">
                        <Skills />
                        <WorkExperience />
                        <Education />
                        <div className="resume-page__actions">
                            <button className="resume-page__cancel">Cancel</button>
                            <button className="resume-page__save">💾 Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePage;
import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../../../components/dashboard/shared/Navbar/Navbar';
import ResumeUpload from '../../../components/dashboard/pages/resume-upload/ResumeUpload';
import ResumeAIInsights from '../../../components/dashboard/pages/resume-ai-insights/ResumeAIInsights';
import Skills from '../../../components/dashboard/pages/skills/Skills';
import WorkExperience from '../../../components/dashboard/pages/work-experience/WorkExperience';
import Education from '../../../components/dashboard/pages/education/Education';
import Languages from '../../../components/dashboard/pages/languages/Languages';
import { analyzeResume, getResume, uploadResume } from '../../../../../api/resumeApi';
import { ANALYSIS_STEPS, mapParsedToProfile } from '../../../../../utils/resumeAnalysisUtils';
import '../../../components/dashboard/pages/resume-upload/ResumeUpload.scss';

const ResumePage = () => {
    const [file, setFile] = useState(null);
    const [resumeId, setResumeId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [analysisError, setAnalysisError] = useState('');
    const [ats, setAts] = useState(null);
    const [jobMatch, setJobMatch] = useState(null);

    const [skills, setSkills] = useState(['React', 'JavaScript', 'Node.js', 'Laravel', 'MySQL', 'Git']);
    const [experiences, setExperiences] = useState([{
        id: 1,
        company: 'Tech Co.',
        role: 'Frontend Developer',
        startDate: '2023-01',
        endDate: '',
        current: true,
        description: 'Built and maintained React applications.',
    }]);
    const [education, setEducation] = useState([{
        id: 1,
        school: 'University of Prishtina',
        degree: 'BSc Computer Science',
        startDate: '2018-09',
        endDate: '2022-06',
        current: false,
    }]);
    const [languages, setLanguages] = useState([
        { id: 1, language: 'Albanian', level: 'Native' },
        { id: 2, language: 'English', level: 'Fluent' },
    ]);

    const applyAnalysisResult = useCallback((data) => {
        if (data?.ats) setAts(data.ats);
        if (data?.job_match) setJobMatch(data.job_match);

        const parsed = data?.parsed || data?.resume?.parsed_data;
        if (parsed) {
            const mapped = mapParsedToProfile(parsed);
            if (mapped.skills.length) setSkills(mapped.skills);
            if (mapped.experiences.length) setExperiences(mapped.experiences);
            if (mapped.education.length) setEducation(mapped.education);
            if (mapped.languages.length) setLanguages(mapped.languages);
        }
    }, []);

    const loadExistingResume = useCallback(async () => {
        try {
            const data = await getResume();
            const resume = data?.resume;

            if (!resume) return;

            setResumeId(resume.id);
            setAts(resume.ats_rating);
            setJobMatch(resume.job_match);

            if (resume.parsed_data) {
                applyAnalysisResult({ parsed: resume.parsed_data, ats: resume.ats_rating, job_match: resume.job_match });
            }

            if (resume.original_filename) {
                setFile({ name: resume.original_filename, size: resume.file_size || 0 });
            }
        } catch {
        }
    }, [applyAnalysisResult]);

    useEffect(() => {
        loadExistingResume();
    }, [loadExistingResume]);

    const runAnalysis = async (selectedFile) => {
        setLoading(true);
        setAnalysisError('');

        try {
            setLoadingMessage(ANALYSIS_STEPS.uploading);
            const uploadResult = await uploadResume(selectedFile);
            const id = uploadResult.resume.id;
            setResumeId(id);

            setLoadingMessage(ANALYSIS_STEPS.parsing);
            const analysisResult = await analyzeResume(id);

            applyAnalysisResult(analysisResult);
        } catch (err) {
            const message = err?.response?.data?.error
                || err?.response?.data?.message
                || 'Failed to analyze resume. Please try again.';
            setAnalysisError(message);
        } finally {
            setLoading(false);
            setLoadingMessage('');
        }
    };

    const handleFileSelect = async (selectedFile) => {
        setFile(selectedFile);
        setAnalysisError('');

        if (!selectedFile) {
            return;
        }

        await runAnalysis(selectedFile);
    };

    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="resume-page">
                <div className="resume-page__body">
                    <div className="resume-page__left">
                        <ResumeUpload
                            file={file}
                            onFileSelect={handleFileSelect}
                            loading={loading}
                            loadingMessage={loadingMessage}
                        />
                        <ResumeAIInsights
                            loading={loading}
                            loadingMessage={loadingMessage}
                            ats={ats}
                            jobMatch={jobMatch}
                            error={analysisError}
                        />
                        <Languages languages={languages} onLanguagesChange={setLanguages} />
                    </div>
                    <div className="resume-page__right">
                        <Skills skills={skills} onSkillsChange={setSkills} />
                        <WorkExperience experiences={experiences} onExperiencesChange={setExperiences} />
                        <Education education={education} onEducationChange={setEducation} />
                        <div className="resume-page__actions">
                            <button type="button" className="resume-page__cancel">Cancel</button>
                            <button type="button" className="resume-page__save">💾 Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePage;

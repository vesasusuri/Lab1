import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiTrendingUp, FiZap } from 'react-icons/fi';
import './ResumeAIInsights.scss';

export default function ResumeAIInsights({
  loading,
  loadingMessage,
  ats,
  jobMatch,
  error,
}) {
  if (error) {
    return (
      <div className="resume-ai resume-ai--error">
        <FiAlertCircle aria-hidden="true" />
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="resume-ai resume-ai--loading">
        <FiZap className="resume-ai__sparkle" aria-hidden="true" />
        <p>{loadingMessage || 'Recalculating your score with AI…'}</p>
      </div>
    );
  }

  if (!ats && !jobMatch) {
    return null;
  }

  const score = ats?.score ?? 0;
  const matchPercentage = jobMatch?.match_percentage ?? 0;

  return (
    <section className="resume-ai" aria-label="AI resume insights">
      <div className="resume-ai__score-row">
        <div className="resume-ai__score-card">
          <span className="resume-ai__label">ATS Score</span>
          <div className="resume-ai__score-ring" style={{ '--score': score }}>
            <strong>{score}</strong>
            <span>/ 100</span>
          </div>
        </div>

        <div className="resume-ai__score-card">
          <span className="resume-ai__label">Best job match</span>
          {jobMatch?.matched_job && (
            <p className="resume-ai__job-title">
              {jobMatch.matched_job.title}
              <span> · {jobMatch.matched_job.company}</span>
            </p>
          )}
          <div className="resume-ai__progress">
            <div className="resume-ai__progress-bar" style={{ width: `${matchPercentage}%` }} />
          </div>
          <span className="resume-ai__match-value">{matchPercentage}% match</span>
        </div>
      </div>

      <div className="resume-ai__grid">
        {ats?.missing?.length > 0 && (
          <article className="resume-ai__card resume-ai__card--missing">
            <h4><FiAlertCircle aria-hidden="true" /> Missing</h4>
            <ul>
              {ats.missing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        )}

        {jobMatch?.missing_skills?.length > 0 && (
          <article className="resume-ai__card resume-ai__card--skills">
            <h4><FiTrendingUp aria-hidden="true" /> Missing skills for top match</h4>
            <div className="resume-ai__tags">
              {jobMatch.missing_skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        )}

        {ats?.strengths?.length > 0 && (
          <article className="resume-ai__card resume-ai__card--strengths">
            <h4><FiCheckCircle aria-hidden="true" /> Strengths</h4>
            <ul>
              {ats.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        )}

        {ats?.suggestions?.length > 0 && (
          <article className="resume-ai__card resume-ai__card--suggestions">
            <h4><FiZap aria-hidden="true" /> AI suggestions</h4>
            <ul>
              {ats.suggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        )}
      </div>
    </section>
  );
}

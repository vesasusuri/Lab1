import React from 'react';
import './HireDashboardApplications.scss';
import applicationsData from '../HireDashboardAnalytics/applicationsData';

const tabs = ['All', 'Reviewing', 'Shortlisted', 'Rejected'];

const HireDashboardApplications = ({ activeTab, setActiveTab }) => {
  const filtered = activeTab === 'All'
    ? applicationsData
    : applicationsData.filter((a) => a.status === activeTab);

  return (
    <section className="hire-dashboard-applications-section" id="hire-applications-anchor">
      <div className="hire-applications-wrapper">
        <div className="hire-applications-header">
          <h2>Recent Applications</h2>
          <div className="hire-applications-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? 'hire-tab active' : 'hire-tab'}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="hire-applications-list">
          {filtered.map((app) => (
            <div key={app.id} className="hire-application-row">
              <div className="hire-application-initials">{app.initials}</div>
              <div className="hire-application-info">
                <div className="hire-application-name">{app.name}</div>
                <div className="hire-application-role">{app.role} · {app.company}</div>
              </div>
              <div className="hire-application-date">{app.date}</div>
              <div className={`hire-application-status status-${app.status.toLowerCase()}`}>
                {app.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireDashboardApplications;
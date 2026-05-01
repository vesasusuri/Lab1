import React from 'react';
import './HireDashboardListings.scss';
import { useNavigate } from 'react-router-dom';
import jobsData from '../../../../User-View/components/pages/JobsCards/jobsData';

const listingsData = jobsData.slice(0, 5).map((job, i) => ({
  ...job,
  applications: [12, 7, 24, 5, 18][i],
  daysLeft: [6, 12, 3, 20, 8][i],
}));

const HireDashboardListings = () => {
  const navigate = useNavigate();

  return (
    <section className="hire-dashboard-listings-section" id="hire-listings-anchor">
      <div className="hire-listings-wrapper">
        <div className="hire-listings-header">
          <h2>Active Listings</h2>
          <button className="hire-listings-view-all" onClick={() => navigate('/jobs')}>
            View all →
          </button>
        </div>
        <div className="hire-listings-grid">
          {listingsData.map((job) => (
            <div
              key={job.id}
              className={job.featured ? 'hire-listing-card featured' : 'hire-listing-card'}
              onClick={() => navigate(`/jobs/${job.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {job.featured && <div className="hire-listing-featured">Featured</div>}
              <div className="hire-listing-top">
                <div className="hire-listing-initials">{job.initials}</div>
                <div className="hire-listing-info">
                  <div className="hire-listing-title">{job.title}</div>
                  <div className="hire-listing-company">{job.company}</div>
                </div>
                <div className="hire-listing-type">{job.type}</div>
              </div>
              <div className="hire-listing-meta">
                <span>{job.applications} applications</span>
                <span>{job.daysLeft} days left</span>
                <span>{job.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireDashboardListings;

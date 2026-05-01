import React from 'react';
import './HireDashboardHires.scss';

const hiresData = [
  {
    id: 1, name: 'Alex Rivera', role: 'Senior Frontend Developer',
    status: 'Starting Soon',
    details:   ['Engineering dept.', 'Remote', 'Full-time', '$140k / yr'],
    offer:     ['Start date: May 5, 2026', 'Hired by Sarah K.', '6 years experience'],
    nextSteps: ['Send onboarding email', 'Set up equipment', 'Schedule team intro'],
  },
  {
    id: 2, name: 'Fatima Al-Zahra', role: 'Data Scientist',
    status: 'Starting Soon',
    details:   ['Data dept.', 'New York, NY', 'Full-time', '$148k / yr'],
    offer:     ['Start date: May 12, 2026', 'Hired by Mike T.', '4 years experience'],
    nextSteps: ['Send onboarding email', 'Arrange office access', 'Assign mentor'],
  },
  {
    id: 3, name: 'Liam Nguyen', role: 'Mobile App Developer',
    status: 'Active',
    details:   ['Engineering dept.', 'Austin, TX', 'Full-time', '$115k / yr'],
    offer:     ['Started: Apr 14, 2026', 'Hired by Sarah K.', '3 years experience'],
    nextSteps: ['Complete onboarding docs', 'First sprint assigned', 'Meet the team ✓'],
  },
];

const HireDashboardHires = () => {
  return (
    <section className="hire-dashboard-hires-section">
      <div className="hire-hires-wrapper">
        <div className="hire-hires-header">
          <div>
            <h2>Hires This Month</h2>
            <p>3 candidates successfully hired</p>
          </div>
        </div>

        <div className="hire-hires-list">
          {hiresData.map((hire) => (
            <div key={hire.id} className="hire-hire-card">

              <div className="hire-hire-photo-wrap" />

              <div className="hire-hire-card-top">
                <div className="hire-hire-identity">
                  <div className="hire-hire-name">{hire.name}</div>
                  <div className="hire-hire-role">{hire.role}</div>
                </div>
                <div className={`hire-hire-status status-${hire.status.toLowerCase().replace(' ', '-')}`}>
                  {hire.status}
                </div>
              </div>

              <div className="hire-hire-divider" />

              <div className="hire-hire-section">
                <div className="hire-hire-section-title">Role Details</div>
                <ul className="hire-hire-list">
                  {hire.details.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              <div className="hire-hire-divider" />

              <div className="hire-hire-section">
                <div className="hire-hire-section-title">Hire Info</div>
                <ul className="hire-hire-list">
                  {hire.offer.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              <div className="hire-hire-divider" />

              <div className="hire-hire-section">
                <div className="hire-hire-section-title">Next Steps</div>
                <ul className="hire-hire-list">
                  {hire.nextSteps.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireDashboardHires;
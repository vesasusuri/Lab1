import React, { useState } from 'react';
import './HireDashboardInterviews.scss';

const interviewsData = [
  { id: 1, initials: 'AR', name: 'Alex Rivera',     role: 'Senior Frontend Developer', date: 'Today, 2:00 PM',     interviewer: 'Sarah K.',  status: 'Scheduled' },
  { id: 2, initials: 'FA', name: 'Fatima Al-Zahra', role: 'Data Scientist',             date: 'Today, 4:30 PM',     interviewer: 'Mike T.',   status: 'Scheduled' },
  { id: 3, initials: 'LN', name: 'Liam Nguyen',     role: 'Mobile App Developer',       date: 'Tomorrow, 10:00 AM', interviewer: 'Sarah K.',  status: 'Scheduled' },
  { id: 4, initials: 'PS', name: 'Priya Sharma',    role: 'UX/UI Designer',             date: 'Tomorrow, 1:00 PM',  interviewer: 'James R.',  status: 'Scheduled' },
  { id: 5, initials: 'JO', name: "James O'Brien",   role: 'Backend Engineer',           date: 'Apr 30, 11:00 AM',   interviewer: 'Mike T.',   status: 'Scheduled' },
  { id: 6, initials: 'MC', name: 'Marcus Chen',     role: 'DevOps Engineer',            date: 'Apr 28, 3:00 PM',    interviewer: 'Sarah K.',  status: 'Completed' },
  { id: 7, initials: 'SI', name: 'Sofia Iannone',   role: 'Digital Marketing Manager',  date: 'Apr 27, 2:00 PM',    interviewer: 'James R.',  status: 'Completed' },
  { id: 8, initials: 'HB', name: 'Hannah Brooks',   role: 'Financial Analyst',          date: 'Apr 26, 10:00 AM',   interviewer: 'Mike T.',   status: 'Cancelled' },
];

const tabs = ['All', 'Scheduled', 'Completed', 'Cancelled'];

const HireDashboardInterviews = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? interviewsData
    : interviewsData.filter((i) => i.status === activeTab);

  return (
    <section className="hire-dashboard-interviews-section">
      <div className="hire-interviews-wrapper">
        <div className="hire-interviews-header">
          <h2>Interviews</h2>
          <div className="hire-interviews-tabs">
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

        <div className="hire-interviews-list">
          {filtered.map((item) => (
            <div key={item.id} className="hire-interview-row">
              <div className="hire-interview-initials">{item.initials}</div>
              <div className="hire-interview-info">
                <div className="hire-interview-name">{item.name}</div>
                <div className="hire-interview-role">{item.role}</div>
              </div>
              <div className="hire-interview-date">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {item.date}
              </div>
              <div className="hire-interview-interviewer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {item.interviewer}
              </div>
              <div className={`hire-interview-status status-${item.status.toLowerCase()}`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireDashboardInterviews;
import React, { useState } from 'react';
import './HireDashboardInterviews.scss';

const interviewsData = [
  { id: 1, initials: 'AR', name: 'Alex Rivera',     email: 'alex.rivera@example.com',     role: 'Senior Frontend Developer', date: 'Today, 2:00 PM',     interviewer: 'Sarah K.',  status: 'Scheduled', roomName: 'alex-rivera-frontend-interview' },
  { id: 2, initials: 'FA', name: 'Fatima Al-Zahra', email: 'fatima.alzahra@example.com',  role: 'Data Scientist',             date: 'Today, 4:30 PM',     interviewer: 'Mike T.',   status: 'Scheduled', roomName: 'fatima-al-zahra-data-interview' },
  { id: 3, initials: 'LN', name: 'Liam Nguyen',     email: 'liam.nguyen@example.com',     role: 'Mobile App Developer',       date: 'Tomorrow, 10:00 AM', interviewer: 'Sarah K.',  status: 'Scheduled', roomName: 'liam-nguyen-mobile-interview' },
  { id: 4, initials: 'PS', name: 'Priya Sharma',    email: 'priya.sharma@example.com',    role: 'UX/UI Designer',             date: 'Tomorrow, 1:00 PM',  interviewer: 'James R.',  status: 'Scheduled', roomName: 'priya-sharma-design-interview' },
  { id: 5, initials: 'JO', name: "James O'Brien",   email: 'james.obrien@example.com',    role: 'Backend Engineer',           date: 'Apr 30, 11:00 AM',   interviewer: 'Mike T.',   status: 'Scheduled', roomName: 'james-obrien-backend-interview' },
  { id: 6, initials: 'MC', name: 'Marcus Chen',     email: 'marcus.chen@example.com',     role: 'DevOps Engineer',            date: 'Apr 28, 3:00 PM',    interviewer: 'Sarah K.',  status: 'Completed', roomName: 'marcus-chen-devops-interview' },
  { id: 7, initials: 'SI', name: 'Sofia Iannone',   email: 'sofia.iannone@example.com',   role: 'Digital Marketing Manager',  date: 'Apr 27, 2:00 PM',    interviewer: 'James R.',  status: 'Completed', roomName: 'sofia-iannone-marketing-interview' },
  { id: 8, initials: 'HB', name: 'Hannah Brooks',   email: 'hannah.brooks@example.com',   role: 'Financial Analyst',          date: 'Apr 26, 10:00 AM',   interviewer: 'Mike T.',   status: 'Cancelled', roomName: 'hannah-brooks-finance-interview' },
];

const tabs = ['All', 'Scheduled', 'Completed', 'Cancelled'];

const createRoomName = (candidateName, role) => {
  const base = `${candidateName}-${role}-interview`;

  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const HireDashboardInterviews = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [role, setRole] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [invite, setInvite] = useState(null);
  const [copyState, setCopyState] = useState('');

  const filtered = activeTab === 'All'
    ? interviewsData
    : interviewsData.filter((i) => i.status === activeTab);

  const getInviteLink = (roomName) => `${window.location.origin}/interviews/${encodeURIComponent(roomName)}`;

  const copyInviteLink = async (link) => {
    if (!navigator.clipboard) {
      setCopyState('Copy unavailable');
      return;
    }

    await navigator.clipboard.writeText(link);
    setCopyState('Copied');
    window.setTimeout(() => setCopyState(''), 1800);
  };

  const openEmailInvite = (nextInvite) => {
    const subject = encodeURIComponent(`Interview invitation for ${nextInvite.role}`);
    const body = encodeURIComponent([
      `Hi ${nextInvite.candidateName},`,
      '',
      `Your interview for ${nextInvite.role} is scheduled for ${nextInvite.scheduledAt || 'the agreed time'}.`,
      '',
      `Join the Jitsi interview here: ${nextInvite.link}`,
      '',
      'Best regards,',
      'Hiring Team',
    ].join('\n'));

    window.location.href = `mailto:${nextInvite.candidateEmail}?subject=${subject}&body=${body}`;
  };

  const handleCreateInvite = (event) => {
    event.preventDefault();

    const roomName = createRoomName(candidateName, role);

    if (!roomName) {
      return;
    }

    const nextInvite = {
      candidateName,
      candidateEmail,
      role,
      scheduledAt,
      roomName,
      link: getInviteLink(roomName),
    };

    setInvite(nextInvite);
  };

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

        <form className="hire-interview-invite-panel" onSubmit={handleCreateInvite}>
          <div className="hire-interview-invite-copy">
            <span className="hire-interview-eyebrow">Jitsi invite</span>
            <h3>Create interview invite</h3>
            <p>Generate a Jitsi room link for the candidate, then copy it or send it by email.</p>
          </div>

          <div className="hire-interview-form-grid">
            <label>
              Candidate name
              <input
                type="text"
                value={candidateName}
                onChange={(event) => setCandidateName(event.target.value)}
                placeholder="Alex Rivera"
                required
              />
            </label>
            <label>
              Candidate email
              <input
                type="email"
                value={candidateEmail}
                onChange={(event) => setCandidateEmail(event.target.value)}
                placeholder="alex@example.com"
                required
              />
            </label>
            <label>
              Position
              <input
                type="text"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="Frontend Developer"
                required
              />
            </label>
            <label>
              Interview time
              <input
                type="text"
                value={scheduledAt}
                onChange={(event) => setScheduledAt(event.target.value)}
                placeholder="May 3, 2:00 PM"
              />
            </label>
          </div>

          <div className="hire-interview-invite-actions">
            <button type="submit" className="hire-interview-primary-action">Create invite</button>
            {invite && (
              <>
                <button type="button" onClick={() => copyInviteLink(invite.link)}>
                  {copyState || 'Copy link'}
                </button>
                <button type="button" onClick={() => openEmailInvite(invite)}>
                  Send email
                </button>
                <a href={invite.link} target="_blank" rel="noreferrer">Join as HR</a>
              </>
            )}
          </div>

          {invite && (
            <div className="hire-interview-generated-link">
              <span>Invite link</span>
              <strong>{invite.link}</strong>
            </div>
          )}
        </form>

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
              <div className="hire-interview-actions">
                <button type="button" onClick={() => copyInviteLink(getInviteLink(item.roomName))}>
                  Copy invite
                </button>
                <button
                  type="button"
                  onClick={() => openEmailInvite({
                    candidateName: item.name,
                    candidateEmail: item.email,
                    role: item.role,
                    scheduledAt: item.date,
                    link: getInviteLink(item.roomName),
                  })}
                >
                  Send
                </button>
                <a href={getInviteLink(item.roomName)} target="_blank" rel="noreferrer">
                  Join
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireDashboardInterviews;

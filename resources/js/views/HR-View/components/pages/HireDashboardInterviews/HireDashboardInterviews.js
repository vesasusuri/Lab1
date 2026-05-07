import React, { useMemo, useState } from 'react';
import { FaCalendarAlt, FaExternalLinkAlt, FaMapMarkerAlt, FaPlus, FaVideo } from 'react-icons/fa';
import './HireDashboardInterviews.scss';
import { useHireDashboard } from '../../../HireDashboardContext';

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
    ? interviews
    : interviews.filter((i) => i.status === activeTab);

  const activeRoomTitle = useMemo(() => (
    activeRoom ? formatRoomTitle(activeRoom) : ''
  ), [activeRoom]);

  // Build a candidate key from applicationsData (id is a number; use string for option value)
  const selectedCandidate = shortlistedCandidates.find((c) => String(c.id) === form.candidateId) || null;

  const joinRoom = (name) => {
    const normalized = normalizeRoomName(name);
    if (!normalized) return;
    setActiveRoom(normalized);
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };

      if (field === 'candidateId' && value) {
        const candidate = shortlistedCandidates.find((c) => String(c.id) === value);
        if (candidate) {
          next.roomName = normalizeRoomName(`${candidate.name} ${candidate.role}`);
        }
      }

      return next;
    });
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    const { candidateId, date, time, interviewer, type, roomName, location } = form;
    if (!candidateId || !date || !time) return;

    const candidate = shortlistedCandidates.find((c) => String(c.id) === candidateId);
    if (!candidate) return;

    const newInterview = {
      id: Date.now(),
      initials: candidate.initials || getInitials(candidate.name),
      name: candidate.name,
      role: candidate.role,
      date: formatDateTime(date, time),
      interviewer,
      status: 'Scheduled',
      type,
      ...(type === 'video'
        ? { roomName: normalizeRoomName(roomName || `${candidate.name} ${candidate.role}`) }
        : { location: location.trim() || 'TBD' }),
    };

    setInterviews((prev) => [newInterview, ...prev]);
    setActiveTab('All');
    setShowModal(false);
    setForm(EMPTY_FORM);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(EMPTY_FORM);
  };

  if (activeRoom) {
    return (
      <section className="hire-dashboard-interviews-section">
        <div className="hire-interviews-wrapper">
          <div className="hire-interviews-meeting-header">
            <div>
              <span className="hire-interviews-eyebrow">Live room</span>
              <h2>{activeRoomTitle || activeRoom}</h2>
            </div>
            <div className="hire-interviews-meeting-meta">
              <span className="hire-interviews-room-tag">{activeRoom}</span>
              <button className="hire-interviews-back-btn" type="button" onClick={() => setActiveRoom('')}>
                Back to interviews
              </button>
            </div>
          </div>

          <div className="hire-interviews-jitsi-frame">
            <iframe
              src={`https://meet.jit.si/${activeRoom}`}
              allow="camera; microphone; fullscreen; display-capture"
              style={{ width: '100%', height: '100%', border: 'none' }}
              title={activeRoomTitle || activeRoom}
            />
          </div>
        </div>
      </section>
    );
  }

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
    <>
      <section className="hire-dashboard-interviews-section">
        <div className="hire-interviews-wrapper">
          <div className="hire-interviews-header">
            <div>
              <span className="hire-interviews-eyebrow">Video &amp; In-Person Interviews</span>
              <h2>Interviews</h2>
            </div>
            <div className="hire-interviews-header-actions">
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
              <button className="hire-interviews-schedule-btn" type="button" onClick={() => setShowModal(true)}>
                <FaPlus aria-hidden="true" />
                Schedule interview
              </button>
            </div>
          </div>

          <div className="hire-interviews-join">
            <div>
              <h3>Start or join a video room</h3>
              <p>Use a shared room name so both participants enter the same call.</p>
            </div>
            <form
              className="hire-interviews-join-form"
              onSubmit={(e) => { e.preventDefault(); joinRoom(customRoomName); }}
            >
              <input
                type="text"
                value={customRoomName}
                onChange={(e) => setCustomRoomName(e.target.value)}
                placeholder="interview-room-name"
                aria-label="Interview room name"
              />
              <button type="submit">
                <FaVideo aria-hidden="true" />
                Join room
              </button>
            </form>
          </div>

          <div className="hire-interviews-list">
            {filtered.length === 0 && (
              <p className="hire-interviews-empty">No {activeTab.toLowerCase()} interviews.</p>
            )}
            {filtered.map((item) => (
              <div key={item.id} className="hire-interview-row">
                <div className="hire-interview-initials">{item.initials}</div>

                <div className="hire-interview-info">
                  <div className="hire-interview-name">{item.name}</div>
                  <div className="hire-interview-role">{item.role}</div>
                </div>

                <span className={`hire-interview-type-badge type-${item.type}`}>
                  {item.type === 'video' ? <FaVideo aria-hidden="true" /> : <FaMapMarkerAlt aria-hidden="true" />}
                  {item.type === 'video' ? 'Video' : 'In-person'}
                </span>

                <div className="hire-interview-date">
                  <FaCalendarAlt aria-hidden="true" />
                  {item.date}
                </div>

                {item.type === 'physical' && item.location && (
                  <div className="hire-interview-location">
                    <FaMapMarkerAlt aria-hidden="true" />
                    {item.location}
                  </div>
                )}

                <div className="hire-interview-interviewer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  {item.interviewer}
                </div>

                <div className={`hire-interview-status status-${item.status.toLowerCase()}`}>
                  {item.status}
                </div>

                {item.status === 'Scheduled' && item.type === 'video' && item.roomName && (
                  <button className="hire-interview-join-btn" type="button" onClick={() => joinRoom(item.roomName)}>
                    <FaExternalLinkAlt aria-hidden="true" />
                    Join
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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

              <div className="hire-modal-row">
                <label className="hire-modal-label">
                  Date
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => handleFormChange('date', e.target.value)}
                    required
                  />
                </label>
                <label className="hire-modal-label">
                  Time
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => handleFormChange('time', e.target.value)}
                    required
                  />
                </label>
              </div>

              <label className="hire-modal-label">
                Interviewer
                <select
                  value={form.interviewer}
                  onChange={(e) => handleFormChange('interviewer', e.target.value)}
                >
                  {INTERVIEWERS.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </label>

              {form.type === 'video' ? (
                <label className="hire-modal-label">
                  Room name
                  <input
                    type="text"
                    placeholder={selectedCandidate ? normalizeRoomName(`${selectedCandidate.name} ${selectedCandidate.role}`) : 'auto-generated'}
                    value={form.roomName}
                    onChange={(e) => handleFormChange('roomName', e.target.value)}
                  />
                </label>
              ) : (
                <label className="hire-modal-label">
                  Location
                  <input
                    type="text"
                    placeholder="e.g. Office – Room 3A"
                    value={form.location}
                    onChange={(e) => handleFormChange('location', e.target.value)}
                  />
                </label>
              )}

              <div className="hire-modal-actions">
                <button type="button" className="hire-modal-cancel" onClick={closeModal}>Cancel</button>
                <button
                  type="submit"
                  className="hire-modal-submit"
                  disabled={shortlistedCandidates.length === 0}
                >
                  Schedule
                </button>
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
      )}
    </>
  );
};

export default HireDashboardInterviews;

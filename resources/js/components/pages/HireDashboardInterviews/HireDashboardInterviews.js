import React, { useMemo, useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { FaCalendarAlt, FaExternalLinkAlt, FaMapMarkerAlt, FaPlus, FaVideo } from 'react-icons/fa';
import './HireDashboardInterviews.scss';
import { useHireDashboard } from '../../../HireDashboardContext';

const INTERVIEWERS = ['Sarah K.', 'Mike T.', 'James R.'];

const initialInterviews = [
  { id: 1, initials: 'AR', name: 'Alex Rivera',     role: 'Senior Frontend Developer', date: 'Today, 2:00 PM',     interviewer: 'Sarah K.',  status: 'Scheduled', type: 'video',    roomName: 'alex-rivera-frontend' },
  { id: 2, initials: 'FA', name: 'Fatima Al-Zahra', role: 'Data Scientist',             date: 'Today, 4:30 PM',     interviewer: 'Mike T.',   status: 'Scheduled', type: 'video',    roomName: 'fatima-alzahra-datascience' },
  { id: 3, initials: 'LN', name: 'Liam Nguyen',     role: 'Mobile App Developer',       date: 'Tomorrow, 10:00 AM', interviewer: 'Sarah K.',  status: 'Scheduled', type: 'physical', location: 'Office – Room 3A' },
  { id: 4, initials: 'PS', name: 'Priya Sharma',    role: 'UX/UI Designer',             date: 'Tomorrow, 1:00 PM',  interviewer: 'James R.',  status: 'Scheduled', type: 'video',    roomName: 'priya-sharma-uxui' },
  { id: 5, initials: 'JO', name: "James O'Brien",   role: 'Backend Engineer',           date: 'Apr 30, 11:00 AM',   interviewer: 'Mike T.',   status: 'Scheduled', type: 'physical', location: 'HQ – Conference Room B' },
  { id: 6, initials: 'MC', name: 'Marcus Chen',     role: 'DevOps Engineer',            date: 'Apr 28, 3:00 PM',    interviewer: 'Sarah K.',  status: 'Completed', type: 'video' },
  { id: 7, initials: 'SI', name: 'Sofia Iannone',   role: 'Digital Marketing Manager',  date: 'Apr 27, 2:00 PM',    interviewer: 'James R.',  status: 'Completed', type: 'physical' },
  { id: 8, initials: 'HB', name: 'Hannah Brooks',   role: 'Financial Analyst',          date: 'Apr 26, 10:00 AM',   interviewer: 'Mike T.',   status: 'Cancelled', type: 'video' },
];

const tabs = ['All', 'Scheduled', 'Completed', 'Cancelled'];

const normalizeRoomName = (value) => value
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const formatRoomTitle = (roomName) => roomName
  .split('-')
  .filter(Boolean)
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join(' ');

const getInitials = (name) => name
  .split(' ')
  .filter(Boolean)
  .slice(0, 2)
  .map((w) => w[0].toUpperCase())
  .join('');

const formatDateTime = (date, time) => {
  const d = new Date(`${date}T${time}`);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const label = sameDay(d, today) ? 'Today' : sameDay(d, tomorrow) ? 'Tomorrow'
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const timeLabel = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${label}, ${timeLabel}`;
};

const EMPTY_FORM = {
  candidateId: '',
  date: '',
  time: '',
  interviewer: INTERVIEWERS[0],
  type: 'video',
  roomName: '',
  location: '',
};

const HireDashboardInterviews = () => {
  const { shortlistedCandidates }  = useHireDashboard();
  const [interviews, setInterviews] = useState(initialInterviews);
  const [activeTab, setActiveTab]   = useState('All');
  const [activeRoom, setActiveRoom] = useState('');
  const [customRoomName, setCustomRoomName] = useState('');
  const [showModal, setShowModal]   = useState(false);
  const [form, setForm]             = useState(EMPTY_FORM);

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
            <JitsiMeeting
              domain="meet.jit.si"
              roomName={activeRoom}
              configOverwrite={{ disableDeepLinking: true, prejoinPageEnabled: true }}
              interfaceConfigOverwrite={{ SHOW_JITSI_WATERMARK: false }}
              getIFrameRef={(iframeRef) => {
                iframeRef.style.height = '100%';
                iframeRef.style.width = '100%';
              }}
              onReadyToClose={() => setActiveRoom('')}
            />
          </div>
        </div>
      </section>
    );
  }

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

      {showModal && (
        <div className="hire-modal-overlay" onClick={closeModal}>
          <div className="hire-modal" onClick={(e) => e.stopPropagation()}>
            <div className="hire-modal-header">
              <h2>Schedule interview</h2>
              <button className="hire-modal-close" type="button" onClick={closeModal} aria-label="Close">✕</button>
            </div>

            <form className="hire-modal-form" onSubmit={handleSchedule}>

              {/* Candidate picker — only shortlisted candidates appear */}
              <label className="hire-modal-label">
                Candidate
                {shortlistedCandidates.length === 0 ? (
                  <div className="hire-modal-empty-notice">
                    No shortlisted candidates yet. Go to Applications and mark candidates as Shortlisted first.
                  </div>
                ) : (
                  <select
                    value={form.candidateId}
                    onChange={(e) => handleFormChange('candidateId', e.target.value)}
                    required
                  >
                    <option value="" disabled>Select a shortlisted candidate…</option>
                    {shortlistedCandidates.map((c) => (
                      <option key={c.id} value={String(c.id)}>{c.name} — {c.role}</option>
                    ))}
                  </select>
                )}
              </label>

              <div className="hire-modal-type-toggle">
                <button
                  type="button"
                  className={form.type === 'video' ? 'type-btn active' : 'type-btn'}
                  onClick={() => handleFormChange('type', 'video')}
                >
                  <FaVideo aria-hidden="true" /> Video
                </button>
                <button
                  type="button"
                  className={form.type === 'physical' ? 'type-btn active' : 'type-btn'}
                  onClick={() => handleFormChange('type', 'physical')}
                >
                  <FaMapMarkerAlt aria-hidden="true" /> In-person
                </button>
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
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HireDashboardInterviews;

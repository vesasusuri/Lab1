import React, { useState } from 'react';
import './ScheduleInterviewModal.scss';

const ScheduleInterviewModal = ({ candidate, onClose }) => {
  const [form, setForm] = useState({
    date: '',
    time: '',
    duration: '60',
    format: 'Video Call',
    note: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { onClose(); setSent(false); }, 1400);
  };

  return (
    <div className="sim-overlay" onClick={onClose}>
      <div className="sim-modal" onClick={(e) => e.stopPropagation()}>

        <div className="sim-header">
          <div>
            <h2>Schedule Interview</h2>
            <p>with <strong>{candidate?.name}</strong> · {candidate?.role}</p>
          </div>
          <button className="sim-close" onClick={onClose}>✕</button>
        </div>

        <form className="sim-form" onSubmit={handleSubmit}>

          <div className="sim-row">
            <div className="sim-field">
              <label>Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required />
            </div>
            <div className="sim-field">
              <label>Time</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} required />
            </div>
          </div>

          <div className="sim-row">
            <div className="sim-field">
              <label>Duration</label>
              <select name="duration" value={form.duration} onChange={handleChange}>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
              </select>
            </div>
            <div className="sim-field">
              <label>Format</label>
              <select name="format" value={form.format} onChange={handleChange}>
                <option>Video Call</option>
                <option>Phone</option>
                <option>In-person</option>
              </select>
            </div>
          </div>

          <div className="sim-field sim-field-full">
            <label>Message to candidate <span className="sim-hint">(optional)</span></label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Add any details or preparation notes for the candidate…"
              rows={4}
            />
          </div>

          <div className="sim-preview">
            <span className="sim-preview-label">Invite Preview</span>
            <div className="sim-preview-card">
              <div className="sim-preview-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>{candidate?.name} — {candidate?.role}</span>
              </div>
              <div className="sim-preview-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>{form.date || '—'} at {form.time || '—'}</span>
              </div>
              <div className="sim-preview-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{form.duration} min · {form.format}</span>
              </div>
              {form.note && (
                <div className="sim-preview-row sim-preview-note">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span>{form.note}</span>
                </div>
              )}
            </div>
          </div>

          <div className="sim-footer">
            <button type="button" className="sim-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="sim-submit">
              {sent ? '✓ Interview Scheduled!' : 'Send Invite'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;

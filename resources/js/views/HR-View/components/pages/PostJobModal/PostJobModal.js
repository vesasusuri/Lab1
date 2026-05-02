import React, { useState } from 'react';
import './PostJobModal.scss';

const PostJobModal = ({ onClose }) => {
  const company = localStorage.getItem('user_company') || 'Your Company';
  const initials = company.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: '', location: '', type: 'Full-time', salary: '', tags: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setForm({ title: '', location: '', type: 'Full-time', salary: '', tags: '' });
    }, 1200);
  };

  const tagList = form.tags.split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <div className="pjm-overlay" onClick={onClose}>
      <div className="pjm-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Left: Form ── */}
        <div className="pjm-form-panel">
          <div className="pjm-header">
            <h2>Post a New Job</h2>
            <button className="pjm-close" onClick={onClose}>✕</button>
          </div>
          <form className="pjm-form" onSubmit={handleSubmit}>
            <div className="pjm-field">
              <label>Job Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Senior Frontend Developer" required />
            </div>
            <div className="pjm-field">
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Remote, New York, NY" required />
            </div>
            <div className="pjm-field">
              <label>Job Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>
            <div className="pjm-field">
              <label>Salary Range</label>
              <input name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. $80k – $100k" required />
            </div>
            <div className="pjm-field">
              <label>Skills / Tags <span className="pjm-hint">(comma separated)</span></label>
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="e.g. React, TypeScript, Node.js" />
            </div>
            <button type="submit" className="pjm-submit">
              {submitted ? '✓ Posted!' : 'Post Job'}
            </button>
          </form>
        </div>

        {/* ── Right: Live Preview ── */}
        <div className="pjm-preview-panel">
          <p className="pjm-preview-label">Live Preview</p>
          <div className="pjm-preview-card">
            <div className="pjm-preview-head">
              <div className="pjm-preview-initials">{initials || 'CO'}</div>
              <div className="pjm-preview-title-block">
                <h3>{form.title || 'Job Title'}</h3>
                <p>{company}</p>
              </div>
              <div className="pjm-preview-type">{form.type}</div>
            </div>
            <div className="pjm-preview-meta">
              <span>📍 {form.location || 'Location'}</span>
              <span>💰 {form.salary || 'Salary'}</span>
              <span>🕐 Just now</span>
            </div>
            {tagList.length > 0 && (
              <div className="pjm-preview-tags">
                {tagList.map((tag) => <div key={tag} className="pjm-preview-tag">{tag}</div>)}
              </div>
            )}
            <div className="pjm-preview-section">
              <h4>About the Role</h4>
              <p>
                We're looking for a talented {form.title || '...'} to join {company}.
                This is a {form.type} position based in {form.location || '...'}.
              </p>
            </div>
            <div className="pjm-preview-actions">
              <div className="pjm-preview-apply">↗ Apply Now</div>
              <div className="pjm-preview-save">Save Job</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostJobModal;

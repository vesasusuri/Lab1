import React, { useState } from 'react';
import './HireDashboardHeader.scss';

const HireDashboardHeader = () => {
  const company = localStorage.getItem('user_company') || 'Your Company';
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    salary: '',
    tags: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setForm({ title: '', location: '', type: 'Full-time', salary: '', tags: '' });
    }, 1200);
  };

  const initials = company.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const tagList = form.tags.split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <>
      <section className="hire-dashboard-header-section">
        <div className="hire-dashboard-header-wrapper">
          <div className="hire-header-text">
            <h1>Welcome, <span className="hire-accent">{company}</span></h1>
            <p>Here's what's happening with your job postings today.</p>
          </div>
          <button className="hire-post-btn" onClick={() => setShowModal(true)}>
            ↗ Post a Job
          </button>
        </div>
      </section>

      {showModal && (
        <div className="hire-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="hire-modal-wide" onClick={(e) => e.stopPropagation()}>

            {/* Left — Form */}
            <div className="hire-modal-form-panel">
              <div className="hire-modal-header">
                <h2>Post a New Job</h2>
                <button className="hire-modal-close" onClick={() => setShowModal(false)}>✕</button>
              </div>

              <form className="hire-modal-form" onSubmit={handleSubmit}>
                <div className="hire-modal-field">
                  <label>Job Title</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Senior Frontend Developer" required />
                </div>
                <div className="hire-modal-field">
                  <label>Location</label>
                  <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Remote, New York, NY" required />
                </div>
                <div className="hire-modal-field">
                  <label>Job Type</label>
                  <select name="type" value={form.type} onChange={handleChange}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                    <option>Remote</option>
                  </select>
                </div>
                <div className="hire-modal-field">
                  <label>Salary Range</label>
                  <input name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. $80k - $100k" required />
                </div>
                <div className="hire-modal-field">
                  <label>Skills / Tags <span className="hire-modal-hint">(comma separated)</span></label>
                  <input name="tags" value={form.tags} onChange={handleChange} placeholder="e.g. React, TypeScript, Node.js" />
                </div>
                <button type="submit" className="hire-modal-submit">
                  {submitted ? '✓ Posted!' : 'Post Job'}
                </button>
              </form>
            </div>

            {/* Right — Preview */}
            <div className="hire-modal-preview-panel">
              <p className="hire-preview-label">Live Preview</p>

              <div className="hire-preview-card">
                <div className="hire-preview-header">
                  <div className="hire-preview-initials">{initials || 'CO'}</div>
                  <div className="hire-preview-title-block">
                    <h3>{form.title || 'Job Title'}</h3>
                    <p>{company}</p>
                  </div>
                  <div className="hire-preview-type">{form.type}</div>
                </div>

                <div className="hire-preview-meta">
                  <span>📍 {form.location || 'Location'}</span>
                  <span>💰 {form.salary || 'Salary'}</span>
                  <span>🕐 Just now</span>
                </div>

                {tagList.length > 0 && (
                  <div className="hire-preview-tags">
                    {tagList.map((tag) => (
                      <div key={tag} className="hire-preview-tag">{tag}</div>
                    ))}
                  </div>
                )}

                <div className="hire-preview-section">
                  <h4>About the Role</h4>
                  <p>We're looking for a talented {form.title || '...'} to join {company}. This is a {form.type} position based in {form.location || '...'}.</p>
                </div>

                <div className="hire-preview-actions">
                  <div className="hire-preview-apply">↗ Apply Now</div>
                  <div className="hire-preview-save">Save Job</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default HireDashboardHeader;
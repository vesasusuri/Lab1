import React, { useState } from 'react';
import { FiFileText, FiMail, FiUser } from 'react-icons/fi';
import './ContactForm.scss';

const details = [
  { label: 'Email', value: 'info@beehired.com' },
  { label: 'Support hours', value: 'Mon - Fri, 9:00 - 18:00' },
  { label: 'Office', value: 'Remote-first across Europe' },
];

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  notes: '',
};

function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };

    setValues(nextValues);
    setErrors(validate(nextValues));
    setShowFeedback(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setShowFeedback(false);
      return;
    }

    setShowFeedback(true);
    setValues(initialValues);
    setErrors({});
  };

  return (
    <div className="contact-page">
      <section className="contact">
        <div className="container grid">
          <article className="card form-card">
            <div className="card-head">
              <h2>Tell us what you need.</h2>
              <p>
                Keep it short and direct. We only ask for the details needed to
                respond properly.
              </p>
            </div>

            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <Field id="first-name" name="firstName" label="First name" placeholder="First name" value={values.firstName} error={errors.firstName} icon={<FiUser />}  onChange={handleChange}/>
                <Field id="last-name" name="lastName"  label="Last name"  placeholder="Last name" value={values.lastName}  error={errors.lastName} icon={<FiUser />} onChange={handleChange}/>
              </div>

              <Field id="email" name="email" type="email" label="Email address" placeholder="Email address" value={values.email} error={errors.email}  icon={<FiMail />}  onChange={handleChange}/>

              <Field id="notes" name="notes" label="Notes" placeholder="Tell us a bit about your question" value={values.notes}  error={errors.notes} icon={<FiFileText />} onChange={handleChange} textarea/>

              <div className="form-actions">
                <button type="submit" className="btn">
                  Send message
                </button>

                <div className={`feedback ${showFeedback ? 'show' : ''}`} role="status" aria-live="polite">
                  Your message looks ready to send.
                </div>
              </div>
            </form>
          </article>

          <aside className="side">
            <article className="card info-card">
              <p className="eyebrow">Details</p>
              <h3>Useful contact info.</h3>

              <div className="info-list">
                {details.map((item) => (
                  <div className="info-item" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </div>
      </section>

    </div>
  );
}

function Field({id, name, label, type = 'text',placeholder, value,error, icon, onChange,textarea = false,}) {
  return (
    <label className={`field ${error ? 'error' : ''}`} htmlFor={id}>
      <span className="field-label">{label}</span>

      <div className={`field-box ${textarea ? 'textarea-box' : ''}`}>
        <span className="field-icon">{icon}</span>

        {textarea ? (
          <textarea id={id}name={name}placeholder={placeholder}value={value}onChange={onChange}/>
        ) : (
          <input id={id} name={name}type={type}placeholder={placeholder} value={value} onChange={onChange} />
        )}
      </div>

      <span className="field-error">{error || ''}</span>
    </label>
  );
}

function validate(values) {
  const errors = {};

  if (!values.firstName.trim()) errors.firstName = 'First name is required.';
  if (!values.lastName.trim()) errors.lastName = 'Last name is required.';

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.notes.trim()) errors.notes = 'Please add a short message.';

  return errors;
}

export default ContactForm;
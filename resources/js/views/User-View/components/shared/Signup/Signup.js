import React, { useState } from 'react';
import { FaFacebookF, FaGoogle, FaXTwitter } from 'react-icons/fa6';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import './Signup.scss';

const socialItems = [
    { label: 'Google', icon: <FaGoogle /> },
    { label: 'Facebook', icon: <FaFacebookF /> },
    { label: 'Twitter', icon: <FaXTwitter /> },
];

function validate(values) {
    const errors = {};

    if (!values.full_name.trim()) {
        errors.full_name = 'Full name is required.';
    }

    if (!values.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Enter a valid email address.';
    }

    if (!values.password.trim()) {
        errors.password = 'Password is required.';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters.';
    }

    if (!values.password_confirmation.trim()) {
        errors.password_confirmation = 'Please confirm your password.';
    } else if (values.password_confirmation !== values.password) {
        errors.password_confirmation = 'Passwords do not match.';
    }

    if (!values.terms) {
        errors.terms = 'You must agree before continuing.';
    }

    return errors;
}

export default function SignupContent() {
    const [values, setValues] = useState({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
        newsletter: false,
    });
    const [errors, setErrors] = useState({});
    const [ok, setOk] = useState(false);

    const onChange = (event) => {
        const { name, type, checked, value } = event.target;
        const nextValues = {
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        };

        setValues(nextValues);
        setErrors(validate(nextValues));
        setOk(false);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validate(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            setOk(false);
            return;
        }

        setOk(true);
        setValues({
            full_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            terms: false,
            newsletter: false,
        });
        setErrors({});
    };

    return (
        <section className="su" data-aos="fade-up">
            <div className="su-card">
                <div className="su-head">
                    <p className="su-tag">Create Account</p>
                    <h1>Sign up</h1>
                    <p className="su-sub">Create your account and keep your applications, saved jobs, and updates in one place.</p>
                </div>

                <form className="su-form" onSubmit={onSubmit} noValidate>
                    <label className={`su-field ${errors.full_name ? 'err' : ''}`} htmlFor="signup-name">
                        <FiUser />
                        <input
                            id="signup-name"
                            name="full_name"
                            type="text"
                            placeholder="Full name"
                            value={values.full_name}
                            onChange={onChange}
                        />
                    </label>
                    <span className="su-msg">{errors.full_name ?? ''}</span>

                    <label className={`su-field ${errors.email ? 'err' : ''}`} htmlFor="signup-email">
                        <FiMail />
                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={onChange}
                        />
                    </label>
                    <span className="su-msg">{errors.email ?? ''}</span>

                    <label className={`su-field ${errors.password ? 'err' : ''}`} htmlFor="signup-password">
                        <FiLock />
                        <input
                            id="signup-password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={onChange}
                        />
                    </label>
                    <span className="su-msg">{errors.password ?? ''}</span>

                    <label className={`su-field ${errors.password_confirmation ? 'err' : ''}`} htmlFor="signup-password-confirmation">
                        <FiLock />
                        <input
                            id="signup-password-confirmation"
                            name="password_confirmation"
                            type="password"
                            placeholder="Confirm password"
                            value={values.password_confirmation}
                            onChange={onChange}
                        />
                    </label>
                    <span className="su-msg">{errors.password_confirmation ?? ''}</span>

                    <label className="su-check" htmlFor="signup-terms">
                        <input
                            id="signup-terms"
                            name="terms"
                            type="checkbox"
                            checked={values.terms}
                            onChange={onChange}
                        />
                        <span>I agree to the Terms and Privacy Policy.</span>
                    </label>
                    <span className="su-msg">{errors.terms ?? ''}</span>

                    <label className="su-check" htmlFor="signup-newsletter">
                        <input
                            id="signup-newsletter"
                            name="newsletter"
                            type="checkbox"
                            checked={values.newsletter}
                            onChange={onChange}
                        />
                        <span>Send me product and hiring updates.</span>
                    </label>

                    <button type="submit" className="su-btn">Create account</button>
                    <div className={`su-ok ${ok ? 'show' : ''}`} role="status" aria-live="polite">
                        Your details look good.
                    </div>
                </form>

                <p className="su-alt">Already have an account? <a href="/login">Log in</a></p>

                <div className="su-line"><span>Or continue with</span></div>

                <div className="su-social">
                    {socialItems.map((item) => (
                        <button key={item.label} type="button" className="su-sbtn" aria-label={`Continue with ${item.label}`}>
                            {item.icon}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

import React, { useState } from 'react';
import { FaFacebookF, FaGoogle, FaXTwitter } from 'react-icons/fa6';
import { FiLock, FiMail } from 'react-icons/fi';
import './login.scss';

const socialItems = [
    { label: 'Google', icon: <FaGoogle /> },
    { label: 'Facebook', icon: <FaFacebookF /> },
    { label: 'Twitter', icon: <FaXTwitter /> },
];

function validate(values) {
    const errors = {};

    if (!values.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Enter a valid email address.';
    }

    if (!values.password.trim()) {
        errors.password = 'Password is required.';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters.';
    }

    return errors;
}

export default function LoginContent() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        remember: false,
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
        setValues({ email: '', password: '', remember: false });
        setErrors({});
    };

    return (
        <section className="li" data-aos="fade-up">
            <div className="li-card">
                <div className="li-head">
                    <p className="li-tag">Member Access</p>
                    <h1>Log in</h1>
                    <p className="li-sub">Access your saved jobs, application activity, and account details.</p>
                </div>

                <form className="li-form" onSubmit={onSubmit} noValidate>
                    <label className={`li-field ${errors.email ? 'err' : ''}`} htmlFor="login-email">
                        <FiMail />
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={onChange}
                        />
                    </label>
                    <span className="li-msg">{errors.email ?? ''}</span>

                    <label className={`li-field ${errors.password ? 'err' : ''}`} htmlFor="login-password">
                        <FiLock />
                        <input
                            id="login-password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={onChange}
                        />
                    </label>
                    <span className="li-msg">{errors.password ?? ''}</span>

                    <div className="li-row">
                        <label className="li-check" htmlFor="remember-me">
                            <input
                                id="remember-me"
                                name="remember"
                                type="checkbox"
                                checked={values.remember}
                                onChange={onChange}
                            />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="li-link">Forgot password?</a>
                    </div>

                    <button type="submit" className="li-btn">Sign in</button>
                    <div className={`li-ok ${ok ? 'show' : ''}`} role="status" aria-live="polite">
                        Login details look good.
                    </div>
                </form>

                <p className="li-alt">Don&apos;t have an account? <a href="/signup">Register</a></p>

                <div className="li-line"><span>Or continue with</span></div>

                <div className="li-social">
                    {socialItems.map((item) => (
                        <button key={item.label} type="button" className="li-sbtn" aria-label={`Continue with ${item.label}`}>
                            {item.icon}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

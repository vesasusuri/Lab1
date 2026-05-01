import React, { useState } from 'react';
import './ContactBanner.scss';


function ContactBanner() {
    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="contact-container contact-hero__inner">
                    <p className="contact-eyebrow">Contact Us</p>
                    <h1>
                        Build the next hire
                        <span> with clarity.</span>
                    </h1>
                    <p className="contact-hero__copy">
                        Reach out for hiring support, partnership questions, or product help.
                        The page now follows the same clean structure and visual system used
                        across the rest of the site.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default ContactBanner;
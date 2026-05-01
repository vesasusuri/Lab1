import React, { useEffect, useState } from 'react';
import './aboutOverview.scss';


const AboutOverview = () => {

    return (
        <section id="about-story" className="about-overview">
            <div className="about-container">
                <div className="about-overview__intro" data-aos="fade-up">
                    <span className="about-overview__eyebrow">Workflow</span>
                    <h2>Built to keep hiring clear, structured, and easy to manage</h2>
                </div>

                <div className="about-overview__grid">
                    <article className="about-overview__panel" data-aos="fade-up" data-aos-delay="100">
                        <h3>What BeeHired Solves</h3>
                        <p>
                            Recruitment is often fragmented across email, spreadsheets, and disconnected
                            tools. BeeHired consolidates announcements, applications, evaluations, and decisions
                            in one secure platform.
                        </p>
                    </article>
                    <article className="about-overview__panel" data-aos="fade-up" data-aos-delay="200">
                        <h3>Why Organizations Use It</h3>
                        <p>
                            Faster processing, better visibility, and consistent candidate handling. Teams can
                            collaborate efficiently while maintaining professional standards and audit-ready
                            records.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default AboutOverview;

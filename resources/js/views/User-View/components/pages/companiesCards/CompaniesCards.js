import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLocationDot, FaUsers } from 'react-icons/fa6';
import './companiesCards.scss';

import {companies} from "./data.js";

const CompaniesCards = () => {
    return (
        <section className="companies-section" >
            <div className="companies-section-header" data-aos="fade-up">
                <div>
                    <p className="companies-section-eyebrow">Top employers</p>
                    <h2 className="companies-section-title">Discover companies hiring right now</h2>
                    <p className="companies-section-description">
                        Explore standout companies, compare team size and location, and find the places where your next role could start.
                    </p>
                </div>

                <a href="/companies" className="companies-section-link">
                    Browse companies <FaArrowRight aria-hidden />
                </a>
            </div>

            <div className="companies-grid" data-aos="fade-up">
                {companies.map((company) => (
                    <article key={company.id} className="company-card" >
                        <div className="company-card-top">
                            <div className="company-logo-wrap">
                                <img src={company.logo} alt={`${company.name} logo`} className="company-logo" />
                            </div>

                            <span className="company-industry">{company.industry}</span>
                        </div>

                        <div className="company-card-body">
                            <h3>{company.name}</h3>
                            <p>{company.description}</p>
                        </div>

                        <div className="company-meta">
                            <span>
                                <FaUsers aria-hidden />
                                {company.employees}
                            </span>
                            <span>
                                <FaLocationDot aria-hidden />
                                {company.location}
                            </span>
                        </div>

                        <div className="company-card-footer">
                            <span className="company-open-roles">{company.openRoles}</span>
                            <Link to={`/companies/${company.id}`}>View company</Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default CompaniesCards;

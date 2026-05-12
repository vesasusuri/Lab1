import React, { useEffect, useMemo, useState } from 'react';
import { FiEdit2, FiExternalLink } from 'react-icons/fi';
import { usePlatformAdmin } from '../../../../../context/PlatformAdminContext';
import AdminHomeSectionsPanel from './AdminHomeSectionsPanel';
import '../../shared/AdminShared.scss';

const pageFields = {
  home: [
    { key: 'proofText', label: 'Review proof text' },
    { key: 'heroTitle', label: 'Hero title' },
    { key: 'heroSubtitle', label: 'Hero subtitle', type: 'textarea' },
    { key: 'primaryCta', label: 'Primary CTA' },
    { key: 'secondaryCta', label: 'Secondary CTA' },
    { key: 'categoriesTitle', label: 'Categories title' },
    { key: 'categoriesCta', label: 'Categories CTA' },
    { key: 'companiesEyebrow', label: 'Companies eyebrow' },
    { key: 'companiesTitle', label: 'Companies title' },
    { key: 'companiesDescription', label: 'Companies description', type: 'textarea' },
    { key: 'companiesCta', label: 'Companies CTA' },
    { key: 'findJobTitle', label: 'Find job title (fallback if section empty)' },
    { key: 'findJobHighlight', label: 'Find job highlighted word (fallback)' },
    { key: 'findJobDescription', label: 'Find job description (fallback)', type: 'textarea' },
    { key: 'findJobCta', label: 'Find job CTA (fallback)' },
  ],
  about: [
    { key: 'heroEyebrow', label: 'Hero eyebrow' },
    { key: 'heroTitle', label: 'Hero title' },
    { key: 'heroDescription', label: 'Hero description', type: 'textarea' },
    { key: 'missionTitle', label: 'Mission title' },
    { key: 'missionDescription', label: 'Mission description', type: 'textarea' },
    { key: 'statsTitle', label: 'Stats section title' },
    { key: 'primaryCta', label: 'Primary CTA' },
  ],
  companies: [
    { key: 'heroEyebrow', label: 'Hero eyebrow' },
    { key: 'heroTitle', label: 'Hero title' },
    { key: 'heroDescription', label: 'Hero description', type: 'textarea' },
    { key: 'featuredTitle', label: 'Featured section title' },
    { key: 'featuredDescription', label: 'Featured section description', type: 'textarea' },
    { key: 'primaryCta', label: 'Primary CTA' },
  ],
  jobs: [
    { key: 'heroEyebrow', label: 'Hero eyebrow' },
    { key: 'heroTitle', label: 'Hero title' },
    { key: 'heroDescription', label: 'Hero description', type: 'textarea' },
    { key: 'filterTitle', label: 'Filter title' },
    { key: 'listingsTitle', label: 'Listings title' },
    { key: 'primaryCta', label: 'Primary CTA' },
  ],
  pricing: [
    { key: 'heroEyebrow', label: 'Hero eyebrow' },
    { key: 'heroTitle', label: 'Hero title' },
    { key: 'heroDescription', label: 'Hero description', type: 'textarea' },
    { key: 'plansTitle', label: 'Plans section title' },
    { key: 'faqTitle', label: 'FAQ title' },
    { key: 'primaryCta', label: 'Primary CTA' },
  ],
  contact: [
    { key: 'heroEyebrow', label: 'Hero eyebrow' },
    { key: 'heroTitle', label: 'Hero title' },
    { key: 'heroDescription', label: 'Hero description', type: 'textarea' },
    { key: 'formTitle', label: 'Form title' },
    { key: 'formDescription', label: 'Form description', type: 'textarea' },
    { key: 'primaryCta', label: 'Primary CTA' },
  ],
};

const AdminDashboardContent = () => {
  const {
    data,
    updatePageContent,
    updateRecord,
    updateHomeSections,
    uploadHomeSectionImage,
    createHomeSectionItem,
    deleteHomeSectionItem,
  } = usePlatformAdmin();
  const pages = useMemo(() => [...data.userViewPages].sort((a, b) => a.navOrder - b.navOrder), [data.userViewPages]);
  const [activePage, setActivePage] = useState(pages[0]?.id || 'home');
  const [form, setForm] = useState(data.pageContent?.[activePage] || {});
  const [homeSectionsForm, setHomeSectionsForm] = useState(data.homeSections || []);
  const activePageMeta = pages.find((page) => page.id === activePage) || pages[0];
  const fields = pageFields[activePage] || [];

  useEffect(() => {
    setForm(data.pageContent?.[activePage] || {});
  }, [activePage, data.pageContent]);

  useEffect(() => {
    setHomeSectionsForm(data.homeSections || []);
  }, [data.homeSections]);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitContent = (e) => {
    e.preventDefault();
    updatePageContent(activePage, form);
  };

  return (
    <main className="admin-page">
      <section className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>Content editor</h2>
            <p>Select a page and update copy. Home page body text for category/company headers is edited here; cards and lists are under Home page sections.</p>
          </div>
          {activePageMeta?.path && (
            <a className="admin-btn admin-btn-light" href={activePageMeta.path} target="_blank" rel="noreferrer">
              <FiExternalLink />
              Preview
            </a>
          )}
        </div>

        <div className="admin-content-picker">
          {pages.map((page) => (
            <button
              type="button"
              key={page.id}
              className={`admin-content-tab${activePage === page.id ? ' active' : ''}`}
              onClick={() => setActivePage(page.id)}
            >
              <span>{page.title}</span>
              <small>{page.path}</small>
            </button>
          ))}
        </div>
      </section>

      {activePage === 'home' && (
        <AdminHomeSectionsPanel
          homeSectionsForm={homeSectionsForm}
          setHomeSectionsForm={setHomeSectionsForm}
          persistHomeSections={updateHomeSections}
          uploadHomeSectionImage={uploadHomeSectionImage}
          createHomeSectionItem={createHomeSectionItem}
          deleteHomeSectionItem={deleteHomeSectionItem}
        />
      )}


     
    </main>
  );
};

export default AdminDashboardContent;

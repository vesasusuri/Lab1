import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Companies from './pages/Companies/Companies';
import Jobs from './pages/Jobs/Jobs';
import JobDetailPage from './pages/JobDetailPage/JobDetailPage';
import Pricing from './pages/Pricing/Pricing';
import Login from './views/User-View/pages/Login/Login';
import Signup from './views/User-View/pages/Signup/Signup';
import HireDashboardPage from './pages/HireDashboard/HireDashboard';
import HireDashboardInterviewsPage from './pages/HireDashboardInterviewsPage/HireDashboardInterviewsPage';
import HireDashboardHiresPage from './pages/HireDashboardHiresPage/HireDashboardHiresPage';
import HireDashboardAnalyticsPage from './pages/HireDashboardAnalyticsPage/HireDashboardAnalyticsPage';
import HireDashboardSettingsPage from './pages/HireDashboardSettingsPage/HireDashboardSettingsPage';
import HireDashboardApplicationsPage from './pages/HireDashboardApplicationsPage/HireDashboardApplicationsPage';
import HireDashboardListingsPage from './pages/HireDashboardListingsPage/HireDashboardListingsPage';

export default function App() {
    useEffect(() => {
        Aos.init({ duration: 1250, once: true })
    }, [])
    return (
        <IntlProvider locale="en" messages={{}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/jobs/:id" element={<JobDetailPage />} />
                    <Route path="/hire-dashboard" element={<HireDashboardPage />} />
                    <Route path="/hire-dashboard/interviews" element={<HireDashboardInterviewsPage />} />
                    <Route path="/hire-dashboard/hires" element={<HireDashboardHiresPage />} />
                    <Route path="/hire-dashboard/analytics" element={<HireDashboardAnalyticsPage />} />
                    <Route path="/hire-dashboard/settings" element={<HireDashboardSettingsPage />} />
                    <Route path="/hire-dashboard/applications" element={<HireDashboardApplicationsPage />} />
                    <Route path="/hire-dashboard/listings" element={<HireDashboardListingsPage />} />
                </Routes>
            </BrowserRouter>
        </IntlProvider>
    );
}

import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css";
import Home from './views/User-View/pages/Home/Home';
import About from './views/User-View/pages/About/About';
import Companies from './views/User-View/pages/Companies/Companies';
import CompaniesDetail from './views/User-View/pages/CompaniesDetails/CompaniesDetail';
import Jobs from './views/User-View/pages/Jobs/Jobs';
import JobDetailPage from './views/User-View/pages/JobDetailPage/JobDetailPage';
import Pricing from './views/User-View/pages/Pricing/Pricing';
import Contact from './views/User-View/pages/Contact/Contact';
import Login from './views/User-View/pages/Login/Login';
import Signup from './views/User-View/pages/Signup/Signup';
import DashboardPage from './views/User-View/pages/User-Dashboard/Dashboard/Dashboard';
import AppliedJob from './views/User-View/pages/User-Dashboard/AppliedJobs/AppliedJobs';
import UnfinishedJob from './views/User-View/pages/User-Dashboard/UnfinishedJobs/UnfinishedJob';
import SavedJob from './views/User-View/pages/User-Dashboard/SavedJobs/SavedJob';
import UserViewLayout from './views/User-View/UserViewLayout';
import "../scss/app.scss";
export default function App() {
    useEffect(() => {
        Aos.init({
          duration:1250,
          once: true
        })
    }, [])
    return (
        <IntlProvider locale="en" messages={{}}>
            <BrowserRouter>
                <Routes>
                    <Route element={<UserViewLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about-us" element={<About />} />
                        <Route path="/companies" element={<Companies />} />
                        <Route path="/companies/:id" element={<CompaniesDetail />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/contact-us" element={<Contact />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/jobs/:id" element={<JobDetailPage />} />
                        <Route path="/dashboard" element={<DashboardPage/>} />
                        <Route path="/applied-jobs" element={<AppliedJob/>} />
                        <Route path="/unfinished-jobs" element={<UnfinishedJob/>} />
                        <Route path="/saved-jobs" element={<SavedJob/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </IntlProvider>
    );
}

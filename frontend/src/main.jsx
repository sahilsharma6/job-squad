import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router";
import AssetsForDesign from "./pages/Assets";
import HomePage from "./pages/Home/Home";
import AboutUs from "./pages/About/HeroAbout";
import BlogPage from "./pages/Blogs/BlogPage";
import ContactSection from "./pages/Contact/ContactHero";
import JobLayout from "./pages/Jobs/JobLayout";
import SignupForm from "./pages/Register/Register";
import LoginPage from "./pages/Login/login";
import ResetPasswordPage from "./pages/Reset/Reset";
import Company from "./pages/Company/Company";
// import Loader from "./pages/Register/Loader";
import ViewJobDetailsLayout from "./pages/Jobs/ViewJobDetailsLayout";
import ScrollToTop from "./components/ScrollToTop";
import CompanySignupPage from "./pages/Register/CompanyRegister";
import CompanyLogin from "./pages/Login/CompanyLogin";

import { DashboardRoutes } from "./dashboardRoutes";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";

import { store } from "./store";


import ComingSoon from "./components/ComingSoon";
import NotFound from "./components/NotFound";
import BlogDetailsLayout from "./pages/Blogs/BlogDetails/BlogDetailsLayout";
// List of paths that should show the coming soon page
const comingSoonPaths = [
  '/marketplace',
  '/enterprise',
  '/resources',
  '/upload-cv'
  // Add more paths as needed
];


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />}>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/our/assets" element={<AssetsForDesign />} />

            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailsLayout />} />

            <Route path="/jobs" element={<JobLayout />} />
            <Route path="/jobs/:jobId" element={<ViewJobDetailsLayout />} />
            <Route path="/register" element={<SignupForm />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/reset" element={<ResetPasswordPage />} />
            <Route path="/company" element={<Company />} />

            {/* Dashboard Routes - Single DashboardLayout */}
            {/* <Route path="/dashboard" element={<DashboardLayout />}>
              Applicant Routes
              <Route path="applicant">
                <Route index element={<ApplicantDashboard />} />
                <Route path="profile" element={<ApplicantProfile />} />
                <Route path="resume" element={<ApplicantResume />} />
                <Route path="applied-jobs" element={<ApplicantAppliedJobs />} />
                <Route path="shortlisted-jobs" element={<ApplicantShortlistedJobs />} />
                <Route path="saved-jobs" element={<ApplicantSavedJobs />} />
                <Route path="following-companies" element={<ApplicantFollowingCompanies />} />
                <Route path="meetings" element={<ApplicantMeetings />} />
                <Route path="messages" element={<ApplicantMessages />} />
                <Route path="job-alerts" element={<ApplicantJobAlerts />} />
                <Route path="settings" element={<ApplicantSettings />} />
              </Route>

              Company Routes
              <Route path="company">
                <Route index element={<CompanyDashboard />} />
                <Route path="profile" element={<CompanyProfile />} />
                <Route path="post-job" element={<CompanyPostJob />} />
                <Route path="manage-jobs" element={<CompanyManageJobs />} />
                <Route path="applicants" element={<CompanyAllApplicants />} />
                <Route path="shortlisted-resume" element={<CompanyShortlistedResumes />} />
                <Route path="messages" element={<CompanyMessages />} />
                <Route path="meetings" element={<CompanyMeetings />} />
                <Route path="resume-alerts" element={<CompanyResumeAlerts />} />
                <Route path="settings" element={<CompanySettings />} />
              </Route>

              Admin Routes
              <Route path="admin">
                <Route index element={<AdminDashboard />} />
                <Route path="users-applicants" element={<AdminManageApplicants />} />
                <Route path="users-companies" element={<AdminManageCompanies />} />
                <Route path="users-unauthorized" element={<AdminManageUnauthorized />} />
                <Route path="articles" element={<AdminViewArticles />} />
                <Route path="post-article" element={<AdminPostArticle />} />
                <Route path="post-requirement" element={<AdminPostRequirement />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route> */}

            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* Import the dashboard routes */}
              {DashboardRoutes}
            </Route>



            <Route path="/reset" element={<ResetPasswordPage />} />
            <Route path="/company" element={<Company />} />
            <Route path="/companyregister" element={<CompanySignupPage />} />
            <Route path="/companysignin" element={<CompanyLogin />} />

            {/* Coming Soon Routes */}
            {comingSoonPaths.map(path => (
              <Route
                key={path}
                path={path}
                element={<ComingSoon />}
              />
            ))}


            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

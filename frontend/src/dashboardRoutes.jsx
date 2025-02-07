import { Route } from "react-router";

// Applicant Routes
import { ApplicantDashboard } from "./pages/Dashboard/applicant/ApplicantDashboard";
import { ApplicantProfile } from "./pages/Dashboard/applicant/ApplicantProfile";
import { ApplicantResume } from "./pages/Dashboard/applicant/ApplicantResume";
import { ApplicantAppliedJobs } from "./pages/Dashboard/applicant/ApplicantAppliedJobs";
import { ApplicantShortlistedJobs } from "./pages/Dashboard/applicant/ApplicantShortlistedJobs";
import { ApplicantSavedJobs } from "./pages/Dashboard/applicant/ApplicantSavedJobs";
import { ApplicantFollowingCompanies } from "./pages/Dashboard/applicant/ApplicantFollowingCompanies";
import { ApplicantMeetings } from "./pages/Dashboard/applicant/ApplicantMeetings";
import ApplicantMessages from "./pages/Dashboard/applicant/ApplicantMessages";
import { ApplicantJobAlerts } from "./pages/Dashboard/applicant/ApplicantJobAlerts";
import { ApplicantSettings } from "./pages/Dashboard/applicant/ApplicantSettings";


// Company Routes
import { CompanyDashboard } from "./pages/Dashboard/company/CompanyDashboard";
import { CompanyProfile } from "./pages/Dashboard/company/CompanyProfile";
import { CompanyPostJob } from "./pages/Dashboard/company/CompanyPostJob";
import { CompanyManageJobs } from "./pages/Dashboard/company/CompanyManageJobs";
import { CompanyAllApplicants } from "./pages/Dashboard/company/CompanyAllApplicants";
import { CompanyShortlistedResumes } from "./pages/Dashboard/company/CompanyShortlistedResumes";
import { CompanyMessages } from "./pages/Dashboard/company/CompanyMessages";
import { CompanyMeetings } from "./pages/Dashboard/company/CompanyMeetings";
import { CompanyResumeAlerts } from "./pages/Dashboard/company/CompanyResumeAlerts";
import { CompanySettings } from "./pages/Dashboard/company/CompanySettings";

// admin Routes
import { AdminDashboard } from "./pages/Dashboard/admin/AdminDashboard";
import { AdminManageApplicants } from "./pages/Dashboard/admin/users/AdminManageApplicants";
import { AdminManageCompanies } from "./pages/Dashboard/admin/users/AdminManageCompanies";
import { AdminManageUnauthorized } from "./pages/Dashboard/admin/users/AdminManageUnauthorized";
import { AdminViewArticles } from "./pages/Dashboard/admin/articles/AdminViewArticles";
import { AdminPostArticle } from "./pages/Dashboard/admin/articles/AdminPostArticle";
import { AdminPostRequirement } from "./pages/Dashboard/admin/AdminPostRequirement";
import { AdminSettings } from "./pages/Dashboard/admin/AdminSettings";


export const DashboardRoutes = (
    <>
    {/* Applicant Routes */}
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

    {/* Company Routes */}
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

    {/* Admin Routes */}
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
  </>
  );
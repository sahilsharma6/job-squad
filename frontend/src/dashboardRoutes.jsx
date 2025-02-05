import { Route } from "react-router";

// Candidate Routes
import { CandidateDashboard } from "./pages/Dashboard/candidate/CandidateDashboard";
import { CandidateProfile } from "./pages/Dashboard/candidate/CandidateProfile";
import { CandidateResume } from "./pages/Dashboard/candidate/CandidateResume";
import { CandidateAppliedJobs } from "./pages/Dashboard/candidate/CandidateAppliedJobs";
import { CandidateSavedJobs } from "./pages/Dashboard/candidate/CandidateSavedJobs";
import { CandidateFollowingCompanies } from "./pages/Dashboard/candidate/CandidateFollowingCompanies";
import { CandidateMeetings } from "./pages/Dashboard/candidate/CandidateMeetings";
import { CandidateJobAlerts } from "./pages/Dashboard/candidate/CandidateJobAlerts";
import { CandidateSettings } from "./pages/Dashboard/candidate/CandidateSettings";
import { CandidateShortlistedJobs } from "./pages/Dashboard/candidate/CandidateShortlistedJobs";
import { CandidateMessages } from "./pages/Dashboard/candidate/CandidateMessages";

// Company Routes
import { CompanyDashboard } from "./pages/Dashboard/company/CompanyDashboard";
import { CompanyProfile } from "./pages/Dashboard/company/CompanyProfile";
import { CompanyPostJob } from "./pages/Dashboard/company/CompanyPostJob";
import { CompanyManageJobs } from "./pages/Dashboard/company/CompanyManageJobs";
import { CompanyAllCandidates } from "./pages/Dashboard/company/CompanyAllCandidates";
import { CompanyShortlistedResumes } from "./pages/Dashboard/company/CompanyShortlistedResumes";
import { CompanyMessages } from "./pages/Dashboard/company/CompanyMessages";
import { CompanyMeetings } from "./pages/Dashboard/company/CompanyMeetings";
import { CompanyResumeAlerts } from "./pages/Dashboard/company/CompanyResumeAlerts";
import { CompanySettings } from "./pages/Dashboard/company/CompanySettings";
import { AdminDashboard } from "./pages/Dashboard/admin/AdminDashboard";
import { AdminManageCandidates } from "./pages/Dashboard/admin/users/AdminManageCandidates";
import { AdminManageCompanies } from "./pages/Dashboard/admin/users/AdminManageCompanies";
import { AdminManageUnauthorized } from "./pages/Dashboard/admin/users/AdminManageUnauthorized";
import { AdminViewArticles } from "./pages/Dashboard/admin/articles/AdminViewArticles";
import { AdminPostArticle } from "./pages/Dashboard/admin/articles/AdminPostArticle";
import { AdminPostRequirement } from "./pages/Dashboard/admin/AdminPostRequirement";
import { AdminSettings } from "./pages/Dashboard/admin/AdminSettings";

export const DashboardRoutes = (
    <>
    {/* Candidate Routes */}
    <Route path="candidate">
      <Route index element={<CandidateDashboard />} />
      <Route path="profile" element={<CandidateProfile />} />
      <Route path="resume" element={<CandidateResume />} />
      <Route path="applied-jobs" element={<CandidateAppliedJobs />} />
      <Route path="shortlisted-jobs" element={<CandidateShortlistedJobs />} />
      <Route path="saved-jobs" element={<CandidateSavedJobs />} />
      <Route path="following-companies" element={<CandidateFollowingCompanies />} />
      <Route path="meetings" element={<CandidateMeetings />} />
      <Route path="messages" element={<CandidateMessages />} />
      <Route path="job-alerts" element={<CandidateJobAlerts />} />
      <Route path="settings" element={<CandidateSettings />} />
    </Route>

    {/* Company Routes */}
    <Route path="company">
      <Route index element={<CompanyDashboard />} />
      <Route path="profile" element={<CompanyProfile />} />
      <Route path="post-job" element={<CompanyPostJob />} />
      <Route path="manage-jobs" element={<CompanyManageJobs />} />
      <Route path="candidates" element={<CompanyAllCandidates />} />
      <Route path="shortlisted-resume" element={<CompanyShortlistedResumes />} />
      <Route path="messages" element={<CompanyMessages />} />
      <Route path="meetings" element={<CompanyMeetings />} />
      <Route path="resume-alerts" element={<CompanyResumeAlerts />} />
      <Route path="settings" element={<CompanySettings />} />
    </Route>

    {/* Admin Routes */}
    <Route path="admin">
      <Route index element={<AdminDashboard />} />
      <Route path="users-candidates" element={<AdminManageCandidates />} />
      <Route path="users-companies" element={<AdminManageCompanies />} />
      <Route path="users-unauthorized" element={<AdminManageUnauthorized />} />
      <Route path="articles" element={<AdminViewArticles />} />
      <Route path="post-article" element={<AdminPostArticle />} />
      <Route path="post-requirement" element={<AdminPostRequirement />} />
      <Route path="settings" element={<AdminSettings />} />
    </Route>
  </>
  );
import { Route } from "react-router-dom"

import { AdminDashboard } from "@/pages/Dashboard/admin/AdminDashboard"
import { AdminPostRequirement } from "@/pages/Dashboard/admin/AdminPostRequirement"
import { AdminSettings } from "@/pages/Dashboard/admin/AdminSettings"
import { AdminPostArticle } from "@/pages/Dashboard/admin/articles/AdminPostArticle"
import { AdminViewArticles } from "@/pages/Dashboard/admin/articles/AdminViewArticles"
import { AdminManageCandidates } from "@/pages/Dashboard/admin/users/AdminManageCandidates"
import { AdminManageCompanies } from "@/pages/Dashboard/admin/users/AdminManageCompanies"
import { AdminManageUnauthorized } from "@/pages/Dashboard/admin/users/AdminManageUnauthorized"
import { CandidateAppliedJobs } from "@/pages/Dashboard/candidate/CandidateAppliedJobs"
import CandidateDashboard from "@/pages/Dashboard/candidate/CandidateDashboard"
import { CandidateFollowingCompanies } from "@/pages/Dashboard/candidate/CandidateFollowingCompanies"
import { CandidateJobAlerts } from "@/pages/Dashboard/candidate/CandidateJobAlerts"
import { CandidateMeetings } from "@/pages/Dashboard/candidate/CandidateMeetings"
import { CandidateMessages } from "@/pages/Dashboard/candidate/CandidateMessages"
import { CandidateProfile } from "@/pages/Dashboard/candidate/CandidateProfile"
import { CandidateResume } from "@/pages/Dashboard/candidate/CandidateResume"
import { CandidateSavedJobs } from "@/pages/Dashboard/candidate/CandidateSavedJobs"
import { CandidateSettings } from "@/pages/Dashboard/candidate/CandidateSettings"
import { CandidateShortlistedJobs } from "@/pages/Dashboard/candidate/CandidateShortlistedJobs"
import { CompanyAllCandidates } from "@/pages/Dashboard/company/CompanyAllCandidates"
import { CompanyDashboard } from "@/pages/Dashboard/company/CompanyDashboard"
import { CompanyManageJobs } from "@/pages/Dashboard/company/CompanyManageJobs"
import { CompanyMeetings } from "@/pages/Dashboard/company/CompanyMeetings"
import { CompanyMessages } from "@/pages/Dashboard/company/CompanyMessages"
import { CompanyPostJob } from "@/pages/Dashboard/company/CompanyPostJob"
import { CompanyProfile } from "@/pages/Dashboard/company/CompanyProfile"
import { CompanyResumeAlerts } from "@/pages/Dashboard/company/CompanyResumeAlerts"
import { CompanySettings } from "@/pages/Dashboard/company/CompanySettings"
import { CompanyShortlistedResumes } from "@/pages/Dashboard/company/CompanyShortlistedResumes"
import DashboardLayout from "@/pages/Dashboard/DashboardLayout"



export default function DashboardRoutes() {
  return (
      <Route element={<DashboardLayout />}>
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
    </Route>
  )
}


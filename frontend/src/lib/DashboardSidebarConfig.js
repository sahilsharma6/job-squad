import { 
  Bell, 
  BookmarkPlus, 
  Briefcase, 
  Building2, 
  Calendar, 
  ClipboardList, 
  FileCheck2, 
  FileText, 
  MessageSquare, 
  Newspaper, 
  Plus, 
  Settings, 
  Trash2, 
  UserCircle, 
  Users 
} from "lucide-react";

export const SIDEBAR_ITEMS = {
  applicant: [
    { name: 'Dashboard', href: '/dashboard/applicant', icon: Users },
    { name: 'My Profile', href: '/dashboard/applicant/profile', icon: UserCircle },
    { name: 'My Resume', href: '/dashboard/applicant/resume', icon: FileText },
    { name: 'Applied Jobs', href: '/dashboard/applicant/applied-jobs', icon: Briefcase },
    { name: 'Shortlisted Jobs', href: '/dashboard/applicant/shortlisted-jobs', icon: BookmarkPlus },
    { name: 'Saved Jobs', href: '/dashboard/applicant/saved-jobs', icon: BookmarkPlus },
    { name: 'Following Companies', href: '/dashboard/applicant/following-companies', icon: Building2 },
    { name: 'Meetings', href: '/dashboard/applicant/meetings', icon: Calendar },
    { name: 'Messages', href: '/dashboard/applicant/messages', icon: MessageSquare },
    { name: 'Job Alerts', href: '/dashboard/applicant/job-alerts', icon: Bell },
    { name: 'Settings', href: '/dashboard/applicant/settings', icon: Settings }
  ],
  company: [
    { name: 'Dashboard', href: '/dashboard/company', icon: Users },
    { name: 'Company Profile', href: '/dashboard/company/profile', icon: Building2 },
    { name: 'Post a Job', href: '/dashboard/company/post-job', icon: Plus },
    { name: 'Manage Jobs', href: '/dashboard/company/manage-jobs', icon: ClipboardList },
    { name: 'All Applicants', href: '/dashboard/company/applicants', icon: Users },
    { name: 'Shortlisted Resume', href: '/dashboard/company/shortlisted-resume', icon: FileCheck2 },
    { name: 'Messages', href: '/dashboard/company/messages', icon: MessageSquare },
    { name: 'Meetings', href: '/dashboard/company/meetings', icon: Calendar },
    { name: 'Resume Alerts', href: '/dashboard/company/resume-alerts', icon: Bell },
    { name: 'Settings', href: '/dashboard/company/settings', icon: Settings }
  ],
  admin: [
    { name: 'Dashboard', href: '/dashboard/admin', icon: Users },
    { name: 'Manage Applicants', href: '/dashboard/admin/users-applicants', icon: Users },
    { name: 'Manage Companies', href: '/dashboard/admin/users-companies', icon: Building2 },
    { name: 'Unauthorized Users', href: '/dashboard/admin/users-unauthorized', icon: Users },
    { name: 'View Articles', href: '/dashboard/admin/articles', icon: Newspaper },
    { name: 'Post Article', href: '/dashboard/admin/post-article', icon: Plus },
    { name: 'Post Requirement', href: '/dashboard/admin/post-requirement', icon: Plus },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings }
  ]
};
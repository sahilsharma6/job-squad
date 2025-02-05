
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Eye, Layers, Briefcase, Mail, MessageCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const CompanyDashboard = () => {
  // Sample data for the profile views chart
  const profileViewsData = [
    { name: "Jan", views: 130 },
    { name: "Feb", views: 160 },
    { name: "Mar", views: 150 },
    { name: "Apr", views: 180 },
    { name: "May", views: 220 },
    { name: "Jun", views: 200 },
    { name: "Jul", views: 250 },
    { name: "Aug", views: 300 },
    { name: "Sep", views: 210 },
  ];

  // Sample notifications
  const notifications = [
    { icon: <Briefcase className="text-blue-500" />, message: "You Have New Application For Web Designer!", time: "just now" },
    { icon: <Mail className="text-blue-500" />, message: "Tesla Jonsin Has Sent You Private Message!", time: "15 min ago" },
    { icon: <Briefcase className="text-blue-500" />, message: "Henry Wilson Applied For A Job Senior Product Designer", time: "2 months ago" },
    { icon: <MessageCircle className="text-blue-500" />, message: "You Have New Review For #53454 This List", time: "15 days ago" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-100 p-5 rounded-lg flex items-center">
          <BarChart3 className="text-blue-600 w-10 h-10" />
          <div className="ml-4">
            <h2 className="text-3xl font-bold text-blue-600">620</h2>
            <p className="text-gray-600">Applied Jobs</p>
          </div>
        </Card>

        <Card className="bg-green-100 p-5 rounded-lg flex items-center">
          <Eye className="text-green-600 w-10 h-10" />
          <div className="ml-4">
            <h2 className="text-3xl font-bold text-green-600">25k</h2>
            <p className="text-gray-600">Profile Views</p>
          </div>
        </Card>

        <Card className="bg-red-100 p-5 rounded-lg flex items-center">
          <Layers className="text-red-600 w-10 h-10" />
          <div className="ml-4">
            <h2 className="text-3xl font-bold text-red-600">150</h2>
            <p className="text-gray-600">Shortlisted Jobs</p>
          </div>
        </Card>
      </div>

      {/* Profile Views Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">Your Profile Views</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={profileViewsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#4F46E5" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Notifications Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">Notifications</h3>
          <div className="mt-4 space-y-4">
            {notifications.map((notif, index) => (
              <div key={index} className="flex items-center space-x-3">
                {notif.icon}
                <div>
                  <p className="text-gray-700 font-medium">{notif.message}</p>
                  <p className="text-gray-500 text-sm">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <JobListings/>
    </div>
  );
};



import { Bookmark, Clock, MapPin, 
  
 } from "lucide-react";

const jobListings = [
  {
    title: "Application Developer",
    company: "Circle Pixel",
    category: "Development",
    type: "Full Time",
    postedTime: "2 Hours Ago",
    location: "25/B Milford Road, New York",
    salary: "$150 - $180",
    iconColor: "bg-blue-600",
    applicants: [
      {
        name: "John Doe",
        skills: ["JavaScript", "React", "Node.js"],
        location: "New York",
        appliedTime: "1 Hour Ago",
      },
      {
        name: "Jane Smith",
        skills: ["Figma", "Photoshop", "UX/UI Design"],
        location: "San Francisco",
        appliedTime: "2 Hours Ago",
      },
    ],
  },
  {
    title: "Marketing Manager",
    company: "Azutine Growths",
    category: "Marketing",
    type: "Freelance",
    postedTime: "2 Hours Ago",
    location: "25/B Milford Road, New York",
    salary: "$150 - $180",
    iconColor: "bg-purple-600",
    applicants: [
      {
        name: "Alice Johnson",
        skills: ["SEO", "Google Ads", "Content Strategy"],
        location: "Chicago",
        appliedTime: "30 Minutes Ago",
      },
      {
        name: "Bob Lee",
        skills: ["Social Media Marketing", "Branding", "Digital Strategy"],
        location: "Los Angeles",
        appliedTime: "1 Hour Ago",
      },
    ],
  },
  // Add more job listings as needed
];

const CandidateCard = ({ applicant }) => (
  <div className="p-4 shadow-sm rounded-lg border bg-white">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200">
          <Briefcase className="text-black" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{applicant.name}</h3>
          <p className="text-blue-600">{applicant.location}</p>
        </div>
      </div>
      <Bookmark className="text-gray-400 cursor-pointer" size={20} />
    </div>

    <div className="flex items-center text-gray-500 text-sm mt-3 space-x-3">
      <Clock size={16} /> <span>Applied {applicant.appliedTime}</span>
    </div>

    <div className="mt-3 flex flex-wrap gap-2">
      {applicant.skills.map((skill, index) => (
        <span key={index} className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const JobCard = ({ job }) => (
  <div className="p-5 shadow-md rounded-lg border bg-white">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${job.iconColor}`}>
          <Briefcase className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-blue-600">{job.company}</p>
        </div>
      </div>
    </div>

    <div className="flex items-center text-gray-500 text-sm mt-3 space-x-3">
      <Briefcase size={16} /> <span>{job.category}</span>
      <span>•</span>
      <span>{job.type}</span>
      <span>•</span>
      <Clock size={16} /> <span>{job.postedTime}</span>
    </div>

    <div className="flex items-center text-gray-500 text-sm mt-2">
      <MapPin size={16} /> <span>{job.location}</span>
    </div>

    <div className="mt-4">
      <h4 className="text-lg font-semibold">Applicants</h4>
      {job.applicants.map((applicant, index) => (
        <CandidateCard key={index} applicant={applicant} />
      ))}
    </div>

    <div className="flex justify-between items-center mt-4">
      <p className="text-blue-600 font-semibold text-lg">{job.salary} <span className="text-gray-500 text-sm">/Hour</span></p>
    </div>
  </div>
);

const JobListings = () => (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h2 className="text-xl font-bold text-gray-700 mb-4">Jobs with Applicants</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobListings.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  </div>
);

export default JobListings;

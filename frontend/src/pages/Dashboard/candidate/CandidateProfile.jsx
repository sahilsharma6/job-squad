
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const profileData = {
  fullName: "Laura Packer",
  email: "laurapacker@example.com",
  contactNumber: "+2 134 562 458",
  website: "www.example.com",
  age: "35 Years",
  gender: "Female",
  joinDate: "21 August, 2024",
  educationLevel: "Master Degree",
  languages: ["English", "German"],
  jobCategory: "IT & Software",
  dateOfBirth: "21 August, 1986",
  experience: "04 Years",
  currentSalary: "$50k - $60k",
  expectedSalary: "$70k - $85k",
  skills: ["Figma", "Adobe XD", "Next.js", "React.js", "App", "Node.js"],
  bio: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
};

export const CandidateProfile = () => (
  <div className="p-6 bg-gray-100 min-h-screen">
    {/* Profile Basic Info */}
    <Card className="p-5 shadow-md rounded-lg border bg-white">
      <h2 className="text-lg font-bold text-gray-700 mb-3">Profile Basic Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div><strong>Full Name:</strong> {profileData.fullName}</div>
        <div><strong>Education Level:</strong> {profileData.educationLevel}</div>
        <div><strong>Email:</strong> {profileData.email}</div>
        <div><strong>Language:</strong> {profileData.languages.join(", ")}</div>
        <div><strong>Contact Number:</strong> {profileData.contactNumber}</div>
        <div><strong>Job Category:</strong> {profileData.jobCategory}</div>
        <div><strong>Personal Website:</strong> <a href="#" className="text-blue-600">{profileData.website}</a></div>
        <div><strong>Date Of Birth:</strong> {profileData.dateOfBirth}</div>
        <div><strong>Age:</strong> {profileData.age}</div>
        <div><strong>Experience:</strong> {profileData.experience}</div>
        <div><strong>Gender:</strong> {profileData.gender}</div>
        <div><strong>Current Salary:</strong> {profileData.currentSalary}</div>
        <div><strong>Join Date:</strong> {profileData.joinDate}</div>
        <div><strong>Expected Salary:</strong> {profileData.expectedSalary}</div>
      </div>
    </Card>

    {/* Skills Section */}
    <Card className="p-5 shadow-md rounded-lg border bg-white mt-4">
      <h2 className="text-lg font-bold text-gray-700 mb-3">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {profileData.skills.map((skill, index) => (
          <span key={index} className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </Card>

    {/* Bio Section */}
    <Card className="p-5 shadow-md rounded-lg border bg-white mt-4">
      <h2 className="text-lg font-bold text-gray-700 mb-3">Bio</h2>
      <p className="text-gray-600 text-sm">{profileData.bio}</p>
    </Card>
    <Card className="p-5 shadow-md rounded-lg border bg-white mt-4">
      <h2 className="text-lg font-bold text-gray-700 mb-3">Contact Info</h2>
      <p className="text-gray-600 text-sm">Email Id:-Johndoe@gmail.com</p>
      <p className="text-gray-600 text-sm">Phone No:-9292929929</p>
      <p className="text-gray-600 text-sm">Instagram:-Johndoe@gmail.com</p>
    </Card>
  </div>
);


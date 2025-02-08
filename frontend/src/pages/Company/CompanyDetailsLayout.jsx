import React, { useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Users, Globe, Mail, Phone } from "lucide-react";
import NewsletterSection from "../Home/components/Newletter";
import { companiesData } from './companies-data';

const CompanyDetailsLayout = () => {
  const [searchParams] = useSearchParams();
  const companyName = searchParams.get('name');
  const [activeTab, setActiveTab] = useState("about");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const company = companiesData.find(
    (c) => c.companyName === decodeURIComponent(companyName)
  );

  if (!company) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-800">Company not found</h2>
      </div>
    );
  }

  const tabs = [
    { id: "about", label: "About Us" },
    { id: "jobs", label: "Open Positions" },
    { id: "contact", label: "Contact" },
  ];

  // Assuming these would come from your API/database in real implementation
  const openPositions = [
    {
      id: 1,
      title: "Senior Software Engineer",
      location: "Remote",
      type: "Full-time",
      posted: "2 days ago",
      salary: "$120k - $150k"
    },
    {
      id: 2,
      title: "Product Designer",
      location: "Hybrid",
      type: "Full-time",
      posted: "1 week ago",
      salary: "$90k - $120k"
    },
    {
      id: 3,
      title: "Marketing Manager",
      location: "On-site",
      type: "Full-time",
      posted: "3 days ago",
      salary: "$80k - $100k"
    }
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = openPositions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(openPositions.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-100">
        <div className="w-full h-64 bg-gradient-to-r from-primary-light to-primary-ultra">
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="absolute inset-x-0 bottom-0 transform -translate-y-1/2 text-center">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            Welcome to {company.companyName}
          </h2>
        </div>
      </section>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src={company.companyLogo || "/api/placeholder/100/100"} 
              alt={`${company.companyName} Logo`} 
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{company.companyName}</h1>
              <p className="text-sm text-gray-500">{company.companyWebsite}</p>
            </div>
          </div>
          <Button>Contact Us</Button>
        </div>
      </header>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 font-medium ${
                    activeTab === tab.id ? "text-primary-light border-b-2 border-primary-ultra" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "about" && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">About {company.companyName}</h3>
              <p className="text-gray-700 mb-6">{company.companyDescription}</p>
              
              <h4 className="text-xl font-semibold mb-3">Contact Person</h4>
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={company.contactPersonProfile || "/api/placeholder/50/50"}
                  alt={company.contactPersonName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{company.contactPersonName}</p>
                  <p className="text-gray-500 text-sm">{company.contactPersonEmail}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "jobs" && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">Open Positions</h3>
              <div className="space-y-4">
                {currentJobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{job.title}</h4>
                        <p className="text-gray-500">{job.location} • {job.type}</p>
                        <p className="text-gray-600 mt-2">{job.salary}</p>
                      </div>
                      <Button>Apply Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span>{company.contactPersonEmail}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{company.contactPersonPhone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <a href={company.companyWebsite} className="text-blue-600 hover:underline">
                    {company.companyWebsite}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="bg-white shadow-lg rounded-lg p-6 space-y-4 h-fit">
          <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Company Details</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 text-primary-light mr-3" />
              <span className="text-gray-600">Technology</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 text-primary-light mr-3" />
              <span className="text-gray-600">{company.location || "Remote-Friendly"}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 text-primary-light mr-3" />
              <span className="text-gray-600">Verified Company</span>
            </div>
          </div>

          <div className="mt-6 p-4 border rounded-lg">
            <h5 className="font-semibold mb-2">Quick Contact</h5>
            <p className="text-sm text-gray-600 mb-4">
              Reach out to learn more about opportunities at {company.companyName}
            </p>
            <Button className="w-full">Send Message</Button>
          </div>
        </aside>
      </div>

      <NewsletterSection />
    </div>
  );
};

export default CompanyDetailsLayout;
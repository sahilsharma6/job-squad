import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Users } from "lucide-react";

import CompanyLogo from "../Company/ige.png";
import HeroImage from "../Company/image.png";
import LocationMap from "../Company/image.png";
import NewsletterSection from "../Home/components/Newletter";

const CompanyPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Define items per page for pagination

  const tabs = [
    { id: "about", label: "About Us" },
    { id: "recruitments", label: "Recruitments" },
    { id: "people", label: "People" },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Alice Johnson",
      title: "UI/UX Designer",
      description: "Alice creates intuitive designs that enhance user experience.",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Bob Smith",
      title: "Software Engineer",
      description: "Bob specializes in building scalable backend systems.",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Catherine Lee",
      title: "Project Manager",
      description: "Catherine ensures projects are delivered on time and within scope.",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "David Brown",
      title: "QA Engineer",
      description: "David ensures the quality of every product we release.",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "David Brown",
      title: "QA Engineer",
      description: "David ensures the quality of every product we release.",
      img: "https://via.placeholder.com/150",
    },
  ];

  const jobs = [
    {
      id: 1,
      company: "Quora JSC",
      title: "Senior System Engineer",
      location: "New York, US",
      type: "Part time",
      posted: "5 mins ago",
      rate: "$800/Hour",
      tools: ["Adobe XD", "Figma"],
    },
    {
      id: 2,
      company: "Nintendo",
      title: "Products Manager",
      location: "New York, US",
      type: "Full time",
      posted: "6 mins ago",
      rate: "$250/Hour",
      tools: ["Adobe XD", "Figma"],
    },
    {
      id: 3,
      company: "Periscope",
      title: "Lead Quality Control QA",
      location: "New York, US",
      type: "Full time",
      posted: "6 mins ago",
      rate: "$250/Hour",
      tools: ["Adobe XD", "Figma"],
    },
    {
      id: 4,
      company: "Google",
      title: "Data Analyst",
      location: "Remote",
      type: "Contract",
      posted: "10 mins ago",
      rate: "$400/Hour",
      tools: ["Tableau", "Power BI"],
    },
    {
      id: 5,
      company: "Quora JSC",
      title: "Senior System Engineer",
      location: "New York, US",
      type: "Part time",
      posted: "5 mins ago",
      rate: "$800/Hour",
      tools: ["Adobe XD", "Figma"],
    },
    {
      id: 6,
      company: "Nintendo",
      title: "Products Manager",
      location: "New York, US",
      type: "Full time",
      posted: "6 mins ago",
      rate: "$250/Hour",
      tools: ["Adobe XD", "Figma"],
    },
    {
      id: 7,
      company: "Periscope",
      title: "Lead Quality Control QA",
      location: "New York, US",
      type: "Full time",
      posted: "6 mins ago",
      rate: "$250/Hour",
      tools: ["Adobe XD", "Figma"],
    },
    {
      id: 8,
      company: "Googlee",
      title: "Data Analyst",
      location: "Remote",
      type: "Contract",
      posted: "10 mins ago",
      rate: "$400/Hour",
      tools: ["Tableau", "Power BI"],
    },
  ];

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);
  const currentTeamMembers = teamMembers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-100">
        <div className="w-full h-64 overflow-hidden">
          <img src={HeroImage} alt="AiStudio Team" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-x-0 bottom-0 transform -translate-y-1/2 text-center">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg font-ubuntu font-normal">
            Welcome to AiStudio Team
          </h2>
          <p className="mt-2 text-gray-100 text-lg">
            Creating designs that foster creativity and productivity
          </p>
        </div>
      </section>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={CompanyLogo} alt="AiThemes Logo" className="h-12 w-12 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 font-ubuntu ">AiThemes</h1>
              <p className="text-sm text-gray-500 font-ubuntu font-normal">Our Mission: To make working life simple</p>
            </div>
          </div>
          <Button className="bg-primary-light hover:bg-primary-dark text-white">Contact Us</Button>
        </div>
      </header>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 font-lato font-normal ">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2  font-medium ${
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
            <div>
              <h1 className="text-2xl font-bold mt-6  font-ubuntu  ">Welcome to AliStudio Team</h1>
              <p className="mt-4 text-gray-700  font-lato font-normal">
                The AliStudio Design team has a vision to establish a trusted platform that enables productive and
                healthy enterprises in a world of digital and remote everything, constantly changing work patterns and
                norms, and the need for organizational resiliency.
              </p>
              <br/>
              <p className=" text-gray-700  font-lato font-normal">
                The team is dedicated to creating designs that foster creativity
                and productivity, helping organizations adapt to the evolving
                landscape of work. They bring expertise in areas like interactive
                design, visual communication, and user experience.
              </p>
              <div className="mt-6">
                <h3 className="text-2xl  text-gray-800 mb-4 font-ubuntu font-bold">
                  Essential Requirements
                </h3>
                <ul className="space-y-3 text-gray-600 font-lato font-normal">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-light">✓</span>
                    Polished portfolio demonstrating end-to-end customer journeys
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-light">✓</span>
                    5+ years of industry experience in design
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-light">✓</span>
                    Proficiency with design tools (Figma, Photoshop, Sketch)
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-light">✓</span>
                    Excellent interpersonal and collaboration skills
                  </li>
                </ul>
              </div>
              {/* Additional content */}
            </div>
          )}

          {activeTab === "recruitments" && (
            <div>
              <h1 className="text-2xl font-bold mt-6 font-ubuntu " >Recruitments</h1>
              <p className="mt-4 text-gray-700 font-lato font-normal">
                AliStudio is actively seeking talented designers to join our team.
              </p>
              <p className="mt-4 text-gray-700 font-lato font-normal">
                AliStudio is actively seeking talented designers to join our team.
                We're looking for individuals with a passion for creating exceptional
                user experiences and a proven track record in visual/interactive design.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-700 font-lato font-normal">
                <li>A portfolio demonstrating polished end-to-end customer journeys.</li>
                <li>5+ years of experience in visual/interactive design.</li>
                <li>Proficiency in tools like Figma, Photoshop, Illustrator, etc.</li>
              </ul>
              {/* Additional content */}
            </div>
          )}

          {activeTab === "people" && (
            <div>
              <h1 className="text-2xl font-bold mt-6 font-ubuntu">Our Talented Team</h1>
              <p className="mt-4 text-gray-700 font-lato font-normal">
                The AliStudio team is composed of experienced designers, developers,
                and strategists who work collaboratively to deliver innovative solutions.
                Our team members come from diverse backgrounds and bring a wealth of
                knowledge and expertise to the table.
              </p>
      <h1 className="text-2xl font-bold text-center mb-6">Meet Our Team</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentTeamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-24 h-24 mx-auto rounded-full"
                    />
                    <h2 className="text-lg font-semibold mt-4 text-center">{member.name}</h2>
                    <p className="text-sm text-gray-500 text-center">{member.title}</p>
                    <p className="mt-2 text-gray-600 text-sm text-center">{member.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Section */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold mb-4 font-ubuntu ">Latest Jobs</h1>
            <div className="space-y-4">
              {currentJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{job.title}</h2>
                      <p className="text-sm text-gray-500">
                        {job.company} - {job.location}
                      </p>
                      <p className="text-sm text-gray-500">{job.type}</p>
                      <p className="mt-2 text-gray-700">{job.rate}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                      Apply Now
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 text-sm text-gray-500">
                    {job.tools.map((tool, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white shadow-lg rounded-lg p-6 space-y-4 font-bold font-ubuntu">
          <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Company Details</h4>
          <div className="space-y-3 font-ubuntu">
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 text-primary-light mr-3" />
              <span className="text-gray-600">Accounting / Finance</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 text-primary-light mr-3" />
              <span className="text-gray-600">Chicago, US (Remote-Friendly)</span>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 text-primary-light mr-3" />
              <span className="text-gray-600">Member since July 2012</span>
            </div>
          </div>
          <div className="mt-4">
            <img
              src={LocationMap}
              alt="Company Location"
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold">Contact Us</h2>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>📍 205 North Michigan Avenue, Suite 810 Chicago, 60601, USA</li>
                <li>📞 Phone: (123) 456-7890</li>
                <li>✉️ Email: contact@evara.com</li>
              </ul>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full">
                Send Message
              </button>
            </div>

            {/* Hiring Ad */}
            <div className="p-4 border rounded-lg shadow-sm text-center">
              <h2 className="text-lg font-semibold">We Are Hiring</h2>
              <p className="mt-2 text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <button className="mt-4 bg-primary-ultra text-white px-4 py-2 rounded-lg text-sm">
                Know More
              </button>
            </div>
          </div>
        </aside>
      </div>
      <NewsletterSection />
    </div>
  );
};

export default CompanyPage;

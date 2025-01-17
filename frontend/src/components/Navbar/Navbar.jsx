import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});

  const menuItems = [
    {
      label: "Find a Job",
      dropdown: [
        {
          title: "Popular categories",
          items: [
            { label: "IT jobs", link: "/jobs/it" },
            { label: "Sales jobs", link: "/jobs/sales" },
            { label: "Marketing jobs", link: "/jobs/marketing" },
            { label: "Data Science jobs", link: "/jobs/data-science" },
            { label: "HR jobs", link: "/jobs/hr" },
            { label: "Engineering jobs", link: "/jobs/engineering" },
          ],
        },
        {
          title: "Jobs in demand",
          items: [
            { label: "Fresher jobs", link: "/jobs/fresher" },
            { label: "MNC jobs", link: "/jobs/mnc" },
            { label: "Remote jobs", link: "/jobs/remote" },
            { label: "Work from home jobs", link: "/jobs/work-from-home" },
            { label: "Walk-in jobs", link: "/jobs/walk-in" },
            { label: "Part-time jobs", link: "/jobs/part-time" },
          ],
        },
      ],
    },
    {
      label: "Recruiters",
      dropdown: [
        {
          title: "Explore",
          items: [
            { label: "Top Recruiters", link: "/recruiters/top" },
            { label: "Recruiter Login", link: "/recruiters/login" },
            { label: "Post a Job", link: "/recruiters/post-job" },
          ],
        },
      ],
    },
    {
      label: "Candidates",
      dropdown: [
        {
          title: "Explore",
          items: [
            { label: "Create Resume", link: "/candidates/resume" },
            { label: "Job Alerts", link: "/candidates/job-alerts" },
            { label: "My Applications", link: "/candidates/applications" },
          ],
        },
      ],
    },
    {
      label: "Pages",
      dropdown: [
        {
          title: "",
          items: [
            { label: "About Us", link: "/about" },
            { label: "FAQ", link: "/faq" },
            { label: "Privacy Policy", link: "/privacy-policy" },
          ],
        },
      ],
    },
    { label: "Blog", link: "/blog" },
    { label: "Contact", link: "/contact" },
  ];

  const toggleMobileDropdown = (index) => {
    setMobileDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <nav className="relative bg-transparent w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 ">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-light">JobSquad</div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-8 mx-auto">
          {menuItems.map((item, index) => (
            <li key={index} className="relative group">
              <div className="flex items-center cursor-pointer">
                {item.link ? (
                  <Link
                    to={item.link}
                    className="text-lg font-medium hover:text-blue-ultra"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-lg font-medium hover:text-blue-ultra">
                    {item.label}
                  </span>
                )}
                {item.dropdown && <ChevronDown className="ml-2 w-4 h-4" />}
              </div>
              {item.dropdown && (
                <motion.div
                  className="absolute top-5 left-0 bg-base-white shadow-lg rounded-lg py-4 invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="grid grid-cols-2 gap-8 px-6 py-4 min-w-[400px] max-w-screen-lg">
                    {item.dropdown.map((section, sectionIdx) => (
                      <div key={sectionIdx}>
                        {section.title && (
                          <h3 className="font-bold text-blue-dark mb-2">
                            {section.title}
                          </h3>
                        )}
                        <ul>
                          {section.items.map((dropdownItem, idx) => (
                            <li key={idx}>
                              <Link
                                to={dropdownItem.link}
                                className="text-gray-700 hover:text-white hover:bg-grey-muted rounded-md px-2 py-1 block"
                              >
                                {dropdownItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/register">
            <Button
              variant="outline"
              className="text-blue-light border-blue-light"
            >
              Register
            </Button>
          </Link>
          <Link to="/signin">
            <Button className="bg-blue-light text-white hover:bg-blue-dark">
              Sign in
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-blue-light"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="absolute top-0 h-screen left-0 w-full bg-base-white shadow-lg z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex flex-col space-y-4 px-6 py-4 z-20">
            <div className="lg:hidden flex justify-between items-center">

            <div className="text-2xl font-bold text-blue-light">JobSquad</div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-2xl text-blue-light"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
            {menuItems.map((item, index) => (
              <div key={index}>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleMobileDropdown(index)}
                >
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="text-lg font-medium hover:text-blue-ultra"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-lg font-medium">{item.label}</span>
                  )}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </div>
                {item.dropdown && mobileDropdownOpen[index] && (
                  <ul className="pl-4 mt-2">
                    {item.dropdown.map((section, sectionIdx) =>
                      section.items.map((nestedItem, nestedIdx) => (
                        <li key={nestedIdx}>
                          <Link
                            to={nestedItem.link}
                            className="text-gray-700 hover:text-blue-ultra hover:bg-grey-muted rounded-md px-2 py-1 block"
                          >
                            {nestedItem.label}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

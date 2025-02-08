import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom"; // Use 'useNavigate' for navigation
import { Menu, X, ChevronDown, User, Settings, BookOpen, Building, Calendar, Mail, Bell, Heart, Bookmark } from "lucide-react";
import Cookies from 'js-cookie'; // Assuming token is stored in cookies
import { useFetchUserQuery, useLogoutMutation } from "@/services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "@/features/auth/authSlice";
import { jobData } from "@/pages/Jobs/jobs-data";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/handlelogout";
// import { useAuthHandler } from "./AuthHandler";
const Navbar = () => {
  // useAuthHandler(); // Trigger auth handling on component mount
  // const user = useSelector((state) => state.auth.user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = useLogout();
  const { isAuthenticated,role ,user} = useAuth();
  
  console.log("isAuthenticated",isAuthenticated)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const [logout] = useLogoutMutation();

  const { data: userr, error } = useFetchUserQuery();
  console.log(user)
  const extractUniqueIndustries = () => {
    return Array.from(new Set(jobData.map((job) => job.industry))).slice(0, 6);
  };

  const extractUniqueLocations = () => {
    return Array.from(new Set(jobData.map((job) => job.location))).slice(0, 6);
  };

  const handleSearchRedirect = (type, value) => {
    const params = new URLSearchParams();
    params.set(type, value);
    navigate(`/jobs?${params.toString()}`);
  };

  const getDisplayName = () => {
    if (!user) return "Account"; // Fallback if user is not logged in
  
    console.log("User Role:", user.role); // Debugging purpose
  
    switch (user.role) {
      case "applicant":
        return user.firstName || "Applicant";
      case "company":
        return user.companyName || "Company";
      case "admin":
        return user.adminName || "Admin"; // If admin has a name field
      default:
        return "Account"; // Fallback for undefined roles
    }
  };
  

  const getRoleBasedMenuItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'applicant':
        return [
          { label: "My Profile", link: "/dashboard/applicant/profile", icon: User },
          { label: "My Resume", link: "/dashboard/applicant/resume", icon: BookOpen },
          { label: "Applied Jobs", link: "/dashboard/applicant/applied-jobs", icon: Building },
          { label: "Saved Jobs", link: "/dashboard/applicant/saved-jobs", icon: Bookmark },
          { label: "Job Alerts", link: "/dashboard/applicant/job-alerts", icon: Bell },
          { label: "Meetings", link: "/dashboard/applicant/meetings", icon: Calendar },
          { label: "Messages", link: "/dashboard/applicant/messages", icon: Mail },
          { label: "Following Companies", link: "/dashboard/applicant/following-companies", icon: Heart },
          { label: "Settings", link: "/dashboard/applicant/settings", icon: Settings }
        ];
      case 'company':
        return [
          { label: "Company Profile", link: "/dashboard/company/profile", icon: Building },
          { label: "Post a Job", link: "/dashboard/company/post-job", icon: BookOpen },
          { label: "Manage Jobs", link: "/dashboard/company/manage-jobs", icon: Settings },
          { label: "All Applicants", link: "/dashboard/company/applicants", icon: User },
          { label: "Shortlisted Resumes", link: "/dashboard/company/shortlisted-resume", icon: Heart },
          { label: "Messages", link: "/dashboard/company/messages", icon: Mail },
          { label: "Meetings", link: "/dashboard/company/meetings", icon: Calendar },
          { label: "Resume Alerts", link: "/dashboard/company/resume-alerts", icon: Bell },
          { label: "Company Settings", link: "/dashboard/company/settings", icon: Settings }
        ];
      case 'admin':
        return [
          { label: "Dashboard", link: "/dashboard/admin", icon: Building },
          { label: "Manage Applicants", link: "/dashboard/admin/users-applicants", icon: User },
          { label: "Manage Companies", link: "/dashboard/admin/users-companies", icon: Building },
          { label: "Manage Unauthorized", link: "/dashboard/admin/users-unauthorized", icon: Settings },
          { label: "View Articles", link: "/dashboard/admin/articles", icon: BookOpen },
          { label: "Post Article", link: "/dashboard/admin/post-article", icon: Mail },
          { label: "Post Requirement", link: "/dashboard/admin/post-requirement", icon: Bell },
          { label: "Settings", link: "/dashboard/admin/settings", icon: Settings }
        ];
      default:
        return [];
    }
  };


  const menuItems = [
    { label: "Home", link: "/" },
    {
      label: "Find a Job",
      dropdown: [
        {
          title: "Popular Categories",
          items: extractUniqueIndustries().map((industry) => ({
            label: industry,
            action: () => handleSearchRedirect("industries", industry),
          })),
        },
        {
          title: "By Location",
          items: extractUniqueLocations().map((location) => ({
            label: location,
            action: () => handleSearchRedirect("location", location),
          })),
        },
      ],
    },
    {
      label: "Recruiters",
      dropdown: [
        {
          title: "Explore",
          items: [
            { label: "Top Companies", link: "/companies" },
            { label: "Post a Job", link: "/recruiters/post-job" },
          ],
        },
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
      label: "Applicants",
      dropdown: [
        {
          title: "Explore",
          items: [
            { label: "Create Resume", link: "/applicants/resume" },
            { label: "Job Alerts", link: "/applicants/job-alerts" },
            { label: "My Applications", link: "/applicants/applications" },
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
    { label: "Blog", link: "/blogs" },
    { label: "Contact", link: "/contact" },
  ];

  const toggleMobileDropdown = (index) => {
    setMobileDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  // Handle login state based on token
  // const { isAuthenticated} = useSelector((state) => state.auth);
  // console.log(isAuthenticated)
  // const handleLogout = async () => {
  //   try {
  //     await logoutt() // Ensure mutation completes successfully
  //     dispatch(logout());
  //     Cookies.remove('user')
  //     Cookies.remove('token')
  //      // Update Redux state
  //     navigate("/signin"); // Redirect to signin page

  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };
  

  return (
    <nav className={`relative ${window.location.pathname !== "/" ? "bg-transparent" : "bg-primary-ultra/30"} w-full z-10`}>
      <div className="container flex justify-between items-center py-4 w-full max-w-6xl mx-auto px-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary-light">
          <Link to="/">JobSquad</Link>
        </div>
  
        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-8 mx-auto">
          {menuItems.map((item, index) => (
            <li key={index} className="relative group">
              <div className="flex items-center cursor-pointer">
                {item.link ? (
                  <Link to={item.link} className="text-lg font-medium hover:text-primary-ultra">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-lg font-medium hover:text-primary-ultra">{item.label}</span>
                )}
                {item.dropdown && <ChevronDown className="ml-2 w-4 h-4" />}
              </div>
              {item.dropdown && (
                <motion.div
                  className="absolute top-6 left-0 bg-base-white shadow-lg rounded-lg py-4 invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="grid grid-cols-2 gap-8 px-6 py-4 min-w-[400px] max-w-screen-lg">
                    {item.dropdown.map((section, sectionIdx) => (
                      <div key={sectionIdx}>
                        {section.title && (
                          <h3 className="font-bold text-primary-dark mb-2">{section.title}</h3>
                        )}
                        <ul>
                          {section.items.map((dropdownItem, idx) => (
                            <li key={idx}>
                              {dropdownItem.link ? (
                                <Link 
                                  to={dropdownItem.link} 
                                  className="text-sm hover:text-white hover:bg-grey-muted rounded-md px-2 py-1 block"
                                >
                                  {dropdownItem.label}
                                </Link>
                              ) : (
                                <span 
                                  onClick={dropdownItem.action} 
                                  className="text-sm hover:text-white hover:bg-grey-muted rounded-md px-2 py-1 block cursor-pointer"
                                >
                                  {dropdownItem.label}
                                </span>
                              )}
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
  
        {/* User Account Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative group">
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{getDisplayName()}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              <motion.div
                className="absolute right-0 top-full mt-2 w-64 bg-base-white rounded-lg shadow-lg py-2 invisible group-hover:visible"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {getRoleBasedMenuItems().map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={index}
                      to={item.link}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-gray-100 text-red-600"
                >
                  <X className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </motion.div>
            </div>
          ) : (
            <>
              <Link to="/register">
                <Button variant="outline" className="hover:bg-primary-ultra hover:text-white">
                  Register
                </Button>
              </Link>
              <Link to="/signin">
                <Button className="bg-primary-light text-white hover:bg-primary-dark">
                  Sign in
                </Button>
              </Link>
            </>
          )}
        </div>
  
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-primary-light"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
  
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-base-white z-50 lg:hidden"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <Link to="/" className="text-2xl font-bold text-primary-light">
                JobSquad
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-primary-light"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {isAuthenticated && (
              <div className="p-4 border-b">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-6 h-6" />
                  <span className="font-medium">{getDisplayName()}</span>
                </div>
                {getRoleBasedMenuItems().map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={index}
                      to={item.link}
                      className="flex items-center space-x-2 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 py-2 text-red-600"
                >
                  <X className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
  
            {/* Mobile menu items */}
            <div className="p-4">
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 mb-4">
                  <Link to="/register">
                    <Button variant="outline" className="w-full">
                      Register
                    </Button>
                  </Link>
                  <Link to="/signin">
                    <Button className="w-full text-white">
                      Sign in
                    </Button>
                  </Link>
                </div>
              )}
              
              {/* Regular menu items */}
              {menuItems.map((item, index) => (
                <div key={index} className="py-2">
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className="text-lg w-full text-left flex items-center justify-between"
                      onClick={() => toggleMobileDropdown(index)}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  )}
                  {item.dropdown && mobileDropdownOpen[index] && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdown.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                          {section.items.map((dropdownItem, itemIndex) => (
                            <Link
                              key={itemIndex}
                              to={dropdownItem.link || '#'}
                              className="block py-1 text-gray-600"
                              onClick={() => {
                                if (dropdownItem.action) dropdownItem.action();
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

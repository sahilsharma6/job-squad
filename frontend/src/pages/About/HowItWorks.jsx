import React from "react";
import {
  ClipboardList,
  HelpCircle,
  GraduationCap,
  Briefcase,
} from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="bg-gray-50 py-16 px-8">
      <h3 className="text-center text-blue-500 text-lg font-semibold mb-2">
        Our Work Process
      </h3>
      <h2 className="text-4xl font-bold text-center mb-12">How it Works?</h2>
      <div className="relative   max-w-5xl mx-auto">
        <div className="hidden md:block absolute  top-[20%] left-32 right-0 w-[75%] h-[2px] bg-blue-500"></div>

        <div className="flex flex-col md:flex-row items-center md:justify-between relative gap-10">
          <div className="flex flex-col items-center text-center md:w-1/4 relative">
            <div className="bg-blue-100 p-4 rounded-full mb-4 relative z-10">
              <ClipboardList className="text-blue-500 w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold">Register Your Account</h3>
            <p className="text-gray-600 text-sm mt-2">
              You need to create an account to find the best preferred job.
            </p>
          </div>

          <div className="flex flex-col items-center text-center md:w-1/4 relative">
            <div className="bg-blue-100 p-4 rounded-full mb-4 relative z-10">
              <HelpCircle className="text-blue-500 w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold">We Are Here to Help</h3>
            <p className="text-gray-600 text-sm mt-2">
              Get support and guidance to find your perfect job.
            </p>
          </div>

          <div className="flex flex-col items-center text-center md:w-1/4 relative">
            <div className="bg-blue-100 p-4 rounded-full mb-4 relative z-10">
              <GraduationCap className="text-blue-500 w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold">Complete Your Profile</h3>
            <p className="text-gray-600 text-sm mt-2">
              Add your details to get tailored job recommendations.
            </p>
          </div>

          <div className="flex flex-col items-center text-center md:w-1/4 relative">
            <div className="bg-blue-100 p-4 rounded-full mb-4 relative z-10">
              <Briefcase className="text-blue-500 w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold">Apply for Job</h3>
            <p className="text-gray-600 text-sm mt-2">
              Browse jobs and apply to the one that fits you best.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

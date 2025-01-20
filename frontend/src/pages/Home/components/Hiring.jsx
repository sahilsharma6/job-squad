import React from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Briefcase, Users } from "lucide-react"; 

const HiringBanner = () => {
  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 border-2 border-primary-500/20 hover:border-primary-500 transition-colors duration-300">
        {/* Left Section: Text */}
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl  bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent font-ubuntu font-normal">
            WE ARE <span className="text-primary-500">HIRING</span>
          </h3>
          <p className="text-gray-600 text-sm sm:text-base max-w-sm">
            Let's Work Together & Explore Opportunities
          </p>
        </div>

        {/* Right Section: Button and Images */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Apply Now Button */}
          <Button 
            className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base px-6 py-2 h-auto"
          >
            Apply Now
          </Button>

          {/* Illustration Images - Using placeholder images */}
          {/* <div className="hidden md:flex gap-4">
            <img
              src="/api/placeholder/80/80"
              alt="Left illustration"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg"
            />
            <img
              src="/api/placeholder/80/80"
              alt="Right illustration"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg"
            />
          </div> */}
          <div className="hidden md:flex gap-4">
            <Briefcase className="w-16 h-16 sm:w-20 sm:h-20 text-primary-500" />
            <Users className="w-16 h-16 sm:w-20 sm:h-20 text-primary-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringBanner;
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react"; 
import HeroImg1 from "../../assets/Hero1.jpg";

const Hero = () => {
  return (
    <div className="text-gray-800 bg-blue-50 p-4">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-16 py-20 gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            The <span className="text-blue-600">Easiest Way</span> to Get Your New Job
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Each month, more than 3 million job seekers turn to our website in
            their search for work, making over 140,000 applications every single day.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row items-center bg-white shadow-md rounded-lg p-4 gap-4">
            <select
              className="w-full lg:w-1/4 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none"
            >
              <option value="">Industry</option>
              <option value="it">IT</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="data-science">Data Science</option>
              <option value="hr">HR</option>
              <option value="engineering">Engineering</option>
            </select>

            <select 
              placeholder = "Select Location"
              className="w-full lg:w-1/4 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none"
            >
              <option value="">Location</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="san-francisco">San Francisco</option>
              <option value="chicago">Chicago</option>
              <option value="austin">Austin</option>
            </select>

            <input
              type="text"
              placeholder="Your keyword..."
              className="w-full lg:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 flex items-center gap-2">
              <Search size={20} /> 
              Search
            </Button>
          </div>

          {/* Popular Searches */}
          <div className="text-gray-600">
            <strong>Popular Searches:</strong>{" "}
            <span className="text-blue-600 underline cursor-pointer">
              Designer, Web, iOS, Developer, PHP, Senior, Engineer
            </span>
          </div>
        </div>

 
        <div className="lg:w-1/2 flex flex-col lg:flex-row gap-6 items-center justify-center relative">
          <div className="w-2/3 bg-white shadow-lg rounded-lg overflow-hidden z-0">
            <img
              src={HeroImg1}
              alt="Teamwork"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-1/3 bg-white shadow-lg rounded-lg overflow-hidden absolute bottom-0 right-0 z-1 transform translate-x-6 translate-y-6">
            <img
              src={HeroImg1}
              alt="Collaboration"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Blinds } from "lucide-react";
import HeroImg1 from "../../assets/hero1.jpg";
import { useState } from "react";

const Hero = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    console.log({ selectedIndustry, selectedLocation, keyword });
  };

  return (
    <div className="bg-blue-100 w-full">
      <div className="container flex flex-col-reverse lg:flex-row items-center justify-between  py-20 gap-12 w-full max-w-6xl mx-auto px-4">
        {/* Left Content */}
        <div className="lg:w-[60%] space-y-12">
          <div  className="lg:w-[75%]" >
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            The <span className="text-blue-light">Easiest Way</span> to Get Your
            New Job
          </h1>
          <p className="text-md text-grey-muted leading-relaxed">
            Each month, more than 3 million job seekers turn to our website in
            their search for work, making over 140,000 applications every single
            day.
          </p>
          </div>
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row w-full  lg:items-center bg-white shadow-md rounded-lg p-4 gap-4">
            <Select onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full lg:max-w-[140px] px-4 py-3 bg-white text-gray-700 focus:outline-none border-none">
                {selectedIndustry || "Industry"}
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg">
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full lg:max-w-[140px] px-4 py-3 bg-white text-gray-700 border-none focus:outline-none">
                {selectedLocation || "Location"}
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg">
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
                <SelectItem value="Austin">Austin</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-grey-muted">
                <Blinds size={18} />
              </span>
              <input
                type="text"
                placeholder="Your keyword.."
                className="w-full px-10 py-3 border text-sm border-grey-muted rounded-lg focus:outline-none border-none"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <Button
              className="bg-blue-dark text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-black flex items-center gap-2"
              onClick={handleSearch}
            >
              <Search size={20} />
              Search
            </Button>
          </div>

          {/* Popular Searches */}
          <div >
            <strong>Popular Searches:</strong>{" "}
            <span className="text-blue-light underline cursor-pointer">
              Designer, Web, iOS, Developer, PHP, Senior, Engineer
            </span>
          </div>
        </div>

        {/* Images */}
        <div className="lg:w-[35%] flex flex-col lg:flex-row gap-4 items-center justify-center relative">
          <div
            className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden z-0 border-l-4 border-b-4 border-blue-light"
            style={{
              borderLeftWidth: "6px",
              borderBottomWidth: "6px",
              borderRadius: "50px 40px 8px 0",
            }}
          >
            <img
              src={HeroImg1}
              alt="Teamwork"
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
          <div
            className="hidden lg:block w-full max-w-[200px] bg-white shadow-lg rounded-lg overflow-hidden absolute -bottom-16 -right-16 z-1 transform translate-x-4 translate-y-4 border-l-4 border-b-4 border-blue-light"
            style={{
              borderLeftWidth: "6px",
              borderBottomWidth: "6px",
              borderRadius: "50px 40px 40px 0",
            }}
          >
            <img
              src={HeroImg1}
              alt="Collaboration"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

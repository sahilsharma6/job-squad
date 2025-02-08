import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Blinds, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useJobs } from "@/hooks/useJobs";
import { useNavigate, useLocation } from "react-router";

const SearchBarApp = () => {
    const router = useNavigate();
    const location = useLocation();
    const { filters, handleFilterChange } = useJobs();

    const [selectedIndustry, setSelectedIndustry] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState("All");
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setSelectedIndustry(queryParams.get("jobSector") || "All");
        setSelectedLocation(queryParams.get("jobLocation") || "All");
        setKeyword(queryParams.get("jobTitle") || "");
    }, [location.search]);

    const handleSearch = () => {
        const newFilters = {};
        if (selectedIndustry !== "All") newFilters.jobSector = selectedIndustry;
        if (selectedLocation !== "All") newFilters.jobLocation = selectedLocation;
        if (keyword) newFilters.jobTitle = keyword;

        handleFilterChange(newFilters);

        const params = new URLSearchParams();
        if (selectedIndustry !== "All") params.set("jobSector", selectedIndustry);
        if (selectedLocation !== "All") params.set("jobLocation", selectedLocation);
        if (keyword) params.set("jobTitle", keyword);

        router(`/jobs?${params.toString()}`);
    };

    return (
        <div className="flex flex-col lg:flex-row w-full lg:items-center bg-white shadow-md rounded-lg p-4 gap-4">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
  <SelectTrigger className="w-full lg:max-w-[140px] px-4 py-3 bg-white text-gray-700 focus:outline-none border-none">
    <SelectValue placeholder="Industry">{selectedIndustry}</SelectValue>
  </SelectTrigger>
  <SelectContent className="bg-white shadow-lg">
    <SelectItem value="All">All</SelectItem>
    {filters.jobSector && filters.jobSector.split(",").length > 0 ? (
      filters.jobSector.split(",").map((industry) => (
        <SelectItem key={industry} value={industry}>
          {industry}
        </SelectItem>
      ))
    ) : (
      <SelectItem disabled value="no-options">
        No options available
      </SelectItem>
    )}
  </SelectContent>
</Select>

<Select value={selectedLocation} onValueChange={setSelectedLocation}>
  <SelectTrigger className="w-full lg:max-w-[140px] px-4 py-3 bg-white text-gray-700 border-none focus:outline-none">
    <SelectValue placeholder="Location">{selectedLocation}</SelectValue>
  </SelectTrigger>
  <SelectContent className="bg-white shadow-lg">
    <SelectItem value="All">All</SelectItem>
    {filters.jobLocation && filters.jobLocation.split(",").length > 0 ? (
      filters.jobLocation.split(",").map((location) => (
        <SelectItem key={location} value={location}>
          {location}
        </SelectItem>
      ))
    ) : (
      <SelectItem disabled value="no-options">
        No options available
      </SelectItem>
    )}
  </SelectContent>
</Select>



            <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-grey-muted">
                    <Blinds size={18} />
                </span>
                <input
                    type="text"
                    placeholder="Your keyword..."
                    className="w-full px-10 py-3 text-sm border-grey-muted rounded-lg focus:outline-none"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>

            <Button
                className="bg-primary-dark text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-black flex items-center gap-2"
                onClick={handleSearch}
            >
                <Search size={20} />
                Search
            </Button>
        </div>
    );
};

export default SearchBarApp;

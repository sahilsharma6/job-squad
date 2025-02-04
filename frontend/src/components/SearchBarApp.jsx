import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Blinds, Search } from 'lucide-react';
import { Button } from './ui/button';
import { jobData } from '@/pages/Jobs/jobs-data';
import { useNavigate, useParams } from 'react-router';

const SearchBarApp = () => {
    const router = useNavigate();
    const params = new URLSearchParams(window.location.search);
    
    const [selectedIndustry, setSelectedIndustry] = useState(params.get("industries") || "All");
    const [selectedLocation, setSelectedLocation] = useState(params.get("location") || "All");
    const [keyword, setKeyword] = useState(params.get("keyword") || "");

    useEffect(() => {
        setSelectedIndustry(params.get("industries") || "All");
        setSelectedLocation(params.get("location") || "All");
        setKeyword(params.get("keyword") || "");
    }, [window.location.search]);

    const extractUniqueIndustries = () => {
        const industries = Array.from(new Set(jobData.map(job => job.industry)));
        return ["All", ...industries.slice(0, 6)];
    };

    const extractUniqueLocations = () => {
        const locations = Array.from(new Set(jobData.map(job => job.location)));
        return ["All", ...locations];
    };

    const handleSearch = () => {
        const newParams = new URLSearchParams();
        if (selectedIndustry !== "All") newParams.set("industries", selectedIndustry);
        if (selectedLocation !== "All") newParams.set("location", selectedLocation);
        if (keyword) newParams.set("keyword", keyword);

        router(`/jobs?${newParams.toString()}`);
    };

    return (
        <div className="flex flex-col lg:flex-row w-full lg:items-center bg-white shadow-md rounded-lg p-4 gap-4">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-full lg:max-w-[140px] px-4 py-3 bg-white text-gray-700 focus:outline-none border-none">
                    <SelectValue placeholder="Industry">{selectedIndustry}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white shadow-lg">
                    {extractUniqueIndustries().map((industry) => (
                        <SelectItem key={industry} value={industry}>
                            {industry}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full lg:max-w-[140px] px-4 py-3 bg-white text-gray-700 border-none focus:outline-none">
                    <SelectValue placeholder="Location">{selectedLocation}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white shadow-lg">
                    {extractUniqueLocations().map((location) => (
                        <SelectItem key={location} value={location}>
                            {location}
                        </SelectItem>
                    ))}
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
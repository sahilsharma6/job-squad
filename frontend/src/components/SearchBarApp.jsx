import React, { useState } from 'react'
import {Select,  SelectContent, SelectItem, SelectTrigger } from './ui/select'
import { Blinds, Search } from 'lucide-react'
import { Button } from './ui/button';

const SearchBarApp = () => {

    const [selectedIndustry, setSelectedIndustry] = useState("");
      const [selectedLocation, setSelectedLocation] = useState("");
      const [keyword, setKeyword] = useState("");
    
      const handleSearch = () => {
        console.log({ selectedIndustry, selectedLocation, keyword });
      };
    return (
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
                className="bg-primary-dark text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-black flex items-center gap-2"
                onClick={handleSearch}
            >
                <Search size={20} />
                Search
            </Button>
        </div>
    )
}

export default SearchBarApp
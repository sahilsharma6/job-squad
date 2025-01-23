import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Clock, LayoutGrid, LayoutList, Search } from "lucide-react";
import { jobData, industryFilters, salaryRanges } from '../jobs-data';

const JobCard = ({ job }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-primary-ultra/5 rounded-lg p-6 border hover:shadow-md transition-shadow duration-200"
    >
        <div className="flex gap-6">
            <div className="shrink-0">
                <img src={job.logo} alt={job.company} className="w-12 h-12 rounded" />
            </div>

            <div className="flex-1">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-600">{job.company}</span>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{job.timeAgo}</span>
                            </div>
                            <span className="text-gray-500">{job.type}</span>
                        </div>
                        <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-2xl">
                            {job.description}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-6">
                        <div className="flex items-center gap-2">
                            {job.tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="inline-flex items-center px-3 py-1 rounded bg-blue-50 text-blue-600 text-sm"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="text-blue-600 font-semibold">
                                ${job.salary}/{job.salaryPer}
                            </div>
                            <Button
                                variant="secondary"
                                className="bg-primary-light hover:bg-primary-ultra text-base-white"
                            >
                                Apply Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

const FilterOption = ({ name, jobs, checked, onChange, disabled }) => {
    const count = jobs[name] || 0;

    return (
        <label className={`flex items-center justify-between group cursor-pointer 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="flex items-center">
                <Checkbox
                    className="mr-3"
                    checked={checked}
                    onCheckedChange={onChange}
                    disabled={disabled}
                />
                <span className="text-gray-700">{name}</span>
            </div>
            <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                {count}
            </span>
        </label>
    );
};


const JobSection = () => {
    const [viewMode, setViewMode] = useState('list');
    const [selectedIndustries, setSelectedIndustries] = useState(new Set(['All']));
    const [selectedSalaryRanges, setSelectedSalaryRanges] = useState(new Set(['All']));
    const [itemsPerPage, setItemsPerPage] = useState('7');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');

    // Filter jobs based on all criteria
    const filteredJobs = useMemo(() => {
        let filtered = [...jobData];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Location filter
        if (location) {
            filtered = filtered.filter(job =>
                job.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        // Industry filter
        if (!selectedIndustries.has('All')) {
            filtered = filtered.filter(job =>
                Array.from(selectedIndustries).some(industry =>
                    job.company.includes(industry)
                )
            );
        }

        // Salary range filter
        if (!selectedSalaryRanges.has('All')) {
            filtered = filtered.filter(job => {
                return Array.from(selectedSalaryRanges).some(range => {
                    const [min, max] = range.replace(/[^0-9-]/g, '').split('-').map(Number);
                    return job.salary >= min && job.salary <= max;
                });
            });
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.timeAgo) - new Date(a.timeAgo);
            }
            return new Date(a.timeAgo) - new Date(b.timeAgo);
        });

        return filtered;
    }, [searchQuery, location, selectedIndustries, selectedSalaryRanges, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredJobs.length / Number(itemsPerPage));
    const startIndex = (currentPage - 1) * Number(itemsPerPage);
    const endIndex = startIndex + Number(itemsPerPage);
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const handleIndustryChange = (industry) => {
        setSelectedIndustries(prev => {
            const newSelection = new Set(prev);
            if (industry === 'All') {
                return new Set(['All']);
            }
            newSelection.delete('All');
            if (newSelection.has(industry)) {
                newSelection.delete(industry);
                if (newSelection.size === 0) {
                    return new Set(['All']);
                }
            } else {
                newSelection.add(industry);
            }
            return newSelection;
        });
        setCurrentPage(1);
    };

    const handleSalaryRangeChange = (range) => {
        setSelectedSalaryRanges(prev => {
            const newSelection = new Set(prev);
            if (range === 'All') {
                return new Set(['All']);
            }
            newSelection.delete('All');
            if (newSelection.has(range)) {
                newSelection.delete(range);
                if (newSelection.size === 0) {
                    return new Set(['All']);
                }
            } else {
                newSelection.add(range);
            }
            return newSelection;
        });
        setCurrentPage(1);
    };

    const handleReset = () => {
        setSelectedIndustries(new Set(['All']));
        setSelectedSalaryRanges(new Set(['All']));
        setSearchQuery('');
        setLocation('');
        setCurrentPage(1);
        setSortBy('newest');
    };


    // Calculate available jobs for each industry
    const getIndustryJobCounts = (jobs) => {
        const counts = {
            All: jobs.length,
            Software: jobs.filter(job =>
                ['Google', 'Microsoft', 'Apple', 'Facebook'].includes(job.company)).length,
            Finance: jobs.filter(job =>
                ['Stripe', 'PayPal'].includes(job.company)).length,
            Recruiting: jobs.filter(job =>
                ['LinkedIn', 'Indeed'].includes(job.company)).length,
            Management: jobs.filter(job =>
                job.title.toLowerCase().includes('manager') ||
                job.title.toLowerCase().includes('lead')).length,
            Advertising: jobs.filter(job =>
                ['Twitter', 'Facebook'].includes(job.company) &&
                job.title.toLowerCase().includes('marketing')).length
        };
        return counts;
    };

    // Calculate available jobs for salary ranges
    const getSalaryRangeCounts = (jobs) => {
        const counts = {
            All: jobs.length,
            '$0k - $20k': jobs.filter(job => job.salary * 2080 <= 20000).length,
            '$20k - $40k': jobs.filter(job => job.salary * 2080 > 20000 && job.salary * 2080 <= 40000).length,
            '$40k - $60k': jobs.filter(job => job.salary * 2080 > 40000 && job.salary * 2080 <= 60000).length
        };
        return counts;
    };

    const [availableIndustryJobs, setAvailableIndustryJobs] = useState({});
const [availableSalaryJobs, setAvailableSalaryJobs] = useState({});

// Update useEffect to calculate available jobs
useEffect(() => {
  const industryJobs = getIndustryJobCounts(filteredJobs);
  const salaryJobs = getSalaryRangeCounts(filteredJobs);
  
  setAvailableIndustryJobs(industryJobs);
  setAvailableSalaryJobs(salaryJobs);
}, [filteredJobs]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold">Advance Filter</h2>
                    <button
                        onClick={handleReset}
                        className="text-primary-light text-sm hover:underline"
                    >
                        Reset
                    </button>
                </div>
                <div className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length} jobs
                </div>
            </div>

            <div className="flex gap-8">
                {/* Sidebar */}
                <div className="w-72 border-r pr-4">
                    {/* Location Input */}
                    <div className="mb-8">
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Industry Section */}
                    <div className="mb-8">
                        <h3 className="font-semibold mb-4">Industry</h3>
                        <div className="space-y-3">
                            {industryFilters.map((filter) => (
                                <FilterOption
                                    key={filter.name}
                                    name={filter.name}
                                    jobs={availableIndustryJobs}
                                    checked={selectedIndustries.has(filter.name)}
                                    onChange={() => handleIndustryChange(filter.name)}
                                    disabled={filter.name !== 'All' && availableIndustryJobs[filter.name] === 0}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Salary Range Section */}
                    <div>
                        <h3 className="font-semibold mb-4">Salary Range</h3>
                        <div className="space-y-3">
                            {salaryRanges.map((range) => (
                                <FilterOption
                                    key={range.name}
                                    name={range.name}
                                    jobs={availableSalaryJobs}
                                    checked={selectedSalaryRanges.has(range.name)}
                                    onChange={() => handleSalaryRangeChange(range.name)}
                                    disabled={range.name !== 'All' && availableSalaryJobs[range.name] === 0}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Controls */}
                    <div className="flex justify-between items-center mb-6">
                        <Select
                            value={itemsPerPage}
                            onValueChange={(value) => {
                                setItemsPerPage(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Show" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">7</SelectItem>
                                <SelectItem value="14">14</SelectItem>
                                <SelectItem value="21">21</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex items-center gap-4">
                            <Select
                                value={sortBy}
                                onValueChange={setSortBy}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest Post</SelectItem>
                                    <SelectItem value="oldest">Oldest Post</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex">
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'outline'}
                                    size="icon"
                                    onClick={() => setViewMode('list')}
                                    className="rounded-r-none"
                                >
                                    <LayoutList className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                                    size="icon"
                                    onClick={() => setViewMode('grid')}
                                    className="rounded-l-none"
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Job Cards */}
                    <div className={`${viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                        : 'space-y-4'
                        }`}>
                        {currentJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? 'default' : 'outline'}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    )}

                    {/* No Results Message */}
                    {currentJobs.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No jobs found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobSection;
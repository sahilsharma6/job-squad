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
import { MapPin, Clock, LayoutGrid, LayoutList, Search, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { jobData, industryFilters, salaryRanges } from '../jobs-data';
import JobCard from './JobCard';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useSearchParams } from 'react-router';

// Utility function for parsing relative time
function parseRelativeTime(timeAgo) {
    const now = new Date();
    const match = timeAgo.match(/(\d+)\s*(\w+)\s*ago/);

    if (!match) return now;

    const [, amount, unit] = match;
    const num = parseInt(amount, 10);

    switch (unit.toLowerCase()) {
        case 'days':
            now.setDate(now.getDate() - num);
            break;
        case 'hours':
            now.setHours(now.getHours() - num);
            break;
        case 'weeks':
            now.setDate(now.getDate() - (num * 7));
            break;
        case 'months':
            now.setMonth(now.getMonth() - num);
            break;
        default:
            return now;
    }

    return now;
}

const FilterOption = ({ name, count, checked, onChange, disabled }) => {
    return (
        <label className={`flex items-center justify-between group cursor-pointer sticky
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

    const [searchParams, setSearchParams] = useSearchParams();
    const [viewMode, setViewMode] = useState('list');
    const [selectedIndustries, setSelectedIndustries] = useState(() => {
        // Retrieve industries from URL parameters
        const industriesParam = searchParams.get('industries');
        
        if (industriesParam) {
            // If industries exist in URL, parse and create a Set
            const parsedIndustries = industriesParam.split(',');
            
            // Validate against actual job data industries
            const validIndustries = new Set(
                parsedIndustries.filter(industry => 
                    industry === 'All' || 
                    jobData.some(job => job.industry === industry)
                )
            );

            // If no valid industries found, default to 'All'
            return validIndustries.size > 0 
                ? validIndustries 
                : new Set(['All']);
        }

        // Default to 'All' if no industries in URL
        return new Set(['All']);
    });
    const [selectedSalaryRanges, setSelectedSalaryRanges] = useState(() => {
        const salaryParam = searchParams.get('salary');
        return salaryParam 
            ? new Set(salaryParam.split(',')) 
            : new Set(['All']);
    });
    const [itemsPerPage, setItemsPerPage] = useState(
        searchParams.get('itemsPerPage') || '7'
    );
    const [sortBy, setSortBy] = useState(
        searchParams.get('sortBy') || 'newest'
    );
    const [currentPage, setCurrentPage] = useState(
        parseInt(searchParams.get('page') || '1', 10)
    );
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get('query') || ''
    );
    const [location, setLocation] = useState(
        searchParams.get('location') || ''
    );
    const [showMoreIndustries, setShowMoreIndustries] = useState(false);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);


    useEffect(() => {
        const params = new URLSearchParams();

        // Add non-default parameters
        if (selectedIndustries.size > 0 && !selectedIndustries.has('All')) {
            params.set('industries', Array.from(selectedIndustries).join(','));
        }
        if (selectedSalaryRanges.size > 0 && !selectedSalaryRanges.has('All')) {
            params.set('salary', Array.from(selectedSalaryRanges).join(','));
        }
        if (itemsPerPage !== '7') {
            params.set('itemsPerPage', itemsPerPage);
        }
        if (sortBy !== 'newest') {
            params.set('sortBy', sortBy);
        }
        if (currentPage !== 1) {
            params.set('page', currentPage.toString());
        }
        if (searchQuery) {
            params.set('query', searchQuery);
        }
        if (location) {
            params.set('location', location);
        }

        // Update URL without page reload
        setSearchParams(params, { replace: true });
    }, [
        selectedIndustries, 
        selectedSalaryRanges, 
        itemsPerPage, 
        sortBy, 
        currentPage, 
        searchQuery, 
        location
    ]);
    

    // Dynamically extract unique industries from job data
    const extractUniqueIndustries = () => {
        const industries = new Set(jobData.map(job => job.industry));
        return ['All', ...Array.from(industries)];
    };

    // Calculate industry job counts
    const calculateIndustryJobCounts = (industries) => {
        const counts = {
            'All': jobData.length
        };

        industries.forEach(industry => {
            if (industry !== 'All') {
                counts[industry] = jobData.filter(job => job.industry === industry).length;
            }
        });

        return counts;
    };

    const dynamicIndustries = extractUniqueIndustries();
    const industryJobCounts = calculateIndustryJobCounts(dynamicIndustries);


    // useEffect(() => {
    //     console.log('Current Search Params:', Object.fromEntries(searchParams));
    //     console.log('Industries from Params:', searchParams.get('industries'));
    // }, [searchParams]);

    useEffect(() => {
        const industriesParam = searchParams.get('industries');
        
        if (industriesParam) {
            const parsedIndustries = industriesParam.split(',');
            const validIndustries = new Set(
                parsedIndustries.filter(industry => 
                    industry === 'All' || 
                    jobData.some(job => job.industry === industry)
                )
            );
    
            setSelectedIndustries(validIndustries.size > 0 ? validIndustries : new Set(['All']));
        } else {
            setSelectedIndustries(new Set(['All']));
        }
    }, [searchParams]);


    // Updated filtering and sorting logic
    const filteredJobs = useMemo(() => {
        console.log('Filtering Jobs - Start');
        // Start with a copy of all job data
        let filtered = [...jobData];
    
        // Apply search filter with multiple fields
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            filtered = filtered.filter(job => 
                job.title.toLowerCase().includes(searchLower) ||
                job.company.toLowerCase().includes(searchLower) ||
                job.description.toLowerCase().includes(searchLower)
            );
        }
    
        // Apply location filter with flexible matching
        if (location) {
            const locationLower = location.toLowerCase();
            filtered = filtered.filter(job => 
                job.location.toLowerCase().includes(locationLower)
            );
        }
    
        // Apply industry filter with dynamic selection
        if (!selectedIndustries.has('All')) {
            filtered = filtered.filter(job => {
                const isMatch = Array.from(selectedIndustries).includes(job.industry);
                console.log(`Job ${job.title} - Industry ${job.industry} - Match: ${isMatch}`);
                return isMatch;
            });
        }

        console.log('Filtered Jobs Count:', filtered.length);
    
        // Enhanced salary range filtering with more precise calculation
        if (!selectedSalaryRanges.has('All')) {
            filtered = filtered.filter(job => {
                // Robust salary parsing
                const salaryClean = job.salary.replace(/[^0-9-]/g, '');
                const [minStr, maxStr] = salaryClean.split('-').map(Number);
                
                const min = minStr || 0;
                const max = maxStr || Infinity;
    
                // More explicit salary range matching
                return Array.from(selectedSalaryRanges).some(range => {
                    switch (range) {
                        case '$0k - $20k': 
                            return max <= 20000;
                        case '$20k - $40k': 
                            return min >= 20000 && max <= 40000;
                        case '$40k - $60k': 
                            return min >= 40000 && max <= 60000;
                        default: 
                            return false;
                    }
                });
            });
        }
    
        // Advanced sorting with error handling
        return filtered.sort((a, b) => {
            try {
                const dateA = parseRelativeTime(a.timeAgo);
                const dateB = parseRelativeTime(b.timeAgo);
    
                return sortBy === 'newest' 
                    ? dateB.getTime() - dateA.getTime()
                    : dateA.getTime() - dateB.getTime();
            } catch (error) {
                console.warn('Sorting error:', error);
                return 0;
            }
        });
    }, [
        searchQuery, 
        location, 
        selectedIndustries, 
        selectedSalaryRanges, 
        sortBy
    ]);

    // Pagination
    const totalPages = Math.ceil(filteredJobs.length / Number(itemsPerPage));
    const startIndex = (currentPage - 1) * Number(itemsPerPage);
    const endIndex = startIndex + Number(itemsPerPage);
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    // Industry and salary range change handlers
    const handleIndustryChange = (industry) => {
        setSelectedIndustries(prev => {
            const newSelection = new Set(prev);
            
            if (industry === 'All') {
                // Clear all selections and set to 'All'
                const params = new URLSearchParams(searchParams);
                params.delete('industries');
                setSearchParams(params);
                return new Set(['All']);
            }

            newSelection.delete('All');
            
            if (newSelection.has(industry)) {
                // Remove industry if already selected
                newSelection.delete(industry);
                
                if (newSelection.size === 0) {
                    // If no industries left, reset to 'All'
                    const params = new URLSearchParams(searchParams);
                    params.delete('industries');
                    setSearchParams(params);
                    return new Set(['All']);
                }
            } else {
                // Add new industry
                newSelection.add(industry);
            }

            // Update URL parameters with selected industries
            const params = new URLSearchParams(searchParams);
            params.set('industries', Array.from(newSelection).join(','));
            setSearchParams(params);

            return newSelection;
        });

        // Reset to first page when changing filters
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
            'All': jobs.length,
            '$0k - $20k': jobs.filter(job => {
                const [minStr, maxStr] = job.salary.replace(/[^0-9-]/g, '').split('-').map(Number);
                const max = maxStr || Infinity;
                return max <= 20;
            }).length,
            '$20k - $40k': jobs.filter(job => {
                const [minStr, maxStr] = job.salary.replace(/[^0-9-]/g, '').split('-').map(Number);
                const min = minStr || 0;
                const max = maxStr || Infinity;
                return min >= 20 && max <= 40;
            }).length,
            '$40k - $60k': jobs.filter(job => {
                const [minStr, maxStr] = job.salary.replace(/[^0-9-]/g, '').split('-').map(Number);
                const min = minStr || 0;
                const max = maxStr || Infinity;
                return min >= 40 && max <= 60;
            }).length
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

    // Reset handler
    const resetFilters = () => {
        setSelectedIndustries(new Set(['All']));
        setSelectedSalaryRanges(new Set(['All']));
        setSearchQuery('');
        setLocation('');
        setCurrentPage(1);
        setSortBy('newest');
        setMobileFilterOpen(false);
        setSearchParams({});
    };

    // Render industries with optional "Show More" functionality
    const renderIndustries = () => {
        const displayCount = showMoreIndustries ? dynamicIndustries.length : 5;

        return dynamicIndustries.slice(0, displayCount).map((industry) => (
            <FilterOption
                key={industry}
                name={industry}
                count={industryJobCounts[industry]}
                checked={selectedIndustries.has(industry)}
                onChange={() => handleIndustryChange(industry)}
                disabled={industryJobCounts[industry] === 0}
            />
        ));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-8">
            {/* Mobile Filter Button */}
            <div className="sm:hidden flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Job Listings</h2>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setMobileFilterOpen(true)}
                >
                    <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
            </div>

            {/* Mobile Filter Sheet */}
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                <SheetContent className="w-screen max-w-full">
                    <SheetHeader>
                        <SheetTitle className="flex justify-between items-center">
                            Filters
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={resetFilters}
                                className="text-primary-light"
                            >
                                Reset
                            </Button>
                        </SheetTitle>
                    </SheetHeader>
                    
                    <div className="space-y-6 mt-4">
                        {/* Mobile Location Input */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search location"
                                    value={location}
                                    onChange={(e) => {
                                        setLocation(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Mobile Industry Filters */}
                        <div>
                            <h3 className="text-sm font-semibold mb-3">Industry</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {dynamicIndustries.map((industry) => (
                                    <div key={industry} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`mobile-industry-${industry}`}
                                            checked={selectedIndustries.has(industry)}
                                            onCheckedChange={() => handleIndustryChange(industry)}
                                            disabled={industryJobCounts[industry] === 0}
                                        />
                                        <label 
                                            htmlFor={`mobile-industry-${industry}`}
                                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {industry} ({industryJobCounts[industry]})
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Salary Range Filters */}
                        <div>
                            <h3 className="text-sm font-semibold mb-3">Salary Range</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {salaryRanges.map((range) => (
                                    <div key={range.name} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`mobile-salary-${range.name}`}
                                            checked={selectedSalaryRanges.has(range.name)}
                                            onCheckedChange={() => handleSalaryRangeChange(range.name)}
                                            disabled={range.name !== 'All' && availableSalaryJobs[range.name] === 0}
                                        />
                                        <label 
                                            htmlFor={`mobile-salary-${range.name}`}
                                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {range.name} ({availableSalaryJobs[range.name]})
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button 
                            onClick={() => setMobileFilterOpen(false)} 
                            className="w-full mt-4"
                        >
                            Apply Filters
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Desktop and Mobile Shared Content */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                {/* Desktop Sidebar - Hidden on Mobile */}
                <div className="hidden sm:block w-72 border-r pr-4">
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
                            {renderIndustries()}
                            
                            {dynamicIndustries.length > 5 && (
                                <button 
                                    onClick={() => setShowMoreIndustries(!showMoreIndustries)}
                                    className="text-primary-light text-sm flex items-center gap-1 hover:underline"
                                >
                                    {showMoreIndustries ? (
                                        <>
                                            Show Less <ChevronUp className="h-4 w-4" />
                                        </>
                                    ) : (
                                        <>
                                            Show More <ChevronDown className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            )}
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
                                    count={availableSalaryJobs[range.name]}
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
                    {/* Desktop Search Input - Hidden on Mobile */}
                    <div className="hidden sm:block mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search jobs"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white"
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <div className="flex items-center space-x-2 w-full sm:w-auto">
                            <Select
                                value={itemsPerPage}
                                onValueChange={(value) => {
                                    setItemsPerPage(value);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-[90px]">
                                    <SelectValue placeholder="Show" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7">7</SelectItem>
                                    <SelectItem value="14">14</SelectItem>
                                    <SelectItem value="21">21</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={sortBy}
                                onValueChange={setSortBy}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest Post</SelectItem>
                                    <SelectItem value="oldest">Oldest Post</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="hidden sm:flex">
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

                    {/* Job Cards with Responsive Grid/List */}
                    <div className={`${viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                        : 'space-y-4'
                        }`}>
                        {currentJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>

                    {/* Pagination with Mobile-Friendly Design */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-8">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="w-full sm:w-auto"
                            >
                                Previous
                            </Button>
                            <div className="flex flex-wrap justify-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setCurrentPage(page)}
                                        className="w-10"
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="w-full sm:w-auto"
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
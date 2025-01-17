import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Clock, Building2, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { JobsCategories, jobs } from '../Home-Data';

const JobsOfTheDay = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const jobsPerPage = 4;

    // Simulate loading state
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [selectedCategory]);

    useEffect(() => {
        setCurrentPage(0);
    }, [selectedCategory]);

    const filteredJobs = useMemo(() => {
        if (selectedCategory === 'all') {
            return jobs;
        }
        return jobs.filter(job => job.category === selectedCategory);
    }, [selectedCategory]);

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    const currentJobs = useMemo(() => {
        const startIndex = currentPage * jobsPerPage;
        return filteredJobs.slice(startIndex, startIndex + jobsPerPage);
    }, [filteredJobs, currentPage]);

    const handleCategoryWheel = (e) => {
        const container = e.currentTarget;
        container.scrollLeft += e.deltaY;
        e.preventDefault();
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    // Skeleton loaders
    const CategorySkeleton = () => (
        <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <Skeleton key={item} className="h-10 w-32 rounded-full" />
            ))}
        </div>
    );

    const JobCardSkeleton = () => (
        <Card className="border">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-6 w-40 mb-2" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-28" />
                </div>
                <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-4xl font-semibold text-blue-black mb-2">Jobs of the day</h2>
                    <p className="text-gray-600 text-sm">Find your favourite jobs and get the benefits of yourself</p>
                </div>
                <Button className="">
                    <span>See More Jobs</span>
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Categories */}
            {isLoading ? (
                <CategorySkeleton />
            ) : (
                <div
                    className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide"
                    onWheel={handleCategoryWheel}
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {JobsCategories.map((category) => (
                        <Button
                            key={category.id}
                            variant="outline"
                            className={`rounded-full px-4 py-2 flex items-center gap-2 whitespace-nowrap ${selectedCategory === category.id
                                    ? 'bg-blue-light hover:text-white text-white hover:bg-blue-dark'
                                    : 'bg-white hover:bg-gray-50 text-blue-black'
                                }`}
                            onClick={() => handleCategorySelect(category.id)}
                        >
                            <span>{category.icon}</span>
                            {category.label}
                        </Button>
                    ))}
                </div>
            )}

            {/* Job Cards */}
            <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isLoading ? (
                        Array(4).fill(0).map((_, index) => (
                            <JobCardSkeleton key={index} />
                        ))
                    ) : (
                        currentJobs.map((job) => (
                            <Card key={job.id} className="border hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                                                <Building2 className='w-full h-full object-fill' />
                                            </div>
                                            <div>
                                                <p className="text-sm text-blue-dark mb-1">{job.company.name}</p>
                                                <h3 className="text-lg font-medium text-blue-black">{job.position}</h3>
                                                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {job.location}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            className="text-green-dark border border-green-ultra/30 hover:text-green-dark hover:bg-green-ultra/10"
                                        >
                                            Save this job
                                        </Button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {job.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="bg-grey-muted/10 rounded-md text-sm text-green-dark hover:bg-green-ultra/20"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-blue-black font-medium">${job.salary}</span>
                                        </div>
                                        <div className="text-gray-600">
                                            Deadline: <span className="text-blue-black">{job.deadline}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {!isLoading && totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all ${currentPage === index
                                        ? 'bg-blue-light w-4'
                                        : 'bg-gray-300 hover:bg-blue-ultra'
                                    }`}
                                onClick={() => setCurrentPage(index)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {!isLoading && filteredJobs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No jobs found for this category.
                </div>
            )}

            <div className="text-center mt-8">
                <Button
                    variant="link"
                    className="text-grey-muted hover:bg-transparent group"
                >
                    Do you want to post a job for your company? We can help. Click here
                </Button>
            </div>
        </div>
    );
};

export default JobsOfTheDay;
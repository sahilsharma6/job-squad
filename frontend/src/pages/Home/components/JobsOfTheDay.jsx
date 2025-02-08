import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Clock, Building2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { JobsCategories, jobs } from '../Home-Data';
import { Link } from 'react-router';
import { useJobSectors } from '@/hooks/useJobSectors';
import { useJobs } from '@/hooks/useJobs';


// const CategorySkeleton = () => {
//     return (
//       <div className="flex gap-2 md:gap-3 mb-6 md:mb-8 overflow-x-auto">
//         <Skeleton className="rounded-full px-3 md:px-4 py-1 md:py-2 w-24 md:w-32" />
//         <Skeleton className="rounded-full px-3 md:px-4 py-1 md:py-2 w-24 md:w-32" />
//         <Skeleton className="rounded-full px-3 md:px-4 py-1 md:py-2 w-24 md:w-32" />
//         <Skeleton className="rounded-full px-3 md:px-4 py-1 md:py-2 w-24 md:w-32" />
//       </div>
//     )
//   }

//   const JobCardSkeleton = () => {
//     return (
//       <Card className="border">
//         <CardContent className="p-4 md:p-6">
//           <div className="flex items-center gap-3 mb-4">
//             <Skeleton className="w-10 h-10 rounded-full" />
//             <div>
//               <Skeleton className="w-24 h-4 mb-1" />
//               <Skeleton className="w-32 h-6" />
//               <Skeleton className="w-20 h-4 mt-1" />
//             </div>
//           </div>
//           <Skeleton className="w-full h-8 mb-4" />
//           <Skeleton className="w-full h-4" />
//         </CardContent>
//       </Card>
//     )
//   }

const JobsOfTheDay = () => {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [scrollPosition, setScrollPosition] = useState(0)
    const jobsPerPage = 4

    const { sectorStats, isSectorsLoading } = useJobSectors()
    const { jobs, isLoading: isJobsLoading, handleFilterChange, handlePageChange, handleLimitChange } = useJobs()


    const filteredJobs = useMemo(() => {
        if (selectedCategory === "all") {
            return jobs
        }
        return jobs.filter((job) => job.jobSector === selectedCategory)
    }, [selectedCategory, jobs])

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

    const currentJobs = useMemo(() => {
        const startIndex = (currentPage - 1) * jobsPerPage
        return filteredJobs.slice(startIndex, startIndex + jobsPerPage)
    }, [filteredJobs, currentPage])

    const handleCategoryWheel = (e) => {
        const container = e.currentTarget
        container.scrollLeft += e.deltaY
        e.preventDefault()
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
        handleFilterChange({ jobSector: category === "all" ? undefined : category })
        setCurrentPage(1)
    }

    const handleScroll = (direction) => {
        const container = document.getElementById("category-container")
        if (container) {
            const scrollAmount = direction === "left" ? -200 : 200
            container.scrollBy({ left: scrollAmount, behavior: "smooth" })
            setScrollPosition(container.scrollLeft + scrollAmount)
        }
    }

    // Skeleton loaders
    const CategorySkeleton = () => (
        <div className="flex gap-3 mb-4 md:mb-8 overflow-x-auto scrollbar-hide">
            {[1, 2, 3, 4, 5].map((item) => (
                <Skeleton key={item} className="h-8 md:h-10 w-24 md:w-32 rounded-full" />
            ))}
        </div>
    );

    const JobCardSkeleton = () => (
        <Card className="border">
            <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 md:gap-4">
                        <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
                        <div>
                            <Skeleton className="h-3 md:h-4 w-20 md:w-24 mb-2" />
                            <Skeleton className="h-4 md:h-6 w-32 md:w-40 mb-2" />
                            <Skeleton className="h-3 md:h-4 w-24 md:w-32" />
                        </div>
                    </div>
                    <Skeleton className="h-8 md:h-10 w-24 md:w-28" />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-5 md:h-6 w-16 md:w-20" />
                    <Skeleton className="h-5 md:h-6 w-20 md:w-24" />
                    <Skeleton className="h-5 md:h-6 w-14 md:w-16" />
                </div>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-3 md:h-4 w-20 md:w-24" />
                    <Skeleton className="h-3 md:h-4 w-24 md:w-32" />
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl md:text-4xl font-semibold text-primary-black mb-2">Jobs of the day</h2>
                    <p className="text-gray-600 text-xs md:text-sm">Find your favourite jobs and get the benefits of yourself</p>
                </div>
                <Link to="/jobs">
                    <Button className="w-full md:w-auto">
                        See More Jobs
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>

            {/* Categories */}
            {isSectorsLoading ? (
                <CategorySkeleton />
            ) : (
                <div className="relative group">
                    {/* Scroll buttons remain the same */}
                    <div
                        id="category-container"
                        className="flex gap-2 md:gap-3 mb-6 md:mb-8 overflow-x-auto scrollbar-hide relative px-2"
                        onWheel={handleCategoryWheel}
                        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        <Button
                            key="all"
                            variant="outline"
                            className={`rounded-full px-3 md:px-4 py-1 md:py-2 flex items-center gap-1 md:gap-2 
                            whitespace-nowrap text-xs md:text-sm transition-all duration-200
                            ${selectedCategory === "all"
                                    ? "bg-primary-light hover:text-white text-white hover:bg-primary-dark border-transparent"
                                    : "bg-white hover:bg-gray-50 text-primary-black border-gray-200"
                                }`}
                            onClick={() => handleCategorySelect("all")}
                        >
                            All Sectors
                        </Button>
                        {sectorStats.map((sector) => (
                            <Button
                                key={sector.title}
                                variant="outline"
                                className={`rounded-full px-3 md:px-4 py-1 md:py-2 flex items-center gap-1 md:gap-2 
                                whitespace-nowrap text-xs md:text-sm transition-all duration-200
                                ${selectedCategory === sector.title
                                        ? "bg-primary-light hover:text-white text-white hover:bg-primary-dark border-transparent"
                                        : "bg-white hover:bg-gray-50 text-primary-black border-gray-200"
                                    }`}
                                onClick={() => handleCategorySelect(sector.title)}
                            >
                                <span className="w-3 h-3 md:w-4 md:h-4">
                                    <sector.icon />
                                </span>
                                {sector.title}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border-gray-200 
                        hover:bg-gray-50 transition-all duration-200 opacity-0 group-hover:opacity-100
                        disabled:opacity-0 h-8 w-8 rounded-full"
                        onClick={() => handleScroll('right')}
                        disabled={scrollPosition >= document.getElementById('category-container')?.scrollWidth - document.getElementById('category-container')?.clientWidth}
                    >
                        <ChevronRight className="h-4 w-4 text-gray-600" />
                    </Button>
                </div>
            )}

            {/* Job Cards */}
            <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isJobsLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => <JobCardSkeleton key={index} />)
            : currentJobs.map((job) => (
                <Card key={job._id} className="border hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-row justify-between items-start mb-4">
                      <div className="flex gap-3 md:gap-4 mb-3 md:mb-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                          <Building2 className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-primary-dark mb-1">{job.companyId}</p>
                          <h3 className="text-base md:text-lg font-medium text-primary-black">{job.jobTitle}</h3>
                          <div className="flex items-center gap-1 md:gap-2 text-gray-600 text-xs md:text-sm mt-1">
                            <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                            {job.jobLocation}
                          </div>
                        </div>
                      </div>
                      <Link to={`/jobs/${job._id}`}>
                        <Button
                          variant="ghost"
                          className="hover:text-primary-dark border bg-primary-dark/70 text-base-white border-primary-ultra/30 hover:bg-transparent text-xs md:text-sm px-2 md:px-3 py-1 md:py-2"
                        >
                          View More
                        </Button>
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skillsRequired.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-grey-muted/10 rounded-md text-xs md:text-sm text-primary-dark hover:bg-primary-ultra/20 px-2 py-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <div className="flex items-center gap-1 md:gap-2">
                        <Clock className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                        <span className="text-primary-black font-medium">
                          ${job.minSalary} - ${job.maxSalary}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Deadline:{" "}
                        <span className="text-primary-black">{new Date(job.jobDeadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {!isJobsLoading && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPage === index + 1 ? "bg-primary-light w-4" : "bg-gray-300 hover:bg-primary-ultra"
                }`}
                onClick={() => {
                  setCurrentPage(index + 1)
                  handlePageChange(index + 1)
                }}
              />
            ))}
          </div>
        )}
      </div>

      {!isJobsLoading && filteredJobs.length === 0 && (
        <div className="text-center py-6 md:py-8 text-gray-500 text-sm md:text-base">
          No jobs found for this category.
        </div>
      )}


            <div className="text-center mt-6 md:mt-8">
                <Link to="/dashboard/company/post-job">
                    <Button
                        variant="link"
                        className="text-grey-muted hover:bg-transparent group text-xs md:text-sm flex-col flex items-center w-full sm:"
                    >
                        <span>Do you want to post a job for your company?</span>
                        <span>We can help. Click here</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default JobsOfTheDay;


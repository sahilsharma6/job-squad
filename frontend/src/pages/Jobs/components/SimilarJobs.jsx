import React from 'react'
import { jobData } from '../jobs-data'
import { MapPin } from 'lucide-react'
import { Link } from 'react-router'

const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`


const SimilarJobs = () => {
    return (
        <>
            <style>{scrollbarHideStyles}</style>
            <div className="border border-grey-muted/30 rounded-lg overflow-y-scroll h-[800px] scrollbar-hide">
                <h1 className="text-2xl font-bold text-primary-dark mb-4 sticky top-0 bg-white/60 backdrop-blur-xl py-3 px-7 text-center">Similar jobs</h1>
                <div className="space-y-4 px-5">
                    {jobData.map((job) => (
                        <Link key={job.id} to={`/jobs/${job.id}`} className=''>
                            <div className="flex items-start gap-3 border-b border-gray-100 pb-4 hover:bg-primary-ultra/5 transition-colors duration-200 p-2">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-light to-primary-dark rounded-lg flex items-center justify-center text-white text-lg font-bold">
                                    {job.company.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{job.title.split(",")[0]}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                        <span className="bg-gray-100 px-2 py-0.5 rounded">Fulltime</span>
                                        <span>• {job.timeAgo}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-primary-dark font-semibold">
                                            ${Number.parseInt(job.salary.split("-")[1].trim().replace("K", "000")) / 2000}/hour
                                        </span>
                                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                                            <MapPin className="w-4 h-4" />
                                            <span>{job.location.split(",")[0]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SimilarJobs
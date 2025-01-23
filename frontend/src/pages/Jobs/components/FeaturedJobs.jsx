import React from 'react';
import { jobData } from '../jobs-data';

const FeaturedJobs = () => {

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Featured Jobs</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {jobData?.slice(0, 4).map((job) => (
                    <div
                        key={job?.id}
                        className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <img src={`/logos/${job?.company.toLowerCase()}.png`} alt={job?.company} className="w-10 h-10 rounded-lg" />
                                <h3 className="text-lg font-semibold">{job?.title}</h3>
                            </div>
                            <button className="bg-primary-light text-white px-4 py-2 rounded-md hover:bg-primary-ultra transition-colors duration-300">
                                Apply Now
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                            <span>{job?.company}</span>
                            <span>•</span>
                            <span>{job?.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 mb-4">
                            <span>{job?.type}</span>
                            <span>•</span>
                            <span>{job?.timeAgo}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {job?.technologies?.map((tech) => (
                                <span
                                    key={tech}
                                    className="inline-flex items-center px-3 py-1 rounded bg-primary-ultra/10 text-primary-dark text-sm font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="font-medium text-primary">{job?.salary}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedJobs;
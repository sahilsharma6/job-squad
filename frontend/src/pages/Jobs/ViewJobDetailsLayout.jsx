import React from 'react'
import { useParams } from 'react-router';
import { jobData } from './jobs-data';
import JobDetailsPage from './JobDetailsPage';
import SimilarJobs from './components/SimilarJobs';
import FeaturedJobs from './components/featureJob/FeaturedJobs';
import NewsletterSection from '../Home/components/Newletter';

const ViewJobDetailsLayout = () => {
  const { jobId } = useParams();

  // Convert jobId to number for comparison
  const job = jobData.find((job) => job?.id === Number(jobId));

  if (!job) {
    return <div className="text-center p-4">Job not found</div>;
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      {/* Main Content */}
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Job Details */}
        <div className='w-full lg:w-2/3'>
          <JobDetailsPage job={job} />
        </div>

        {/* Sidebar */}
        <div className='w-full lg:w-1/3 space-y-6'>
          {/* Company Information */}
          <div className="border border-grey-muted/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Company Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-grey-muted">Location</p>
                <p className="font-semibold">{job.location}</p>
              </div>
              <div>
                <p className="text-sm text-grey-muted">Phone</p>
                <p className="font-semibold">{job.phone}</p>
              </div>
              <div>
                <p className="text-sm text-grey-muted">Email</p>
                <p className="font-semibold">{job.email}</p>
              </div>
            </div>
          </div>

          {/* Similar Jobs */}
          <div>
            <SimilarJobs />
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className='my-12 md:my-20'>
        <FeaturedJobs />
      </div>

      {/* Newsletter Section */}
      <div>
        <NewsletterSection />
      </div>
    </div>
  )
}

export default ViewJobDetailsLayout
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const JobCard = ({ job }) => {

  const navigate = useNavigate();

  const handleJobClick = () => {
    navigate(`/jobs/${job?.id}`);
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-primary-ultra/5 rounded-lg p-6 border shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <img src={job?.logo} alt={job?.company} className="w-10 h-10 rounded" />
            <span className="text-sm text-gray-600 font-medium">{job?.company}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job?.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job?.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{job?.timeAgo}</span>
            </div>
            <span className="font-medium text-gray-600">{job?.type}</span>
          </div>

          <p className="text-gray-600 leading-normal mb-6">
            {job?.description.length > 150
              ? job.description.slice(0, 150) + '...'
              : job.description}
          </p>
          <div className="flex items-center gap-2">
            {job?.tools?.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center px-3 py-1 rounded bg-primary text-primary-ultra text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="text-primary-dark font-bold text-lg">${job?.salary}/{job?.salaryPer}</div>
          <Button onClick={handleJobClick} variant="secondary" className="bg-primary-light hover:bg-primary-ultra text-white font-medium">
            Apply Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
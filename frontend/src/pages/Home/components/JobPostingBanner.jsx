import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Briefcase, PlusCircle, Target, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const JobPostingBanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user is a company
  if (user?.role !== 'company') return null;

  const handlePostJob = () => {
    navigate('/dashboard/company/post-job');
  };

  return (
    <div className="relative container mx-auto my-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-gradient-to-br from-primary-ultra/10 to-primary-light/10 
        border-2 border-primary-light/20 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-light/20 to-primary-dark/20 opacity-10 blur-3xl"></div>

        <div className="relative z-20 grid grid-cols-12 gap-6 p-8 items-center">
          {/* Icon and Dynamic Background */}
          <div className="col-span-2 flex items-center justify-center">
            <div className="relative">
              <motion.div 
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 0.9, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
                className="absolute -inset-4 bg-primary-light/10 rounded-full blur-xl"
              ></motion.div>
              <Briefcase 
                className="relative text-primary-light w-20 h-20 
                bg-primary-light/20 rounded-full p-4 shadow-lg"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="col-span-7 space-y-4">
            <h2 className="text-3xl font-bold text-primary-dark flex items-center gap-3">
              <Target className="text-primary-light w-10 h-10" />
              Elevate Your Hiring Strategy
            </h2>
            <p className="text-primary-black/80 text-lg leading-relaxed">
              Transform your recruitment process with our precision-driven platform. 
              Connect with top-tier talent that aligns perfectly with your company's 
              vision and growth objectives.
            </p>
            <div className="flex items-center gap-4 text-primary-dark/70">
              <div className="flex items-center">
                <Rocket className="w-6 h-6 mr-2 text-primary-light" />
                <span>Fast Hiring</span>
              </div>
              <div className="flex items-center">
                <PlusCircle className="w-6 h-6 mr-2 text-primary-light" />
                <span>Quality Candidates</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="col-span-3 flex items-center justify-end">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handlePostJob}
                className="bg-primary-light hover:bg-primary-dark 
                transition-all duration-300 group flex items-center 
                text-xl font-semibold text-white px-8 py-4 rounded-xl 
                shadow-lg hover:shadow-2xl space-x-3"
              >
                <PlusCircle className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                <span>Post a Job</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-dark/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>
      </motion.div>
    </div>
  );
};

export default JobPostingBanner;
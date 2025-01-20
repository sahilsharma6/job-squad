import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const SlotDigit = ({ digit, delay = 0 }) => {
  const controls = useAnimationControls();
  
  useEffect(() => {
    controls.start({
      y: [-40 * DIGITS.length, -40 * (parseInt(digit))],
      transition: {
        duration: 2,
        delay,
        type: "spring",
        stiffness: 50,
        damping: 15
      }
    });
  }, [digit, delay, controls]);

  return (
    <div className="h-10 overflow-hidden">
      <motion.div
        initial={{ y: 0 }}
        animate={controls}
        className="flex flex-col items-center"
      >
        {DIGITS.map((num) => (
          <span key={num} className="h-10 flex items-center">
            {num}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const SlotCounter = ({ value, suffix = "+" }) => {
  // Extract actual number and handle K suffix
  const numberStr = value.replace(/[^0-9]/g, '');
  const hasK = value.includes('K');
  
  return (
    <div className="flex items-center text-4xl md:text-5xl font-bold">
      <div className="flex">
        {numberStr.split('').map((digit, idx) => (
          <SlotDigit 
            key={idx}
            digit={digit}
            delay={idx * 0.2}
          />
        ))}
      </div>
      {hasK && <span className="ml-1">K</span>}
      <span>{suffix}</span>
    </div>
  );
};

const StatCard = ({ number, label, description }) => {
  return (
    <div className="flex flex-col items-center p-6 text-center">
      <div className="text-blue-500 mb-2">
        <SlotCounter value={number} />
      </div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl font-semibold text-gray-800 mb-2"
      >
        {label}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-sm text-gray-600 max-w-xs"
      >
        {description}
      </motion.p>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      number: "25K",
      label: "Completed Cases",
      description: "We always provide people a complete solution upon focused of any business"
    },
    {
      number: "17",
      label: "Our Office",
      description: "We always provide people a complete solution upon focused of any business"
    },
    {
      number: "86",
      label: "Skilled People",
      description: "We always provide people a complete solution upon focused of any business"
    },
    {
      number: "28",
      label: "CHappy Clients",
      description: "We always provide people a complete solution upon focused of any business"
    }
  ];

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
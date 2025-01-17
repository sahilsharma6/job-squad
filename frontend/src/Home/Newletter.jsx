import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  const floatingImages = [
    { top: "20%", left: "10%" },
    { top: "30%", left: "85%" },
    { top: "65%", left: "15%" },
    { top: "25%", left: "75%" },
    { top: "60%", left: "80%" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [-10, 10],
      rotate: [-5, 5],
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
        rotate: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <motion.div
      className="w-full bg-blue-ultra overflow-hidden relative p-12 my-8 max-w-6xl mx-auto flex justify-center items-center rounded-md"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-ultra to-blue-600 opacity-50" />

      {/* Floating Images */}
      {floatingImages.map((position, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 }}
          style={position}
        >
          <motion.div variants={floatVariants} animate="animate">
            <img
              src="/api/placeholder/48/48"
              alt="floating"
              className="w-12 h-12 rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div className="max-w-2xl mx-auto text-center relative z-10 font-ubuntu font-normal" variants={containerVariants}>
        <motion.h2 className="text-white text-2xl md:text-3xl font-bold mb-8" variants={itemVariants}>
          New Things Will Always
          <br />
          Update Regularly
        </motion.h2>

        <motion.div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" variants={itemVariants}>
          <motion.div className="relative flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Input
              type="email"
              placeholder="Enter your email here"
              className="bg-white/90 backdrop-blur-sm rounded-full px-6 pl-12 pr-6 h-12 w-full"
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-white text-blue-600 rounded-full hover:bg-blue-50 px-8 h-12 font-semibold">
              Subscribe
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative Background Elements */}
        <motion.div
          className="absolute -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-64 h-64 rounded-full bg-blue-400/20 blur-3xl absolute -top-32 -left-32" />
          <div className="w-64 h-64 rounded-full bg-blue-400/20 blur-3xl absolute -bottom-32 -right-32" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NewsletterSection;

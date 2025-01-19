import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion"; // Import the IconMap
import img from "../image3.png";
import { Mail, Check, User, AlertCircle, Star } from "lucide-react";

const IconMap = {
  Mail: Mail,
  Check: Check,
  User: User,
  AlertCircle: AlertCircle,
  Star: Star,
};
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
              src={img}
              alt="floating"
              className="w-12 h-12 rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="mx-auto text-center relative z-10 font-ubuntu font-normal w-full"
        variants={containerVariants}
      >
        <motion.h2
          className="text-white text-2xl md:text-3xl font-bold mb-8"
          variants={itemVariants}
        >
          New Things Will Always
          <br />
          Update Regularly
        </motion.h2>

        <motion.div
          className="flex flex-col gap-3 max-w-md mx-auto"
          variants={itemVariants}
        >
          <motion.div className="relative flex-1">
            <Input
              type="email"
              placeholder="Enter your email here"
              className="bg-white/90 backdrop-blur-sm rounded-full px-6 pl-12 pr-[6rem] h-14 w-full text-lg"
            />
            <IconMap.Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-6 h-6" />
            <motion.div
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 px-6 h-10 text-sm font-semibold">
                Subscribe
              </Button>
            </motion.div>
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

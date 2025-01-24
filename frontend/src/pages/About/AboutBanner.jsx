import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AboutBanner = () => {
  return (
    <div className="px-4 sm:px-8 md:px-12 py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-primary-dark text-white flex flex-col md:flex-row items-center md:justify-between px-6 sm:px-8 lg:px-12 py-6 sm:py-8 md:py-10 relative overflow-hidden rounded-lg max-w-5xl mx-auto"
      >
        {/* Background Circles */}
        <div className="absolute inset-0">
          <div className="absolute w-40 sm:w-72 h-40 sm:h-72 bg-primary-light opacity-20 rounded-full top-2/3 -translate-y-1/2 left-12 md:left-32"></div>
          <div className="absolute w-12 sm:w-16 h-12 sm:h-16 bg-primary-light opacity-10 rounded-full top-4 sm:top-12 -translate-y-1/2 right-12 md:right-32"></div>
        </div>

        {/* Content */}
        <div className="z-10 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-demi-bold leading-tight">
            Most complete job portal.
          </h1>
          <p className="text-base sm:text-lg mt-2">
            Signup and start finding your job or talent.
          </p>
        </div>

        {/* Buttons */}
        <div className="z-10 flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
          <Button
            variant="outline"
            className="border-2 border-white text-white rounded-3xl  bg-transparent font-demi-bold px-4 py-2 sm:px-6 sm:py-3 hover:bg-white transition"
          >
            Looking for a Job?
          </Button>
          <Button
            
            className="bg-white border-2 text-primary-dark font-demi-bold px-4 py-2 sm:px-6 sm:py-3 hover:bg-transparent hover:border-2 hover:text-white transition rounded-3xl"
          >
            Post a Job
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutBanner;

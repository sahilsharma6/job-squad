import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import img from "../Register/img.png";
import img1 from "../Register/image.png";

const ResetPasswordPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-primary-ultra to-primary-ultra"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      ></motion.div>

      {/* Floating decorative circles */}
      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white opacity-50"
          style={{
            width: `${Math.random() * 80 + 20}px`,
            height: `${Math.random() * 80 + 20}px`,
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
          }}
          animate={{
            y: ["0%", "-200%"],
            opacity: [0.5, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
      ))}

      {/* Main Reset Password Card Section */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-md space-y-8 relative">
          {/* Top animation */}
          <motion.div
            className="absolute right-[-180px] w-40"
            animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <img src={img} alt="Right decoration" className="w-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="w-full relative z-10 bg-white/95 backdrop-blur-md transform transition-all duration-300 hover:shadow-xl">
              <CardHeader className="space-y-1 text-center">
                <motion.h2
                  className="text-2xl font-semibold text-primary-light"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Reset Your Password
                </motion.h2>
                <p className="text-sm text-gray-500">
                  Enter your email to reset your password.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      placeholder="johndoe@example.com"
                      className="transition-all duration-300 hover:border-primary-ultra focus:border-primary-light"
                    />
                  </motion.div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-full"
                >
                  <Button className="w-full bg-primary-light hover:bg-primary-dark transition-colors">
                    Reset Password
                  </Button>
                </motion.div>
                <motion.div
                  className="text-sm text-center text-gray-500"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Remembered your password?
                  <Button
                    variant="link"
                    className="pl-1 font-normal hover:text-primary-light"
                  >
                    Log In
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom image animation */}
      <motion.div
        className="absolute bottom-5 left-0 w-full"
        initial={{ opacity: 1, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto relative">
          <div className="absolute left-10 bottom-0">
            <img
              src={img1}
              alt="Left decoration"
              className="w-[700px] md:w-[800px] lg:w-[900px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;

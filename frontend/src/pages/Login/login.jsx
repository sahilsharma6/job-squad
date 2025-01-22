import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import img from "../Login/image.png";
import img1 from "../Login/img.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br ">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br 
        from-primary-light via-primary-ultra to-primary-light
        "
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
          className="absolute rounded-full bg-blue-300 opacity-50"
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

      {/* Main Login Card Section */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-md space-y-8 relative">
          {/* Right balloon animation */}
          <motion.div
            className="absolute right-[-280px] top-[-60px] w-40"
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
            <Card className="w-full relative z-10 bg-white/95 backdrop-blur-md transform transition-all duration-300 hover:shadow-xl border-0">
              <CardHeader className="space-y-1 text-center">
                <motion.h2
                  className="text-2xl font-semibold text-primary-light"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Welcome Back!
                </motion.h2>
                <p className="text-sm text-gray-500">
                  Access all features. No credit card required.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    variant="outline"
                    className="w-full relative group"
                    type="button"
                  >
                    <img
                      src="/api/placeholder/20/20"
                      alt="Google logo"
                      className="mr-2 h-4 w-4"
                    />
                    <span className="group-hover:text-blue-600 transition-colors">
                      Sign in with Google
                    </span>
                  </Button>
                </motion.div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Label htmlFor="email">Username or Email address *</Label>
                    <Input
                      id="email"
                      placeholder="Steven Job"
                      className="transition-all duration-300 hover:border-blue-400 focus:border-blue-500"
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="transition-all duration-300 hover:border-blue-400 focus:border-blue-500 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </motion.div>

                  <div className="flex items-center justify-between">
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Button
                        variant="link"
                        className="px-0 font-normal hover:text-primary-light"
                      >
                        Forgot Password
                      </Button>
                    </motion.div>
                  </div>
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
                    Login
                  </Button>
                </motion.div>
                <motion.div
                  className="text-sm text-center text-gray-500"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Don't have an Account?
                  <Button
                    variant="link"
                    className="pl-1 font-normal hover:text-primary-light"
                  >
                    Sign up
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom image animation */}
      <motion.div
        className="absolute bottom-0 left-0 w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto relative">
          <div className="absolute left-10 bottom-0 w-96">
            <img src={img1} alt="Left decoration" className="w-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
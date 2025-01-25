import React, { useState,useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import img from "../Login/image.png";
import img1 from "../Login/img.png";
import img2 from "../Login/google.png";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from 'js-cookie';
import Loader from "../Register/loader";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   // Import the js-cookie library
   useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate a 3-second loading delay

    return () => clearTimeout(timer);
  }, []);
   const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Show loader
      try {
        const base_url = import.meta.env.VITE_BASE_URL;
        const response = await axios.post(`http://localhost:3300/api/v1/user/signin`, {
          email: formData.email,
          password: formData.password,
          rememberMe: rememberMe,
        });
  
        // Handle successful login
        console.log('Login successful', response.data);
        const token = response.data.token;
        Cookies.set('token', token, { expires: rememberMe ? 7 : undefined, path: '/' });
        navigate('/');
      } catch (error) {
        console.error('Login failed', error.response?.data);
        setErrors(prevErrors => ({
          ...prevErrors,
          submit: error.response?.data?.message || 'Login failed',
        }));
      } finally {
        setLoading(false); // Hide loader
      }
    }
  };
  
  async function auth(){
    try {
      const base_url = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`${base_url}/api/v1/user/request`,{method:'post'});
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Failed to authenticate. Please try again.');
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-light via-primary-ultra to-primary-light overflow-hidden">
      {/* Animated gradient background */}
      {loading ? (
      <Loader /> // Replace this with your actual loader component
    ) : (
      <div>
        {/* Rest of your LoginPage JSX */}
        <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
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
          animate={{ y: ["0%", "-200%"], opacity: [0.5, 1, 0] }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
      ))}

      {/* Main Login Section */}
      <div className="flex items-center justify-center min-h-screen relative px-4 sm:px-8">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-8 relative">
          {/* Right Balloon Animation */}
          <motion.img
            src={img}
            alt="Right decoration"
            className="absolute hidden md:block right-[-100px] top-[-60px] w-32 md:w-40 lg:w-48 "
            animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="w-full bg-white/95 backdrop-blur-md p-6 rounded-lg shadow-lg">
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
                    className="w-full flex items-center justify-center hover:bg-white"
                    type="button"
                    onClick={()=>auth()}
                  >
                    <img
                      src={img2}
                      alt="Google logo"
                      className="mr-2 h-4 w-4"
                    />
                    <span className="text-primary-ultra ">Sign in with Google</span>
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Label htmlFor="email">Username or Email address *</Label>
                    <Input 
                      id="email" 
                      placeholder="Steven Job" 
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                        value={formData.password}
                        onChange={handleChange}
                        className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </motion.div>

                  <div className="flex items-center justify-between">
                    <motion.div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={() => setRememberMe(!rememberMe)}
                      />
                      <label htmlFor="remember" className="text-sm">
                        Remember me
                      </label>
                    </motion.div>
                    <Button variant="link" className="text-primary-light">
                      Forgot Password
                    </Button>
                  </div>

                  {errors.submit && (
                    <div className="text-red-500 text-sm text-center">{errors.submit}</div>
                  )}
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  onClick={handleSubmit} 
                  className="w-full bg-primary-light hover:bg-primary-dark"
                >
                  Login
                </Button>
                <div className="text-sm text-center">
                  Don't have an Account?
                  <Button 
                    variant="link" 
                    className="pl-1 text-primary-light"  
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom Image Animation */}
      <motion.div
        className="absolute bottom-0 left-0 w-full hidden md:block"
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
    )}
      
    </div>
  );
};

export default LoginPage;
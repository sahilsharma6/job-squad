import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { useGoogleCallbackMutation, useLoginMutation } from "@/services/authApi";
import { useGoogleLoginMutation } from "@/services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch=useDispatch()
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [googleLogin] = useGoogleLoginMutation();
  const [login] = useLoginMutation();
  const [googleCallback] = useGoogleCallbackMutation()

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const response = await login(formData);
        if (response.data) {
          const { token } = response.data;
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    }
  };


//   useEffect(() => {
//     console.log("Current URL:", window.location.href);

//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");

//     console.log("Extracted Code:", code);
//     console.log("URL Params:", urlParams.toString());

//     if (code) {
//         googleCallback({ code }) // Send code to backend
//             .unwrap()
//             .then((data) => {
//                 console.log("Google callback successful:", data);
//                 dispatch(setCredentials(data.user));
//                 navigate("/dashboard");
//             })
//             .catch((error) => {
//                 console.error("Google callback error:", error);
//                 alert("Authentication failed");
//             });

//         // Remove the code from the URL after sending it
//         window.history.replaceState(null, "", window.location.pathname);
//     }
// }, [googleCallback, dispatch, navigate]);


const handleGoogleAuth = async () => {
  try {
      console.log("Triggering Google Login...");
      const response = await googleLogin().unwrap();
      
      if (response.url) {
          console.log("Redirecting to Google OAuth:", response.url);
          window.location.href = response.url; // Redirect to Google OAuth page
      } else {
          console.error("Google OAuth URL not found in response.");
      }
  } catch (error) {
      console.error("Google Authentication failed:", error);
      alert("Failed to authenticate with Google. Please try again.");
  }
};



  

  // Bubble generation function
  const generateBubbles = () => {
    return [...Array(20)].map((_, index) => {
      const size = Math.random() * 80 + 30; // 30-110px
      const delay = Math.random() * 3;
      const duration = Math.random() * 15 + 10; // 10-25 seconds
      const opacity = Math.random() * 0.4 + 0.2; // 0.2-0.6 opacity

      return (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary-ultra backdrop-blur-sm"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 120}vh`,
            left: `${Math.random() * 100}vw`,
            background: 'radial-gradient(circle at 30% 30%, rgb(54, 116, 181)))', // Proper blue gradient
            boxShadow: '0 4px 20px rgb(87, 143, 202), inset 0 0 15px rgb(87, 143, 202)', // Blue shadow with blur
            border: '1px solid rgba(0,0,255,0.2)' // Blue border
          }}
          
          
          
          animate={{ 
            y: [
              0, 
              `-${Math.random() * 200 + 100}%`, 
              `-${Math.random() * 250 + 150}%`
            ],
            x: [
              `${Math.random() * 50 - 25}%`, 
              `${Math.random() * 100 - 50}%`,
              `${Math.random() * 50 - 25}%`
            ],
            scale: [
              1, 
              1.1, 
              0.9, 
              1
            ],
            opacity: [opacity, 0.1, 0]
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      );
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br  overflow-hidden">
      {/* Bubble Background */}
      {generateBubbles()}

      {/* Rest of the login page remains the same */}
      {/* ... (previous code remains unchanged) ... */}
      <div className="flex items-center justify-center min-h-screen relative px-4 sm:px-8">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-8 relative">
          {/* Right Balloon Animation */}
          <motion.img
            src={img}
            alt="Right decoration"
            className="absolute hidden md:block right-[-100px] top-[-60px] w-32 md:w-40 lg:w-48"
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
                    onClick={handleGoogleAuth}
                  >
                    <img
                      src={img2}
                      alt="Google logo"
                      className="mr-2 h-4 w-4"
                    />
                    <span className="text-primary-ultra">Sign in with Google</span>
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
  );
};

export default LoginPage;
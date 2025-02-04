import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import img from "./img.png";
import img1 from "./image.png";
import { useNavigate } from "react-router";
import axios from "axios";

const CompanySignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    companyLogo: "",
    companyDescription: "",
    companyWebsite: "",
    contactPersonName: "",
    contactPersonProfile: "",
    contactPersonEmail: "",
    password: "",
    confirmPassword: "",
    contactPersonPhone: "",
  });
  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        companyLogo: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.companyDescription.trim())
      newErrors.companyDescription = "Company description is required";
    if (!formData.contactPersonName.trim())
      newErrors.contactPersonName = "Contact person name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactPersonEmail.trim()) {
      newErrors.contactPersonEmail = "Email is required";
    } else if (!emailRegex.test(formData.contactPersonEmail)) {
      newErrors.contactPersonEmail = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (
      formData.contactPersonPhone &&
      !phoneRegex.test(formData.contactPersonPhone)
    ) {
      newErrors.contactPersonPhone =
        "Invalid phone number (10 digits required)";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:3300/api/v1/company/signup",
          {
            companyName: formData.companyName,
            companyLogo: formData.companyLogo,
            companyDescription: formData.companyDescription,
            companyWebsite: formData.companyWebsite,
            contactPersonName: formData.contactPersonName,
            contactPersonProfile: formData.contactPersonProfile,
            contactPersonEmail: formData.contactPersonEmail,
            password: formData.password,
            contactPersonPhone: formData.contactPersonPhone,
          }
        );

        console.log("Company registration successful", response.data);
        navigate("/signin");
      } catch (error) {
        console.error("Registration failed", error.response?.data);
        setErrors((prevErrors) => ({
          ...prevErrors,
          submit: error.response?.data?.message || "Registration failed",
        }));
      }
    }
  };
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
    <div className="relative min-h-screen overflow-hidden pb-5">
      {generateBubbles()}

      {/* Main Signup Card Section */}
      <div className="flex items-center justify-center min-h-screen relative z-5">
        <div className="w-full max-w-2xl space-y-8 relative">
          {/* Top animation */}
          <motion.div
            className="absolute right-[-180px] w-40 z-0"
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
            <Card className="w-full relative bg-white/95 backdrop-blur-md transform transition-all duration-300 hover:shadow-xl z-1">
              <CardHeader className="space-y-1 text-center">
                <motion.h2
                  className="text-2xl font-semibold text-primary-light"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Register Your Company
                </motion.h2>
                <p className="text-sm text-gray-500">
                  Create a company account and start your journey with us.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Company Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Company Information</h3>

                    {/* Company Name */}
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`transition-all duration-300 border ${
                          errors.companyName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm">
                          {errors.companyName}
                        </p>
                      )}
                    </motion.div>

                    {/* Company Logo URL */}
                    <motion.div className="space-y-2">
                  <Label htmlFor="companyLogo">Company Logo *</Label>
                  <Input
                    id="companyLogo"
                    type="file"
                    onChange={handleFileChange}
                    className="transition-all duration-300"
                  />
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="mt-2 w-32 h-32 object-cover rounded"
                    />
                  )}
                  {errors.companyLogo && (
                    <p className="text-red-500 text-sm">{errors.companyLogo}</p>
                  )}
                </motion.div>

                    {/* Company Description */}
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Label htmlFor="companyDescription">
                        Company Description *
                      </Label>
                      <Textarea
                        id="companyDescription"
                        placeholder="Enter company description"
                        value={formData.companyDescription}
                        onChange={handleChange}
                        className={`transition-all duration-300 border ${
                          errors.companyDescription
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.companyDescription && (
                        <p className="text-red-500 text-sm">
                          {errors.companyDescription}
                        </p>
                      )}
                    </motion.div>

                    {/* Company Website */}
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Label htmlFor="companyWebsite">Company Website</Label>
                      <Input
                        id="companyWebsite"
                        placeholder="Enter company website"
                        value={formData.companyWebsite}
                        onChange={handleChange}
                        className="transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  {/* Contact Person Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Contact Person Details
                    </h3>

                    {/* Contact Person Name */}
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Label htmlFor="contactPersonName">
                        Contact Person Name *
                      </Label>
                      <Input
                        id="contactPersonName"
                        placeholder="Enter contact person name"
                        value={formData.contactPersonName}
                        onChange={handleChange}
                        className={`transition-all duration-300 border ${
                          errors.contactPersonName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.contactPersonName && (
                        <p className="text-red-500 text-sm">
                          {errors.contactPersonName}
                        </p>
                      )}
                    </motion.div>

                    {/* Contact Person Profile */}
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Label htmlFor="contactPersonProfile">
                        Contact Person Profile
                      </Label>
                      <Input
                        id="contactPersonProfile"
                        placeholder="Enter profile URL"
                        value={formData.contactPersonProfile}
                        onChange={handleChange}
                        className="transition-all duration-300"
                      />
                    </motion.div>

                    {/* Contact Person Email */}
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Label htmlFor="contactPersonEmail">
                        Contact Person Email *
                      </Label>
                      <Input
                        id="contactPersonEmail"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.contactPersonEmail}
                        onChange={handleChange}
                        className={`transition-all duration-300 border ${
                          errors.contactPersonEmail
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.contactPersonEmail && (
                        <p className="text-red-500 text-sm">
                          {errors.contactPersonEmail}
                        </p>
                      )}
                    </motion.div>

                    {/* Contact Person Phone */}
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Label htmlFor="contactPersonPhone">
                        Contact Person Phone
                      </Label>
                      <Input
                        id="contactPersonPhone"
                        placeholder="Enter phone number"
                        value={formData.contactPersonPhone}
                        onChange={handleChange}
                        className={`transition-all duration-300 border ${
                          errors.contactPersonPhone
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.contactPersonPhone && (
                        <p className="text-red-500 text-sm">
                          {errors.contactPersonPhone}
                        </p>
                      )}
                    </motion.div>

                    {/* Password */}
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        type="password"
                        id="password"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                        className={`transition-all duration-300 border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password}
                        </p>
                      )}
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Label htmlFor="confirmPassword">
                        Confirm Password *
                      </Label>
                      <Input
                        type="password"
                        id="confirmPassword"
                        placeholder="********"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`transition-all duration-300 border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {errors.submit && (
                    <div className="text-red-500 text-sm text-center">
                      {errors.submit}
                    </div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-full mt-4"
                  >
                    <Button
                      type="submit"
                      className="w-full bg-primary bg-primary-light hover:bg-primary-dark transition-colors"
                    >
                      Sign Up
                    </Button>
                  </motion.div>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <motion.div
                  className="text-sm text-center text-black"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Already have an account?
                  <Button
                    variant="link"
                    className="pl-1 font-normal text-primary-light"
                    onClick={() => navigate("/companysignin")}
                  >
                    Sign In
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom image animation */}
      <motion.div
        className="absolute right-36 w-full hidden md:block"
        initial={{ opacity: 1, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto relative">
          <div className="absolute left-10 bottom-0">
            <img src={img1} alt="Left decoration" className="w-[600px]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanySignupPage;

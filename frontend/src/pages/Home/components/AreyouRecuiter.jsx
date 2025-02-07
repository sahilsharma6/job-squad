import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const RecruiterChoiceCard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md overflow-hidden bg-white/80 backdrop-blur-lg">
          <CardContent className="pt-3">
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Icon */}
              <motion.div
                className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Briefcase className="w-10 h-10 text-primary-light" />
              </motion.div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  Are you a Recruiter?
                </h2>
                <p className="text-gray-600">
                  Join our platform to find the perfect applicants for your organization
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => navigate('/companyregister')}
                    className="w-full bg-primary-light hover:bg-primary-dark text-white py-6 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Sign Up as Recruiter
                  </Button>
                </motion.div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => navigate('/companysignin')}
                    className="w-full border-primary-ultra text-primary-light hover:bg-blue-50 py-6 rounded-lg text-lg font-semibold transition-all"
                  >
                    Sign In
                  </Button>
                </motion.div>
              </div>

              {/* Bottom text */}
              <p className="text-sm text-gray-500 pt-4">
                Unlock premium features and connect with top talent
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RecruiterChoiceCard;
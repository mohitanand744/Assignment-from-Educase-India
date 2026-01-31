import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-end pb-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-left font-rubik font-medium text-[28px] leading-[33px] tracking-normal text-popx-text mb-2">Welcome to PopX</h1>
        <p className="text-popx-gray-text mb-8 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => navigate('/signup')}
            className="w-[335px] h-[46px] rounded-[6px] bg-popx-purple hover:bg-popx-purple-dark text-white font-medium shadow-none font-rubik"
          >
            Create Account
          </Button>
          <Button
            onClick={() => navigate('/signin')}
            className="w-[335px] h-[46px] rounded-[6px] bg-[#6C25FF4B] hover:bg-[#6C25FF60] text-popx-text font-medium shadow-none font-rubik"
          >
            Already Registered? Login
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

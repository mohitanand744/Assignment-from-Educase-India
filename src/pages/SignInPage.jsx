import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      login(formData.email, formData.password);
      toast.success("Logged in successfully!");
      navigate('/account');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col"
    >
      <button onClick={() => navigate(-1)} className="text-popx-text hover:text-popx-purple transition-colors mb-4 w-fit">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-left font-rubik font-medium text-[28px] leading-[33px] text-popx-text w-[188px] mb-4">
        Signin to your <br /> PopX account
      </h1>
      <p className="text-popx-gray-text mb-8">
        Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,
      </p>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <Input
          label="Email Address"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          error={errors.email}
        />
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          error={errors.password}
        />

        <div className="">
          <Button type="submit" disabled={!formData.email || !formData.password}>Login</Button>
        </div>
      </form>
    </motion.div>
  );
};

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  // ... (rest is same, skipping to render)
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: 'No'
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber' && !/^\d*$/.test(value)) {
      toast.error("Please enter numbers only");
      return;
    }

    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      signup(formData);
      toast.success("Account created successfully!");
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

      <h1 className="text-left font-rubik font-medium text-[28px] leading-[33px] text-popx-text w-[188px] mb-8 mt-2">
        Create your <br /> PopX account
      </h1>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <Input
          label="Full Name"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Enter full name"
          error={errors.fullName}
        />
        <Input
          label="Phone number"
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          placeholder="Enter phone number"
          error={errors.phoneNumber}
        />
        <Input
          label="Email address"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
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
          required
          placeholder="Enter password"
          error={errors.password}
        />
        <Input
          label="Company name"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter company name"
          error={errors.companyName}
        />

        <div className="mb-8">
          <p className="block text-xs text-popx-text font-medium mb-3">Are you an Agency?<span className="text-red-500">*</span></p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isAgency"
                value="Yes"
                checked={formData.isAgency === 'Yes'}
                onChange={handleChange}
                className="w-5 h-5 text-popx-purple accent-popx-purple focus:ring-popx-purple"
              />
              <span className='text-xs'>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isAgency"
                value="No"
                checked={formData.isAgency === 'No'}
                onChange={handleChange}
                className="w-5 h-5 text-popx-purple accent-popx-purple focus:ring-popx-purple"
              />
              <span className='text-xs'>No</span>
            </label>
          </div>
        </div>

        <div className="mt-auto mb-4">
          <Button type="submit" className='text-sm'>Create Account</Button>
        </div>
      </form>
    </motion.div>
  );
};

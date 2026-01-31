import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';



export const ProfilePage = () => {
  const { user, loading, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
    }
  }, [user, loading, navigate]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      try {
        updateUser({ profileImage: base64String });
        toast.success("Profile image updated!");
      } catch (error) {
        toast.error("Failed to save image");
        console.error(error);
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading || !user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col bg-popx-bg -m-5"
    >
      <div className="bg-white p-4 shadow-sm mb-6">
        <h1 className="text-lg font-medium text-popx-text">Account Settings</h1>
      </div>

      <div className="px-6">
        <div className="flex items-start gap-4 mb-8">
          <div className="relative group cursor-pointer" onClick={handleImageClick}>
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 border border-gray-100">
              <img
                src={user.profileImage || `https://ui-avatars.com/api/?background=cbd5e1&color=fff&name=${encodeURIComponent(user?.fullName || 'Marry Doe')}&length=1`}
                alt="Profile"
                className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-popx-purple text-white p-1.5 rounded-full border-2 border-white shadow-sm">
              <Camera size={14} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="pt-2">
            <h2 className="text-popx-text font-bold text-[16px]">{user.fullName || 'Marry Doe'}</h2>
            <p className="text-popx-text text-[16px]">{user.email || 'Marry@Gmail.Com'}</p>
          </div>
        </div>

        <p className="text-left text-[14px] text-popx-text  leading-relaxed capitalize opacity-100 w-[337px]  mb-6 font-rubik">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>

        <div className="border-t border-dashed border-gray-300 my-4" />
      </div>
    </motion.div>
  );
};

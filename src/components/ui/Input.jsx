import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({ label, id, type = 'text', required, className, error, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type;

  return (
    <div className="relative mb-6">
      {label && (
        <label
          htmlFor={id}
          className={`absolute -top-3 left-4 bg-popx-bg px-1 text-xs font-medium z-10 ${error ? 'text-red-500' : 'text-popx-purple'}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={inputType}
        className={`w-full border rounded-md bg-transparent px-4 h-[40px] text-popx-text placeholder-gray-400 focus:outline-none transition-colors ${error
          ? 'border-red-500 focus:border-red-500'
          : 'border-gray-300 focus:border-popx-purple'
          } ${className}`}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute right-3 top-3 text-gray-400 hover:text-popx-purple transition-colors bg-popx-bg pl-1"
        >
          {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
      {error && (
        <span className="text-xs text-red-500 absolute -bottom-5 right-0 block text-right mt-1 font-medium">{error}</span>
      )}
    </div>
  );
};

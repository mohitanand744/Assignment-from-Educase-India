import React from 'react';
import { cn } from '../../utils/cn';

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  return (
    <button
      className={cn(
        "w-full py-3 px-6 rounded-md font-medium transition-colors duration-200 text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300",
        {
          "bg-popx-purple text-white hover:bg-popx-purple-dark": variant === 'primary',
          "bg-popx-purple-light text-popx-text hover:bg-popx-purple-light-hover": variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

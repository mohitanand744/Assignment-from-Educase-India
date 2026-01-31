import React from 'react';
import { Toaster } from 'sonner';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[375px] h-[812px] bg-popx-bg  relative border border-gray-200 rounded-xl flex flex-col overflow-hidden">
        <div className="flex-1 p-5 flex flex-col overflow-y-auto scrollbar-hide">
          {children}
        </div>
        <Toaster position="top-center" richColors />
      </div>
    </div>
  );
};

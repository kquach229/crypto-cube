'use client';
import React from 'react';
import { useTheme } from 'next-themes';

const ReusablePaper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme == 'dark' ? 'bg-[#193114]' : 'bg-amber-50'
      } p-2 rounded-xl`}>
      {children}
    </div>
  );
};

export default ReusablePaper;

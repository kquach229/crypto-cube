'use client';
import React from 'react';
import { useTheme } from 'next-themes';

const ReusablePaper = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: React.CSSProperties;
}) => {
  const { theme, systemTheme } = useTheme();
  return (
    <div className='bg-paper rounded-sm p-5' style={styles}>
      {children}
    </div>
  );
};

export default ReusablePaper;

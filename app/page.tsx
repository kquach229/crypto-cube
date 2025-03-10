'use client';

import { ModeToggle } from '@/components/ModeToggle';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className='h-100 mx-auto w-full text-center flex flex-col justify-center'>
      <h1 className='text-[5rem]'>
        Stay Ahead With <h5 className='font-extrabold'>CryptoCube</h5>
      </h1>
      <p className='mt-5'>
        Track Trends in Crypto and NFTs to make informed decisions
      </p>
    </div>
  );
}

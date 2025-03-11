'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className='relative h-100 mx-auto w-full text-center flex flex-col justify-center'>
      <h1 className='text-[5rem]'>
        Stay Ahead With <h5 className='font-extrabold'>CryptoCube </h5>
        <DotLottieReact
          className='absolute top-[25rem] md:top-[5rem] md:right-[0rem]'
          src='/cube-lottie'
          loop
          autoplay
          width={300}
          height={300}
          draggable
        />
      </h1>

      <p className='mt-5'>
        Track Trends in Crypto and NFTs to make informed decisions
      </p>
    </div>
  );
}

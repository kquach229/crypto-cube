'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {
  return (
    <div className='relative h-100 mx-auto w-full text-center flex flex-col justify-center'>
      <span className='mx-auto text-[2rem] sm:text-[5rem]'>
        <h1 className='max-w-[80%] md:max-w-full mx-auto'>
          Stay Ahead With <span className='font-extrabold'>CryptoCube </span>
        </h1>

        <DotLottieReact
          className='absolute top-[15rem] md:top-[5rem] md:right-[0rem]'
          src='/cube-lottie'
          loop
          autoplay
          width={300}
          height={300}
          draggable
        />
      </span>

      <p className='text-xs sm:text-sm mt-5'>
        Track Trends in Crypto and NFTs to make informed decisions
      </p>
    </div>
  );
}

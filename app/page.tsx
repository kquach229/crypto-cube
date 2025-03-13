'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {
  return (
    <div className='relative h-100 mx-auto w-full text-center flex flex-col justify-center'>
      <h1 className='text-[5rem]'>
        Stay Ahead With <span className='font-extrabold'>CryptoCube </span>
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

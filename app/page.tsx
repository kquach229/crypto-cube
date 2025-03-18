'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import LoginButton from './components/LoginButton';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className='relative h-[100%] mx-auto w-full text-center flex flex-col justify-center'>
      <span className='mx-auto text-[2rem] sm:text-[5rem] mb-52'>
        <h1 className='max-w-[80%] md:max-w-full mx-auto'>
          Stay Ahead With <span className='font-extrabold'>CryptoCube </span>
        </h1>

        <DotLottieReact
          className='absolute top-[22rem] right-[-10rem] md:top-[18rem] md:right-[5rem]'
          src='/cube-lottie'
          loop
          autoplay
          width={300}
          height={300}
          draggable
        />
        <p className='text-xs sm:text-sm'>
          Track Trends in Crypto and NFTs to make informed decisions
        </p>

        {!session?.user && (
          <div className='mt-24 md:mt-10'>
            <LoginButton />
          </div>
        )}
      </span>
    </div>
  );
}

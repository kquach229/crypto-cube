'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';

const Error = () => {
  return (
    <div className='flex flex-col justify-center'>
      <DotLottieReact
        src='/error-lottie'
        loop
        autoplay
        width={150}
        height={50}
        draggable
      />
      <div className='text-center'>There is an error of some sort...</div>
    </div>
  );
};

export default Error;

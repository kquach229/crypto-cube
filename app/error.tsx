'use client';
import React from 'react';

const Error = ({ error }) => {
  return (
    <div className='flex flex-col justify-center w-full'>
      {error}
      <div className='text-center'>There is an error of some sort...</div>
    </div>
  );
};

export default Error;

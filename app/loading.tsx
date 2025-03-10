import React from 'react';
import { SquareLoader } from 'react-spinners';
const Loading = () => {
  return (
    <div className='flex justify-center flex-col items-center min-h-screen'>
      <h5 className='mb-10'>Loading...</h5>
      <SquareLoader size={150} color='oklch(90.74% 0.0267 138.3)' />
    </div>
  );
};

export default Loading;

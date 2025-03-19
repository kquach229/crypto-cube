import React from 'react';
import { CoinDetails } from './page';

const CoinDetailsFooter = ({ allDetails }: { allDetails: CoinDetails }) => {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-lg font-semibold'>About {allDetails.name}</h1>
      <div className='text-sm'>
        {allDetails.description && allDetails.description.en}
      </div>
    </div>
  );
};

export default CoinDetailsFooter;

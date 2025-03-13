import React from 'react';
import { CoinDetails } from './page';

const CoinDetailsFooter = ({ allDetails }: { allDetails: CoinDetails }) => {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-lg'>About {allDetails.name}</h1>
      {allDetails.description && allDetails.description.en}
    </div>
  );
};

export default CoinDetailsFooter;

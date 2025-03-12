import React from 'react';

const CoinDetailsFooter = ({ allDetails }) => {
  console.log(allDetails);
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-lg'>About {allDetails.name}</h1>
      {allDetails.description.en}
    </div>
  );
};

export default CoinDetailsFooter;

import { ellipse, formatPrice } from '@/src/lib/utils';
import Image from 'next/image';
import React from 'react';
import { CoinDetails } from './page';

const CoinDetailsHeader = ({ allDetails }: { allDetails: CoinDetails }) => {
  const { symbol, name, image, market_data } = allDetails;

  return (
    <div className='flex w-full justify-between items-center'>
      <div className='flex items-center align-middle gap-1 w-[10rem]'>
        <Image
          className='rounded-3xl'
          src={image.large}
          height={52}
          width={52}
          alt={name}
        />
        <div className='flex flex-col justify-around'>
          <span className='font-semibold text-sm md:text-lg'>
            {ellipse(name)}
          </span>
          <span className='text-xs md:text-sm'>{symbol.toUpperCase()}</span>
        </div>
      </div>
      <div>
        <h5 className='text-lg md:text-2xl text-right'>
          {formatPrice('USD', allDetails.usd)}
        </h5>
        <h5
          className={`text-right text-xs md:text-md ${
            market_data.price_change_24h > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
          {`${formatPrice('USD', market_data.price_change_24h)} (24h Change)`}
        </h5>
      </div>
    </div>
  );
};

export default CoinDetailsHeader;

import { INFTDetailsProps } from '@/app/types/types';
import { ellipse, formatPrice, percentageFormatter } from '@/src/lib/utils';
import Image from 'next/image';
import React from 'react';

const NftDetailsHeader = ({ data }: { data: INFTDetailsProps }) => {
  const {
    image,
    symbol,
    name,
    floor_price,
    floor_price_24h_percentage_change,
  } = data;
  return (
    <div className='flex w-full justify-between items-center'>
      <div className='flex items-center align-middle gap-2 w-[10rem]'>
        <Image
          className='rounded-3xl'
          src={image.small_2x}
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
          {formatPrice('USD', floor_price.usd)}
        </h5>
        <h5
          className={`text-right text-xs md:text-md ${
            floor_price_24h_percentage_change.usd > 0
              ? 'text-green-500'
              : 'text-red-500'
          }`}>
          {`${percentageFormatter(
            floor_price_24h_percentage_change.usd
          )} (24h Change)`}
        </h5>
      </div>
    </div>
  );
};

export default NftDetailsHeader;

import { INFTDetailsProps } from '@/app/types/types';
import React from 'react';

const NftGeneralSection = ({ data }: { data: INFTDetailsProps }) => {
  console.log(data);
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        objectPosition: 'position',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${data.banner_image || data.image.small_2x})`,
      }}>
      {/* Overlay with reduced opacity */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity here
        }}></div>
      <h1 className='opacity-50 bg-paper relative text-7xl font-bold text-center text-nowrap'>
        {data.name}
      </h1>
    </div>
  );
};

export default NftGeneralSection;

import { INFTDetailsProps } from '@/app/types/types';
import React from 'react';

const NftDetailsFooter = ({ data }: { data: INFTDetailsProps }) => {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-lg'>About {data.name}</h1>
      {data.description && (
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
      )}
    </div>
  );
};

export default NftDetailsFooter;

'use client';
import ReusablePaper from '@/app/components/ReusablePaper';
import Loading from '@/app/loading';
import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import ReusableHistoryChart from '@/app/components/ReusableHistoryChart';
import Error from '@/app/error';
import NftDetailsHeader from './NftDetailsHeader';
import { INFTDetailsProps } from '@/app/types/types';
import NftDetailsSidebar from './NftDetailsSidebar';
import NftDetailsFooter from './NftDetailsFooter';
import Image from 'next/image';

const fetchNftDetails = async (nftId: string): Promise<INFTDetailsProps> => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/nfts/${nftId}`
  );
  const data = await response.json();
  return data;
};

const NftPage = ({ params }: { params: Promise<{ nftId: string }> }) => {
  const { nftId } = use(params);

  const { data, isLoading, error } = useQuery<INFTDetailsProps>({
    queryKey: ['fetchnft', nftId],
    queryFn: () => fetchNftDetails(nftId),
    staleTime: 60000,
  });

  if (!data || isLoading) return <Loading />;
  if (error) return <Error />;

  console.log('nft data', data);

  return (
    <div>
      <ReusablePaper>
        <NftDetailsHeader data={data} />
      </ReusablePaper>
      <div className='grid grid-cols-12 w-full gap-5'>
        <div className='col-span-12 md:col-span-4'>
          <ReusablePaper
            styles={{ marginTop: 15, height: '600px', overflowY: 'scroll' }}>
            <NftDetailsSidebar data={data} />
          </ReusablePaper>
        </div>
        <div className='col-span-12 md:col-span-8'>
          <ReusablePaper
            styles={{
              marginTop: 15,
              height: '600px',
              padding: '20px',
              position: 'relative', // Needed for Image absolute positioning
              width: '100%',
            }}>
            <div className='absolute inset-0'>
              <Image
                layout='fill' // Makes it stretch across the whole container
                objectFit='cover' // Ensures it covers the space
                objectPosition='center' // Centers the image
                src={data.banner_image}
                alt={data.name}
              />
            </div>
          </ReusablePaper>
        </div>
        <div className='col-span-12'>
          <ReusablePaper>
            <NftDetailsFooter data={data} />
          </ReusablePaper>
        </div>
      </div>
    </div>
  );
};

export default NftPage;

'use client';
import ReusablePaper from '@/app/components/ReusablePaper';
import Loading from '@/app/loading';
import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import Error from '@/app/error';
import NftDetailsHeader from './NftDetailsHeader';
import { INFTDetailsProps } from '@/app/types/types';
import NftDetailsSidebar from './NftDetailsSidebar';
import NftDetailsFooter from './NftDetailsFooter';
import NftGeneralSection from './NftGeneralSection';

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
            <NftGeneralSection data={data} />
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

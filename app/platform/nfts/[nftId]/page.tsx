'use client';

import ReusablePaper from '@/app/components/ReusablePaper';
import Loading from '@/app/loading';
import Error from '@/app/error';
import NftDetailsHeader from './NftDetailsHeader';
import NftDetailsSidebar from './NftDetailsSidebar';
import NftDetailsFooter from './NftDetailsFooter';
import NftGeneralSection from './NftGeneralSection';
import { useNftDetails } from '@/hooks/useQueryHooks';
import { use } from 'react';

const NftPage = ({ params }: { params: Promise<{ nftId: string }> }) => {
  const { nftId } = use(params);
  const { data, error, isLoading } = useNftDetails(nftId as string);

  if (isLoading) return <Loading />;
  if (error || !data) return <Error />;

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
              position: 'relative',
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

'use client';
import ReusablePaper from '@/app/components/ReusablePaper';
import Loading from '@/app/loading';
import { ellipse } from '@/src/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { use } from 'react';
import CoinDetailsSidebar from './CoinDetailsSidebar';
import CoinDetailsHeader from './CoinDetailsHeader';
import ReusableHistoryChart from '@/app/components/ReusableHistoryChart';
import CoinDetailsFooter from './CoinDetailsFooter';

const fetchCoinDetails = async (coinId) => {
  const coinDataResponse = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}`
  );
  const coinPriceResponse = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?&vs_currencies=usd&ids=${coinId}`
  );

  const coinData = await coinDataResponse.json();
  const coinPriceData = await coinPriceResponse.json();
  return { ...coinData, ...coinPriceData[coinId] };
};

const CoinPage = ({ params }) => {
  const { coinId } = use(params);
  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchcoin', coinId],
    queryFn: () => fetchCoinDetails(coinId),
    staleTime: 60000,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error...</div>;

  return (
    <div>
      <ReusablePaper>
        <CoinDetailsHeader allDetails={data} />
      </ReusablePaper>

      <div className='grid grid-cols-12 w-full gap-5'>
        <div className='col-span-12 md:col-span-4'>
          <ReusablePaper
            styles={{ marginTop: 15, height: '600px', overflowY: 'scroll' }}>
            <CoinDetailsSidebar allDetails={data} />
          </ReusablePaper>
        </div>
        <div className='col-span-12 md:col-span-8'>
          <ReusablePaper
            styles={{
              marginTop: 15,
              height: '600px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}>
            <ReusableHistoryChart coinId={coinId} />
          </ReusablePaper>
        </div>
        <div className='col-span-12'>
          <ReusablePaper>
            <CoinDetailsFooter allDetails={data} />
          </ReusablePaper>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;

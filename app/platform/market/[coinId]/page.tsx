'use client';
import ReusablePaper from '@/app/components/ReusablePaper';
import Loading from '@/app/loading';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import CoinDetailsSidebar from './CoinDetailsSidebar';
import CoinDetailsHeader from './CoinDetailsHeader';
import ReusableHistoryChart from '@/app/components/ReusableHistoryChart';
import CoinDetailsFooter from './CoinDetailsFooter';
import Error from '@/app/error';

// Define the shape of the data returned from the fetchCoinDetails function
export type CoinDetails = {
  id: string;
  name: string;
  symbol: string;
  asset_platform_id?: string;
  country_origin?: string;
  description?: { en: string }; // Assuming it's an object with an 'en' property
  detail_platforms?: Record<string, unknown>;
  categories: string[];
  block_time_in_minutes: number;
  genesis_date: string;
  links: {
    homepage: string[];
    blockchain_site: string[];
  };
  market_data: {
    total_supply: number;
    circulating_supply: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_1y: number;
    price_change_24h: number;
  };
  community_data: {
    twitter_followers: number;
  };
  watchlist_portfolio_users: number;
  usd: number;
  market_cap_rank: number;
  // Missing Fields
  developer_data?: Record<string, unknown>;
  hashing_algorithm?: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  last_updated: string;
};

type CoinPageProps = {
  params: {
    coinId: string;
  };
};

const fetchCoinDetails = async (coinId: string): Promise<CoinDetails> => {
  const coinDataResponse = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}`
  );
  const coinPriceResponse = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?&vs_currencies=usd&ids=${coinId}`
  );

  const coinData = await coinDataResponse.json();
  const coinPriceData = await coinPriceResponse.json();

  // Merge coin data with price data explicitly
  return {
    ...coinData,
    usd: coinPriceData[coinId]?.usd || 0, // Ensure we get USD price or default to 0
  };
};

const CoinPage: React.FC<CoinPageProps> = ({ params }) => {
  const { coinId } = params;
  const { data, isLoading, error } = useQuery<CoinDetails>({
    queryKey: ['fetchcoin', coinId],
    queryFn: () => fetchCoinDetails(coinId),
    staleTime: 60000,
  });

  if (!data || isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error)
    return (
      <div>
        <Error />
      </div>
    );

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

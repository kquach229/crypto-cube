'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ReusablePaper from '@/app/components/ReusablePaper';
import ReusableCardCarousel from '@/app/components/ReusableCardCarousel';

interface PriceChangePercentage24h {
  [currency: string]: number;
}

interface CoinData {
  price: number;
  price_btc: string;
  price_change_percentage_24h: PriceChangePercentage24h;
  market_cap: string;
  market_cap_btc: string;
  total_volume: string;
  total_volume_btc: string;
  sparkline: string;
  content?: {
    title: string;
    description: string;
  } | null;
}

interface CoinItem {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
  data: CoinData;
}

interface Coin {
  item: CoinItem;
}

interface NFTData {
  floor_price: string;
  floor_price_in_usd: string;
  market_cap: string;
  market_cap_in_usd: string;
  total_volume: string;
  total_volume_in_usd: string;
  sparkline: string;
}

interface NFTItem {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  nft_contract_id: number;
  native_currency_symbol: string;
  floor_price_in_native_currency: number;
  floor_price_24h_percentage_change: number;
  data: NFTData;
}

interface CryptoData {
  coins: Coin[];
  nfts: NFTItem[];
}

const fetchTrending = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/search/trending'
  );
  const data = await response.json();
  return data;
};

const TrendingPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['gettrending'],
    queryFn: fetchTrending,
    refetchInterval: 600000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { coins, nfts } = data;

  return (
    <div>
      <ReusablePaper>Trending</ReusablePaper>
      <ReusablePaper>
        <ReusableCardCarousel title='Coins' data={coins} />
        <ReusableCardCarousel isNft title='Nfts' data={nfts} />
      </ReusablePaper>
    </div>
  );
};

export default TrendingPage;

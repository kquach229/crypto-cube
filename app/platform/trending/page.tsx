'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ReusablePaper from '@/app/components/ReusablePaper';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { ellipse } from '@/src/lib/utils';
import Loading from '@/app/loading';
import Error from '@/app/error';
import Link from 'next/link';

interface PriceChangePercentage24h {
  [currency: string]: number;
}

type CoinMarketData = {
  price: number;
  price_btc: string;
  price_change_percentage_24h: PriceChangePercentage24h;
  market_cap: string;
  market_cap_btc: string;
  sparkline: string;
};

type CoinItem = {
  coin_id: number;
  data: CoinMarketData;
  id: string;
  large: string;
  market_cap_rank: number;
  name: string;
  price_btc: string;
  score: number;
  slug: string;
  small: string;
  symbol: string;
  thumb: string;
};

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

interface TrendingData {
  coins: Coin[];
  nfts: NFTItem[];
}

const fetchTrending = async (): Promise<TrendingData> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/search/trending'
  );
  const data = await response.json();
  return data;
};

const TrendingPage: React.FC = () => {
  const { data, isLoading, error } = useQuery<TrendingData>({
    queryKey: ['gettrending'],
    queryFn: fetchTrending,
    refetchInterval: 600000,
  });

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const { coins, nfts } = data || { coins: [], nfts: [] };

  return (
    <div className='min-h-screen'>
      <ReusablePaper>
        <div className='font-semibold'>Trending </div>
      </ReusablePaper>
      <div className='p-5'>
        <div>Trending Coins</div>
        <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {coins.map((coin) => (
            <Link
              key={coin.item.coin_id}
              href={`/platform/market/${coin.item.id}`}>
              <Card className={`relative h-[8rem]`}>
                <CardContent className='p-5'>
                  <div className='flex items-center gap-10'>
                    <div className='flex items-center w-full gap-5'>
                      <Image
                        className='rounded-full'
                        width={48}
                        height={156}
                        style={{ objectFit: 'contain' }}
                        src={coin.item.large}
                        alt={coin.item.name}
                      />
                      <div className='flex-col flex'>
                        <span className='font-semibold'>
                          {ellipse(coin.item.name)}
                        </span>
                        <span className='text-sm'>{coin.item.symbol}</span>
                      </div>
                    </div>
                    <div>
                      <Image
                        src={coin.item.data.sparkline}
                        height={100}
                        width={100}
                        alt={coin.item.name}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className='p-5'>
        <div>Trending NFTs</div>
        <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {nfts.map((nft) => (
            <Link key={nft.id} href={`/platform/nfts/${nft.id}`}>
              <Card key={nft.id} className={`relative h-[8rem]`}>
                <CardContent className='p-5'>
                  <div className='flex items-center gap-10'>
                    <div className='flex items-center w-full gap-5'>
                      <Image
                        className='rounded-full'
                        width={48}
                        height={156}
                        style={{ objectFit: 'contain' }}
                        src={nft.thumb}
                        alt={nft.name}
                      />
                      <div className='flex-col flex'>
                        <span className='font-semibold'>
                          {ellipse(nft.name)}
                        </span>
                        <span className='text-sm'>{nft.symbol}</span>
                      </div>
                    </div>
                    <div>
                      <Image
                        src={nft.data.sparkline}
                        height={100}
                        width={100}
                        alt={nft.name}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;

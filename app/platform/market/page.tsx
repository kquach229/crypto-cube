'use client';
import ReusablePaper from '@/app/components/ReusablePaper';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Search } from 'lucide-react';

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_capchange_percentage_24h?: number; // Sometimes missing
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
};

const fetchCryptoMarket = async (): Promise<Coin[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
  );
  const data: Coin[] = await response.json();

  return data.map((coin: Coin) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    rank: coin.market_cap_rank,
    image: coin.image,
    current_price: coin.current_price,
    market_cap: coin.market_cap,
    circulating_supply: coin.circulating_supply,
    price_change_24h: coin.price_change_24h,
    price_change_percentage_24h: coin.price_change_percentage_24h,
  }));
};

const MarketPage = () => {
  const {
    data: coinsData = [],
    error,
    isLoading,
  } = useQuery<Coin[]>({
    queryKey: ['cryptomarket'],
    queryFn: fetchCryptoMarket,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className='gap-5 flex flex-col'>
      <ReusablePaper
        styles={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <div>
          <div>Market Overview</div>
        </div>
        <div className='relative flex items-center'>
          <Search className='absolute left-2.5 h-4 w-4 text-primary' />
          <input
            type='search'
            placeholder='Search for a coin'
            className='pl-8 border-none shadow-none w-[300px]'
          />
        </div>
      </ReusablePaper>
      <ReusablePaper>
        <div>
          <Table>
            <TableCaption>
              A list of your favorite coins - Powered by CoinGecko
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>24h Volume</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>24h % Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coinsData.map((coin) => (
                <TableRow key={coin.id}>
                  <TableCell>{coin.rank}</TableCell>
                  <TableCell className='flex gap-2'>
                    <Image
                      className='rounded-3xl'
                      src={coin.image}
                      height={35}
                      width={35}
                      alt={coin.name}
                    />
                    <div className='flex flex-col justify-center'>
                      <span className='font-semibold'>{coin.name}</span>
                      <span className='text-xs'>
                        {coin.symbol.toUpperCase()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{coin.market_cap}</TableCell>
                  <TableCell>{coin.price_change_24h}</TableCell>
                  <TableCell>{coin.current_price}</TableCell>
                  <TableCell>{coin.price_change_percentage_24h}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ReusablePaper>
    </div>
  );
};

export default MarketPage;

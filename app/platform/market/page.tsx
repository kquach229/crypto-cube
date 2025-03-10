'use client';
import ReusablePaper from '@/app/components/ReusablePaper';
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
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
import {
  ellipse,
  formatPrice,
  friendlyFormatter,
  percentageFormatter,
} from '@/src/lib/utils';
import SparklineChart from '@/app/components/SparklineChart';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

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
  sparkline_in_7d: {
    price: number[];
    symbol: string;
    total_supply: number;
    total_volume: number;
  };
  last_updated: string;
};

const fetchCryptoMarket = async (): Promise<Coin[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&days=7&interval=daily'
  );
  const data: Coin[] = await response.json();
  console.log(data, 'data');

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
    sparkline_in_7d: coin.sparkline_in_7d.price,
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
    refetchInterval: 60000,
    staleTime: 0,
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('query', searchTerm);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const searchQuery = searchParams.get('query')?.toLocaleLowerCase() || '';

  return (
    <div className='gap-5 flex flex-col'>
      <ReusablePaper
        styles={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <div>
          <div className='font-semibold'>Market Overview</div>
        </div>
        <div className='relative flex items-center'>
          <Search className='absolute left-2.5 h-4 w-4 text-primary' />
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type='search'
            placeholder='Search for a coin'
            className='pl-8 border-none shadow-none w-[300px]'
            defaultValue={searchParams.get('query')?.toString()}
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
                <TableHead>Circulating Supply</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>24h Price Change</TableHead>
                <TableHead>24h % Change</TableHead>
                <TableHead>7D Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coinsData
                .filter(
                  (coin) =>
                    coin.name.toLowerCase().includes(searchQuery) ||
                    coin.symbol.toLowerCase().includes(searchQuery)
                )
                .map((coin) => (
                  <TableRow key={coin.id}>
                    <TableCell>{coin.rank}</TableCell>
                    <TableCell>
                      <div className='flex items-center align-middle gap-2 w-[10rem]'>
                        <Image
                          className='rounded-3xl'
                          src={coin.image}
                          height={35}
                          width={35}
                          alt={coin.name}
                        />
                        <div className='flex flex-col justify-around'>
                          <span className='font-semibold'>
                            {ellipse(coin.name)}
                          </span>
                          <span className='text-xs'>
                            {coin.symbol.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      ${friendlyFormatter.format(coin.market_cap)}
                    </TableCell>
                    <TableCell>
                      {friendlyFormatter.format(coin.circulating_supply)}
                    </TableCell>
                    <TableCell>
                      {formatPrice('USD', coin.current_price)}
                    </TableCell>
                    <TableCell
                      className={
                        coin.price_change_24h > 0
                          ? 'text-green-500'
                          : 'text-red-500'
                      }>
                      {formatPrice('USD', coin.price_change_24h)}
                    </TableCell>
                    <TableCell
                      className={
                        coin.price_change_percentage_24h > 0
                          ? 'text-green-500'
                          : 'text-red-500'
                      }>
                      {percentageFormatter(coin.price_change_percentage_24h)}
                    </TableCell>
                    <TableCell>
                      <div className='max-h-10'>
                        <SparklineChart data={coin.sparkline_in_7d} />
                      </div>
                    </TableCell>
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

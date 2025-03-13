'use client';
import ReusablePaper from '@/app/components/ReusablePaper';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
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
import Loading from '@/app/loading';
import Error from '@/app/error';

export const dynamic = 'force-dynamic';

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank?: number; // Make market_cap_rank optional
  rank?: number; // Make rank optional to handle undefined case
  fully_diluted_valuation?: number | null; // Make fully_diluted_valuation optional
  total_volume?: number; // Make total_volume optional
  high_24h?: number; // Make high_24h optional
  low_24h?: number; // Make low_24h optional
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_capchange_percentage_24h?: number; // Make market_capchange_percentage_24h optional
  circulating_supply: number;
  total_supply?: number | null; // Make total_supply optional
  max_supply?: number | null; // Make max_supply optional
  ath?: number; // Make ath optional
  ath_change_percentage?: number; // Make ath_change_percentage optional
  ath_date?: string; // Make ath_date optional
  atl?: number; // Make atl optional
  atl_change_percentage?: number; // Make atl_change_percentage optional
  atl_date?: string; // Make atl_date optional
  roi?: { times: number; currency: string; percentage: number } | null; // Make roi optional
  sparkline_in_7d: number[];
  last_updated: string;
};

const fetchCryptoMarket = async (): Promise<Coin[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&days=7&interval=daily'
  );
  const data = await response.json();
  return data.map((coin: any) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    rank: coin.market_cap_rank || undefined, // Handle undefined case for rank
    image: coin.image,
    current_price: coin.current_price,
    market_cap: coin.market_cap,
    circulating_supply: coin.circulating_supply,
    price_change_24h: coin.price_change_24h,
    price_change_percentage_24h: coin.price_change_percentage_24h,
    sparkline_in_7d: coin.sparkline_in_7d?.price ?? [], // <-- Fix applied
    last_updated: coin.last_updated,
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
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('query', searchTerm);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const searchQuery = searchParams.get('query')?.toLocaleLowerCase() || '';

  const handleClickCoinRow = (coinId: string) => {
    push(`/platform/market/${coinId}`);
  };

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
                  <TableRow
                    key={coin.id}
                    onClick={() => handleClickCoinRow(coin.id)}
                    className='w-full cursor-pointer'>
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

'use client';
import ReusablePaper from '@/app/components/ReusablePaper';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
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
import {
  ellipse,
  formatPrice,
  friendlyFormatter,
  percentageFormatter,
} from '@/src/lib/utils';
import SparklineChart from '@/app/components/SparklineChart';
import Loading from '@/app/loading';
import Error from '@/app/error';
import ReusableSearch from '@/app/components/ReusableSearch';
import WishlistStar from '@/app/components/WishlistStar';
import { useMarketDetails, useUserDetails } from '@/hooks/useQueryHooks';

const MarketPage = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const {
    data: marketData,
    isLoading: isMarketDataLoading,
    error: isMarketDataError,
  } = useMarketDetails();

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useUserDetails();

  if (isMarketDataLoading || isUserDataLoading) return <Loading />;
  if (isMarketDataError || isUserDataError) return <Error />;

  const searchQuery = searchParams.get('query')?.toLocaleLowerCase() || '';

  const handleClickCoinRow = (coinId: string) => {
    push(`/platform/market/${coinId}`);
  };

  // Convert user's watchlist into a Set for faster lookup
  const initialWatchlist = new Set(
    userData.watchlistCoins.map((item) => item.id.toLowerCase())
  );

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
          <ReusableSearch placeholder='Search for a Coin' />
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
                <TableCell />
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
              {marketData
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
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <WishlistStar
                        coinId={coin.id}
                        initialIsWishlisted={initialWatchlist.has(
                          coin.id.toLowerCase()
                        )}
                      />
                    </TableCell>
                    <TableCell align='center'>{coin.rank}</TableCell>
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
                        <SparklineChart
                          data={
                            Array.isArray(coin.sparkline_in_7d)
                              ? []
                              : coin.sparkline_in_7d.price
                          }
                        />
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

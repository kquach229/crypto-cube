'use client';
import React from 'react';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from '@/components/ui/table';
import WishlistStar from '@/app/components/WishlistStar';
import Image from 'next/image';
import {
  ellipse,
  formatPrice,
  friendlyFormatter,
  percentageFormatter,
} from '@/src/lib/utils';
import { useMarketDetails } from '@/hooks/useQueryHooks';
import Loading from '@/app/loading';
import Error from '@/app/error';
import SparklineChart from '@/app/components/SparklineChart';
import { useRouter } from 'next/navigation';

const WishlistSection = ({
  initialWatchlist,
  onRemove,
}: {
  initialWatchlist: { id: string }[];
  onRemove?: (id: string) => void;
}) => {
  const { data, isLoading, error } = useMarketDetails();
  const { push } = useRouter();
  const watchlistIds = initialWatchlist.map((item) => item.id);
  if (!initialWatchlist || initialWatchlist.length === 0) {
    return <p>No wishlist found.</p>;
  }

  const handleClickCoinRow = (coinId: string) => {
    push(`/platform/market/${coinId}`);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className='gap-5 flex flex-col'>
      <Table>
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
          {data
            ?.filter((item) =>
              watchlistIds.some(
                (id: string) =>
                  id.toLowerCase().trim() === item.id.toLowerCase().trim()
              )
            )
            .map((coin) => (
              <TableRow
                key={coin.id}
                onClick={() => handleClickCoinRow(coin.id)}
                className='w-full cursor-pointer'>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <WishlistStar
                    coinId={coin.id}
                    initialIsWishlisted={true}
                    onRemove={onRemove}
                  />
                </TableCell>
                <TableCell align='center'>{coin.rank}</TableCell>
                <TableCell>
                  <div className='flex items-center align-middle gap-2 w-[10rem]'>
                    <Image
                      className='rounded-3xl'
                      src={coin.image}
                      height={36}
                      width={36}
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
                <TableCell>{formatPrice('USD', coin.current_price)}</TableCell>
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
  );
};

export default WishlistSection;

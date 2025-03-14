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

const fetchNfts = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/nfts/list');
  const data = await response.json();
  return data;
};

const NftsPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getnfts'],
    queryFn: fetchNfts,
  });

  console.log('data', data);

  if (isLoading) return <Loading />;
  if (error) return <div>Error...</div>;
  return (
    <div className='gap-5 flex flex-col'>
      <ReusablePaper
        styles={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <div>
          <div className='font-semibold'>NFTs Overview</div>
        </div>
        <div className='relative flex items-center'>
          <Search className='absolute left-2.5 h-4 w-4 text-primary' />
          <input
            // onChange={(e) => handleSearch(e.target.value)}
            type='search'
            placeholder='Search for a coin'
            className='pl-8 border-none shadow-none w-[300px]'
            // defaultValue={searchParams.get('query')?.toString()}
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
            {/* <TableBody>
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
            </TableBody> */}
          </Table>
        </div>
      </ReusablePaper>
    </div>
  );
};

export default NftsPage;

import {
  formatPrice,
  friendlyFormatter,
  getHostName,
  percentageFormatter,
} from '@/src/lib/utils';
import Link from 'next/link';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDownIcon } from 'lucide-react';
import { Explorer, INFTDetailsProps } from '@/app/types/types';

const NftDetailsSidebar = ({ data }: { data: INFTDetailsProps }) => {
  const {
    name,
    symbol,
    total_supply,
    market_cap_rank,
    floor_price_24h_percentage_change,
    floor_price_7d_percentage_change,
    floor_price_14d_percentage_change,
    floor_price_30d_percentage_change,
    floor_price_1y_percentage_change,
    links,
    explorers,
    volume_24h_percentage_change,
    market_cap,
    user_favorites_count,
    number_of_unique_addresses,
    ath,
    ath_date,
  } = data;
  return (
    <div className={'w-full flex flex-col gap-5'}>
      {/* <div className='text-lg text-center font-bold mb-5'>{name} Stats</div> */}
      <div className='flex justify-between flex-col w-full'>
        <h1 className='font-semibold mb-5'>Key Metrics</h1>
        <div className='flex justify-between'>
          <span>Market Cap Rank</span>
          <span>{market_cap_rank}</span>
        </div>

        <div className='flex justify-between'>
          <span>Market Cap</span>
          <span>{friendlyFormatter.format(market_cap.usd)}</span>
        </div>

        <div className='flex justify-between'>
          <span>Market Total Supply</span>
          <span>{friendlyFormatter.format(total_supply)}</span>
        </div>

        <div className='flex justify-between'>
          <span>All Time High</span>
          <span>{formatPrice('USD', ath.usd)}</span>
        </div>

        <div className='flex justify-between'>
          <span>All Time High Date</span>
          <span>
            {ath_date.usd && new Date(ath_date.usd).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div>
        <div className='flex justify-between'>
          <span>Floor Price Change 24h</span>
          <span
            className={
              floor_price_24h_percentage_change.usd >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {percentageFormatter(floor_price_24h_percentage_change.usd)}
          </span>
        </div>

        <div className='flex justify-between'>
          <span>Floor Price Change 7D</span>
          <span
            className={
              floor_price_7d_percentage_change.usd >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {percentageFormatter(floor_price_7d_percentage_change.usd)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span>Floor Price Change 14D</span>
          <span
            className={
              floor_price_14d_percentage_change.usd >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {percentageFormatter(floor_price_14d_percentage_change.usd)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span>Floor Price Change 30D</span>
          <span
            className={
              floor_price_30d_percentage_change.usd >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {percentageFormatter(floor_price_30d_percentage_change.usd)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span>Floor Price Change 1Y</span>
          <span
            className={
              floor_price_1y_percentage_change.usd >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {percentageFormatter(floor_price_1y_percentage_change.usd)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span>Volume 24h Change</span>
          <span
            className={
              volume_24h_percentage_change.usd >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {percentageFormatter(volume_24h_percentage_change.usd)}
          </span>
        </div>
      </div>

      <div className='flex justify-between flex-col w-full'>
        <h1 className='font-semibold mb-5'>Info</h1>
        <div className='flex justify-between'>
          <span>Name</span>
          <span>{name}</span>
        </div>
        <div className='flex justify-between'>
          <span>Symbol</span>
          <span>{symbol.toUpperCase()}</span>
        </div>

        <div className='flex justify-between'>
          <span>Links</span>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex text-center gap-2'>
              <span className='text-sm'>Sites</span>
              <ArrowDownIcon size={12} className='mt-1' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.keys(links).map((link) => (
                <Link
                  className='cursor-pointer'
                  href={links[link]}
                  target='__blank'
                  key={link}>
                  <DropdownMenuItem>
                    {getHostName(links[link])}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex justify-between'>
          <span>Explorers</span>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex text-center gap-2'>
              <span className='text-sm'>Explorers</span>
              <ArrowDownIcon size={12} className='mt-1' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {explorers.map((explorer: Explorer) => (
                <Link
                  className='cursor-pointer'
                  href={explorer.name}
                  target='__blank'
                  key={explorer.name}>
                  <DropdownMenuItem>
                    {getHostName(explorer.name)}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex justify-between'>
          <span>Favorites Count</span>
          <span>{friendlyFormatter.format(user_favorites_count)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Unique Address Count</span>
          <span>{friendlyFormatter.format(number_of_unique_addresses)}</span>
        </div>

        {/* <div className='flex justify-between'>
          <span>Block Time</span>
          <span>
            {block_time_in_minutes}{' '}
            {block_time_in_minutes > 1 ? 'minutes' : 'minute'}
          </span>
        </div>
        <div className='flex justify-between'>
          <span>Genesis Date</span>
          <span>{genesis_date || 'N/A'}</span>
        </div> */}
      </div>
    </div>
  );
};

export default NftDetailsSidebar;

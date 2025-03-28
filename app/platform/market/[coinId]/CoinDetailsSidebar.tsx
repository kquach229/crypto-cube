import {
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

// Type definitions for nested objects
interface MarketData {
  total_supply: number;
  circulating_supply: number;
  price_change_percentage_24h: number;
  price_change_percentage_1y: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
}

interface Links {
  homepage: string[];
  blockchain_site: string[];
}

interface CommunityData {
  twitter_followers: number;
}

interface CoinDetails {
  name: string;
  categories: string[];
  block_time_in_minutes: number;
  genesis_date: string | null;
  links: Links;
  market_data: MarketData;
  symbol: string;
  watchlist_portfolio_users: number;
  usd: number;
  market_cap_rank: number;
  community_data: CommunityData;
}

// Define the props type for the component
interface CoinDetailsSidebarProps {
  allDetails: CoinDetails;
}

const CoinDetailsSidebar: React.FC<CoinDetailsSidebarProps> = ({
  allDetails,
}) => {
  const {
    name,

    block_time_in_minutes,
    genesis_date,
    links,
    market_data,
    symbol,
    watchlist_portfolio_users,
    market_cap_rank,
    community_data,
    market_data: {
      price_change_percentage_24h,
      price_change_percentage_1y,
      price_change_percentage_7d,
      price_change_percentage_14d,
      price_change_percentage_30d,
    },
  } = allDetails;

  return (
    <div className={'w-full flex flex-col gap-5'}>
      <div className='text-lg text-center font-bold mb-5'>{name} Stats</div>
      <div className='flex justify-between flex-col w-full'>
        <h1 className='font-semibold mb-5'>Key Metrics</h1>
        <div className='flex justify-between text-sm'>
          <span>Market Cap Rank</span>
          <span>{market_cap_rank}</span>
        </div>

        <div className='flex justify-between text-sm'>
          <span>Market Total Supply</span>
          <span>{friendlyFormatter.format(market_data.total_supply)}</span>
        </div>

        <div className='flex justify-between text-sm'>
          <span>Circulating Supply</span>
          <span>
            {friendlyFormatter.format(market_data.circulating_supply)}
          </span>
        </div>
      </div>

      <div>
        <div className='flex justify-between text-sm'>
          <span>Price Change 24h</span>
          <span
            className={
              price_change_percentage_24h >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {percentageFormatter(price_change_percentage_24h)}
          </span>
        </div>

        <div className='flex justify-between text-sm'>
          <span>Price Change 7D</span>
          <span
            className={
              price_change_percentage_7d >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {percentageFormatter(price_change_percentage_7d)}
          </span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Price Change 14D</span>
          <span
            className={
              price_change_percentage_14d >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {percentageFormatter(price_change_percentage_14d)}
          </span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Price Change 30D</span>
          <span
            className={
              price_change_percentage_30d >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {percentageFormatter(price_change_percentage_30d)}
          </span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Price Change 1Y</span>
          <span
            className={
              price_change_percentage_1y >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }>
            {percentageFormatter(price_change_percentage_1y)}
          </span>
        </div>
      </div>

      <div className='flex justify-between flex-col w-full'>
        <h1 className='font-semibold mb-5'>Info</h1>
        <div className='flex justify-between text-sm'>
          <span>Name</span>
          <span>{name}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Symbol</span>
          <span>{symbol.toUpperCase()}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Homepage</span>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex text-center gap-2'>
              <span className='text-sm'>Sites</span>
              <ArrowDownIcon size={12} className='mt-1' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {links.homepage.map((site) => (
                <Link
                  className='cursor-pointer'
                  href={site}
                  target='__blank'
                  key={site}>
                  <DropdownMenuItem>{getHostName(site)}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Blockchain Sites</span>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex text-center gap-2'>
              <span className='text-sm'>Sites</span>
              <ArrowDownIcon size={12} className='mt-1' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {links.blockchain_site.map((site) => (
                <Link
                  className='cursor-pointer'
                  href={site}
                  target='__blank'
                  key={site}>
                  <DropdownMenuItem>{getHostName(site)}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex justify-between text-sm'>
          <span>Twitter Followers</span>
          <span>
            {friendlyFormatter.format(community_data.twitter_followers)}
          </span>
        </div>

        <div className='flex justify-between text-sm'>
          <span>Watchlist Portfolio</span>
          <span>{friendlyFormatter.format(watchlist_portfolio_users)}</span>
        </div>

        <div className='flex justify-between text-sm'>
          <span>Block Time</span>
          <span>
            {block_time_in_minutes}{' '}
            {block_time_in_minutes > 1 ? 'minutes' : 'minute'}
          </span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Genesis Date</span>
          <span>{genesis_date || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default CoinDetailsSidebar;

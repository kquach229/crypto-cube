'use client';
import ReusablePaper from '@/app/components/ReusablePaper';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Loading from '@/app/loading';
import Error from '@/app/error';
import { NftListItem } from '@/app/types/types';
import ReusableSearch from '@/app/components/ReusableSearch';

export const dynamic = 'force-dynamic';

const fetchNfts = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/nfts/list?limit=200'
  );
  const data = await response.json();
  return data;
};

const NftsPage = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['getnfts'],
    queryFn: fetchNfts,
  });

  const handleClickCoinRow = (nftId: string) => {
    push(`/platform/nfts/${nftId}`);
  };

  const searchQuery = searchParams.get('query')?.toLocaleLowerCase() || '';

  if (isLoading) return <Loading />;
  if (error) return <Error />;
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
        <ReusableSearch placeholder='Search for an NFT' />
      </ReusablePaper>
      <ReusablePaper>
        <div>
          <Table>
            <TableCaption>
              A list of your favorite coins - Powered by CoinGecko
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>

                <TableHead>Asset Platform</TableHead>

                <TableHead>Symbol</TableHead>
                <TableHead>Contract Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data
                .filter(
                  (item: NftListItem) =>
                    item.name.toLowerCase().includes(searchQuery) ||
                    item.symbol.toLowerCase().includes(searchQuery)
                )
                .map((nft: NftListItem) => (
                  <TableRow
                    key={nft.id}
                    onClick={() => handleClickCoinRow(nft.id)}
                    className='w-full cursor-pointer h-[100]'>
                    <TableCell>{nft.name || 'N/A'}</TableCell>
                    <TableCell>
                      {nft.asset_platform_id.toUpperCase() || 'N/A'}
                    </TableCell>
                    <TableCell>{nft.symbol || 'N/A'}</TableCell>
                    <TableCell>{nft.contract_address || 'N/A'}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </ReusablePaper>
    </div>
  );
};

export default NftsPage;

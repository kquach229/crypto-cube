'use client';
import ReusablePaper from '@/app/components/ReusablePaper';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';
import Loading from '@/app/loading';
import Error from '@/app/error';
import { NftListItem } from '@/app/types/types';

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
  const { data, isLoading, error } = useQuery({
    queryKey: ['getnfts'],
    queryFn: fetchNfts,
  });

  const handleClickCoinRow = (nftId: string) => {
    push(`/platform/nfts/${nftId}`);
  };

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
                <TableHead>Name</TableHead>

                <TableHead>Asset Platform</TableHead>

                <TableHead>Symbol</TableHead>
                <TableHead>Contract Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((nft: NftListItem) => (
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

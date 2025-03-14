import { useQuery } from '@tanstack/react-query';
import { INFTDetailsProps } from '@/app/types/types';

const fetchNftDetails = async (nftId: string): Promise<INFTDetailsProps> => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/nfts/${nftId}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch NFT details');
  }

  return response.json();
};

export const useNftDetails = (nftId?: string) => {
  return useQuery<INFTDetailsProps>({
    queryKey: ['fetchnft', nftId], // Ensures caching works per NFT ID
    queryFn: () => fetchNftDetails(nftId as string),
    enabled: !!nftId, // Prevents running the query if nftId is undefined
    staleTime: 60000,
  });
};

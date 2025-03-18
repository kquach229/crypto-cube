import { useQuery } from '@tanstack/react-query';
import { Coin, INFTDetailsProps } from '@/app/types/types';

// Get NFT Details
const fetchNftDetails = async (nftId: string): Promise<INFTDetailsProps> => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/nfts/${nftId}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch NFT details');
  }

  return response.json();
};

const fetchUserData = async () => {
  const response = await fetch('/api/user');
  const data = await response.json();
  return data;
};

export const useNftDetails = (nftId?: string) => {
  return useQuery<INFTDetailsProps>({
    queryKey: ['fetchnft', nftId], // Ensures caching works per NFT ID
    queryFn: () => fetchNftDetails(nftId as string),
    enabled: !!nftId, // Prevents running the query if nftId is undefined
    staleTime: 600000,
  });
};

// Get list of nft

export const fetchNftList = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/nfts/list');
  const data = await response.json();
  return data;
};

// Get coins
export const fetchCryptoMarket = async (): Promise<Coin[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&days=7&interval=daily'
  );
  const data = await response.json();
  return data.map((coin: Coin) => ({
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
    sparkline_in_7d: coin.sparkline_in_7d ?? [],
    last_updated: coin.last_updated,
  }));
};

export const useMarketDetails = () => {
  return useQuery<Coin[]>({
    queryKey: ['cryptomarket'], // Ensures caching works per NFT ID
    queryFn: fetchCryptoMarket,
    refetchInterval: 60000,
  });
};

export const useUserDetails = () => {
  return useQuery({
    queryKey: ['userdetails'],
    queryFn: fetchUserData,
  });
};

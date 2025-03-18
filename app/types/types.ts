export interface ChartDataResponse {
  prices: [number, number][]; // [timestamp, price]
}

export interface ReusableHistoryChartProps {
  coinId: string;
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface Localization {
  en: string;
  de: string;
  es: string;
  fr: string;
  it: string;
  [key: string]: string;
}

export interface CommunityData {
  facebook_likes: number | null;
  reddit_accounts_active_48h: number;
  reddit_average_comments_48h: number;
  reddit_average_posts_48h: number;
  reddit_subscribers: number;
  telegram_channel_user_count: number | null;
  twitter_followers: number;
}

export interface MarketData {
  current_price: {
    usd: number;
  };
}

export interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
}

export interface INFTDetailsProps {
  id: string;
  contract_address: string;
  asset_platform_id: string;
  name: string;
  symbol: string;
  image: {
    small: string;
    small_2x: string;
  };
  banner_image: string;
  description: string;
  native_currency: string;
  native_currency_symbol: string;
  market_cap_rank: number;
  floor_price: {
    native_currency: number;
    usd: number;
  };
  market_cap: {
    native_currency: number;
    usd: number;
  };
  volume_24h: {
    native_currency: number;
    usd: number;
  };
  floor_price_in_usd_24h_percentage_change: number;
  floor_price_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };
  market_cap_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };
  volume_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };
  total_supply: number;
  floor_price_7d_percentage_change: {
    usd: number;
    native_currency: number;
  };
  floor_price_14d_percentage_change: {
    usd: number;
    native_currency: number;
  };
  floor_price_30d_percentage_change: {
    usd: number;
    native_currency: number;
  };
  floor_price_60d_percentage_change: {
    usd: number;
    native_currency: number;
  };
  floor_price_1y_percentage_change: {
    usd: number;
    native_currency: number;
  };

  explorers: Explorer[];
  user_favorites_count: number;
  ath: {
    native_currency: number;
    usd: number;
  };
  ath_date: {
    native_currency: string;
    usd: string;
  };
  links: {
    [key: string]: string;
  };
  number_of_unique_addresses: number;
}

export type Explorer = {
  name: string;
  link: string;
};

export type NftListItem = {
  asset_platform_id: string;
  contract_address: string;
  id: string;
  name: string;
  symbol: string;
};

export type Coin = {
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
  sparkline_in_7d: { price: number[] } | []; // Ensure it's an object with a `price` array
  last_updated: string;
};

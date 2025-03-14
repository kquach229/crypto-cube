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

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: string | null;
  block_time_in_minutes: number;
  categories: string[];
  community_data: CommunityData;
  country_origin: string;
  description: Localization;
  detail_platforms: Record<string, object>;
  developer_data: DeveloperData;
  genesis_date: string;
  hashing_algorithm: string;
  image: Image;
  last_updated: string;
  links: {
    homepage: string[];
    whitepaper: string;
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
  };
  localization: Localization;
  market_cap_rank: number;
  market_data: MarketData;
  platforms: Record<string, string>;
  preview_listing: boolean;
  public_notice: string | null;
  sentiment_votes_down_percentage: number;
  sentiment_votes_up_percentage: number;
  usd: number;
  watchlist_portfolio_users: number;
  web_slug: string;
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

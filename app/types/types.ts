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
  total_value_locked: number | null;
  mcap_to_tvl_ratio: number | null;
  fdv_to_tvl_ratio: number | null;
  roi: number | null;
  [key: string]: any;
}

export interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
}

export interface Ticker {
  [key: string]: any; // Placeholder for the actual ticker data structure.
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
  status_updates: any[]; // You can define this more specifically based on the data you have
  tickers: Ticker[];
  usd: number;
  watchlist_portfolio_users: number;
  web_slug: string;
}

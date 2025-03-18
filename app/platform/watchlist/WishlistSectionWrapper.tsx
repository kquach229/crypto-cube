'use client';

import { useState } from 'react';
import WishlistSection from './WishlistSection';

const WishlistSectionWrapper = ({ initialWatchlist }) => {
  const [watchlist, setWatchlist] = useState(initialWatchlist);

  const handleRemove = (coinId) => {
    setWatchlist((prev) => prev.filter((coin) => coin.id !== coinId));
  };

  return (
    <WishlistSection initialWatchlist={watchlist} onRemove={handleRemove} />
  );
};

export default WishlistSectionWrapper;

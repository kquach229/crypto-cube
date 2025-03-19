'use client';

import { useState } from 'react';
import WishlistSection from './WishlistSection';

const WishlistSectionWrapper = ({
  initialWatchlist,
}: {
  initialWatchlist: { id: string }[];
}) => {
  const [watchlist, setWatchlist] = useState(initialWatchlist);

  const handleRemove = (coinId: string) => {
    setWatchlist((prev: { id: string }[]) =>
      prev.filter((coin) => coin.id !== coinId)
    );
  };

  return (
    <WishlistSection initialWatchlist={watchlist} onRemove={handleRemove} />
  );
};

export default WishlistSectionWrapper;

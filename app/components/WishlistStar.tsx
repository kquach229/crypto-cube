'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

const WishlistStar = ({ coinId, initialIsWishlisted, onRemove }) => {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);

  const toggleWishlist = async () => {
    const newStatus = !isWishlisted;
    setIsWishlisted(newStatus); // Optimistic update

    try {
      const response = await fetch('/api/wishlist', {
        method: newStatus ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coinId }),
      });

      if (!response.ok) throw new Error('Failed to update wishlist');

      if (!newStatus && onRemove) {
        onRemove(coinId); // Notify parent component of removal
      }
    } catch (error) {
      console.error(error);
      setIsWishlisted(!newStatus); // Revert on failure
    }
  };

  return (
    <Star
      className={`cursor-pointer ${
        isWishlisted ? 'fill-yellow-300 text-yellow-600' : 'text-gray-400'
      }`}
      onClick={toggleWishlist}
    />
  );
};

export default WishlistStar;

'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface WishlistContextType {
  wishlistItems: number[];
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);

  const toggleWishlist = useCallback((productId: number) => {
    setWishlistItems((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  const isWishlisted = useCallback(
    (productId: number) => {
      return wishlistItems.includes(productId);
    },
    [wishlistItems]
  );

  const value = useMemo(
    () => ({
      wishlistItems,
      toggleWishlist,
      isWishlisted,
    }),
    [wishlistItems, toggleWishlist, isWishlisted]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

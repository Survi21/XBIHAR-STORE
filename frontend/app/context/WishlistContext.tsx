
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type WishlistItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];

  addToWishlist: (
    product: WishlistItem
  ) => void;
};

const WishlistContext =
  createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [wishlist, setWishlist] = useState<
    WishlistItem[]
  >([]);

  const addToWishlist = (
    product: WishlistItem
  ) => {
    setWishlist((prev) => [...prev, product]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {

  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error("wishlist error");
  }

  return context;
}
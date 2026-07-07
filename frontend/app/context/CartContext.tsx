
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  originalPrice: number,
  image: string;
  size?: string;
  quantity: number;
};




type CartContextType = {
  cart: CartItem[];

  deliveryCharge: number;

  setDeliveryCharge: (
    charge: number
  ) => void;

  addToCart: (product: CartItem) => void;

  removeFromCart: (id: number) => void;

  increaseQuantity: (id: number) => void;

  decreaseQuantity: (id: number) => void;
};


const CartContext =
  createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);


  const [deliveryCharge, setDeliveryCharge] =
  useState(0);
  

  useEffect(() => {
    console.log(
      "CONTEXT DELIVERY =",
      deliveryCharge
    );
  }, [deliveryCharge]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // Add To Cart
  const addToCart = (product: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.size === product.size
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [...prev, product];
    });
  };

  // Remove Item
  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Increase Quantity
  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      // value={{
      //   cart,
      //   addToCart,
      //   removeFromCart,
      //   increaseQuantity,
      //   decreaseQuantity,
       

      // }}
      // value={{
      //   cart,
      
      //   deliveryCharge,
      //   setDeliveryCharge,
      
      //   addToCart,
      //   removeFromCart,
      //   increaseQuantity,
      //   decreaseQuantity,
      // }}



      value={{
        cart,
        deliveryCharge,
        setDeliveryCharge,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export type { CartItem, CartContextType };
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
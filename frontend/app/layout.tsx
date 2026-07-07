

import {
  Geist,
  Geist_Mono,
  JetBrains_Mono,
} from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

import { GoogleOAuthProvider } from "@react-oauth/google";

import "@fontsource/orbitron/700.css";
import { CartProvider } from "@/app/context/CartContext";
import { WishlistProvider } from "@/app/context/WishlistContext";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XBIHAR",
  description: "Crafted in Pride",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-white">

        <GoogleOAuthProvider clientId="754775338125-o0jqgikp1bvdse7ugerna931a0mv3a7p.apps.googleusercontent.com">

          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>

        </GoogleOAuthProvider>

      </body>
    </html>
  );
}

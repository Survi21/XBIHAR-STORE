

// import {
//   Geist,
//   Geist_Mono,
//   JetBrains_Mono,
// } from "next/font/google";

// import type { Metadata } from "next";
// import "./globals.css";
// import { cn } from "@/lib/utils";

// import { GoogleOAuthProvider } from "@react-oauth/google";

// import "@fontsource/orbitron/700.css";
// import { CartProvider } from "@/app/context/CartContext";
// import { WishlistProvider } from "@/app/context/WishlistContext";

// const jetbrainsMono = JetBrains_Mono({
//   subsets: ["latin"],
//   variable: "--font-mono",
// });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "XBIHAR",
//   description: "Crafted in Pride",
// };

// // 🌟 NAYA FORCED VIEWPORT ENGINE: Jo mobile phone par website ko zoom hone ya text ko cutne se rokega
// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     // Humne yahan fonts ke variables ko inject kar diya taaki font size break na ho
//     <html 
//       lang="en" 
//       className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col bg-black text-white overflow-x-hidden w-full selection:bg-white selection:text-black">

//         <GoogleOAuthProvider clientId="754775338125-o0jqgikp1bvdse7ugerna931a0mv3a7p.apps.googleusercontent.com">
//           <CartProvider>
//             <WishlistProvider>
//               {/* Har page ko full mobile layout structure me wrap karne ke liye flex-1 main block */}
//               <main className="flex-1 w-full max-w-full box-border">
//                 {children}
//               </main>
//             </WishlistProvider>
//           </CartProvider>
//         </GoogleOAuthProvider>

//       </body>
//     </html>
//   );
// }



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

// 🚨 1. GOOGLE ANALYTICS IMPORT ADD KIYA HAI
import { GoogleAnalytics } from "@next/third-parties/google";

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
  icons: {
    icon: "/icon.png.PNG",
  },
};

// 🌟 NAYA FORCED VIEWPORT ENGINE: Jo mobile phone par website ko zoom hone ya text ko cutne se rokega
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Humne yahan fonts ke variables ko inject kar diya taaki font size break na ho
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white overflow-x-hidden w-full selection:bg-white selection:text-black">

        <GoogleOAuthProvider clientId="754775338125-o0jqgikp1bvdse7ugerna931a0mv3a7p.apps.googleusercontent.com">
          <CartProvider>
            <WishlistProvider>
              {/* Har page ko full mobile layout structure me wrap karne ke liye flex-1 main block */}
              <main className="flex-1 w-full max-w-full box-border">
                {children}
              </main>
            </WishlistProvider>
          </CartProvider>
        </GoogleOAuthProvider>

        {/* 🚨 2. GOOGLE ANALYTICS TAG YAHAN BODY KE BIKUL KHATAM HONE SE PEHLE LAGAYA HAI */}
        {/* Note: "G-XXXXXXXXXX" ko apni exact Google Analytics Measurement ID se replace karein */}
        <GoogleAnalytics gaId="G-5NH4F6F7TK" />

      </body>
    </html>
  );
}
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Suspense } from 'react';
import Provider from '@/components/provider';

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"], // Lotin shrift subsetini yuklash
  weight: ["400", "700"], // Faqat kerakli vaznlarni yuklash
  variable: "--font-inter", // CSS da ishlatish uchun o'zgaruvchi yaratish
});
export const metadata: Metadata = {
  title: 'Hajj permit',
  description: 'Hajj permit'
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={`${inter.className}`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
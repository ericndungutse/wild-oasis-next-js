import React from 'react';
import Logo from '@/app/_components/Logo';
import Navigation from '@/app/_components/Navigation';
import '@/app/_styles/globals.css';
import { Josefin_Sans } from 'next/font/google';
import Header from './_components/Header';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  // title: 'The Wild Oasis',
  title: {
    template: '%s | The Wild Oasis',
    default: 'Welcome | The Wild Oasis',
  },
  // Can Be overriten by the page
  description:
    'Luxury cabin hotel,located in the heart of the Italian Dolomites, surrounded by beatiful mountains and dark forests',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.className} relative antialiased min-h-screen bg-primary-800 text-primary-100 flex flex-col`}
      >
        <Header />
        {/* FLex-1: Take the entire available width */}
        {/* Grid makes it take entire remaining v space */}
        <div className='flex-1 px-8 py-12 grid'>
          <main className='max-w-7xl mx-auto h-full w-full'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer} from 'react-toastify';

import { Theme } from "@radix-ui/themes";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme>
          <ToastContainer autoClose={1500}/>
          {children}
        </Theme>
      </body>
    </html>
  );
}

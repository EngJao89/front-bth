import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer} from 'react-toastify';

import { Theme } from "@radix-ui/themes";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Be The Hero",
  description: "A App for saving pets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Theme>
            <ToastContainer autoClose={1500}/>
            {children}
          </Theme>
        </body>
      </AuthProvider>
    </html>
  );
}

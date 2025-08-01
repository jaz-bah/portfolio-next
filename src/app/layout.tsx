import Layout from "@/components/layout/Layout";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Syne, Zen_Dots } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import '@/styles/scss/main.scss'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--f-pera-1',
  display: 'swap',
});

export const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--f-link-1',
  display: 'swap',
});

export const zenDots = Zen_Dots({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-h-1",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jazbah",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

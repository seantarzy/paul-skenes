// layout.tsx (Updated with SEO and Components)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navigation from "./components/Navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paul Skenes - The Future of Pitching",
  description:
    "Follow Paul Skenes' career with live stats, game schedules, and a dedicated fan community. Join us on Discord!"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Paul Skenes, Skenes, Paul, Baseball pitcher, Pittsburgh Pirates, MLB, stats, fan community"
        />
        <meta name="author" content="PaulSkenes.com" />
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
        <meta
          property="og:title"
          content="Paul Skenes - The Future of Pitching"
        />
        <meta
          property="og:description"
          content="Live updates on Paul Skenes' MLB career. Join the fan community today!"
        />
        <meta
          property="og:image"
          content="https://paulskenes.com/skenes-throw.png"
        />
        <meta property="og:url" content="https://paulskenes.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Paul Skenes - The Future of Pitching"
        />
        <meta
          name="twitter:description"
          content="Get real-time Paul Skenes stats, schedule, and join the fan hub!"
        />
        <meta
          name="twitter:image"
          content="https://paulskenes.com/skenes-throw.png"
        />
        <link rel="icon" href="./favicon.ico" />
        <link rel="stylesheet" href="/fonts/inter.css" />
      </Head>
      <body className={inter.className}>
        <Navigation />
        <div className="bg-slate-950 flex flex-col text-center items-center h-[100vh] w-[100vw] pt-12 overflow-scroll">
          {children}
        </div>
      </body>
    </html>
  );
}

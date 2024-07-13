import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paul Skenes",
  description: "Best pitcher ever?"
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
          content="Paul Skenes, Skenes, Paul, Baseball pitcher, Pirates"
        />
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
        <link rel="icon" href="./favicon.ico" />
        <link rel="stylesheet" href="/fonts/inter.css" />
      </Head>
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

// layout.tsx (Updated with SEO and Components)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navigation from "./components/Navigation";
import GoogleAnalytics from "./analytics/GoogleAnalytics";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Paul Skenes | Pittsburgh Pirates Pitcher",
    template: "%s | PaulSkenes.com"
  },
  description: "The official fan site for Paul Skenes, Pittsburgh Pirates pitcher and 2024 NL Rookie of the Year. Stats, game schedule, news, and more.",
  keywords: ["Paul Skenes", "Paul Skenes pitcher", "Pittsburgh Pirates", "Paul Skenes stats", "MLB pitcher", "Pirates baseball", "Paul Skenes schedule"],
  openGraph: {
    title: "Paul Skenes | Pittsburgh Pirates Pitcher",
    description: "The official fan site for Paul Skenes, Pittsburgh Pirates pitcher and 2024 NL Rookie of the Year.",
    url: "https://paulskenes.com",
    siteName: "PaulSkenes.com",
    type: "website"
  },
  metadataBase: new URL("https://paulskenes.com"),
  alternates: {
    canonical: "https://paulskenes.com"
  }
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
          name="google-site-verification"
          content="0Sg1YhDXEWfCcYWYCpDr1iSDen13d1Kt6SA8sWojvKc"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Paul Skenes",
              "jobTitle": "Professional Baseball Pitcher",
              "affiliation": {
                "@type": "SportsTeam",
                "name": "Pittsburgh Pirates",
                "sport": "Baseball"
              },
              "url": "https://paulskenes.com",
              "sameAs": [
                "https://www.mlb.com/player/paul-skenes-808967"
              ]
            })
          }}
        />
      </Head>
      <GoogleAnalytics />
      <body className={inter.className}>
        <span style={{ display: 'none' }}>Impact-Site-Verification: be80dbbc-2129-42db-94b7-f093208f3bf0</span>
        <Navigation />
        <div className="bg-slate-950 flex flex-col text-center items-center h-[100vh] w-[100vw] pt-12 overflow-scroll">
          {children}
        </div>
      </body>
    </html>
  );
}

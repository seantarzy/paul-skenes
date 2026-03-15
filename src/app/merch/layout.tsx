import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paul Skenes Merch - Jerseys, Gear & Memorabilia | PaulSkenes.com",
  description:
    "Shop Paul Skenes jerseys, shirts, hats, rookie cards, and signed memorabilia. Find the best deals on official Pittsburgh Pirates #30 gear from MLB Shop, Fanatics, and more.",
  keywords:
    "Paul Skenes jersey, Paul Skenes merch, Paul Skenes shirt, Paul Skenes rookie card, Paul Skenes autograph, Pittsburgh Pirates gear, Paul Skenes #30",
  openGraph: {
    title: "Paul Skenes Merch - Official Jerseys & Gear",
    description:
      "Shop the best Paul Skenes merchandise — jerseys, rookie cards, signed memorabilia, and Pirates tickets.",
    url: "https://paulskenes.com/merch",
    images: [{ url: "https://paulskenes.com/skenes-throw.png" }],
  },
};

export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

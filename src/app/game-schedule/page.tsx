import type { Metadata } from "next";
import GameSchedule from "../components/GameSchedule";

export const metadata: Metadata = {
  title: "Paul Skenes Schedule — When Does Skenes Pitch Next?",
  description: "Find out when Paul Skenes pitches next. See his confirmed starts, upcoming Pittsburgh Pirates games, and get tickets to watch the Cy Young winner live.",
  keywords: [
    "Paul Skenes next start",
    "when does Paul Skenes pitch",
    "Paul Skenes schedule",
    "Paul Skenes pitching today",
    "Pittsburgh Pirates schedule",
    "Paul Skenes tickets",
  ],
  alternates: { canonical: "https://paulskenes.com/game-schedule" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Paul Skenes Pitching Schedule",
  description: "Live schedule of Paul Skenes' confirmed starts and all Pittsburgh Pirates games with ticket links.",
  url: "https://paulskenes.com/game-schedule",
  isPartOf: {
    "@type": "WebSite",
    name: "PaulSkenes.com",
    url: "https://paulskenes.com",
  },
};

export default function GameSchedulePage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-slate-300 text-3xl md:text-5xl font-serif mb-2">
        When Does Skenes Pitch?
      </h1>
      <p className="text-slate-500 text-sm mb-8">
        Confirmed starts and upcoming Pirates games · Probable pitchers updated daily by MLB
      </p>
      <GameSchedule />
    </div>
  );
}

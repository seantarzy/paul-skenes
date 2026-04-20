import type { Metadata } from "next";
import Image from "next/image";
import NextStart from "./components/NextStart";
import NewsFeed from "./components/NewsFeed";
import QuickStatsOverlay from "./components/QuickStatsOverlay";
import CTALink from "./components/CTALink";
import "./Skenes.css";

export const metadata: Metadata = {
  title: "Paul Skenes | Pittsburgh Pirates Pitcher",
  description: "Paul Skenes fan hub — live stats, news, game schedule, and more. Home of the splinker.",
  alternates: { canonical: "https://paulskenes.com" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Paul Skenes",
  birthDate: "2002-05-29",
  birthPlace: "Fullerton, California",
  nationality: "American",
  url: "https://paulskenes.com",
  jobTitle: "Professional Baseball Pitcher",
  worksFor: {
    "@type": "SportsTeam",
    name: "Pittsburgh Pirates",
    sport: "Baseball"
  },
  description: "Paul Skenes is a professional baseball pitcher for the Pittsburgh Pirates, 2025 NL Cy Young Award winner, 2024 NL Rookie of the Year, and first overall pick in the 2023 MLB Draft.",
  sameAs: [
    "https://en.wikipedia.org/wiki/Paul_Skenes",
    "https://www.baseball-reference.com/players/s/skenpa01.shtml"
  ]
};

export default function Home() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-8 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero with stats overlay */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <h1 className="text-slate-300 text-4xl md:text-7xl font-serif">
          Paul Skenes
        </h1>
        <p className="text-slate-500 text-sm tracking-widest uppercase mt-1">
          Pittsburgh Pirates · #30 · Starting Pitcher
        </p>

        {/* Image container with stats bar overlaid at the bottom */}
        <div className="relative mt-4 flex justify-center">
          <Image
            src="/skenes-throw.png"
            alt="Paul Skenes throwing a pitch"
            className="skenes-image"
            width={420}
            height={180}
            priority
          />
          {/* Stats bar sits on top of the bottom of the image */}
          <div className="absolute bottom-0 left-0 right-0">
            <QuickStatsOverlay />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <CTALink href="/game-schedule" text="See his next start →" location="home_hero" />
        </div>
      </div>

      {/* Next Game */}
      <NextStart />

      {/* The Splinker */}
      <section className="w-full max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-left">
              <h2 className="text-yellow-500 text-2xl md:text-3xl font-serif mb-2">
                The Splinker
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">
                Paul Skenes throws one of the most unhittable pitches in baseball — a splitter-sinker hybrid
                he calls the <span className="text-yellow-400 font-semibold">&ldquo;splinker.&rdquo;</span> It
                dives late, generating elite whiff rates and baffling even the best hitters.
              </p>
              <div className="flex gap-6 mt-4">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide">Whiff Rate</p>
                  <p className="text-slate-100 text-2xl font-bold">47%+</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide">Velocity</p>
                  <p className="text-slate-100 text-2xl font-bold">88–92 mph</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide">Movement</p>
                  <p className="text-slate-100 text-2xl font-bold">18&rdquo; drop</p>
                </div>
              </div>
            </div>
            <CTALink href="/stats" text="Full Pitch Breakdown →" location="home_splinker_section" />
          </div>
        </div>
      </section>

      {/* News Feed */}
      <NewsFeed />

    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import "./Skenes.css";

export const metadata: Metadata = {
  title: "Paul Skenes | Pittsburgh Pirates Pitcher",
  description: "Paul Skenes is the Pittsburgh Pirates ace and 2024 NL Rookie of the Year. Browse stats, merch, game schedule, and more at PaulSkenes.com.",
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
  description: "Paul Skenes is a professional baseball pitcher for the Pittsburgh Pirates, 2024 NL Rookie of the Year, and first overall pick in the 2023 MLB Draft.",
  sameAs: [
    "https://en.wikipedia.org/wiki/Paul_Skenes",
    "https://www.baseball-reference.com/players/s/skenpa01.shtml"
  ]
};

export default async function Home() {
  return (
    <div className="bg-slate-950 flex flex-col items-center h-[100vh] w-100[vw] pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-slate-300 text-2xl md:text-7xl font-serif">
        Paul Skenes
      </h1>
      <br />
      <div className="h-[250px] mb-8">
        <Image
          src="/skenes-throw.png"
          alt="Paul Skenes throwing a pitch"
          className="skenes-image"
          width={600}
          height={250}
        />
      </div>

      <MerchLinks />
    </div>
  );
}

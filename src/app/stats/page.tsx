import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paul Skenes Stats",
  description: "Paul Skenes career stats, ERA, strikeouts, and pitching records. Track the Pittsburgh Pirates ace's performance in the 2025 MLB season.",
  alternates: { canonical: "https://paulskenes.com/stats" }
};

export default function Stats() {
  return <StatsDisplay />;
}

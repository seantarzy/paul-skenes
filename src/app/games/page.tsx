import type { Metadata } from "next";
import GamesClient from "./GamesClient";

export const metadata: Metadata = {
  title: "Paul Skenes Games",
  description: "Play Paul Skenes pitching games and trivia. Test your knowledge of the Pittsburgh Pirates ace.",
  alternates: { canonical: "https://paulskenes.com/games" }
};

export default function Games() {
  return <GamesClient />;
}

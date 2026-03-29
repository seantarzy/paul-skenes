'use client'
import { useEffect, useState } from "react";
import Link from "next/link";

const SKENES_ID = 694973;
const PIRATES_ID = 134;

interface NextGame {
  date: string;
  opponent: string;
  isHome: boolean;
  time: string;
  isSkenesStart: boolean;
}

export default function NextStart() {
  const [skenesGame, setSkenesGame] = useState<NextGame | null>(null);
  const [nextGame, setNextGame] = useState<NextGame | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const currentYear = new Date().getFullYear();
    fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${PIRATES_ID}&season=${currentYear}&startDate=${today}&endDate=${currentYear}-12-31&hydrate=probablePitcher`)
      .then((r) => r.json())
      .then((data) => {
        const allGames = (data.dates || []).flatMap((d: any) => d.games || []);
        for (const g of allGames) {
          const isHome = g.teams.home.team.id === PIRATES_ID;
          const piratesTeam = isHome ? g.teams.home : g.teams.away;
          const opponentTeam = isHome ? g.teams.away : g.teams.home;
          const isSkenesStart = piratesTeam.probablePitcher?.id === SKENES_ID;
          const date = new Date(g.gameDate);
          const parsed: NextGame = {
            date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
            time: date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
            opponent: opponentTeam.team.name,
            isHome,
            isSkenesStart,
          };
          if (!nextGame) setNextGame(parsed);
          if (isSkenesStart && !skenesGame) {
            setSkenesGame(parsed);
            return;
          }
        }
      })
      .catch(() => {});
  }, []);

  const featured = skenesGame || nextGame;
  if (!featured) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Link href="/game-schedule" className={`flex items-center justify-between border rounded-xl px-6 py-3 transition-colors group ${
        featured.isSkenesStart
          ? "bg-yellow-900/20 hover:bg-yellow-900/30 border-yellow-700/40"
          : "bg-slate-900/50 hover:bg-slate-900/80 border-slate-700/40"
      }`}>
        <div className="flex items-center gap-3">
          <span className={`text-xs uppercase tracking-widest font-medium ${
            featured.isSkenesStart ? "text-yellow-500" : "text-slate-500"
          }`}>
            {featured.isSkenesStart ? "Skenes Starts" : "Next Game"}
          </span>
          <span className="text-slate-300 font-semibold">
            {featured.isHome ? "vs" : "@"} {featured.opponent}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">{featured.date} · {featured.time}</span>
          <span className="text-yellow-600 group-hover:text-yellow-400 text-sm transition-colors">Full Schedule →</span>
        </div>
      </Link>
    </div>
  );
}

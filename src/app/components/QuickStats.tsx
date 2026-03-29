'use client'
import { useEffect, useState } from "react";

interface PitchingStats {
  wins: number;
  losses: number;
  era: string;
  strikeOuts: number;
  whip: string;
  strikeoutsPer9Inn: string;
}

export default function QuickStats() {
  const [stats, setStats] = useState<PitchingStats | null>(null);
  const [season, setSeason] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    fetch(`https://statsapi.mlb.com/api/v1/people/694973/stats?stats=statsSingleSeason&season=${currentYear}&group=pitching`)
      .then((r) => r.json())
      .then((data) => {
        const split = data.stats?.[0]?.splits?.[0];
        if (split) {
          setStats(split.stat);
          setSeason(currentYear);
        } else {
          // Fall back to previous year if current season not started
          return fetch(`https://statsapi.mlb.com/api/v1/people/694973/stats?stats=statsSingleSeason&season=${currentYear - 1}&group=pitching`)
            .then((r) => r.json())
            .then((d) => {
              const s = d.stats?.[0]?.splits?.[0];
              if (s) {
                setStats(s.stat);
                setSeason(currentYear - 1);
              }
            });
        }
      })
      .catch(() => {});
  }, []);

  if (!stats) return null;

  const items = [
    { label: "ERA", value: stats.era },
    { label: "Record", value: `${stats.wins}-${stats.losses}` },
    { label: "K", value: stats.strikeOuts },
    { label: "WHIP", value: stats.whip },
    { label: "K/9", value: stats.strikeoutsPer9Inn },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between bg-slate-900/80 border border-slate-700 rounded-xl px-6 py-3">
        <span className="text-slate-500 text-xs uppercase tracking-widest hidden sm:block">
          {season} Season
        </span>
        <div className="flex gap-6 sm:gap-10 flex-1 justify-center sm:justify-end">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-slate-400 text-xs uppercase tracking-wide">{item.label}</p>
              <p className="text-slate-100 text-xl font-bold leading-tight">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

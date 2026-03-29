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

export default function QuickStatsOverlay() {
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
    <div className="flex items-center justify-between backdrop-blur-md bg-slate-950/70 border-t border-slate-700/60 px-5 py-2 rounded-b-xl">
      <span className="text-slate-500 text-xs uppercase tracking-widest hidden sm:block">
        {season}
      </span>
      <div className="flex gap-5 sm:gap-8 flex-1 justify-center sm:justify-end">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-slate-400 text-xs uppercase tracking-wide leading-none">{item.label}</p>
            <p className="text-slate-100 text-lg font-bold leading-tight">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

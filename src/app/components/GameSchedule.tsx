'use client'
import { useEffect, useState } from "react";

interface GameData {
  gameDate: string;
  gamePk: number;
  opponent: string;
  isHome: boolean;
  isSkenesStart: boolean;
  probablePitcher: string | null;
  opponentPitcher: string | null;
}

const SKENES_ID = 694973;
const PIRATES_ID = 134;

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function ticketSearchUrl(opponent: string, dateStr: string) {
  const d = new Date(dateStr);
  const dateFormatted = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
  const query = encodeURIComponent(`Pittsburgh Pirates ${opponent} ${dateFormatted}`);
  return `https://www.ticketmaster.com/search?q=${query}`;
}

export default function GameSchedule() {
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"skenes" | "all">("skenes");

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const today = new Date().toISOString().split("T")[0];
        const currentYear = new Date().getFullYear();
        const response = await fetch(
          `https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${PIRATES_ID}&season=${currentYear}&startDate=${today}&endDate=${currentYear}-12-31&hydrate=probablePitcher`
        );
        const data = await response.json();

        const allGames: GameData[] = (data.dates || []).flatMap((date: any) =>
          (date.games || []).map((g: any) => {
            const isHome = g.teams.home.team.id === PIRATES_ID;
            const piratesTeam = isHome ? g.teams.home : g.teams.away;
            const opponentTeam = isHome ? g.teams.away : g.teams.home;
            return {
              gameDate: g.gameDate,
              gamePk: g.gamePk,
              opponent: opponentTeam.team.name,
              isHome,
              isSkenesStart: piratesTeam.probablePitcher?.id === SKENES_ID,
              probablePitcher: piratesTeam.probablePitcher?.fullName || null,
              opponentPitcher: opponentTeam.probablePitcher?.fullName || null,
            };
          })
        );

        setGames(allGames);
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, []);

  const skenesGames = games.filter((g) => g.isSkenesStart);
  const displayGames = filter === "skenes" && skenesGames.length > 0
    ? skenesGames
    : games.slice(0, 20);

  const showingAll = filter === "all" || skenesGames.length === 0;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("skenes")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            filter === "skenes"
              ? "bg-yellow-600 text-slate-950"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          Skenes Starts
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            filter === "all"
              ? "bg-yellow-600 text-slate-950"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          All Pirates Games
        </button>
      </div>

      {loading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {!loading && filter === "skenes" && skenesGames.length === 0 && (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-4 text-center">
          <p className="text-slate-400 text-sm">
            No confirmed Skenes starts announced yet. Probable pitchers are typically announced 1–3 days before each game.
          </p>
          <p className="text-slate-500 text-xs mt-2">Showing upcoming Pirates games instead.</p>
        </div>
      )}

      <div className="space-y-2">
        {displayGames.map((game) => (
          <div
            key={game.gamePk}
            className={`flex items-center justify-between rounded-xl px-5 py-4 border transition-all ${
              game.isSkenesStart
                ? "bg-yellow-900/20 border-yellow-700/50"
                : "bg-slate-900 border-slate-700"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {game.isSkenesStart && (
                  <span className="text-xs bg-yellow-600 text-slate-950 font-bold px-2 py-0.5 rounded">
                    SKENES
                  </span>
                )}
                <span className="text-slate-200 font-semibold">
                  {game.isHome ? "vs" : "@"} {game.opponent}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-slate-400 text-sm">{formatDate(game.gameDate)}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400 text-sm">{formatTime(game.gameDate)}</span>
                {game.probablePitcher && !game.isSkenesStart && (
                  <>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-500 text-xs">SP: {game.probablePitcher}</span>
                  </>
                )}
                {game.opponentPitcher && (
                  <>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-500 text-xs">vs {game.opponentPitcher}</span>
                  </>
                )}
              </div>
            </div>
            <a
              href={ticketSearchUrl(game.opponent, game.gameDate)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 ml-4 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                game.isSkenesStart
                  ? "bg-yellow-600 hover:bg-yellow-500 text-slate-950"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              Tickets
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

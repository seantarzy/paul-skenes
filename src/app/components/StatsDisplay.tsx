'use client'
import { useEffect, useState } from "react";

interface PitchingStats {
  gamesPlayed: number;
  gamesStarted: number;
  wins: number;
  losses: number;
  era: string;
  strikeOuts: number;
  whip: string;
  inningsPitched: string;
  strikeoutsPer9Inn: string;
  walksPer9Inn: string;
  hitsPer9Inn: string;
  avg: string;
  completeGames: number;
}

interface StatSplit {
  season?: string;
  stat: PitchingStats;
}

interface StatsResponse {
  stats: Array<{
    splits: StatSplit[];
  }>;
}

export default function StatsDisplay() {
  const [careerStats, setCareerStats] = useState<PitchingStats | null>(null);
  const [rookieStats, setRookieStats] = useState<PitchingStats | null>(null);
  const [currentStats, setCurrentStats] = useState<PitchingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const currentYear = new Date().getFullYear();
        const rookieYear = 2024; // Paul Skenes debuted in 2024

        // Fetch career stats
        const careerResponse = await fetch(
          "https://statsapi.mlb.com/api/v1/people/694973/stats?stats=career&group=pitching"
        );
        const careerData: StatsResponse = await careerResponse.json();
        if (careerData.stats[0]?.splits[0]) {
          setCareerStats(careerData.stats[0].splits[0].stat);
        }

        // Fetch rookie season stats (2024)
        const rookieResponse = await fetch(
          `https://statsapi.mlb.com/api/v1/people/694973/stats?stats=statsSingleSeason&season=${rookieYear}&group=pitching`
        );
        const rookieData: StatsResponse = await rookieResponse.json();
        if (rookieData.stats[0]?.splits[0]) {
          setRookieStats(rookieData.stats[0].splits[0].stat);
        }

        // Fetch current season stats (only if not rookie year)
        if (currentYear > rookieYear) {
          const currentResponse = await fetch(
            `https://statsapi.mlb.com/api/v1/people/694973/stats?stats=statsSingleSeason&season=${currentYear}&group=pitching`
          );
          const currentData: StatsResponse = await currentResponse.json();
          if (currentData.stats[0]?.splits[0]) {
            setCurrentStats(currentData.stats[0].splits[0].stat);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <div className="text-slate-300 text-2xl">Loading stats...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-slate-300 text-5xl md:text-7xl font-serif text-center mb-12">
          Paul Skenes Stats
        </h1>

        {/* Career Stats Highlight */}
        {careerStats && (
          <div className="mb-12 bg-gradient-to-r from-yellow-900/20 to-amber-900/20 rounded-lg p-8 border border-yellow-800/30">
            <h2 className="text-yellow-500 text-3xl font-serif mb-6 text-center">
              MLB Career Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wide">Record</p>
                <p className="text-slate-100 text-4xl font-bold">
                  {careerStats.wins}-{careerStats.losses}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wide">ERA</p>
                <p className="text-slate-100 text-4xl font-bold">{careerStats.era}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wide">Strikeouts</p>
                <p className="text-slate-100 text-4xl font-bold">{careerStats.strikeOuts}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wide">WHIP</p>
                <p className="text-slate-100 text-4xl font-bold">{careerStats.whip}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <p className="text-slate-400 text-xs uppercase">Innings Pitched</p>
                <p className="text-slate-200 text-2xl font-semibold">{careerStats.inningsPitched}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase">K/9</p>
                <p className="text-slate-200 text-2xl font-semibold">{careerStats.strikeoutsPer9Inn}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase">Opp. AVG</p>
                <p className="text-slate-200 text-2xl font-semibold">{careerStats.avg}</p>
              </div>
            </div>
          </div>
        )}

        {/* Season Stats Comparison */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Rookie Season */}
          {rookieStats && (
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
              <h3 className="text-green-400 text-2xl font-serif mb-4 flex items-center justify-between">
                <span>2024 Season</span>
                <span className="text-sm bg-green-900/30 px-3 py-1 rounded-full border border-green-700">
                  Rookie of the Year
                </span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Games Started</span>
                  <span className="text-slate-100 font-semibold">{rookieStats.gamesStarted}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Record</span>
                  <span className="text-slate-100 font-semibold">
                    {rookieStats.wins}-{rookieStats.losses}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">ERA</span>
                  <span className="text-slate-100 font-semibold">{rookieStats.era}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Strikeouts</span>
                  <span className="text-slate-100 font-semibold">{rookieStats.strikeOuts}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">WHIP</span>
                  <span className="text-slate-100 font-semibold">{rookieStats.whip}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Innings Pitched</span>
                  <span className="text-slate-100 font-semibold">{rookieStats.inningsPitched}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">K/9</span>
                  <span className="text-slate-100 font-semibold">{rookieStats.strikeoutsPer9Inn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Opponent AVG</span>
                  <span className="text-slate-100 font-semibold">{rookieStats.avg}</span>
                </div>
              </div>
            </div>
          )}

          {/* Current Season */}
          {currentStats && (
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
              <h3 className="text-blue-400 text-2xl font-serif mb-4 flex items-center justify-between">
                <span>{new Date().getFullYear()} Season</span>
                <span className="text-sm bg-blue-900/30 px-3 py-1 rounded-full border border-blue-700">
                  Current
                </span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Games Started</span>
                  <span className="text-slate-100 font-semibold">{currentStats.gamesStarted}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Record</span>
                  <span className="text-slate-100 font-semibold">
                    {currentStats.wins}-{currentStats.losses}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">ERA</span>
                  <span className="text-slate-100 font-semibold">{currentStats.era}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Strikeouts</span>
                  <span className="text-slate-100 font-semibold">{currentStats.strikeOuts}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">WHIP</span>
                  <span className="text-slate-100 font-semibold">{currentStats.whip}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Innings Pitched</span>
                  <span className="text-slate-100 font-semibold">{currentStats.inningsPitched}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">K/9</span>
                  <span className="text-slate-100 font-semibold">{currentStats.strikeoutsPer9Inn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Opponent AVG</span>
                  <span className="text-slate-100 font-semibold">{currentStats.avg}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Career Achievements */}
        {careerStats && (
          <div className="mt-12 bg-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-slate-300 text-2xl font-serif mb-4">Career Highlights</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-800 p-4 rounded">
                <p className="text-slate-400 text-sm">Complete Games</p>
                <p className="text-slate-100 text-3xl font-bold">{careerStats.completeGames}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded">
                <p className="text-slate-400 text-sm">Walks/9 Innings</p>
                <p className="text-slate-100 text-3xl font-bold">{careerStats.walksPer9Inn}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded">
                <p className="text-slate-400 text-sm">Hits/9 Innings</p>
                <p className="text-slate-100 text-3xl font-bold">{careerStats.hitsPer9Inn}</p>
              </div>
            </div>
          </div>
        )}

        {/* Data Source Attribution */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          Stats powered by MLB Stats API | Updated in real-time
        </div>
      </div>
    </div>
  );
}

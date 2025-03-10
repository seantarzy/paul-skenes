'use client'
import { useEffect, useState } from "react";

interface Game {
    gameDate: string;
    teams: {
      away: {
        team: {
          name: string;
        };
      };
      home: {
        team: {
          name: string;
        };
      };
    };
    }
export default function GameSchedule() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function fetchSchedule() {
      const response = await fetch(
        "https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=134&season=2024"
      );
      const data = await response.json();
      const upcomingGames = data.dates.slice(0, 5).map((game: any) => game.games[0]);
      setGames(upcomingGames);
    }

    fetchSchedule();
  }, []);

  return (
    <div className="mt-8 p-4 bg-gray-800 text-white rounded-lg w-80">
      <h2 className="text-xl font-semibold">Upcoming Games</h2>
      <ul>
        {games.map((game, index) => (
          <li key={index} className="mt-2">
            {new Date(game.gameDate).toLocaleDateString()} - {game.teams.away.team.name} @ {game.teams.home.team.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
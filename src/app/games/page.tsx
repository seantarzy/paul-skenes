import type { Metadata } from "next";
import PitchingGame from "../components/PitchingGame";

export const metadata: Metadata = {
  title: "Paul Skenes Games",
  description: "Play Paul Skenes pitching games and trivia. Test your knowledge of the Pittsburgh Pirates ace.",
  alternates: { canonical: "https://paulskenes.com/games" }
};

export default function Games() {
  return (
    <div className="min-h-screen py-12 px-4 w-full max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-slate-300 text-5xl md:text-6xl font-serif mb-3">Games</h1>
        <p className="text-slate-400">Test your Paul Skenes knowledge and pitching skills</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 justify-center mb-8">
        <button
          onClick={() => setTab('pitch')}
          className={`px-6 py-2 rounded-lg font-semibold text-sm transition ${
            tab === 'pitch'
              ? 'bg-yellow-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          Pitching Challenge
        </button>
        <button
          onClick={() => setTab('trivia')}
          className={`px-6 py-2 rounded-lg font-semibold text-sm transition ${
            tab === 'trivia'
              ? 'bg-yellow-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          Skenes Trivia
        </button>
      </div>

      <div className="flex justify-center">
        {tab === 'pitch' ? <PitchingGame /> : <TriviaGame />}
      </div>
    </div>
  );
}

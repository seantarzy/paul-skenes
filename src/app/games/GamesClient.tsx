'use client'
import { useState } from "react";
import PitchingGame from "./PitchingGame";
import TriviaGame from "./TriviaGame";
import { trackGamePlay } from "@/lib/analytics";

export default function GamesClient() {
  const [tab, setTab] = useState<'pitch' | 'trivia'>('pitch');

  return (
    <div className="min-h-screen py-12 px-4 w-full max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-slate-300 text-5xl md:text-6xl font-serif mb-3">Games</h1>
        <p className="text-slate-400">Test your Paul Skenes knowledge and pitching skills</p>
      </div>

      <div className="flex gap-2 justify-center mb-8">
        <button
          onClick={() => { setTab('pitch'); trackGamePlay("pitching_challenge", "tab_switch"); }}
          className={`px-6 py-2 rounded-lg font-semibold text-sm transition ${
            tab === 'pitch'
              ? 'bg-yellow-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          Pitching Challenge
        </button>
        <button
          onClick={() => { setTab('trivia'); trackGamePlay("skenes_trivia", "tab_switch"); }}
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

'use client'

import { useState } from 'react';

const questions = [
  {
    q: "What jersey number does Paul Skenes wear for the Pittsburgh Pirates?",
    options: ["12", "21", "30", "34"],
    answer: 2,
  },
  {
    q: "What award did Paul Skenes win at the end of the 2024 MLB season?",
    options: ["Cy Young Award", "NL Rookie of the Year", "Gold Glove", "Silver Slugger"],
    answer: 1,
  },
  {
    q: "What college did Paul Skenes attend before being drafted?",
    options: ["Vanderbilt", "LSU", "Florida", "UCLA"],
    answer: 1,
  },
  {
    q: "With what pick was Paul Skenes selected in the 2023 MLB Draft?",
    options: ["1st overall", "2nd overall", "5th overall", "10th overall"],
    answer: 0,
  },
  {
    q: "What is Paul Skenes' primary position?",
    options: ["Catcher", "Starting Pitcher", "Relief Pitcher", "First Baseman"],
    answer: 1,
  },
  {
    q: "Which MLB team drafted Paul Skenes in 2023?",
    options: ["Chicago Cubs", "San Diego Padres", "Pittsburgh Pirates", "Texas Rangers"],
    answer: 2,
  },
  {
    q: "Approximately how fast is Paul Skenes' fastball?",
    options: ["88–90 mph", "91–93 mph", "94–96 mph", "97–102 mph"],
    answer: 3,
  },
  {
    q: "What is Paul Skenes' signature breaking pitch called?",
    options: ["12-6 Curveball", "Sweeper", "Splinker", "Eephus"],
    answer: 2,
  },
  {
    q: "In what stadium do the Pittsburgh Pirates play their home games?",
    options: ["Fenway Park", "Wrigley Field", "PNC Park", "Busch Stadium"],
    answer: 2,
  },
  {
    q: "Paul Skenes played college baseball for which conference champion team?",
    options: ["SEC Champion LSU", "ACC Champion FSU", "Big 12 Champion TCU", "Pac-12 Champion UCLA"],
    answer: 0,
  },
];

export default function TriviaGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const question = questions[current];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === question.answer) setScore(s => s + 1);
  };

  const next = () => {
    setSelected(null);
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
    }
  };

  const reset = () => {
    setCurrent(0); setSelected(null); setScore(0); setDone(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="text-6xl">{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
        <h3 className="text-slate-200 text-3xl font-serif">
          {score} / {questions.length}
        </h3>
        <p className="text-slate-400">
          {pct >= 80 ? "You know your Skenes!" : pct >= 50 ? "Not bad, keep watching!" : "Time to hit the stats page..."}
        </p>
        <button
          onClick={reset}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full max-w-xl">
      {/* Progress */}
      <div className="flex justify-between text-slate-500 text-xs">
        <span>Question {current + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-1.5">
        <div
          className="bg-yellow-500 h-1.5 rounded-full transition-all"
          style={{ width: `${((current) / questions.length) * 100}%` }}
        />
      </div>

      <p className="text-slate-100 text-lg font-semibold leading-snug">{question.q}</p>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((opt, idx) => {
          let style = "bg-slate-800 border border-slate-700 text-slate-300 hover:border-slate-500";
          if (selected !== null) {
            if (idx === question.answer) style = "bg-green-800 border border-green-500 text-white";
            else if (idx === selected) style = "bg-red-900 border border-red-500 text-white";
            else style = "bg-slate-800 border border-slate-700 text-slate-500 opacity-60";
          }
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`${style} text-left px-4 py-3 rounded-lg transition-all text-sm`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <button
          onClick={next}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold transition self-end"
        >
          {current + 1 >= questions.length ? 'See Results' : 'Next →'}
        </button>
      )}
    </div>
  );
}

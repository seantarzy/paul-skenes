'use client'

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
type Phase = 'location' | 'speed' | 'accuracy' | 'result';
type ZoneIdx = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// ─── Constants ───────────────────────────────────────────────────────────────
const ZONE_LABELS = ['Low & Away', 'Low', 'Low & In', 'Away', 'Middle', 'Inside', 'High & Away', 'High', 'High & In'];
const CORNER_ZONES = new Set([0, 2, 6, 8]);
const EDGE_ZONES   = new Set([1, 3, 5, 7]);

// Green zones (0–1 fraction of bar width)
const SPEED_GREEN    = { start: 0.68, end: 0.90 }; // right side = high velo
const ACCURACY_GREEN = { start: 0.38, end: 0.60 }; // middle = precision

const SPEED_PERIOD    = 1800; // ms per full oscillation
const ACCURACY_PERIOD = 1200; // faster = harder

// ─── Helpers ─────────────────────────────────────────────────────────────────
function triangleWave(elapsed: number, period: number) {
  const t = (elapsed % period) / period; // 0→1
  return t < 0.5 ? t * 2 : (1 - t) * 2;
}

function scoreInZone(pos: number, zone: { start: number; end: number }) {
  if (pos < zone.start || pos > zone.end) return 0;
  const center = (zone.start + zone.end) / 2;
  const half   = (zone.end - zone.start) / 2;
  return 1 - Math.abs(pos - center) / half; // 1.0 at center, 0 at edges
}

function zoneBonus(z: ZoneIdx) {
  if (CORNER_ZONES.has(z)) return 1.0;
  if (EDGE_ZONES.has(z))   return 0.6;
  return 0.2; // middle
}

function buildResult(speedScore: number, accuracyScore: number, zone: ZoneIdx) {
  const mph     = Math.round(88 + speedScore * 17);
  const corner  = CORNER_ZONES.has(zone);
  const middle  = zone === 4;
  const quality = speedScore * 0.35 + accuracyScore * 0.45 + zoneBonus(zone) * 0.20;

  if (accuracyScore < 0.18)
    return { outcome: 'BALL', sub: 'Missed the zone entirely', mph, swing: false, good: false };
  if (quality >= 0.80)
    return { outcome: 'STRIKEOUT!', sub: 'Unhittable — batter had no chance', mph, swing: true, good: true };
  if (quality >= 0.60)
    return { outcome: 'STRIKE', sub: 'Weak contact — routine out', mph, swing: true, good: true };
  if (middle && quality < 0.45)
    return { outcome: 'HOME RUN!', sub: 'Right down the pipe — crushed it', mph, swing: true, good: false };
  if (!corner && quality < 0.50)
    return { outcome: 'HIT', sub: 'Caught too much of the plate', mph, swing: true, good: false };
  return { outcome: 'STRIKE', sub: 'Got away with it on the corner', mph, swing: true, good: true };
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function MeterBar({
  pos, green, label, locked,
}: {
  pos: number; green: { start: number; end: number }; label: string; locked: boolean;
}) {
  const BAR_W = 100; // percent units
  const tickX = pos * BAR_W;
  const greenL = green.start * BAR_W;
  const greenW = (green.end - green.start) * BAR_W;

  return (
    <div className={`w-full transition-opacity ${locked ? 'opacity-30' : 'opacity-100'}`}>
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>{label}</span>
        {!locked && <span className="text-green-400 animate-pulse">▶ Click or press SPACE</span>}
      </div>
      <div className="relative w-full h-10 bg-slate-800 rounded-lg overflow-hidden border border-slate-600">
        {/* Green zone */}
        <div
          className="absolute top-0 bottom-0 bg-green-500 opacity-40"
          style={{ left: `${greenL}%`, width: `${greenW}%` }}
        />
        {/* Green zone label */}
        <div
          className="absolute top-1/2 -translate-y-1/2 text-[10px] text-green-300 font-bold"
          style={{ left: `${greenL + greenW / 2}%`, transform: 'translateX(-50%) translateY(-50%)' }}
        >
          ZONE
        </div>
        {/* Ticker */}
        <div
          className="absolute top-0 bottom-0 w-1.5 bg-white rounded shadow-lg shadow-white/50 transition-none"
          style={{ left: `calc(${tickX}% - 3px)` }}
        />
      </div>
    </div>
  );
}

function StrikZoneGrid({
  selected, onSelect,
}: {
  selected: ZoneIdx | null; onSelect: (z: ZoneIdx) => void;
}) {
  const zones = Array.from({ length: 9 }, (_, i) => i) as ZoneIdx[];
  return (
    <div>
      <p className="text-slate-400 text-sm mb-3 text-center">Pick your target. Corners are harder to hit.</p>
      <div className="grid grid-cols-3 gap-1 w-56 mx-auto">
        {zones.map(z => {
          const isCorner = CORNER_ZONES.has(z);
          const isMid    = z === 4;
          const isSel    = selected === z;
          return (
            <button
              key={z}
              onClick={() => onSelect(z)}
              title={ZONE_LABELS[z]}
              className={`
                h-16 rounded text-xs font-semibold transition-all border-2
                ${isSel
                  ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                  : isCorner
                    ? 'border-green-700 bg-green-900/30 text-green-400 hover:border-green-500'
                    : isMid
                      ? 'border-red-700 bg-red-900/30 text-red-400 hover:border-red-500'
                      : 'border-slate-600 bg-slate-800/50 text-slate-400 hover:border-slate-400'
                }
              `}
            >
              {isCorner ? '🟢 Corner' : isMid ? '🔴 Middle' : 'Edge'}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4 justify-center mt-2 text-xs text-slate-500">
        <span>🟢 Corner = good</span>
        <span>🔴 Middle = risky</span>
      </div>
    </div>
  );
}

function Batter({ swing, hit, ball }: { swing: boolean; hit: boolean; ball: boolean }) {
  return (
    <svg width={100} height={140} viewBox="0 0 100 140">
      {/* Head */}
      <circle cx={55} cy={30} r={14} fill="#fbbf24" stroke="#f59e0b" strokeWidth={1.5} />
      {/* Body */}
      <line x1={55} y1={44} x2={55} y2={90} stroke="#fbbf24" strokeWidth={3} />
      {/* Legs */}
      <line x1={55} y1={90} x2={38} y2={120} stroke="#fbbf24" strokeWidth={3} />
      <line x1={55} y1={90} x2={72} y2={120} stroke="#fbbf24" strokeWidth={3} />

      {/* Arms + bat — stance */}
      {!swing && (
        <>
          <line x1={55} y1={60} x2={35} y2={68} stroke="#fbbf24" strokeWidth={3} />
          <line x1={55} y1={60} x2={72} y2={52} stroke="#fbbf24" strokeWidth={3} />
          <line x1={72} y1={52} x2={85} y2={28} stroke="#92400e" strokeWidth={5} />
        </>
      )}
      {/* Swing — hit */}
      {swing && hit && (
        <>
          <line x1={55} y1={60} x2={75} y2={75} stroke="#fbbf24" strokeWidth={3} />
          <line x1={55} y1={60} x2={78} y2={58} stroke="#fbbf24" strokeWidth={3} />
          <line x1={78} y1={58} x2={20} y2={70} stroke="#92400e" strokeWidth={5} />
          {/* Contact flash */}
          <circle cx={20} cy={70} r={8} fill="#fbbf24" opacity={0.6} />
        </>
      )}
      {/* Swing — miss */}
      {swing && !hit && (
        <>
          <line x1={55} y1={60} x2={75} y2={80} stroke="#fbbf24" strokeWidth={3} />
          <line x1={55} y1={60} x2={80} y2={62} stroke="#fbbf24" strokeWidth={3} />
          <line x1={80} y1={62} x2={25} y2={80} stroke="#92400e" strokeWidth={5} />
        </>
      )}
      {/* Ball coming in */}
      {!ball && (
        <circle cx={8} cy={65} r={7} fill="white" stroke="#94a3b8" strokeWidth={1.5} />
      )}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PitchingGame() {
  const [phase, setPhase]           = useState<Phase>('location');
  const [selectedZone, setZone]     = useState<ZoneIdx | null>(null);
  const [speedPos, setSpeedPos]     = useState(0);
  const [accPos, setAccPos]         = useState(0);
  const [speedScore, setSpeedScore] = useState(0);
  const [accScore, setAccScore]     = useState(0);
  const [result, setResult]         = useState<ReturnType<typeof buildResult> | null>(null);
  const [totals, setTotals]         = useState({ score: 0, pitches: 0 });

  const startRef  = useRef<number | null>(null);
  const rafRef    = useRef<number>(0);
  const posRef    = useRef(0); // live pos for capture on click/space

  // ── Oscillation loop ──
  const startOscillation = useCallback((period: number, setter: (v: number) => void) => {
    startRef.current = null;
    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const pos = triangleWave(ts - startRef.current, period);
      posRef.current = pos;
      setter(pos);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopOscillation = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Phase transitions ──
  useEffect(() => {
    if (phase === 'speed') {
      startOscillation(SPEED_PERIOD, setSpeedPos);
    } else if (phase === 'accuracy') {
      startOscillation(ACCURACY_PERIOD, setAccPos);
    }
    return () => stopOscillation();
  }, [phase, startOscillation, stopOscillation]);

  // ── Space bar ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); handleStop(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const handleStop = useCallback(() => {
    if (phase === 'speed') {
      stopOscillation();
      const s = scoreInZone(posRef.current, SPEED_GREEN);
      setSpeedScore(s);
      setTimeout(() => setPhase('accuracy'), 300);
    } else if (phase === 'accuracy') {
      stopOscillation();
      const s = scoreInZone(posRef.current, ACCURACY_GREEN);
      setAccScore(s);
      setPhase('result');
    }
  }, [phase, stopOscillation]);

  // ── Compute result when phase hits result ──
  useEffect(() => {
    if (phase === 'result' && selectedZone !== null) {
      const r = buildResult(speedScore, accScore, selectedZone);
      setResult(r);
      setTotals(prev => ({
        pitches: prev.pitches + 1,
        score: prev.score + (r.good ? 1 : r.outcome === 'BALL' ? 0 : -1),
      }));
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    stopOscillation();
    setPhase('location');
    setZone(null);
    setSpeedPos(0);
    setAccPos(0);
    setSpeedScore(0);
    setAccScore(0);
    setResult(null);
  };

  const fullReset = () => { reset(); setTotals({ score: 0, pitches: 0 }); };

  // ─── Render ───────────────────────────────────────────────────────────────
  const resultColor =
    result?.good ? 'text-green-400' :
    result?.outcome === 'BALL' ? 'text-slate-400' : 'text-red-400';

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      {/* Scoreboard */}
      <div className="flex gap-6 text-sm font-mono bg-slate-900 border border-slate-700 px-6 py-2 rounded-lg">
        <span className="text-slate-400">Pitches: <strong className="text-white">{totals.pitches}</strong></span>
        <span className="text-slate-400">Score: <strong className="text-yellow-400">{totals.score}</strong></span>
        <button onClick={fullReset} className="text-slate-600 hover:text-slate-400 text-xs underline ml-2">Reset</button>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 text-xs">
        {(['location', 'speed', 'accuracy', 'result'] as Phase[]).map((p, i) => (
          <span
            key={p}
            className={`px-3 py-1 rounded-full transition ${
              phase === p ? 'bg-yellow-600 text-white' :
              (['location', 'speed', 'accuracy', 'result'] as Phase[]).indexOf(phase) > i
                ? 'bg-slate-700 text-slate-300' : 'bg-slate-800 text-slate-600'
            }`}
          >
            {i + 1}. {p.charAt(0).toUpperCase() + p.slice(1)}
          </span>
        ))}
      </div>

      {/* ── Phase: Location ── */}
      {phase === 'location' && (
        <div className="flex flex-col items-center gap-5 w-full">
          <StrikZoneGrid selected={selectedZone} onSelect={setZone} />
          <button
            disabled={selectedZone === null}
            onClick={() => setPhase('speed')}
            className="bg-yellow-600 hover:bg-yellow-700 disabled:opacity-30 disabled:cursor-not-allowed text-white px-8 py-2 rounded-lg font-semibold transition"
          >
            Pitch Here →
          </button>
        </div>
      )}

      {/* ── Phase: Speed & Accuracy meters ── */}
      {(phase === 'speed' || phase === 'accuracy') && (
        <div
          className="flex flex-col gap-6 w-full cursor-pointer select-none"
          onClick={handleStop}
        >
          <MeterBar
            pos={speedPos}
            green={SPEED_GREEN}
            label="⚡ Speed — stop in the green zone"
            locked={phase !== 'speed'}
          />
          <MeterBar
            pos={accPos}
            green={ACCURACY_GREEN}
            label="🎯 Accuracy — stop in the green zone"
            locked={phase !== 'accuracy'}
          />
          <p className="text-center text-slate-500 text-xs">
            {phase === 'speed' ? 'Click anywhere or press SPACE to stop the Speed meter' : 'Now stop the Accuracy meter!'}
          </p>
        </div>
      )}

      {/* ── Phase: Result ── */}
      {phase === 'result' && result && (
        <div className="flex flex-col items-center gap-5 w-full">
          <div className={`text-5xl font-serif font-bold ${resultColor}`}>
            {result.outcome}
          </div>
          <p className="text-slate-400 text-sm">{result.sub}</p>

          {/* Batter */}
          <Batter
            swing={result.swing}
            hit={!result.good && result.swing}
            ball={result.outcome === 'BALL'}
          />

          {/* Stats breakdown */}
          <div className="grid grid-cols-3 gap-4 text-center text-sm w-full bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div>
              <div className="text-slate-500 text-xs mb-1">Speed</div>
              <div className="text-white font-bold">{result.mph} mph</div>
              <div className="w-full bg-slate-700 rounded h-1 mt-1">
                <div className="bg-yellow-500 h-1 rounded" style={{ width: `${speedScore * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-xs mb-1">Accuracy</div>
              <div className="text-white font-bold">{Math.round(accScore * 100)}%</div>
              <div className="w-full bg-slate-700 rounded h-1 mt-1">
                <div className="bg-green-500 h-1 rounded" style={{ width: `${accScore * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-xs mb-1">Location</div>
              <div className="text-white font-bold">{selectedZone !== null ? ZONE_LABELS[selectedZone] : '—'}</div>
            </div>
          </div>

          <button
            onClick={reset}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2 rounded-lg font-semibold transition"
          >
            Next Pitch →
          </button>
        </div>
      )}
    </div>
  );
}

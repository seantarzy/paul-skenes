"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import Slider from "./Slider";
import { BatResult, PitchConfig, PitchSelect, batResultMap } from "./types";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface FrameData {
  src: string;
  width: number;
  height: number;
}

const PITCHER_WIDTH = 96;
const PITCHER_HEIGHT = 150;

const BATTER_STANCE_WIDTH = 112;
const BATTER_STANCE_HEIGHT = 150;

const BATTER_SWING_WIDTH = 200;
const BATTER_SWING_HEIGHT = 150;

const pitchingFrames: FrameData[] = [
  {
    src: "/pitching-frames/1.png",
    width: PITCHER_WIDTH,
    height: PITCHER_HEIGHT
  },
  {
    src: "/pitching-frames/2.png",
    width: PITCHER_WIDTH,
    height: PITCHER_HEIGHT
  },
  {
    src: "/pitching-frames/3.png",
    width: PITCHER_WIDTH,
    height: PITCHER_HEIGHT
  },
  {
    src: "/pitching-frames/4.png",
    width: PITCHER_WIDTH,
    height: PITCHER_HEIGHT
  }
];

const hittingFrames: FrameData[] = [
  {
    src: "/hitting-frames/1.png",
    width: BATTER_STANCE_WIDTH,
    height: BATTER_STANCE_HEIGHT
  },
  {
    src: "/hitting-frames/2.png",
    width: BATTER_STANCE_WIDTH,
    height: BATTER_STANCE_HEIGHT
  },
  {
    src: "/hitting-frames/3.png",
    width: BATTER_SWING_WIDTH,
    height: BATTER_SWING_HEIGHT
  },
  {
    src: "/hitting-frames/4.png",
    width: BATTER_SWING_WIDTH,
    height: BATTER_SWING_HEIGHT
  }
];

const PITCHING_TIME = 800;
const perFramePitchTime = PITCHING_TIME / pitchingFrames.length;

const SWING_TIME = 300;
const perFrameSwingTime = SWING_TIME / hittingFrames.length;
const MAX_BALL_THROW_TIME = 70000;
const HOME_RUN_TIME = 1200;

interface Position {
  x: number;
  y: number;
}

const pitchMap: Record<PitchSelect, PitchConfig> = {
  fastball: {
    speed: 95,
    break: 0,
    name: "Fastball",
    trajectory: "straight"
  },
  curveball: {
    speed: 80,
    break: 10,
    name: "Curveball",
    trajectory: "12-6"
  },
  changeup: {
    speed: 75,
    break: 5,
    name: "Changeup",
    trajectory: "straight"
  }
};

function FeedBack({ result }: { result: BatResult }) {
  // the user is the pitcher so strike is good, home run is bad
  // if we have feedback text, fade it in and out
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (result) {
      setVisible(true);
      setTimeout(() => setVisible(false), 2000);
    }
  }, [result]);

  return (
    <div
      className={twMerge(
        "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-5xl font-serif",
        visible ? "opacity-100" : "opacity-0",
        result === "homeRun"
          ? "text-red-500"
          : result === "strike"
          ? "text-green-500"
          : ""
      )}
    >
      {result && batResultMap[result]}
    </div>
  );
}
const PitchingGame: React.FC = () => {
  const [pitching, setPitching] = useState<boolean>(false);
  const [pitchFrame, setPitchFrame] = useState<number>(0);
  const [hitting, setHitting] = useState<boolean>(false);
  const [hitFrame, setHitFrame] = useState<number>(0);
  const [ballPosition, setBallPosition] = useState<Position>({ x: 0, y: 0 });
  const [ballVisible, setBallVisible] = useState<boolean>(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(0.5);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const batterRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const pitcherRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [batResult, setBatResult] = useState<BatResult>(null);
  const [batterSwinging, setBatterSwinging] = useState<boolean>(false);
  const [pitcherWindUp, setPitcherWindUp] = useState<boolean>(false);
  const [currentPitch, setCurrentPitch] = useState<PitchSelect | null>(null);
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);
  useEffect(() => {
    const checkCollision = () => {
      if (ballRef.current && batterRef.current && !!batResult && ballVisible) {
        const ballRect = ballRef.current.getBoundingClientRect();
        const batterRect = batterRef.current.getBoundingClientRect();

        if (
          ballRect.left >= batterRect.left + batterRect.width * 0.5 &&
          ballRect.bottom >= batterRect.top &&
          ballRect.top <= batterRect.bottom
        ) {
          swingBat(batResult);
          if (batResult === "homeRun") {
            hitHomeRun();
          } else {
            setCurrentScore(currentScore + 1);
            animationRef.current && cancelAnimationFrame(animationRef.current);
            setBallVisible(false);
          }
        }
      }
    };

    if (ballVisible) {
      const intervalId = setInterval(checkCollision, 10);
      return () => clearInterval(intervalId);
    }
  }, [ballVisible, batResult, batterSwinging, currentPitch]);

  const resetStage = () => {
    animationRef.current && cancelAnimationFrame(animationRef.current);
    setPitching(false);
    setPitchFrame(0);
    setHitting(false);
    setHitFrame(0);
    setBallVisible(false);
    setBallPosition({ x: 0, y: 0 });
    setBatterSwinging(false);
    setBatResult(null);
    setCurrentPitch(null);
    setShowSlider(false);
    setCurrentDifficulty(currentDifficulty + 0.1);
  };

  const hitHomeRun = (): void => {
    if (batterRef.current && gameAreaRef.current && ballRef.current) {
      const batterRect = batterRef.current.getBoundingClientRect();
      const gameRect = gameAreaRef.current.getBoundingClientRect();

      const startX = batterRect.left + batterRect.width * 0.5;
      const startY = batterRect.top - 250;
      const endX = gameRect.left - 100; // Off the screen
      const endY = -500;

      let startTime: number | null = null;
      setBallPosition({ x: startX, y: startY });
      const animate = (timestamp: number): void => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / HOME_RUN_TIME;

        if (progress < 1) {
          const x = startX + (endX - startX) * progress;
          const y =
            startY +
            (endY - startY) * progress -
            100 * Math.sin(progress * Math.PI); // Arc
          setBallPosition({ x, y });
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setBallVisible(false);
          animationRef.current && cancelAnimationFrame(animationRef.current);
        }
      };
      animationRef.current = requestAnimationFrame(animate);
      configureGameReset();
    }
  };

  const configureGameReset = (): void => {
    setCurrentScore(0);
    setCurrentDifficulty(0.5);
  };

  const pitch = (): Promise<void> => {
    return new Promise((resolve) => {
      setPitching(true);
      setPitchFrame(1);

      setTimeout(() => {
        setPitchFrame(2);
      }, perFramePitchTime);

      setTimeout(() => {
        setPitchFrame(3);
        setPitching(false);
        resolve();
      }, perFramePitchTime * 2);

      setTimeout(() => {
        setPitchFrame(0);
        setPitching(false);
      }, PITCHING_TIME);
    });
  };

  const swingBat = (batResult: BatResult): void => {
    setHitting(true);
    setHitFrame(1);
    setBatResult(batResult);

    setTimeout(() => {
      setHitFrame(2);
    }, perFrameSwingTime);

    setTimeout(() => {
      setHitFrame(3);
    }, perFrameSwingTime * 2);

    setTimeout(() => {
      setHitFrame(0);
      setHitting(false);
    }, SWING_TIME * 3);
  };

  const throwBall = (accuracy: number): void => {
    if (pitcherRef.current && batterRef.current && currentPitch) {
      const pitcherRect = pitcherRef.current.getBoundingClientRect();
      const batterRect = batterRef.current.getBoundingClientRect();

      const startX = pitcherRect.left;
      const startY = pitcherRect.height * 0.5;
      const endX = batterRect.right;
      const endY = batterRect.top - pitcherRect.top + batterRect.height * 0.5;

      setBallPosition({ x: startX, y: startY });
      setBallVisible(true);

      let startTime: number | null = null;

      const trajectory = pitchMap[currentPitch].trajectory || "straight";
      const yConstant = trajectory === "12-6" ? 0.5 : 0;
      const ballThrowTime = MAX_BALL_THROW_TIME / pitchMap[currentPitch].speed;
      const animate = (timestamp: number): void => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / ballThrowTime;

        if (progress < 1) {
          const x = startX + (endX - startX) * progress;
          const y =
            startY + (endY - startY) * progress + yConstant * 100 * progress;
          setBallPosition({ x, y });
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setBallPosition({ x: endX, y: endY });
        }
      };
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const handlePitch = async (accuracy: number): Promise<void> => {
    setPitcherWindUp(false);
    resetStage();
    await pitch();
    throwBall(accuracy);
    calculateBatResult(accuracy);
  };

  const calculateBatResult = (accuracy: number): void => {
    const swing = Math.random() * 100;
    const goodPitch = accuracy < 20;
    const amazingPitch = accuracy < 10;
    const perfectPitch = accuracy < 5;

    if (perfectPitch) {
      scheduleSwingAndMiss();
      return;
    } else if (amazingPitch && swing < 80) {
      scheduleSwingAndMiss();
      return;
    } else if (goodPitch && swing < 50) {
      scheduleSwingAndMiss();
      return;
    } else {
      setBatResult("homeRun");
    }
  };

  const scheduleSwingAndMiss = (): void => {
    setBatResult("strike");
  };

  const windUp = async (): Promise<void> => {
    setPitcherWindUp(true);
    setPitchFrame(1);
  };

  const handlePitchSelect = (pitch: PitchSelect): void => {
    setCurrentPitch(pitch);
    setShowSlider(true);
  };

  return (
    <div className="h-screen text-center">
      <div className="text-2xl text-slate-100 font-serif">
        Can you, Paul Skenes, strike out the batter?
      </div>
      <br />
      <div className="flex flex-col gap-16 justify-center " ref={gameAreaRef}>
        <div className="text-slate-100">
          <div>Current Score: {currentScore}</div>
        </div>
        <div className="flex justify-between items-center h-64 relative">
          <div
            className="relative w-1/2 h-full flex items-center md:ml-32"
            ref={pitcherRef}
          >
            <Image
              src={pitchingFrames[pitchFrame].src}
              alt="Paul Skenes"
              width={pitchingFrames[pitchFrame].width}
              height={pitchingFrames[pitchFrame].height}
              className="h-full"
            />
          </div>
          {ballVisible && (
            <div
              ref={ballRef}
              className="absolute"
              style={{
                left: `${ballPosition.x}px`,
                top: `${ballPosition.y}px`,
                transition: "none"
              }}
            >
              <Image
                src="/mlb-baseball.png"
                alt="Baseball"
                width={25}
                height={25}
              />
            </div>
          )}
          <div className="w-24 h-12">
            {!ballVisible && <FeedBack result={batResult} />}
          </div>
          <div
            className="relative w-full h-full flex justify-center items-center"
            ref={batterRef}
          >
            <Image
              src={hittingFrames[hitFrame].src}
              alt="Rafael Devers"
              width={hittingFrames[hitFrame].width}
              height={hittingFrames[hitFrame].height}
              layout="fixed"
            />
          </div>
        </div>
        {pitcherWindUp ? (
          !showSlider && (
            <div className="flex justify-center w-1/4 gap-4 self-center">
              <Button
                onClick={() => handlePitchSelect("fastball")}
                className="px-4 py-2 bg-green-500 text-white disabled:opacity-50 rounded w-1/3 mx-auto"
                disabled={pitching || hitting || ballVisible}
                key={pitchMap.fastball.name}
              >
                {pitchMap.fastball.name}
              </Button>
              <Button
                onClick={() => handlePitchSelect("curveball")}
                className="px-4 py-2 bg-green-500 text-white disabled:opacity-50 rounded w-1/3 mx-auto"
                disabled={pitching || hitting || ballVisible}
                key={pitchMap.curveball.name}
              >
                {pitchMap.curveball.name}
              </Button>

              <Button
                onClick={() => handlePitchSelect("changeup")}
                className="px-4 py-2 bg-green-500 text-white disabled:opacity-50 rounded w-1/3 mx-auto"
                disabled={pitching || hitting || ballVisible}
                key={pitchMap.changeup.name}
              >
                {pitchMap.changeup.name}
              </Button>
            </div>
          )
        ) : (
          <Button
            onClick={windUp}
            className="px-4 py-2 bg-green-500 text-white disabled:opacity-50 rounded w-1/8 mx-auto"
            disabled={pitching || hitting || ballVisible}
            key={"pitch"}
          >
            Pitch
          </Button>
        )}
        {showSlider && !!currentPitch && (
          <div className="self-center w-1/4">
            <Slider
              onStop={(accuracy) => handlePitch(accuracy)}
              difficulty={currentDifficulty}
              pitchType={currentPitch}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PitchingGame;

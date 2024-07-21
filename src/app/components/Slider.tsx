import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { PitchSelect } from "./types";

interface SliderProps {
  difficulty: number;
  pitchType: PitchSelect;
  onStop: (accuracy: number) => void;
}
const Slider: React.FC<SliderProps> = ({ onStop, difficulty, pitchType }) => {
  const [position, setPosition] = useState<number>(0);
  const [moving, setMoving] = useState<boolean>(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setPosition((prev) => {
        let nextPosition;
        switch (pitchType) {
          case "fastball":
            nextPosition = prev + difficulty;
          case "curveball":
            // should be sinosoidal
            nextPosition = prev - difficulty;
          case "changeup":
            nextPosition = prev + difficulty;
        }

        if (nextPosition >= 100) {
          return 0;
        }
        return nextPosition;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    if (moving) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [moving]);

  const handleStop = () => {
    setMoving(false);
    const accuracy = Math.abs(50 - position);
    onStop(accuracy);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        handleStop();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    // slider container
    <div className="flex flex-col gap-8 justify-center items-center">
      <div
        className="relative w-full h-8 bg-gray-300 flex flex-col gap-2"
        ref={sliderRef}
      >
        {/* 'sweet-spot general zone' showing where the user should stop it */}
        <div className="absolute top-0 bottom-0 bg-green-500 left-[50%] w-32 translate-x-[-50%]"></div>
        {/* sweet spot heat zone (basically an automatic strikeout ) */}
        <div className="absolute top-0 bottom-0 bg-red-500 left-[50%] w-4 translate-x-[-50%]"></div>
        {/* ticker going across */}
        <div
          className="absolute top-0 bottom-0 bg-black"
          style={{ left: `${position}%`, width: "4px" }}
        ></div>
      </div>
      <div>
        <Button
          className="bg-red-800 text-white p-1 rounded"
          onClick={handleStop}
        >
          {"Stop"}
        </Button>
      </div>
    </div>
  );
};

export default Slider;

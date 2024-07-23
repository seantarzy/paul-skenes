import PitchingGame from "../components/PitchingGame";

export default function Games() {
  return (
    <>
      <h1 className="text-slate-300 text-4xl md:text-7xl font-serif">Games</h1>
      <br />
      <div className="h-[450px] w-full">
        <PitchingGame />
      </div>
    </>
  );
}

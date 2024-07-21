import PitchingGame from "../components/PitchingGame";

export default function Games() {
  return (
    <div className="bg-slate-950 flex flex-col items-center h-screen w-screen pt-12">
      <h1 className="text-slate-300 text-7xl font-serif">Games</h1>
      <br />
      <div className="h-[450px] w-full">
        <PitchingGame />
      </div>
    </div>
  );
}

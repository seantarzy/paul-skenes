export default function About() {
  return (
    <div className="bg-slate-950 flex flex-col items-center h-[100vh] w-100[vw] pt-12">
      <h1 className="text-slate-300 text-7xl font-serif">About</h1>
      <br />
      <div className="h-[250px] text-slate-300 text-2xl font-serif m-24">
        <p className="">
          Paul Skenes, born on May 29, 2002, in Fullerton, California, is a
          professional baseball pitcher for the Pittsburgh Pirates. He attended
          El Toro High School and initially played college baseball for the Air
          Force Falcons, where he won the John Olerud Award in 2022. Skenes
          later transferred to LSU, leading the team to a 2023 College World
          Series win and earning the Dick Howser Trophy. Drafted first overall
          by the Pirates in 2023, he quickly progressed through the minor
          leagues and debuted in MLB in 2024.
        </p>
        <br />
        <a
          className="text-slate-400"
          href="https://en.wikipedia.org/wiki/Paul_Skenes"
          target="_blank"
        >
          Read more
        </a>
      </div>
    </div>
  );
}

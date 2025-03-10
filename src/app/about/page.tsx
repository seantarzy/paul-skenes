export default function About() {
  return (
    <div>
      <h1 className="mt-2 text-slate-300 text-4xl md:text-7xl font-serif">
        About
      </h1>
      <div className=" text-slate-300 text-lg md:text-2xl font-serif m-24 pb-4 md:px-2 overflow-scroll h-[550px]">
        <p>
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
          className="text-slate-400 pb-2"
          href="https://en.wikipedia.org/wiki/Paul_Skenes"
          target="_blank"
        >
          Read more
        </a>
      </div>
    </div>
  );
}

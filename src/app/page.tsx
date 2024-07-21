import Image from "next/image";
import "./Skenes.css";
export default async function Home({ data }: { data: any }) {
  console.log(data);
  return (
    <div className="bg-slate-950 flex flex-col items-center h-[100vh] w-100[vw] pt-12">
      <h1 className="text-slate-300 text-2xl md:text-7xl font-serif">
        Paul Skenes
      </h1>
      <br />
      <div className="h-[250px]">
        <Image
          src="/skenes-throw.png"
          alt="Paul Skenes"
          className="skenes-image"
          width={600}
          height={250}
        />
      </div>
    </div>
  );
}

async function getServerSideProps() {
  const data = await fetch("api/stats").then((res) => res.json());

  return {
    props: {
      data
    }
  };
}

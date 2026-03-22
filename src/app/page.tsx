import Image from "next/image";
import "./Skenes.css";
import Head from "next/head";
import MerchLinks from "./components/MerchLinks";

export default async function Home() {
  return (
    <div className="bg-slate-950 flex flex-col items-center min-h-screen w-full pt-12 pb-12">
      <Head>
        <title>Paul Skenes</title>
        <meta name="description" content="Best pitcher ever?" />
        <link rel="icon" href="./favicon.ico" />
        <link rel="stylesheet" href="/fonts/inter.css" />
      </Head>
      <div className="text-slate-300 font-serif">
        <h1 className="text-2xl md:text-7xl">Paul Skenes</h1>
        <br />
        <h2 className="text-xl md:text-4xl"> Fan Site </h2>
      </div>
      <br />
      <div className="h-[250px] mb-8">
        <Image
          src="/skenes-throw.png"
          alt="Paul Skenes throwing a pitch"
          className="skenes-image"
          width={600}
          height={250}
        />
      </div>

      <MerchLinks />
    </div>
  );
}

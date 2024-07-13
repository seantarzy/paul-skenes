import { env } from "process";
import EmailMeBox from "./components/EmailMeBox";

export default function Contact() {
  const myEmail = env.EMAIL;
  return (
    <div className="bg-slate-950 flex flex-col items-center h-[100vh] w-100[vw] pt-12">
      <h1 className="text-slate-300 text-7xl font-serif">Contact</h1>
      <br />
      <EmailMeBox />
    </div>
  );
}

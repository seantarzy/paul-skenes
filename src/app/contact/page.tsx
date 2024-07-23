import { env } from "process";
import EmailMeBox from "./components/EmailMeBox";

export default function Contact() {
  return (
    <>
      <h1 className="text-slate-300 text-4xl md:text-7xl font-serif">
        Contact
      </h1>
      <EmailMeBox />
    </>
  );
}

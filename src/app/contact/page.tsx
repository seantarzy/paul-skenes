import { env } from "process";
import EmailMeBox from "./components/EmailMeBox";

export default function Contact() {
  return (
    <>
      <h1 className="text-slate-300 text-4xl md:text-7xl font-serif">
        Contact
      </h1>
      <br />
      <h3 className="text-slate-300 text-lg md:text-2xl font-serif">
        {"I own this website and domain. Let's chat."}
      </h3>
      <EmailMeBox />
    </>
  );
}

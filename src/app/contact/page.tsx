import type { Metadata } from "next";
import EmailMeBox from "./components/EmailMeBox";

export const metadata: Metadata = {
  title: "Contact | PaulSkenes.com",
  description: "Get in touch with PaulSkenes.com.",
  alternates: { canonical: "https://paulskenes.com/contact" }
};

export default function Contact() {
  return (
    <>
      <h1 className="text-slate-300 text-4xl md:text-7xl font-serif">
        Contact
      </h1>
      <br />
      <h3 className="text-slate-300 text-lg md:text-2xl font-serif">
        {"This is an independent fan site. For inquiries, reach out below."}
      </h3>
      <EmailMeBox />
    </>
  );
}

import type { Metadata } from "next";
import EmailMeBox from "./components/EmailMeBox";

export const metadata: Metadata = {
  title: "Contact & Domain Inquiries | PaulSkenes.com",
  description:
    "PaulSkenes.com is available for acquisition. Contact for domain inquiries, partnerships, or general questions.",
  alternates: { canonical: "https://paulskenes.com/contact" }
};

export default function Contact() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center gap-8 pb-16">
      <h1 className="text-slate-300 text-4xl md:text-7xl font-serif">Contact</h1>

      {/* Domain inquiry — primary */}
      <section className="w-full bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/40 rounded-xl p-6 md:p-8 text-left">
        <p className="text-yellow-400 text-xs uppercase tracking-widest font-semibold mb-2">
          Domain Acquisition
        </p>
        <h2 className="text-slate-100 text-2xl md:text-3xl font-serif mb-3">
          PaulSkenes.com is available
        </h2>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
          A premium, exact-match domain for one of MLB&rsquo;s most marketable
          young stars — ideal for agencies, brands, collectibles, or licensing
          partners. Serious inquiries welcome.
        </p>
        <EmailMeBox
          subject="PaulSkenes.com — Domain Acquisition Inquiry"
          buttonText="Inquire about acquiring PaulSkenes.com"
          ctaLocation="contact_page_domain_inquiry"
        />
      </section>

      {/* General contact — secondary */}
      <section className="w-full text-left">
        <h3 className="text-slate-400 text-lg font-serif mb-2">
          Other inquiries
        </h3>
        <p className="text-slate-500 text-sm md:text-base">
          For partnerships, press, or general questions, use the same address
          above.
        </p>
      </section>
    </div>
  );
}

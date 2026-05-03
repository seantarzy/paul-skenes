"use client";

import { useState } from "react";
import { trackCTAClick } from "@/lib/analytics";

const SALE_EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "";
const MAILTO = `mailto:${SALE_EMAIL}?subject=${encodeURIComponent(
  "PaulSkenes.com — Domain Acquisition Inquiry"
)}&body=${encodeURIComponent(
  "Hi Sean,\n\nI'd like to discuss acquiring the PaulSkenes.com domain.\n\n"
)}`;

export default function DomainSaleBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SALE_EMAIL);
      setCopied(true);
      trackCTAClick({
        cta_text: "Copy email",
        cta_location: "domain_sale_banner",
        cta_destination: "clipboard"
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full bg-yellow-500 text-slate-950 text-sm md:text-base font-medium border-b border-yellow-600">
      <div className="max-w-5xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <span>
          <span className="font-bold">PaulSkenes.com</span> is available for acquisition.
        </span>
        <span className="flex items-center gap-2">
          <a
            href={MAILTO}
            onClick={() =>
              trackCTAClick({
                cta_text: "Inquire about domain",
                cta_location: "domain_sale_banner",
                cta_destination: "mailto"
              })
            }
            className="underline underline-offset-2 hover:text-slate-800 font-semibold"
          >
            {SALE_EMAIL}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="bg-slate-950 text-yellow-400 hover:bg-slate-800 text-xs font-semibold px-2 py-1 rounded"
            aria-label="Copy email address"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </span>
      </div>
    </div>
  );
}

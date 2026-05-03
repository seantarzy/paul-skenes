"use client";

import { useState } from "react";
import { trackCTAClick } from "@/lib/analytics";

interface EmailMeBoxProps {
  subject?: string;
  buttonText?: string;
  ctaLocation?: string;
}

export default function EmailMeBox({
  subject,
  buttonText,
  ctaLocation = "contact_page"
}: EmailMeBoxProps) {
  const email = process.env.NEXT_PUBLIC_EMAIL ?? "";
  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      trackCTAClick({
        cta_text: "Copy email",
        cta_location: ctaLocation,
        cta_destination: "clipboard"
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-start">
      <a
        href={href}
        onClick={() =>
          trackCTAClick({
            cta_text: buttonText ?? "Email Me",
            cta_location: ctaLocation,
            cta_destination: "mailto"
          })
        }
        className="inline-block bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-semibold text-base md:text-lg px-6 py-3 rounded-lg shadow-md transition-colors"
      >
        {buttonText ?? `Email ${email}`}
      </a>
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span>or copy:</span>
        <code className="bg-slate-800 text-yellow-300 px-2 py-1 rounded">
          {email}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-3 py-1 rounded text-xs"
          aria-label="Copy email address"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

"use client";

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
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;

  return (
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
  );
}

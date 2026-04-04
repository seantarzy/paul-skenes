'use client'

import Link from 'next/link';
import { trackCTAClick } from '@/lib/analytics';

export default function CTALink({
  href,
  text,
  location,
}: {
  href: string;
  text: string;
  location: string;
}) {
  return (
    <Link
      href={href}
      onClick={() => trackCTAClick({ cta_text: text, cta_location: location, cta_destination: href })}
      className="inline-block bg-yellow-600 hover:bg-yellow-500 text-slate-950 font-bold px-6 py-3 rounded-lg text-sm transition-colors whitespace-nowrap self-start md:self-center"
    >
      {text}
    </Link>
  );
}

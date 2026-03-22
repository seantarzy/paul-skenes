'use client'

import { trackMerchClick } from '../analytics/trackEvent';

export default function MerchLinks() {
  const merchLinks = [
    {
      title: "Official Paul Skenes Jersey",
      description: "Get the official Pirates #30 jersey",
      url: "https://www.mlbshop.com/pittsburgh-pirates/jerseys/t-36773417+d-3494557726+z-9-3509492842",
      store: "MLB Shop",
      color: "bg-yellow-600 hover:bg-yellow-700"
    },
    {
      title: "Paul Skenes Gear",
      description: "Browse all Paul Skenes merchandise",
      url: "http://www.fanatics.com/affiliates/x-2712+z-928231036-1795439153",
      store: "Fanatics",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Pirates Game Tickets",
      description: "See Paul Skenes pitch live at PNC Park",
      url: "https://www.mlb.com/pirates/tickets",
      store: "MLB Tickets",
      color: "bg-slate-700 hover:bg-slate-800"
    }
  ];

  return (
    <div className="w-full max-w-4xl px-4 py-8">
      <h2 className="text-slate-300 text-3xl font-serif mb-6 text-center">
        Support Paul Skenes
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {merchLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={`${link.color} text-white rounded-lg p-6 transition-all transform hover:scale-105 shadow-lg`}
            onClick={() => trackMerchClick(link.title, link.store, link.url)}
          >
            <div className="text-sm uppercase tracking-wide opacity-75 mb-2">
              {link.store}
            </div>
            <div className="text-lg font-bold mb-2">{link.title}</div>
            <div className="text-sm opacity-90">{link.description}</div>
          </a>
        ))}
      </div>
      <div className="mt-4 text-center text-slate-500 text-xs">
        <p>Affiliate Disclosure: This site may earn a commission from qualifying purchases through these links.</p>
      </div>
    </div>
  );
}

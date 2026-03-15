'use client'

import { trackMerchClick } from '../analytics/trackEvent';

export default function MerchPage() {
  const merchCategories = [
    {
      category: "Jerseys & Apparel",
      items: [
        {
          title: "Paul Skenes Authentic Jersey",
          description: "Official Nike Pirates jersey with Skenes #30",
          price: "$120+",
          url: "https://www.mlbshop.com/pittsburgh-pirates/jerseys/t-36773417+d-3494557726+z-9-3509492842",
          store: "MLB Shop"
        },
        {
          title: "Paul Skenes Replica Jersey",
          description: "Affordable replica jersey",
          price: "$80+",
          url: "https://www.fanatics.com/mlb/pittsburgh-pirates/o-4565+t-92448969+z-91146-3114913196",
          store: "Fanatics"
        },
        {
          title: "Pirates T-Shirts",
          description: "Paul Skenes themed t-shirts and tees",
          price: "$25+",
          url: "https://www.fanatics.com/mlb/pittsburgh-pirates/t-shirts/o-3443+t-70220858+d-89886642+z-9-3281177128",
          store: "Fanatics"
        },
        {
          title: "Pirates Hoodies",
          description: "Show your support in style",
          price: "$50+",
          url: "https://www.fanatics.com/mlb/pittsburgh-pirates/sweatshirts/o-1254+t-47557747+d-01447531+z-9-3414606847",
          store: "Fanatics"
        }
      ]
    },
    {
      category: "Tickets & Experiences",
      items: [
        {
          title: "Pirates Game Tickets",
          description: "See Paul Skenes pitch live at PNC Park",
          price: "Varies",
          url: "https://www.mlb.com/pirates/tickets",
          store: "MLB.com"
        },
        {
          title: "StubHub Tickets",
          description: "Find deals on Pirates tickets",
          price: "Varies",
          url: "https://www.stubhub.com/pittsburgh-pirates-tickets/performer/3417/",
          store: "StubHub"
        }
      ]
    },
    {
      category: "Collectibles & Memorabilia",
      items: [
        {
          title: "Paul Skenes Rookie Cards",
          description: "Topps and Bowman rookie cards",
          price: "$10+",
          url: "https://www.ebay.com/sch/i.html?_nkw=paul+skenes+rookie+card",
          store: "eBay"
        },
        {
          title: "Signed Memorabilia",
          description: "Autographed photos and baseballs",
          price: "$100+",
          url: "https://www.fanatics.com/mlb/pittsburgh-pirates/autographs/o-3465+t-70117858+d-56118642+z-9-3573042660",
          store: "Fanatics Authentic"
        },
        {
          title: "Pirates Caps & Hats",
          description: "Official New Era caps",
          price: "$30+",
          url: "https://www.fanatics.com/mlb/pittsburgh-pirates/hats/o-2354+t-36339636+d-45662086+z-9-1685491372",
          store: "Fanatics"
        }
      ]
    },
    {
      category: "Baseball Equipment",
      items: [
        {
          title: "Pitching Gear",
          description: "Train like Paul Skenes",
          price: "$50+",
          url: "https://www.dickssportinggoods.com/f/baseball-pitching-training-aids",
          store: "Dick's Sporting Goods"
        },
        {
          title: "MLB Baseballs",
          description: "Official MLB game balls",
          price: "$15+",
          url: "https://www.dickssportinggoods.com/f/baseballs",
          store: "Dick's Sporting Goods"
        }
      ]
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-slate-300 text-5xl md:text-7xl font-serif mb-4">
            Paul Skenes Merch
          </h1>
          <p className="text-slate-400 text-lg">
            Support your favorite pitcher with official gear and collectibles
          </p>
        </div>

        {merchCategories.map((category, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="text-slate-200 text-3xl font-serif mb-6 border-b border-slate-700 pb-2">
              {category.category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="bg-slate-900 rounded-lg p-6 border border-slate-700 hover:border-slate-500 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-slate-100 text-xl font-semibold flex-1">
                      {item.title}
                    </h3>
                    <span className="text-yellow-500 font-bold text-lg ml-2">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-xs uppercase">
                      {item.store}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
                      onClick={() => trackMerchClick(item.title, item.store, item.url)}
                    >
                      Shop Now →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Affiliate Disclosure */}
        <div className="mt-16 bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-slate-300 text-lg font-semibold mb-2">
            Affiliate Disclosure
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            PaulSkenes.com is a participant in various affiliate programs. This means we may earn
            a commission when you click on or make purchases via our affiliate links. This comes at
            no additional cost to you and helps support the maintenance of this fan site. We only
            recommend products and services that we believe will add value to fellow Paul Skenes fans.
          </p>
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-slate-900/50 border border-slate-800 rounded-lg p-6">
          <h2 className="text-slate-300 text-2xl font-serif mb-4">
            Why Buy Paul Skenes Merchandise?
          </h2>
          <div className="text-slate-400 space-y-3 text-sm leading-relaxed">
            <p>
              Paul Skenes burst onto the MLB scene in 2024, winning the National League Rookie of the Year
              award with a dominant performance that included a sub-2.00 ERA and over 170 strikeouts in his
              debut season. His electric fastball and devastating arsenal quickly made him one of the most
              exciting pitchers in baseball.
            </p>
            <p>
              Whether you&apos;re looking for an authentic Paul Skenes #30 jersey, collectible rookie cards, or
              tickets to see him dominate at PNC Park, this page has you covered. From official MLB Shop gear
              to unique memorabilia, we&apos;ve curated the best places to find Paul Skenes merchandise online.
            </p>
            <p>
              <strong>Popular searches:</strong> Paul Skenes jersey, Paul Skenes rookie card, Paul Skenes
              autograph, Pirates tickets, Paul Skenes shirt, Paul Skenes memorabilia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

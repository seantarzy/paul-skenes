# Paul Skenes — Data Dive Site

This is **Paul Skenes**, a fan site for the Pirates pitcher. It's part of [Operation Data Dive](https://data-dive-sean-tarzys-projects.vercel.app) — Sean's cross-site analytics framework.

## Quick stats lookup

Before answering questions about traffic, engagement, or user behavior, fetch live data:
```bash
API_KEY=$(grep API_KEY ~/Development/code/data-dive/.env.local | cut -d= -f2)
curl -s -H "X-API-Key: $API_KEY" "https://data-dive-sean-tarzys-projects.vercel.app/api/status/paul-skenes?period=7d"
```

## Site facts

- **GA4 property:** `properties/450020265` (measurement ID via `NEXT_PUBLIC_MEASUREMENT_ID` env var)
- **Category:** fan-site
- **Framework:** Next.js 14 App Router
- **Analytics module:** `src/lib/analytics.ts` — uses unified Data Dive events (Tier 1 universal + fan-site Tier 2)
- **Tracked events:** `cta_click`, `outbound_click`, `navigation_click`, `content_engagement`, `share_click`, `error_encountered`, `game_play`, `schedule_view`, `stat_lookup`, `merch_click`

## Site-specific gotchas

- Repo lives in nested directory: `~/Development/code/paul-skenes/skenes/` (the outer `paul-skenes/` is the git root)
- Has games (pitching challenge, trivia) in `src/app/games/` — these track via `trackGamePlay`
- News feed in `src/components/NewsFeed.tsx` uses `trackOutboundClick` for article links

For full Data Dive context see `~/.claude/CLAUDE.md`.

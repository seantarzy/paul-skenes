/**
 * Data Dive Analytics — Unified event tracking for Paul Skenes site.
 *
 * Matches the shared Data Dive analytics module for consistent,
 * cross-site-comparable GA4 events.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

interface CTAClickParams extends EventParams {
  cta_text: string;
  cta_location: string;
  cta_destination?: string;
}

interface OutboundClickParams extends EventParams {
  url: string;
  link_text?: string;
  link_location?: string;
}

interface NavigationClickParams extends EventParams {
  destination: string;
  nav_location: "header" | "footer" | "sidebar" | "inline";
}

interface ContentEngagementParams extends EventParams {
  content_type: string;
  content_id?: string;
  engagement_type: "scroll_depth" | "time_on_content" | "interaction";
  value?: number;
}

interface ShareClickParams extends EventParams {
  method: "clipboard" | "native_share" | "twitter" | "facebook" | "email" | string;
  content_type?: string;
  content_id?: string;
}

interface ErrorParams extends EventParams {
  error_type: string;
  error_message: string;
  error_location?: string;
}

// ---------------------------------------------------------------------------
// Core
// ---------------------------------------------------------------------------

function gtag(...args: unknown[]): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...(args as [string, ...unknown[]]));
  }
}

/** Send a custom GA4 event */
export function trackEvent(eventName: string, params?: EventParams): void {
  gtag("event", eventName, params);
}

// ---------------------------------------------------------------------------
// Tier 1 — Universal Events (every site)
// ---------------------------------------------------------------------------

/** CTA button/link clicked */
export function trackCTAClick(params: CTAClickParams): void {
  trackEvent("cta_click", params);
}

/** User clicked an external link */
export function trackOutboundClick(params: OutboundClickParams): void {
  trackEvent("outbound_click", params);
}

/** Navigation item clicked */
export function trackNavigationClick(params: NavigationClickParams): void {
  trackEvent("navigation_click", params);
}

/** Meaningful content engagement (time, scroll, interaction) */
export function trackContentEngagement(params: ContentEngagementParams): void {
  trackEvent("content_engagement", params);
}

/** Share button clicked */
export function trackShareClick(params: ShareClickParams): void {
  trackEvent("share_click", params);
}

/** Error encountered by user */
export function trackError(params: ErrorParams): void {
  trackEvent("error_encountered", params);
}

// ---------------------------------------------------------------------------
// Tier 2 — Fan-Site Events
// ---------------------------------------------------------------------------

export function trackGamePlay(gameType: string, action: string, score?: number): void {
  trackEvent("game_play", { game_type: gameType, action, score });
}

export function trackScheduleView(gameDate?: string, opponent?: string): void {
  trackEvent("schedule_view", { game_date: gameDate, opponent });
}

export function trackStatLookup(statType: string, period?: string): void {
  trackEvent("stat_lookup", { stat_type: statType, period });
}

export function trackMerchClick(item: string, location: string): void {
  trackEvent("merch_click", { item, location });
}

// ---------------------------------------------------------------------------
// Window type augmentation
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

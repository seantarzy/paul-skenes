declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackMerchClick(itemTitle: string, store: string, url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'merch_click', {
      event_category: 'Affiliate',
      event_label: itemTitle,
      store,
      destination_url: url,
    });
  }
}

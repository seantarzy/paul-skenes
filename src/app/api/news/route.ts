import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "No API key" }, { status: 500 });
  }

  const url = `https://newsapi.org/v2/everything?q=%22paul+skenes%22&sortBy=publishedAt&language=en&pageSize=10&apiKey=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 1800 } });
    const data = await res.json();

    if (data.status !== "ok") {
      return NextResponse.json({ error: data.message }, { status: 502 });
    }

    const articles = data.articles
      .filter((a: any) => a.title && a.url && !a.title.includes("[Removed]"))
      .map((a: any) => ({
        title: a.title,
        url: a.url,
        source: a.source.name,
        publishedAt: a.publishedAt,
        description: a.description,
        urlToImage: a.urlToImage,
      }));

    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
  }
}

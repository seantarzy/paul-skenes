'use client'
import { useEffect, useState } from "react";

interface Article {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  description: string | null;
  urlToImage: string | null;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => {
        if (data.articles) setArticles(data.articles);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-yellow-500 text-3xl font-serif mb-6 text-left">
        Latest News
      </h2>

      {loading && (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {error && !loading && (
        <p className="text-slate-500 text-sm">Could not load news right now.</p>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="text-slate-500 text-sm">No recent articles found.</p>
      )}

      <div className="space-y-3">
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-yellow-700/50 rounded-lg p-4 transition-all group"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt=""
                className="w-20 h-16 object-cover rounded flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}
            <div className="flex flex-col justify-between text-left min-w-0">
              <p className="text-slate-200 font-medium text-sm leading-snug line-clamp-2 group-hover:text-yellow-400 transition-colors">
                {article.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-slate-500 text-xs">{article.source}</span>
                <span className="text-slate-600 text-xs">·</span>
                <span className="text-slate-500 text-xs">{timeAgo(article.publishedAt)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

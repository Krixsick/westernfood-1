import { createFileRoute } from "@tanstack/react-router";
import { useGetValorantNews } from "../api/news";
import { type NewsArticle } from "../api/valorantTypes";

export const Route = createFileRoute("/news")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: articles, isLoading, isError, error } = useGetValorantNews();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading news...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          Error: {error?.message || "Failed to load news"}
        </p>
      </div>
    );
  }

  // ✅ Check if database is empty
  if (!articles || articles.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Valorant News</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-gray-700 mb-2">
            📰 No news articles found in database.
          </p>
          <p className="text-sm text-gray-600">
            Run the sync script to populate data:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              npm run sync:news
            </code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Valorant Esports News</h1>

      <div className="space-y-4">
        {articles.map((article: NewsArticle) => (
          <div
            key={article.id}
            className="border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-3">{article.title}</h2>
            <p className="text-gray-700 mb-4">{article.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>By {article.author}</span>
              <span>{article.date}</span>
            </div>

            <a
              href={`${article.url_path}`}
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read full article →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

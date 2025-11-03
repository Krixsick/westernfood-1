import { createFileRoute } from "@tanstack/react-router";
import { useGetUpcomingMatches } from "../api/upcoming";
import { type UpcomingMatch } from "../api/valorantTypes";

export const Route = createFileRoute("/matches")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: matches, isLoading, error } = useGetUpcomingMatches();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading upcoming matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading matches: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Matches</h1>

      {matches && matches.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Teams</th>
                <th className="border border-gray-300 px-4 py-2">Event</th>
                <th className="border border-gray-300 px-4 py-2">Series</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Link</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match: UpcomingMatch, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-semibold">{match.team1}</span>
                      <span className="text-gray-500">vs</span>
                      <span className="font-semibold">{match.team2}</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {match.match_event}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {match.match_series}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {match.time_until_match}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-center">
                    {new Date(match.unix_timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <a
                      href={match.match_page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No upcoming matches found</p>
        </div>
      )}
    </div>
  );
}

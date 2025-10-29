import { createFileRoute } from "@tanstack/react-router";
import { useGetStats } from "../api/stats";
import { type PlayerStats } from "../api/valorantTypes";

export const Route = createFileRoute("/stats")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: players, isLoading, error } = useGetStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading stats: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pro Player Stats</h1>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Player</th>
            <th className="border border-gray-300 px-4 py-2">Org</th>
            <th className="border border-gray-300 px-4 py-2">Rating</th>
            <th className="border border-gray-300 px-4 py-2">K/D</th>
            <th className="border border-gray-300 px-4 py-2">HS%</th>
          </tr>
        </thead>
        <tbody>
          {players?.map((player: PlayerStats) => (
            <tr key={player.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {player.player}
              </td>
              <td className="border border-gray-300 px-4 py-2">{player.org}</td>
              <td className="border border-gray-300 px-4 py-2">
                {player.rating.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {player.kill_deaths.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {player.headshot_percentage}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

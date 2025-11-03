import { createFileRoute } from "@tanstack/react-router";
import { useGetNaTeamRankings } from "../api/naRankings";
import { type TeamRankings } from "../api/valorantTypes";

export const Route = createFileRoute("/rankings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: teams, isLoading, error } = useGetNaTeamRankings();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading rankings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading rankings: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Team Rankings</h1>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Rank</th>
            <th className="border border-gray-300 px-4 py-2">Team</th>
            <th className="border border-gray-300 px-4 py-2">Country</th>
            <th className="border border-gray-300 px-4 py-2">Record</th>
            <th className="border border-gray-300 px-4 py-2">Earnings</th>
            <th className="border border-gray-300 px-4 py-2">Last Played</th>
          </tr>
        </thead>
        <tbody>
          {teams?.map((team: TeamRankings) => (
            <tr key={team.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-bold">
                #{team.rank}
              </td>
              <td className="border border-gray-300 px-4 py-2">{team.team}</td>
              <td className="border border-gray-300 px-4 py-2">
                {team.country}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {team.record}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {team.earnings}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {team.last_played_team}
                <br />
                <span className="text-gray-500">{team.last_played}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

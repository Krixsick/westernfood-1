import { createFileRoute } from "@tanstack/react-router";
import { useGetUpcomingEvents } from "../api/events";
import { type UpcomingEvents } from "../api/valorantTypes";
import { useState } from "react";

export const Route = createFileRoute("/events")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: events, isLoading, error } = useGetUpcomingEvents();
  const [filterStatus, setFilterStatus] = useState<string>("all");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading events: {error.message}</p>
      </div>
    );
  }

  // Filter events based on selected status
  const filteredEvents = events?.filter((event: UpcomingEvents) =>
    filterStatus === "all" ? true : event.status === filterStatus
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Valorant Events</h1>

      {/* Filter buttons */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filterStatus === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => setFilterStatus("upcoming")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filterStatus === "upcoming"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilterStatus("ongoing")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filterStatus === "ongoing"
              ? "bg-yellow-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setFilterStatus("completed")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filterStatus === "completed"
              ? "bg-gray-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Completed
        </button>
      </div>

      {filteredEvents && filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event: UpcomingEvents) => (
            <div
              key={event.id}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Event thumbnail */}
              {event.thumb && (
                <img
                  src={event.thumb}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Event details */}
              <div className="p-4">
                {/* Status badge */}
                <div className="mb-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === "upcoming"
                        ? "bg-green-100 text-green-800"
                        : event.status === "ongoing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.status.toUpperCase()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>

                {/* Dates */}
                {event.dates && (
                  <p className="text-sm text-gray-600 mb-2">📅 {event.dates}</p>
                )}

                {/* Prize */}
                {event.prize && (
                  <p className="text-sm text-gray-600 mb-2">
                    💰 Prize: {event.prize}
                  </p>
                )}

                {/* Region */}
                {event.region && (
                  <p className="text-sm text-gray-600 mb-4">
                    🌍 Region: {event.region.toUpperCase()}
                  </p>
                )}

                {/* Link */}
                <a
                  href={event.url_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Event
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            No {filterStatus !== "all" ? filterStatus : ""} events found
          </p>
        </div>
      )}
    </div>
  );
}

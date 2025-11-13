import { createFileRoute } from "@tanstack/react-router";
import { Homepage } from "@/Components/home/homepage";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Homepage></Homepage>;
}

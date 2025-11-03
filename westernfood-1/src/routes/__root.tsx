import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/news" className="[&.active]:font-bold">
        News
      </Link>{" "}
      <Link to="/stats" className="[&.active]:font-bold">
        Stats
      </Link>{" "}
      <Link to="/rankings" className="[&.active]:font-bold">
        Ranks
      </Link>{" "}
      <Link to="/matches" className="[&.active]:font-bold">
        Matches
      </Link>{" "}
      <Link to="/events" className="[&.active]:font-bold">
        Events
      </Link>{" "}
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });

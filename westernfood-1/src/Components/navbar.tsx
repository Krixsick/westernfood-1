import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <div className="navbar bg-[#1C252E] shadow-sm">
      <div className="flex-1">
        <Link to="/" className="text-xl text-[#FF4655]">
          VALORANT ESPORTS
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/news"
              className="text-[#8A8D91] [&.active]:text-[#FF4655]"
            >
              News
            </Link>
          </li>
          <li>
            <Link
              to="/stats"
              className="text-[#8A8D91] [&.active]:text-[#FF4655]"
            >
              Stats
            </Link>
          </li>
          <li>
            <Link
              to="/rankings"
              className="text-[#8A8D91] [&.active]:text-[#FF4655]"
            >
              Rankings
            </Link>
          </li>
          <li>
            <Link
              to="/matches"
              className="text-[#8A8D91] [&.active]:text-[#FF4655]"
            >
              Matches
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              className="text-[#8A8D91] [&.active]:text-[#FF4655]"
            >
              Events
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

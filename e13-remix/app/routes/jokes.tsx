
import { Link, Outlet } from "react-router";

export default function JokesRoute() {
  return (
    <div className="app-shell">
      <header>
        <h1>J🤪KES</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/jokes" style={{ marginLeft: "1rem" }}>
            Jokes
          </Link>
          <Link to="/jokes/new" style={{ marginLeft: "1rem" }}>
            New joke
          </Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

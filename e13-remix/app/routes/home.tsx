
import { Link } from "react-router";

export default function IndexRoute() {
  return (
    <div className="app-shell">
      <div className="card">
        <h2>Welcome to the J🤪KES app</h2>
        <p style={{ marginTop: "0.75rem" }}>
          This is a tiny Remix-style app built with the new React Router
          framework.
        </p>

        <p style={{ marginTop: "1.25rem" }}>
          <Link to="/jokes">Go to jokes →</Link>
        </p>
      </div>
    </div>
  );
}

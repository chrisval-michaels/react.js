
import { Link, useLoaderData } from "react-router";

import { getJokes, getRandomJoke, type Joke } from "../jokes.server";

export async function loader() {
  const jokes = await getJokes();
  const randomJoke = await getRandomJoke();
  return ({ jokes, randomJoke });
}

type LoaderData = Awaited<ReturnType<typeof loader>> extends Response
  ? never
  : { jokes: Joke[]; randomJoke: Joke | null };

export default function JokesIndexRoute() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="card">
      <h2>Random joke</h2>
      {data.randomJoke ? (
        <>
          <p style={{ marginTop: "0.5rem" }}>{data.randomJoke.content}</p>
          <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
            — {data.randomJoke.name}
          </p>
        </>
      ) : (
        <p>No jokes yet. Add one!</p>
      )}

      <hr style={{ margin: "1.5rem 0", borderColor: "#1f2937" }} />

      <h3>All jokes</h3>
      <ul>
        {data.jokes.map((joke) => (
          <li key={joke.id}>
            <Link to={`/jokes/${joke.id}`}>{joke.name}</Link>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "1rem" }}>
        <Link to="/jokes/new">Add your own joke →</Link>
      </p>
    </div>
  );
}

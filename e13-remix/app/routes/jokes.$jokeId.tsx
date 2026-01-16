
import { useLoaderData } from "react-router";

import { getJoke, type Joke } from "../jokes.server";

export async function loader({ params }: { params: { jokeId?: string } }) {
  const id = params.jokeId;
  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  const joke = await getJoke(id);
  if (!joke) {
    throw new Response("Not Found", { status: 404 });
  }

  return ({ joke });
}

type LoaderData = { joke: Joke };

export default function JokeDetailRoute() {
  const { joke } = useLoaderData() as LoaderData;

  return (
    <div className="card">
      <h2>{joke.name}</h2>
      <p style={{ marginTop: "0.75rem" }}>{joke.content}</p>
    </div>
  );
}

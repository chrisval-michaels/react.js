
export type Joke = {
  id: string;
  name: string;
  content: string;
};

let jokes: Joke[] = [
  {
    id: "1",
    name: "Road",
    content: "Why did the chicken cross the road? To get to the other side.",
  },
  {
    id: "2",
    name: "Dev",
    content: "Why do programmers prefer dark mode? Because light attracts bugs.",
  },
];

export async function getJokes() {
  
  return jokes;
}

export async function getJoke(id: string) {
  return jokes.find((j) => j.id === id) ?? null;
}

export async function getRandomJoke() {
  if (jokes.length === 0) return null;
  const index = Math.floor(Math.random() * jokes.length);
  return jokes[index];
}

export async function createJoke(name: string, content: string) {
  const joke: Joke = {
    id: String(Date.now()),
    name,
    content,
  };
  jokes.push(joke);
  return joke;
}

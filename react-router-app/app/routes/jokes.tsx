import type { Route } from ".react-router/types/app/routes/+types/jokes";
import { Link } from "react-router";
export async function loader({ params }: Route.LoaderArgs) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let jokes = [
    { id: "1", joke: "Joke 1 text" },
    { id: "2", joke: "Joke 2 text" },
  ];
  return { jokes };
}

export default function Jokes({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>Jokes</h1>
      {loaderData?.jokes.map((joke) => (
        <div key={joke.id}>{joke.joke}</div>
      ))}
      <Link to="/">Home</Link>
    </>
  );
}

import type { Route } from "./+types/home";
import { Link } from "react-router";
import JokeJumper from "~/components/JokeJumper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Joke Jump" },
    { name: "description", content: "Find the best jokes on the internet" },
  ];
}

export default function Home() {
  return (
    <>
      <Link to="/jokes">Jokes</Link>
      <JokeJumper />
    </>
  );
}

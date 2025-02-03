import { Link } from "react-router-dom";
import JokeJumper from "../components/JokeJumper";
import Search from "../components/Search";
import type { Route } from ".react-router/types/app/routes/+types/home";

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
      <Search />
      <JokeJumper />
    </>
  );
}

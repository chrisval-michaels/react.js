
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [

  index("routes/home.tsx"),

  // /jokes and its children
  route("jokes", "routes/jokes.tsx", [
    
    index("routes/jokes._index.tsx"),

    route("new", "routes/jokes.new.tsx"),

 
    route(":jokeId", "routes/jokes.$jokeId.tsx"),
  ]),
] satisfies RouteConfig;

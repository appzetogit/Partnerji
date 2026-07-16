import { createFileRoute } from "@tanstack/react-router";
import Home from "@/Provider/home";

export const Route = createFileRoute("/Provider/home")({
  component: Home,
});

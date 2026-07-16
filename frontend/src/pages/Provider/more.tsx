import { createFileRoute } from "@tanstack/react-router";
import More from "@/Provider/more";

export const Route = createFileRoute("/Provider/more")({
  component: More,
});

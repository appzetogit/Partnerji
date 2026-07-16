import { createFileRoute } from "@tanstack/react-router";
import Terms from "@/Provider/terms";

export const Route = createFileRoute("/Provider/terms")({
  component: Terms,
});

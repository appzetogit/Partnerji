import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/Provider/privacy";

export const Route = createFileRoute("/Provider/privacy")({
  component: Privacy,
});

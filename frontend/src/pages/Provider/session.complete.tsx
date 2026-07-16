import { createFileRoute } from "@tanstack/react-router";
import Complete from "@/Provider/session.complete";

export const Route = createFileRoute("/Provider/session/complete")({
  component: Complete,
});

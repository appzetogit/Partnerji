import { createFileRoute } from "@tanstack/react-router";
import Performance from "@/Provider/performance";

export const Route = createFileRoute("/Provider/performance")({
  component: Performance,
});

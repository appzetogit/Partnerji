import { createFileRoute } from "@tanstack/react-router";
import Availability from "@/Provider/availability";

export const Route = createFileRoute("/Provider/availability")({
  component: Availability,
});

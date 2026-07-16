import { createFileRoute } from "@tanstack/react-router";
import Details from "@/Provider/auth/details";

export const Route = createFileRoute("/Provider/auth/details")({
  component: Details,
});

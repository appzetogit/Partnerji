import { createFileRoute } from "@tanstack/react-router";
import Services from "@/Provider/auth/services";

export const Route = createFileRoute("/Provider/auth/services")({
  component: Services,
});

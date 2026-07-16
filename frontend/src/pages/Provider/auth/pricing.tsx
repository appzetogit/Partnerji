import { createFileRoute } from "@tanstack/react-router";
import Pricing from "@/Provider/auth/pricing";

export const Route = createFileRoute("/Provider/auth/pricing")({
  component: Pricing,
});

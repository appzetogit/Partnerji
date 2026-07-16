import { createFileRoute } from "@tanstack/react-router";
import Verify from "@/Provider/auth/verify";

export const Route = createFileRoute("/Provider/auth/verify")({
  component: Verify,
});

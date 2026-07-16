import { createFileRoute } from "@tanstack/react-router";
import Profile from "@/Provider/profile";

export const Route = createFileRoute("/Provider/profile")({
  component: Profile,
});

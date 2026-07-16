import { createFileRoute } from "@tanstack/react-router";
import Preview from "@/Provider/profile.preview";

export const Route = createFileRoute("/Provider/profile/preview")({
  component: Preview,
});

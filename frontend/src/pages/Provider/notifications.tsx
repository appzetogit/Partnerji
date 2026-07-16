import { createFileRoute } from "@tanstack/react-router";
import Notifications from "@/Provider/notifications";

export const Route = createFileRoute("/Provider/notifications")({
  component: Notifications,
});

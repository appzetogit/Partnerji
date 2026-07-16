import { createFileRoute } from "@tanstack/react-router";
import Session from "@/Provider/session";

export const Route = createFileRoute("/Provider/session")({
  component: Session,
});

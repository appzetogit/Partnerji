import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/Provider/")({
  component: () => <Navigate to="/Provider/splash" />,
});

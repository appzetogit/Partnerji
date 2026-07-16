import { createFileRoute } from "@tanstack/react-router";
import SafetyGuidelines from "@/Provider/safety-guidelines";

export const Route = createFileRoute("/Provider/safety-guidelines")({
  component: SafetyGuidelines,
});

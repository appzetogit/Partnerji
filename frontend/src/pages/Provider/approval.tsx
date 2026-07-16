import { createFileRoute } from "@tanstack/react-router";
import Approval from "@/Provider/approval";

export const Route = createFileRoute("/Provider/approval")({
  component: Approval,
});

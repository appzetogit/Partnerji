import { createFileRoute } from "@tanstack/react-router";
import CommissionDetails from "@/Provider/commission-details";

export const Route = createFileRoute("/Provider/commission-details")({
  component: CommissionDetails,
});

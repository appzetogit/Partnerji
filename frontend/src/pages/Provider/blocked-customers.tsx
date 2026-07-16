import { createFileRoute } from "@tanstack/react-router";
import BlockedCustomers from "@/Provider/blocked-customers";

export const Route = createFileRoute("/Provider/blocked-customers")({
  component: BlockedCustomers,
});

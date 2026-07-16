import { createFileRoute } from "@tanstack/react-router";
import Withdraw from "@/Provider/withdraw";

export const Route = createFileRoute("/Provider/withdraw")({
  component: Withdraw,
});

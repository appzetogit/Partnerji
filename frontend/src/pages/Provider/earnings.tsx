import { createFileRoute } from "@tanstack/react-router";
import Earnings from "@/Provider/earnings";

export const Route = createFileRoute("/Provider/earnings")({
  component: Earnings,
});

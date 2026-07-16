import { createFileRoute } from "@tanstack/react-router";
import Reviews from "@/Provider/reviews";

export const Route = createFileRoute("/Provider/reviews")({
  component: Reviews,
});

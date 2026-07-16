import { createFileRoute } from "@tanstack/react-router";
import Bookings from "@/Provider/bookings";

export const Route = createFileRoute("/Provider/bookings")({
  component: Bookings,
});

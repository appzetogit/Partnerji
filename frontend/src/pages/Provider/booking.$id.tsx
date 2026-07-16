import { createFileRoute } from "@tanstack/react-router";
import BookingDetail from "@/Provider/booking.$id";

export const Route = createFileRoute("/Provider/booking/$id")({
  component: BookingDetail,
});

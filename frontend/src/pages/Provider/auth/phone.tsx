import { createFileRoute } from "@tanstack/react-router";
import Phone from "@/Provider/auth/phone";

export const Route = createFileRoute("/Provider/auth/phone")({
  component: Phone,
});

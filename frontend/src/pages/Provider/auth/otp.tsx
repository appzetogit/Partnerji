import { createFileRoute } from "@tanstack/react-router";
import OTP from "@/Provider/auth/otp";

export const Route = createFileRoute("/Provider/auth/otp")({
  component: OTP,
});

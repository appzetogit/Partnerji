import { createFileRoute } from "@tanstack/react-router";
import Splash from "@/Provider/splash";

export const Route = createFileRoute("/Provider/splash")({
  component: Splash,
});

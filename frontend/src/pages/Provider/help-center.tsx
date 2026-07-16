import { createFileRoute } from "@tanstack/react-router";
import HelpCenter from "@/Provider/help-center";

export const Route = createFileRoute("/Provider/help-center")({
  component: HelpCenter,
});

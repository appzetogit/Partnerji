import { createFileRoute } from "@tanstack/react-router";
import SendFeedback from "@/Provider/feedback";

export const Route = createFileRoute("/Provider/feedback")({
  component: SendFeedback,
});

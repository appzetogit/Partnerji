import { createFileRoute } from "@tanstack/react-router";
import Chat from "@/Provider/chat";

export const Route = createFileRoute("/Provider/chat")({
  component: Chat,
});

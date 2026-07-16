import { createFileRoute } from "@tanstack/react-router";
import EmergencyContacts from "@/Provider/emergency-contacts";

export const Route = createFileRoute("/Provider/emergency-contacts")({
  component: EmergencyContacts,
});

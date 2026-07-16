import { createFileRoute } from "@tanstack/react-router";
import CodeOfConduct from "@/Provider/code-of-conduct";

export const Route = createFileRoute("/Provider/code-of-conduct")({
  component: CodeOfConduct,
});

import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/sections/Projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Hakizimana Leogad" },
      { name: "description", content: "Selected projects in AI, IoT, embedded systems and robotics." },
      { property: "og:title", content: "Projects — Hakizimana Leogad" },
      { property: "og:description", content: "AI Smart Agriculture, Autonomous Delivery Robot, Smart Home Automation and more." },
    ],
  }),
  component: () => (
    <div className="pt-24">
      <Projects />
    </div>
  ),
});

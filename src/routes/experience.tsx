import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/sections/Experience";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Hakizimana Leogad" },
      { name: "description", content: "Experience as Embedded Systems Developer and IoT Developer." },
      { property: "og:title", content: "Experience — Hakizimana Leogad" },
      { property: "og:description", content: "Hardware design, sensor integration, cloud integration and remote monitoring." },
    ],
  }),
  component: () => (
    <div className="pt-24">
      <Experience />
    </div>
  ),
});

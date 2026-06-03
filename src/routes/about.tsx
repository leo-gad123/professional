import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/sections/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hakizimana Leogad" },
      { name: "description", content: "About Hakizimana Leogad — Embedded Systems Developer and IoT Engineer based in Kigali, Rwanda." },
      { property: "og:title", content: "About — Hakizimana Leogad" },
      { property: "og:description", content: "Embedded Systems Developer and IoT Engineer building intelligent hardware." },
    ],
  }),
  component: () => (
    <div className="pt-24">
      <About />
    </div>
  ),
});

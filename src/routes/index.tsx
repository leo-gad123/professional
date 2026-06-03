import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hakizimana Leogad — Embedded Systems & IoT Engineer" },
      { name: "description", content: "Portfolio home of Hakizimana Leogad — Embedded Systems Developer & IoT Engineer based in Kigali, Rwanda." },
      { property: "og:title", content: "Hakizimana Leogad — Embedded Systems & IoT Engineer" },
      { property: "og:description", content: "Building intelligent hardware, IoT systems, and automation that solve real-world challenges." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Stats />
    </>
  );
}

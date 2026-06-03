import { createFileRoute } from "@tanstack/react-router";
import { Skills } from "@/components/sections/Skills";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Hakizimana Leogad" },
      { name: "description", content: "Skills and tools: C, C++, Python, Arduino, ESP32, Raspberry Pi, STM32, KiCad, Proteus and more." },
      { property: "og:title", content: "Skills — Hakizimana Leogad" },
      { property: "og:description", content: "Programming, embedded systems, electronics and tools." },
    ],
  }),
  component: () => (
    <div className="pt-24">
      <Skills />
    </div>
  ),
});

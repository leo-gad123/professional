import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hakizimana Leogad" },
      { name: "description", content: "Get in touch with Hakizimana Leogad — Kigali, Rwanda." },
      { property: "og:title", content: "Contact — Hakizimana Leogad" },
      { property: "og:description", content: "Open to collaborations in embedded systems, IoT, and intelligent automation." },
    ],
  }),
  component: () => (
    <div className="pt-24">
      <Contact />
    </div>
  ),
});

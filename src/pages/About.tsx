import { SEO } from "@/components/SEO";
import { About } from "@/components/sections/About";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About"
        description="Learn about Hakizimana Leogad — an Embedded Systems and IoT Engineer passionate about Arduino, ESP32, electronics prototyping, and building intelligent connected systems in Kigali, Rwanda."
        path="/about"
      />
      <About />
    </>
  );
}

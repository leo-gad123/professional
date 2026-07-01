import { SEO } from "@/components/SEO";
import { Experience } from "@/components/sections/Experience";

export default function ExperiencePage() {
  return (
    <>
      <SEO
        title="Experience"
        description="Professional experience of Hakizimana Leogad in embedded systems development and IoT engineering — hardware design, sensor integration, firmware development, and cloud-connected systems."
        path="/experience"
      />
      <Experience />
    </>
  );
}

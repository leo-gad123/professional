import { SEO } from "@/components/SEO";
import { Projects } from "@/components/sections/Projects";

export default function ProjectsPage() {
  return (
    <>
      <SEO
        title="Projects"
        description="Portfolio of projects by Hakizimana Leogad — AI smart agriculture, autonomous delivery robots, smart traffic control, and more embedded systems and IoT innovations."
        path="/projects"
      />
      <Projects />
    </>
  );
}

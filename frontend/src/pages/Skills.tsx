import { SEO } from "@/components/SEO";
import { Skills } from "@/components/sections/Skills";

export default function SkillsPage() {
  return (
    <>
      <SEO
        title="Skills"
        description="Technical skills of Hakizimana Leogad: C, C++, Python, JavaScript, Arduino, ESP32, Raspberry Pi, STM32, PCB Design, Git, and more embedded systems and IoT technologies."
        path="/skills"
      />
      <Skills />
    </>
  );
}

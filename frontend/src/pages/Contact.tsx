import { SEO } from "@/components/SEO";
import { Contact } from "@/components/sections/Contact";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Hakizimana Leogad for collaborations in embedded systems, IoT, and intelligent automation. Based in Kigali, Rwanda."
        path="/contact"
      />
      <Contact />
    </>
  );
}

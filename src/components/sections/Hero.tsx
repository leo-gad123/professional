import { Link } from "@tanstack/react-router";
import { StatusBadge } from "@/components/StatusBadge";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="flex items-center justify-center gap-4 mb-6 animate-float-up">
          <div className="h-px w-12 bg-primary/40" />
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary">
            Embedded Systems · IoT Engineer · Arduino
          </p>
          <div className="h-px w-12 bg-primary/40" />
        </div>
        <div className="mb-6 flex justify-center animate-float-up" style={{ animationDelay: "0.05s" }}>
          <StatusBadge />
        </div>

        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight animate-float-up" style={{ animationDelay: "0.1s" }}>
          <span className="block text-foreground">Hakizimana</span>
          <span className="block italic text-primary glow-text">Leogad</span>
        </h1>

        <p className="mt-8 font-serif italic text-xl sm:text-2xl text-muted-foreground animate-float-up" style={{ animationDelay: "0.2s" }}>
          Embedded Systems · IoT Development · Electronics · Automation
        </p>

        <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed animate-float-up" style={{ animationDelay: "0.3s" }}>
          Passionate Embedded Systems Developer focused on designing intelligent hardware
          solutions, IoT systems, and automation technologies that solve real-world challenges.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-float-up" style={{ animationDelay: "0.4s" }}>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-all hover:shadow-[0_0_30px_oklch(0.85_0.16_207/0.6)]"
          >
            View Projects
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <a
            href="/cv.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary/10"
          >
            Download CV
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-all hover:border-primary/50"
          >
            Contact Me
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Scroll ↓
      </div>
    </section>
  );
}

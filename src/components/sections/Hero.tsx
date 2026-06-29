import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/StatusBadge";
import portraitUrl from "@/assets/portrait.png";
import { ArrowDown, ExternalLink } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 pt-20 sm:pt-24"
    >
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="relative mx-auto w-full max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 animate-fade-in-up">
          <div className="hidden sm:block h-px w-8 sm:w-10 bg-primary/30" />
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary font-medium leading-relaxed px-2">
            Embedded Systems<span className="hidden sm:inline"> · IoT Engineer · Arduino</span>
          </p>
          <div className="hidden sm:block h-px w-8 sm:w-10 bg-primary/30" />
        </div>

        <div
          className="mb-8 flex justify-center animate-fade-in-up"
          style={{ animationDelay: "0.05s" }}
        >
          <StatusBadge />
        </div>

        <div
          className="mb-10 flex justify-center animate-float"
          style={{ animationDuration: "4s" }}
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary/15 to-primary/5 animate-spin-slow" />
            <img
              src={portraitUrl}
              alt="Hakizimana Leogad"
              className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-cover border-2 border-background shadow-lg"
            />
          </div>
        </div>

        <h1
          className="font-serif text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight animate-fade-in-up font-medium px-2 sm:px-0"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="block text-foreground">Hakizimana</span>
          <span className="block text-gradient animate-gradient-shift">Leogad</span>
        </h1>

        <p
          className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up leading-relaxed px-2 sm:px-0"
          style={{ animationDelay: "0.2s" }}
        >
          Embedded Systems Developer focused on designing intelligent hardware solutions, IoT
          systems, and automation technologies that solve real-world challenges.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in-up px-2 sm:px-0"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-full btn-gradient px-5 sm:px-7 py-2.5 sm:py-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]"
          >
            View Projects
            <ExternalLink className="h-3 sm:h-3.5 w-3 sm:w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="/cv.pdf"
            download="Hakizimana-Leogad-CV.pdf"
            className="inline-flex items-center gap-2 rounded-full btn-ghost px-5 sm:px-7 py-2.5 sm:py-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]"
          >
            Download CV
            <ArrowDown className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full btn-ghost px-5 sm:px-7 py-2.5 sm:py-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]"
          >
            Contact Me
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-primary/60 to-transparent" />
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ExternalLink, Download, ChevronRight, Star, Code2 } from "lucide-react";
import { Slideshow } from "@/components/Slideshow";
import { StatusBadge } from "@/components/StatusBadge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
};

const typingText = "Embedded Systems & IoT Engineer";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-emerald-400/5 blur-[100px] animate-blob-delayed pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center gap-8 px-6 lg:flex-row"
      >
        {/* Left: Text Content */}
        <div className="flex-1 space-y-6 lg:pr-8">
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                Available for projects
              </span>
            </div>
            <StatusBadge />
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
              <span className="block text-foreground">Hakizimana</span>
              <span className="block mt-2">
                <span className="text-gradient-emerald text-shadow-glow">Leogad</span>
              </span>
            </h1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground"
          >
            <Code2 className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400">$</span>
            <span className="typewriter-text">{typingText}</span>
            <span className="inline-block h-4 w-2 animate-cursor-blink bg-emerald-400" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Crafting intelligent hardware solutions, IoT ecosystems, and automation technologies
            that bridge the physical and digital worlds.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              View Projects
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="/cv.pdf"
              download="Hakizimana-Leogad-CV.pdf"
              className="group inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              Download CV
              <Download className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </a>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-1 rounded-xl px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              Contact
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {["Python", "C++", "JS", "IoT"].map((tech) => (
                <div
                  key={tech}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#050508] bg-[#0a0a12] font-mono text-[8px] font-bold text-emerald-400"
                >
                  {tech}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-emerald-400 text-emerald-400" />
              <span>Tech Innovator</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Slideshow + Geometric Shapes */}
        <motion.div
          variants={itemVariants}
          className="relative flex-1 flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md">
            {/* Geometric decorative shapes */}
            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full border border-emerald-500/10 animate-spin-slow pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full border border-emerald-500/10 animate-spin-reverse pointer-events-none" />
            <div className="absolute top-1/2 -right-4 h-16 w-16 rounded-lg border border-emerald-500/10 rotate-45 animate-float pointer-events-none" />
            <div className="absolute -top-4 left-1/4 h-12 w-12 rounded-lg border border-emerald-500/10 rotate-12 animate-float-delayed pointer-events-none" />

            {/* Glow behind slideshow */}
            <div className="absolute inset-0 -translate-y-4 scale-110 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />

            <Slideshow className="relative z-10 rounded-2xl border border-emerald-500/10 shadow-2xl shadow-emerald-500/5" />

            {/* Code snippet overlay */}
            <div className="absolute -bottom-4 -left-4 z-20 rounded-xl border border-emerald-500/10 bg-[#0d1117]/90 backdrop-blur-xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="text-gray-500">const</span>
                <span className="text-emerald-400">engineer</span>
                <span className="text-gray-500">=</span>
                <span className="text-blue-400">{"{"}</span>
              </div>
              <div className="ml-4 font-mono text-[10px]">
                <span className="text-gray-500">status:</span>
                <span className="text-emerald-300"> "building"</span>
              </div>
              <div className="ml-4 font-mono text-[10px]">
                <span className="text-gray-500">passion:</span>
                <span className="text-emerald-300"> "innovation"</span>
              </div>
              <div className="font-mono text-[10px]">
                <span className="text-blue-400">{"}"}</span>
                <span className="text-gray-500">;</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-8 w-[1px] bg-gradient-to-b from-emerald-400/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

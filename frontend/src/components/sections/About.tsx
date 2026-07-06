import { motion } from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import { CheckCircle2, Code2, Cpu, Zap } from "lucide-react";

const focus = [
  "Embedded Systems Development",
  "Arduino Programming",
  "ESP32 Development",
  "IoT Solutions",
  "Electronics Prototyping",
  "Machine Learning Interest",
];

const highlightItems = [
  { icon: Code2, label: "Clean Code", desc: "Best practices & patterns" },
  { icon: Cpu, label: "Hardware", desc: "Circuit design & prototyping" },
  { icon: Zap, label: "Innovation", desc: "Cutting-edge solutions" },
];

export function About() {
  return (
    <section id="about" className="relative px-4 sm:px-6 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="About" title="Who I" accent="Am" />
        <div className="grid gap-12 items-center md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:col-span-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 blur-2xl" />
              <div className="absolute -top-2 -right-2 h-24 w-24 rounded-full border border-emerald-500/10 animate-spin-slow pointer-events-none" />
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-[#0a0a12] to-[#111118] shadow-xl shadow-emerald-500/5">
                <img
                  src="/portrait.png"
                  alt="Portrait of Hakizimana Leogad, Embedded Systems & IoT Engineer"
                  width="1086"
                  height="913"
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
            className="space-y-6 md:col-span-3"
          >
            <p className="text-base sm:text-[17px] leading-relaxed text-muted-foreground">
              I'm{" "}
              <span className="text-foreground font-medium bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                Hakizimana Leogad
              </span>
              , an Embedded Systems and IoT Engineer building smart technology with Arduino, ESP32,
              Raspberry Pi, and electronics. Passionate about creating intelligent, connected
              systems powered by innovation and machine learning.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {highlightItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-3"
                >
                  <item.icon className="h-4 w-4 text-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {focus.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="group flex items-center gap-3 rounded-xl border border-emerald-500/5 bg-[#0a0a12] px-4 py-3 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-300"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <span className="text-sm text-foreground">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

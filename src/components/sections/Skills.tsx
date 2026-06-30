import { motion } from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import {
  SiArduino,
  SiRaspberrypi,
  SiPython,
  SiCplusplus,
  SiGit,
  SiGithub,
} from "@/components/TechIcons";
import { CircuitBoard, Wifi, Eye, Cog, Braces, TestTube, ChevronRight } from "lucide-react";

const groups = [
  {
    title: "Programming",
    icon: Braces,
    items: [
      { name: "C", level: 5 },
      { name: "C++", level: 5 },
      { name: "Python", level: 4 },
      { name: "JavaScript", level: 3 },
      { name: "HTML/CSS", level: 3 },
    ],
  },
  {
    title: "Embedded Systems",
    icon: CircuitBoard,
    items: [
      { name: "Arduino", level: 5 },
      { name: "ESP32", level: 5 },
      { name: "Raspberry Pi", level: 4 },
      { name: "STM32", level: 3 },
    ],
  },
  {
    title: "Electronics",
    icon: Cog,
    items: [
      { name: "Sensors", level: 5 },
      { name: "Actuators", level: 4 },
      { name: "PCB Design", level: 3 },
      { name: "Circuit Analysis", level: 4 },
    ],
  },
  {
    title: "Tools & Tech",
    icon: TestTube,
    items: [
      { name: "Git", level: 4 },
      { name: "GitHub", level: 4 },
      { name: "Proteus", level: 4 },
      { name: "KiCad", level: 3 },
      { name: "VS Code", level: 5 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-4 sm:px-6 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-emerald-500/3 blur-[80px] pointer-events-none" />
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Skills" title="Tools &" accent="Tech" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ type: "spring", damping: 25, stiffness: 200, delay: gi * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-[#0a0a12] to-[#111118] p-6 hover:border-emerald-500/20 transition-all duration-500"
            >
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl transition-all duration-500 group-hover:scale-150 pointer-events-none" />
              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/10">
                    <g.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-medium text-foreground">{g.title}</h3>
                    <div className="mt-1 h-0.5 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300" />
                  </div>
                </div>
                <ul className="space-y-2">
                  {g.items.map((it) => (
                    <li
                      key={it.name}
                      className="group/item flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-300 hover:bg-emerald-500/5 hover:text-emerald-400 cursor-default"
                    >
                      <span className="flex items-center gap-2">
                        <ChevronRight className="h-3 w-3 text-emerald-400/50 group-hover/item:text-emerald-400 transition-colors" />
                        {it.name}
                      </span>
                      <span className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`h-1 w-1 rounded-full ${
                              i < it.level ? "bg-emerald-400" : "bg-emerald-500/10"
                            }`}
                          />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const roles = [
  {
    title: "Embedded Systems Developer",
    period: "2024 — Present",
    location: "Kigali, Rwanda",
    items: [
      "Hardware Design & Prototyping",
      "Sensor Integration & Calibration",
      "Real-Time Control Systems",
      "Firmware Development",
    ],
  },
  {
    title: "IoT Developer",
    period: "2023 — Present",
    location: "Kigali, Rwanda",
    items: [
      "Wireless Communication (Wi-Fi, BLE, LoRa)",
      "Cloud Integration & Data Pipelines",
      "Remote Monitoring Systems",
      "Edge Computing Solutions",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-4 sm:px-6 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Experience" title="My" accent="Journey" />
        <div className="relative pl-12 md:pl-16">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-0.5 origin-top bg-gradient-to-b from-emerald-400 via-emerald-400/30 to-transparent"
            style={{ transformOrigin: "top" }}
          />

          {roles.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", damping: 25, stiffness: 200, delay: i * 0.2 }}
              className="relative mb-10 last:mb-0"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 15, stiffness: 300, delay: i * 0.2 + 0.3 }}
                className="absolute -left-[34px] md:-left-[42px] top-2 flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-[#050508] border-2 border-emerald-400 shadow-lg shadow-emerald-500/20"
              >
                <Briefcase className="h-3 w-3 md:h-3.5 md:w-3.5 text-emerald-400" />
              </motion.div>

              {/* Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-[#0a0a12] to-[#111118] p-6 md:p-8 hover:border-emerald-500/20 transition-all duration-500">
                <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-emerald-500/3 blur-3xl transition-all duration-500 group-hover:scale-150 pointer-events-none" />

                <div className="relative">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-medium">
                      Role 0{i + 1}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {r.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {r.location}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4">
                    {r.title}
                  </h3>

                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {r.items.map((it) => (
                      <motion.div
                        key={it}
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-2.5 rounded-xl border border-emerald-500/5 bg-emerald-500/[0.02] px-4 py-3 text-sm text-muted-foreground hover:border-emerald-500/15 hover:bg-emerald-500/5 transition-all duration-300"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                        {it}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

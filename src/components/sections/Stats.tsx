import { motion } from "framer-motion";
import { Counter } from "../Counter";
import { Award, Code2, Cpu, Rocket } from "lucide-react";

const stats = [
  { value: 20, suffix: "+", label: "Projects Completed", icon: Code2 },
  { value: 10, suffix: "+", label: "Technologies Used", icon: Cpu },
  { value: 3, suffix: "+", label: "Years Learning", icon: Award },
  { value: 100, suffix: "%", label: "Passion for Innovation", icon: Rocket },
];

export function Stats() {
  return (
    <section className="relative px-4 sm:px-6 py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-500/3 blur-[120px] pointer-events-none" />
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ type: "spring", damping: 25, stiffness: 200, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-[#0a0a12] to-[#111118] p-6 md:p-8 text-center hover:border-emerald-500/20 transition-all duration-500"
          >
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl transition-all duration-500 group-hover:scale-150 pointer-events-none" />
            <div className="relative">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/10">
                <s.icon className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="font-serif text-4xl md:text-5xl font-medium bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

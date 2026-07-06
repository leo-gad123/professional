import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="mb-14 text-center"
    >
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="h-px w-6 bg-gradient-to-r from-transparent to-emerald-400/50" />
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400 font-medium">
          {eyebrow}
        </span>
        <div className="h-px w-6 bg-gradient-to-l from-transparent to-emerald-400/50" />
      </div>
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground px-2 sm:px-0">
        {title}{" "}
        {accent && (
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
            {accent}
          </span>
        )}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent"
        style={{ transformOrigin: "center" }}
      />
    </motion.div>
  );
}

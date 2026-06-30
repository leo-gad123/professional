import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import suteUrl from "@/assets/sute.png";
import portraitUrl from "@/assets/portrait.png";

const images = [
  { src: suteUrl, alt: "Leogad Sute" },
  { src: portraitUrl, alt: "Hakizimana Leogad" },
];

export function Slideshow({ className = "" }: { className?: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={current}
            src={images[current].src}
            alt={images[current].alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full h-auto object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-emerald-400" : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => goTo(current === 0 ? images.length - 1 : current - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white transition-all backdrop-blur-sm"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => goTo((current + 1) % images.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white transition-all backdrop-blur-sm"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

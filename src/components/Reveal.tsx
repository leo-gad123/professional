import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  duration = 0.6,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity ${duration}s ease, transform ${duration}s ease`;
    el.style.transitionDelay = `${delay}s`;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            if (once) obs.unobserve(el);
          } else if (!once) {
            el.style.opacity = "0";
            el.style.transform = `translateY(${y}px)`;
          }
        });
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, y, duration, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

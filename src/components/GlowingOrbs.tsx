import { useEffect, useRef } from "react";

export function GlowingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const orbs: {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      hue: number;
      alpha: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 4; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 150 + Math.random() * 250,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        hue: 150 + Math.random() * 30,
        alpha: 0.03 + Math.random() * 0.04,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const o of orbs) {
        o.x += o.dx;
        o.y += o.dy;
        if (o.x < -o.r || o.x > canvas.width + o.r) o.dx *= -1;
        if (o.y < -o.r || o.y > canvas.height + o.r) o.dy *= -1;
        const gradient = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        gradient.addColorStop(0, `hsla(${o.hue}, 80%, 60%, ${o.alpha})`);
        gradient.addColorStop(0.5, `hsla(${o.hue}, 70%, 50%, ${o.alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${o.hue}, 60%, 40%, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(o.x - o.r, o.y - o.r, o.r * 2, o.r * 2);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

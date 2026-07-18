import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Sun, Moon, Eye } from "lucide-react";
import { useTheme, type Theme } from "@/hooks/useTheme";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

const THEME_ICONS: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  blight: Eye,
};

const THEME_LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  blight: "Blight",
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      role="banner"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-500 ${
          scrolled
            ? "mx-4 rounded-2xl border border-emerald-500/10 bg-[#0a0a12]/80 shadow-lg shadow-emerald-500/5 backdrop-blur-2xl px-6 py-2"
            : ""
        }`}
      >
        <Link to="/" className="group flex items-center gap-2" aria-label="Home">
          <Terminal className="h-4 w-4 text-emerald-400 transition-transform group-hover:rotate-12" />
          <span className="font-mono text-sm font-medium text-foreground">
            <span className="text-gradient">leogad</span>
            <span className="text-muted-foreground">/portfolio</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive =
                location.pathname === l.to || (l.to !== "/" && location.pathname.startsWith(l.to));
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`relative rounded-xl px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                      isActive ? "text-emerald-400" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 transition-all"
            aria-label={`Switch theme (current: ${THEME_LABELS[theme]})`}
            title={`Theme: ${THEME_LABELS[theme]}`}
          >
            {(() => {
              const Icon = THEME_ICONS[theme];
              return <Icon className="h-4 w-4" />;
            })()}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 transition-all md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mx-4 mt-3 rounded-2xl border border-emerald-500/10 bg-[#0a0a12]/95 backdrop-blur-2xl py-2 px-2 space-y-1 md:hidden"
          >
            {links.map((l) => {
              const isActive =
                location.pathname === l.to || (l.to !== "/" && location.pathname.startsWith(l.to));
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-all ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-1">
              <button
                onClick={() => { toggle(); setOpen(false); }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              >
                {(() => {
                  const Icon = THEME_ICONS[theme];
                  return <Icon className="h-4 w-4" />;
                })()}
                <span>Theme: {THEME_LABELS[theme]}</span>
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

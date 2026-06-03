import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-serif text-2xl tracking-tight">
          HL<span className="text-primary">.</span>
        </Link>
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-px w-6 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>
      {open && (
        <ul className="glass mt-3 mx-6 rounded-lg p-4 space-y-3 md:hidden">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="block font-mono text-xs uppercase tracking-[0.2em] hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

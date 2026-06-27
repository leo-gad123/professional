import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Menu, X } from "lucide-react";

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
  const location = useLocation();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-serif text-xl font-medium text-foreground" aria-label="Home">
          <span className="text-gradient">L</span>eogad
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-primary ${
                    location.pathname === l.to || (l.to !== "/" && location.pathname.startsWith(l.to))
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="Menu"
          >
            {open ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="glass mt-3 mx-4 sm:mx-6 rounded-2xl py-3 px-4 space-y-1 md:hidden animate-fade-in">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-primary/10 hover:text-primary ${
                  location.pathname === l.to || (l.to !== "/" && location.pathname.startsWith(l.to))
                    ? "text-primary bg-primary/8 font-medium"
                    : "text-muted-foreground"
                }`}
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

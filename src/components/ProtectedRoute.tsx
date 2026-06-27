import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        if (mounted) navigate("/auth");
        return;
      }
      try {
        await api.getMe();
        if (mounted) setAuthorized(true);
      } catch {
        localStorage.removeItem("token");
        if (mounted) navigate("/auth");
      } finally {
        if (mounted) setChecking(false);
      }
    })();
    return () => { mounted = false; };
  }, [navigate]);

  if (checking) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Loading admin portal…
        </p>
      </section>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}

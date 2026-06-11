import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Hakizimana Leogad" },
      { name: "description", content: "Admin sign in." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted && data.session) navigate({ to: "/admin" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: "/admin" });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. You can sign in now.");
        setMode("signin");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <div className="w-full max-w-md glass rounded-2xl p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
          Admin Portal
        </p>
        <h1 className="font-serif text-3xl mb-6">
          {mode === "signin" ? "Sign in" : "Create admin account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Sign up"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-xs text-muted-foreground hover:text-primary transition-colors w-full text-center"
        >
          {mode === "signin"
            ? "Need to create the admin account? Sign up"
            : "Already have an account? Sign in"}
        </button>

        <p className="mt-6 text-[11px] text-muted-foreground text-center leading-relaxed">
          The first account you create automatically becomes the site admin.
        </p>

        <div className="mt-6 text-center">
          <Link to="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">
            ← Back to site
          </Link>
        </div>
      </div>
    </section>
  );
}

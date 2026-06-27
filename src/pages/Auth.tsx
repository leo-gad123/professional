import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogIn, UserPlus, ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/admin");
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const fn = mode === "login" ? api.login : api.register;
      const res = await fn(email.trim(), password);
      localStorage.setItem("token", res.token);
      toast.success(mode === "login" ? "Signed in" : "Account created");
      navigate("/admin");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12" style={{ background: "var(--background)" }}>
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl p-5 sm:p-8 card-shadow border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              {mode === "login" ? <LogIn className="h-5 w-5 text-primary" /> : <UserPlus className="h-5 w-5 text-primary" />}
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-medium">
                Admin Portal
              </p>
              <h1 className="font-serif text-2xl font-medium text-foreground">
                {mode === "login" ? "Welcome back" : "Get started"}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full btn-gradient border-0" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {mode === "login" ? "No account? Create one" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-3 w-3" />
            Back to site
          </Link>
        </div>
      </div>
    </section>
  );
}

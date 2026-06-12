import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { AdminStatus } from "@/components/admin/AdminStatus";
import { AdminContact } from "@/components/admin/AdminContact";
import { AdminProjects } from "@/components/admin/AdminProjects";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) throw redirect({ to: "/auth" });
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!role) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Admin — Hakizimana Leogad" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      setEmail(userData.user?.email ?? null);
      if (!userId) {
        if (mounted) setChecking(false);
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (mounted) {
        setIsAdmin(!!roles);
        setChecking(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth" });
  }

  if (checking) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Loading admin portal…
        </p>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-md text-center glass rounded-2xl p-8">
          <h1 className="font-serif text-2xl mb-3">Not authorized</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Your account ({email}) doesn't have admin access.
          </p>
          <Button variant="outline" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-6 pt-28 pb-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
              Admin Portal
            </p>
            <h1 className="font-serif text-4xl md:text-5xl">
              Manage your <span className="italic text-primary">site</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Signed in as {email}
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>

        <Tabs defaultValue="status" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="status">
            <AdminStatus />
          </TabsContent>
          <TabsContent value="contact">
            <AdminContact />
          </TabsContent>
          <TabsContent value="projects">
            <AdminProjects />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

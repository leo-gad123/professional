import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { AdminStatus } from "@/components/admin/AdminStatus";
import { AdminContact } from "@/components/admin/AdminContact";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { AdminSlides } from "@/components/admin/AdminSlides";
import { LogOut, Settings } from "lucide-react";

export default function AdminPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    api
      .getMe()
      .then((u) => setEmail(u.email))
      .catch(() => navigate("/auth"));
  }, [navigate]);

  async function handleSignOut() {
    localStorage.removeItem("token");
    toast.success("Signed out");
    navigate("/auth");
  }

  return (
    <section
      className="min-h-screen px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Settings className="h-4.5 w-4.5 text-primary" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-medium">
                Admin Portal
              </p>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
              Manage your <span className="text-gradient">site</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">Signed in as {email || "…"}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="btn-ghost self-start sm:self-auto"
          >
            <LogOut className="h-4 w-4 mr-1.5" />
            Sign out
          </Button>
        </div>

        <Tabs defaultValue="status" className="w-full">
          <TabsList className="mb-6 bg-secondary/80 rounded-xl p-1 w-full overflow-x-auto flex-nowrap">
            <TabsTrigger value="status" className="flex-1 whitespace-nowrap">
              Status
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex-1 whitespace-nowrap">
              Contact
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex-1 whitespace-nowrap">
              Projects
            </TabsTrigger>
            <TabsTrigger value="slides" className="flex-1 whitespace-nowrap">
              Slides
            </TabsTrigger>
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
          <TabsContent value="slides">
            <AdminSlides />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

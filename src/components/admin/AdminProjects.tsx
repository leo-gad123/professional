import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image_url: string | null;
  project_url: string | null;
  repo_url: string | null;
  sort_order: number;
  is_published: boolean;
};

type FormState = {
  title: string;
  description: string;
  tags: string;
  image_url: string;
  project_url: string;
  repo_url: string;
  sort_order: number;
  is_published: boolean;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  tags: "",
  image_url: "",
  project_url: "",
  repo_url: "",
  sort_order: 0,
  is_published: true,
};

export function AdminProjects() {
  const qc = useQueryClient();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        description: editing.description,
        tags: editing.tags.join(", "),
        image_url: editing.image_url ?? "",
        project_url: editing.project_url ?? "",
        repo_url: editing.repo_url ?? "",
        sort_order: editing.sort_order,
        is_published: editing.is_published,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editing, open]);

  function openNew() {
    setEditing(null);
    setOpen(true);
  }
  function openEdit(p: Project) {
    setEditing(p);
    setOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      image_url: form.image_url.trim() || null,
      project_url: form.project_url.trim() || null,
      repo_url: form.repo_url.trim() || null,
      sort_order: Number(form.sort_order) || 0,
      is_published: form.is_published,
    };
    let error;
    if (editing) {
      ({ error } = await supabase.from("projects").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("projects").insert(payload));
    }
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editing ? "Project updated" : "Project added");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["projects"] });
  }

  async function handleDelete(p: Project) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    const { error } = await supabase.from("projects").delete().eq("id", p.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Project deleted");
    qc.invalidateQueries({ queryKey: ["projects"] });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Loading…" : `${projects?.length ?? 0} project(s)`}
        </p>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-1" /> New project
        </Button>
      </div>

      <div className="grid gap-3">
        {projects?.map((p) => (
          <div key={p.id} className="glass rounded-xl p-4 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif text-lg truncate">{p.title}</h3>
                {!p.is_published && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5">
                    Hidden
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono uppercase text-primary/80 border border-primary/30 rounded-full px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="icon" variant="outline" onClick={() => openEdit(p)} aria-label="Edit">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => handleDelete(p)} aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {!isLoading && (projects?.length ?? 0) === 0 && (
          <div className="glass rounded-xl p-8 text-center text-sm text-muted-foreground">
            No projects yet. Click "New project" to add your first one.
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit project" : "New project"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                required
                maxLength={200}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                maxLength={1000}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="IoT, Arduino, Sensors"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project_url">Live URL</Label>
                <Input
                  id="project_url"
                  type="url"
                  value={form.project_url}
                  onChange={(e) => setForm({ ...form, project_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repo_url">Repo URL</Label>
                <Input
                  id="repo_url"
                  type="url"
                  value={form.repo_url}
                  onChange={(e) => setForm({ ...form, repo_url: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="is_published"
                checked={form.is_published}
                onCheckedChange={(v) => setForm({ ...form, is_published: v })}
              />
              <Label htmlFor="is_published">Published (visible on site)</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving || !form.title.trim()}>
                {saving ? "Saving…" : editing ? "Save changes" : "Add project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save } from "lucide-react";

type SEOState = {
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_og_image: string;
  seo_twitter_handle: string;
};

const empty: SEOState = {
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  seo_og_image: "",
  seo_twitter_handle: "",
};

export function AdminSEO() {
  const { data, isLoading } = useSiteSettings();
  const qc = useQueryClient();
  const [form, setForm] = useState<SEOState>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        seo_title: data.seo_title ?? "",
        seo_description: data.seo_description ?? "",
        seo_keywords: data.seo_keywords ?? "",
        seo_og_image: data.seo_og_image ?? "",
        seo_twitter_handle: data.seo_twitter_handle ?? "",
      });
    }
  }, [data]);

  function set<K extends keyof SEOState>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const norm = (v: string) => (v.trim() === "" ? null : v.trim());
    try {
      await api.updateSiteSettings({
        seo_title: norm(form.seo_title),
        seo_description: norm(form.seo_description),
        seo_keywords: norm(form.seo_keywords),
        seo_og_image: norm(form.seo_og_image),
        seo_twitter_handle: norm(form.seo_twitter_handle),
      });
      toast.success("SEO settings updated");
      qc.invalidateQueries({ queryKey: ["site_settings"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const fields: { key: keyof SEOState; label: string; type?: string; placeholder?: string }[] = [
    {
      key: "seo_title",
      label: "Site title (og:site_name)",
      placeholder: "Hakizimana Leogad — Embedded Systems & IoT Engineer",
    },
    {
      key: "seo_description",
      label: "Default meta description",
      placeholder: "Hakizimana Leogad is an Embedded Systems and IoT Engineer from Kigali, Rwanda…",
    },
    {
      key: "seo_keywords",
      label: "Keywords (comma-separated)",
      placeholder: "Embedded Systems, IoT, Arduino, ESP32, Kigali, Rwanda",
    },
    {
      key: "seo_og_image",
      label: "OG Image path (/logo.jpg, /portrait.png, or full URL)",
      placeholder: "/logo.jpg",
    },
    {
      key: "seo_twitter_handle",
      label: "Twitter/X handle",
      placeholder: "@leogad",
    },
  ];

  return (
    <form
      onSubmit={handleSave}
      className="bg-card rounded-2xl p-6 space-y-5 max-w-2xl card-shadow border border-border"
    >
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          These values control the default meta tags for social sharing and search engines. Page-specific titles and
          descriptions are set per-page in the codebase.
        </p>
      </div>
      <div className="grid gap-4">
        {fields.map((f) => (
          <div key={f.key} className="space-y-2">
            <Label htmlFor={f.key}>{f.label}</Label>
            {f.key === "seo_description" ? (
              <Textarea
                id={f.key}
                value={form[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                maxLength={500}
                rows={3}
              />
            ) : (
              <Input
                id={f.key}
                type={f.type ?? "text"}
                value={form[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                maxLength={300}
              />
            )}
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} className="btn-gradient border-0">
        <Save className="h-4 w-4 mr-1.5" />
        {saving ? "Saving…" : "Save SEO settings"}
      </Button>
    </form>
  );
}
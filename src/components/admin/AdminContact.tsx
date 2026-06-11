import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type ContactState = {
  contact_email: string;
  contact_phone: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  website_url: string;
};

const empty: ContactState = {
  contact_email: "",
  contact_phone: "",
  location: "",
  github_url: "",
  linkedin_url: "",
  twitter_url: "",
  website_url: "",
};

export function AdminContact() {
  const { data, isLoading } = useSiteSettings();
  const qc = useQueryClient();
  const [form, setForm] = useState<ContactState>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        contact_email: data.contact_email ?? "",
        contact_phone: data.contact_phone ?? "",
        location: data.location ?? "",
        github_url: data.github_url ?? "",
        linkedin_url: data.linkedin_url ?? "",
        twitter_url: data.twitter_url ?? "",
        website_url: data.website_url ?? "",
      });
    }
  }, [data]);

  function set<K extends keyof ContactState>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const payload = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, v.trim() === "" ? null : v.trim()]),
    );
    const { error } = await supabase.from("site_settings").update(payload).eq("id", data.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Contact info updated");
    qc.invalidateQueries({ queryKey: ["site_settings"] });
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const fields: { key: keyof ContactState; label: string; type?: string; placeholder?: string }[] = [
    { key: "contact_email", label: "Email", type: "email", placeholder: "you@example.com" },
    { key: "contact_phone", label: "Phone", placeholder: "+250 793 953 775" },
    { key: "location", label: "Location", placeholder: "Kigali, Rwanda" },
    { key: "github_url", label: "GitHub URL", type: "url" },
    { key: "linkedin_url", label: "LinkedIn URL", type: "url" },
    { key: "twitter_url", label: "Twitter / X URL", type: "url" },
    { key: "website_url", label: "Website URL", type: "url" },
  ];

  return (
    <form onSubmit={handleSave} className="glass rounded-2xl p-6 space-y-5 max-w-2xl">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className="space-y-2">
            <Label htmlFor={f.key}>{f.label}</Label>
            <Input
              id={f.key}
              type={f.type ?? "text"}
              value={form[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
              placeholder={f.placeholder}
              maxLength={300}
            />
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save contact info"}
      </Button>
    </form>
  );
}

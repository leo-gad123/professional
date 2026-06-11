import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const OPTIONS = [
  { value: "available", label: "🟢 Available for new projects" },
  { value: "busy", label: "🟡 Busy / Limited availability" },
  { value: "unavailable", label: "🔴 Unavailable" },
] as const;

export function AdminStatus() {
  const { data, isLoading } = useSiteSettings();
  const qc = useQueryClient();
  const [availability, setAvailability] = useState<string>("available");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setAvailability(data.availability);
      setMessage(data.status_message);
    }
  }, [data]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({ availability, status_message: message })
      .eq("id", data.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Status updated");
    qc.invalidateQueries({ queryKey: ["site_settings"] });
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <form onSubmit={handleSave} className="glass rounded-2xl p-6 space-y-5 max-w-xl">
      <div className="space-y-2">
        <Label>Availability</Label>
        <Select value={availability} onValueChange={setAvailability}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="msg">Status message</Label>
        <Input
          id="msg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={120}
          placeholder="Available for new projects"
        />
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save status"}
      </Button>
    </form>
  );
}

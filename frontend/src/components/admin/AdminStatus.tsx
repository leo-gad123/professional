import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Save } from "lucide-react";

const OPTIONS = [
  { value: "available", label: "Available for new projects" },
  { value: "busy", label: "Busy / Limited availability" },
  { value: "unavailable", label: "Unavailable" },
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
    try {
      await api.updateSiteSettings({ availability, status_message: message });
      toast.success("Status updated");
      qc.invalidateQueries({ queryKey: ["site_settings"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <form
      onSubmit={handleSave}
      className="bg-card rounded-2xl p-6 space-y-5 max-w-xl card-shadow border border-border"
    >
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
      <Button type="submit" disabled={saving} className="btn-gradient border-0">
        <Save className="h-4 w-4 mr-1.5" />
        {saving ? "Saving…" : "Save status"}
      </Button>
    </form>
  );
}

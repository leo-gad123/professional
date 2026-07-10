import { useEffect, useState, useRef } from "react";
import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Upload, Download, Lock, Loader2, FileText } from "lucide-react";

export function AdminProfile() {
  const [displayName, setDisplayName] = useState("");
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    api
      .getProfile()
      .then((profile) => {
        setDisplayName(profile.display_name);
        setCvUrl(profile.cv_url);
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateProfile({ display_name: displayName });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB");
      return;
    }
    setUploading(true);
    try {
      const result = await api.uploadCV(file);
      setCvUrl(result.cv_url);
      toast.success("CV uploaded successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setChangingPassword(true);
    try {
      await api.changePassword(currentPassword, newPassword);
      toast.success("Password updated");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Password change failed");
    } finally {
      setChangingPassword(false);
    }
  }

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6 max-w-xl">
      {/* Profile Info */}
      <form
        onSubmit={handleSaveProfile}
        className="bg-card rounded-2xl p-6 space-y-5 card-shadow border border-border"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-serif text-lg font-medium text-foreground">Profile Info</h2>
        </div>

        <div className="space-y-2">
          <Label htmlFor="displayName">Display name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <Button type="submit" disabled={saving} className="btn-gradient border-0">
          <Save className="h-4 w-4 mr-1.5" />
          {saving ? "Saving…" : "Save profile"}
        </Button>
      </form>

      {/* CV Upload */}
      <div className="bg-card rounded-2xl p-6 space-y-5 card-shadow border border-border">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Upload className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-serif text-lg font-medium text-foreground">Curriculum Vitae</h2>
        </div>

        <div className="space-y-3">
          <Label>Upload CV (PDF)</Label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="btn-ghost"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-1.5" />
              )}
              {uploading ? "Uploading…" : "Choose file"}
            </Button>
            {cvUrl && (
              <a
                href={cvUrl}
                download="CV.pdf"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <Download className="h-4 w-4" />
                Download current CV
              </a>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          {!cvUrl && (
            <p className="text-xs text-muted-foreground">No CV uploaded yet.</p>
          )}
        </div>
      </div>

      {/* Change Password */}
      <form
        onSubmit={handleChangePassword}
        className="bg-card rounded-2xl p-6 space-y-5 card-shadow border border-border"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Lock className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-serif text-lg font-medium text-foreground">Change Password</h2>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current password</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
        <Button type="submit" disabled={changingPassword} className="btn-gradient border-0">
          <Lock className="h-4 w-4 mr-1.5" />
          {changingPassword ? "Updating…" : "Change password"}
        </Button>
      </form>
    </div>
  );
}

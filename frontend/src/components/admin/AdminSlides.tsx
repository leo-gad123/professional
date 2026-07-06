import { useRef, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Upload, FolderUp, GripVertical } from "lucide-react";

const BASE = import.meta.env.VITE_API_URL || "/api";

type Slide = {
  _id: string;
  image_url: string;
  alt: string;
  sort_order: number;
  is_active: boolean;
};

export function AdminSlides() {
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (folderInputRef.current) {
      folderInputRef.current.setAttribute("webkitdirectory", "");
      folderInputRef.current.setAttribute("directory", "");
    }
  }, []);

  const { data: slides, isLoading } = useQuery({
    queryKey: ["slides", "admin"],
    queryFn: () => api.getAdminSlides(),
  });

  async function handleSingleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await api.uploadSlide(file);
      toast.success("Slide uploaded");
      qc.invalidateQueries({ queryKey: ["slides"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleFolderUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      await api.uploadMultipleSlides(files);
      toast.success(`${files.length} slide(s) uploaded`);
      qc.invalidateQueries({ queryKey: ["slides"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (folderInputRef.current) folderInputRef.current.value = "";
    }
  }

  async function handleDelete(s: Slide) {
    if (!confirm(`Delete this slide?`)) return;
    try {
      await api.deleteSlide(s._id);
      toast.success("Slide deleted");
      qc.invalidateQueries({ queryKey: ["slides"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  function imgUrl(s: Slide) {
    if (s.image_url.startsWith("http")) return s.image_url;
    return `${BASE.replace(/\/api$/, "")}${s.image_url}`;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Loading…" : `${(slides as Slide[] | undefined)?.length ?? 0} slide(s)`}
        </p>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleSingleUpload}
          />
          <input
            ref={folderInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFolderUpload}
          />
          <Button
            variant="outline"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-1.5" />
            {uploading ? "Uploading…" : "Upload image"}
          </Button>
          <Button
            className="btn-gradient border-0"
            disabled={uploading}
            onClick={() => folderInputRef.current?.click()}
          >
            <FolderUp className="h-4 w-4 mr-1.5" />
            {uploading ? "Uploading…" : "Upload folder"}
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(slides as Slide[] | undefined)?.map((s, idx) => (
          <div
            key={s._id}
            className="bg-card rounded-xl overflow-hidden border border-border card-shadow group"
          >
            <div className="relative aspect-video bg-muted">
              <img
                src={imgUrl(s)}
                alt={s.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(s)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-3 flex items-center gap-2 text-xs text-muted-foreground">
              <GripVertical className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Slide {idx + 1}</span>
              {!s.is_active && (
                <span className="text-[10px] font-mono uppercase bg-secondary rounded px-1.5 py-0.5 ml-auto">
                  Inactive
                </span>
              )}
            </div>
          </div>
        ))}
        {!isLoading && (slides as Slide[] | undefined)?.length === 0 && (
          <div className="col-span-full bg-card rounded-xl p-8 text-center text-sm text-muted-foreground card-shadow border border-border">
            No slides yet. Upload images or a folder of images to display on the home page slideshow.
          </div>
        )}
      </div>
    </div>
  );
}

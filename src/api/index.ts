const BASE = import.meta.env.VITE_API_URL || "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = { ...(options?.headers as Record<string, string>) };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!headers["Content-Type"] && options?.method && options.method !== "GET") {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

async function uploadFile<T>(path: string, file: File): Promise<T> {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("image", file);
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { method: "POST", headers, body: formData });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Upload failed (${res.status})`);
  }
  return res.json();
}

async function uploadMultipleFiles<T>(path: string, files: FileList): Promise<T> {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { method: "POST", headers, body: formData });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Upload failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  // Site Settings
  getSiteSettings: () => request<any>("/site-settings"),
  updateSiteSettings: (data: Record<string, unknown>) =>
    request<any>("/site-settings", { method: "PUT", body: JSON.stringify(data) }),

  // Projects
  getPublishedProjects: () => request<any[]>("/projects"),
  getAdminProjects: () => request<any[]>("/projects/admin"),
  createProject: (data: Record<string, unknown>) =>
    request<any>("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id: string, data: Record<string, unknown>) =>
    request<any>(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id: string) => request<any>(`/projects/${id}`, { method: "DELETE" }),

  // Slides
  getSlides: () => request<any[]>("/slides"),
  getAdminSlides: () => request<any[]>("/slides/admin"),
  uploadSlide: (file: File) => uploadFile<any>("/slides", file),
  uploadMultipleSlides: (files: FileList) => uploadMultipleFiles<any>("/slides/upload-multiple", files),
  updateSlide: (id: string, data: Record<string, unknown>) =>
    request<any>(`/slides/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSlide: (id: string) => request<any>(`/slides/${id}`, { method: "DELETE" }),
  reorderSlide: (id: string, sort_order: number) =>
    request<any>(`/slides/reorder/${id}`, { method: "PUT", body: JSON.stringify({ sort_order }) }),

  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; email: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (email: string, password: string) =>
    request<{ token: string; email: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ message: string }>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
  getMe: () => request<{ email: string }>("/auth/me"),
};

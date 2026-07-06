import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

import express from "express";
import mongoose from "mongoose";
import fs from "node:fs";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import projectsRoutes from "./routes/projects.js";
import siteSettingsRoutes from "./routes/siteSettings.js";
import slidesRoutes from "./routes/slides.js";
import chatRoutes from "./routes/chat.js";
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
});

app.use(express.json());
app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

let dbPromise: ReturnType<typeof connectDB> | null = null;
app.use(async (_req, _res, next) => {
  if (!dbPromise) dbPromise = connectDB();
  await dbPromise;
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/site-settings", siteSettingsRoutes);
app.use("/api/slides", slidesRoutes);
app.use("/api/chat", chatRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/sitemap.xml", async (_req, res) => {
  try {
    const siteUrl = "https://leogad.pages.dev";
    const today = new Date().toISOString().split("T")[0];
    const staticPages = [
      { loc: `${siteUrl}/`, priority: "1.0", changefreq: "monthly" },
      { loc: `${siteUrl}/about`, priority: "0.8", changefreq: "monthly" },
      { loc: `${siteUrl}/skills`, priority: "0.8", changefreq: "monthly" },
      { loc: `${siteUrl}/experience`, priority: "0.8", changefreq: "monthly" },
      { loc: `${siteUrl}/projects`, priority: "0.9", changefreq: "weekly" },
      { loc: `${siteUrl}/contact`, priority: "0.7", changefreq: "monthly" },
    ];
    const urls = staticPages.map(
      (p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
    );
    res.type("application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`);
  } catch {
    res.status(500).end();
  }
});

app.get("/api/db-status", (_req, res) => {
  res.json({
    connected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host || null,
  });
});

const distPath = path.resolve(__dirname, "..", "..", "frontend", "dist");
const indexHtml = path.join(distPath, "index.html");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    if (fs.existsSync(indexHtml)) {
      res.sendFile(indexHtml);
    } else {
      next();
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const PORT = process.env.PORT || 3001;
  async function start() {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
  start();
}

export default app;

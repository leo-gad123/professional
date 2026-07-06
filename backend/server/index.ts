import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

import express from "express";
import mongoose from "mongoose";
import fs from "node:fs";
import os from "node:os";
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
  res.status(500).json({ error: "Internal server error" });
});

const localUploads = path.resolve(__dirname, "uploads");
const uploadsPath = fs.existsSync(localUploads)
  ? localUploads
  : path.join(os.tmpdir(), "portfolio-uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use("/uploads", express.static(uploadsPath));

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

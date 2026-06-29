import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import projectsRoutes from "./routes/projects.js";
import siteSettingsRoutes from "./routes/siteSettings.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/site-settings", siteSettingsRoutes);

const distPath = path.resolve(__dirname, "..", "dist");
const indexHtml = path.join(distPath, "index.html");
app.use(express.static(distPath));
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

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();

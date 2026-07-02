import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { Slide } from "../models/Slide.js";
import { requireAuth } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.resolve(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `slide-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${ext}. Allowed: ${allowed.join(", ")}`));
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const slides = await Slide.find({ is_active: true })
      .sort({ sort_order: 1, createdAt: -1 })
      .lean();
    res.json(slides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/admin", requireAuth, async (_req, res) => {
  try {
    const slides = await Slide.find().sort({ sort_order: 1, createdAt: -1 }).lean();
    res.json(slides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No image file provided" });
      return;
    }
    const image_url = `/uploads/${req.file.filename}`;
    const slide = await Slide.create({
      image_url,
      alt: (req.body.alt as string) || "Slide image",
      sort_order: Number(req.body.sort_order) || 0,
      is_active: true,
    });
    res.status(201).json(slide);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/upload-multiple", requireAuth, upload.array("images", 20), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ error: "No image files provided" });
      return;
    }
    const slides = await Slide.insertMany(
      files.map((f) => ({
        image_url: `/uploads/${f.filename}`,
        alt: "Slide image",
        is_active: true,
      })),
    );
    res.status(201).json(slides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  try {
    const slide = await Slide.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
    if (!slide) {
      res.status(404).json({ error: "Slide not found" });
      return;
    }
    res.json(slide);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (!slide) {
      res.status(404).json({ error: "Slide not found" });
      return;
    }
    if (slide.image_url) {
      const filePath = path.join(uploadsDir, path.basename(slide.image_url));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Slide.findByIdAndDelete(req.params.id);
    res.json({ message: "Slide deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/reorder/:id", requireAuth, async (req, res) => {
  try {
    const slide = await Slide.findByIdAndUpdate(
      req.params.id,
      { sort_order: Number(req.body.sort_order) || 0 },
      { new: true },
    );
    if (!slide) {
      res.status(404).json({ error: "Slide not found" });
      return;
    }
    res.json(slide);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

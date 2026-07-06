import type { Response } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { Slide } from "../models/Slide.js";
import { requireAuth } from "../middleware/auth.js";
import type { AuthRequest } from "../types/index.js";

export { requireAuth };

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

const allowedExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExts.has(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${ext}. Allowed: ${[...allowedExts].join(", ")}`));
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
const multiUpload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

export async function getAll(_req: AuthRequest, res: Response) {
  try {
    const slides = await Slide.find({ is_active: true })
      .sort({ sort_order: 1, createdAt: -1 })
      .lean();
    res.json(slides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getAdmin(_req: AuthRequest, res: Response) {
  try {
    const slides = await Slide.find().sort({ sort_order: 1, createdAt: -1 }).lean();
    res.json(slides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function create(req: AuthRequest, res: Response) {
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
}

export async function uploadMultiple(req: AuthRequest, res: Response) {
  try {
    const allFiles = (req.files as Express.Multer.File[]) || [];
    const validFiles = allFiles.filter((f) => {
      const ext = path.extname(f.originalname).toLowerCase();
      return allowedExts.has(ext);
    });
    if (validFiles.length === 0) {
      res.status(400).json({ error: "No valid image files provided" });
      return;
    }
    const slides = await Slide.insertMany(
      validFiles.map((f) => ({
        image_url: `/uploads/${f.filename}`,
        alt: "Slide image",
        is_active: true,
      })),
    );
    res.status(201).json({ slides, skipped: allFiles.length - validFiles.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function update(req: AuthRequest, res: Response) {
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
}

export async function remove(req: AuthRequest, res: Response) {
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
}

export async function reorder(req: AuthRequest, res: Response) {
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
}

import type { Response } from "express";
import multer from "multer";
import sharp from "sharp";
import path from "node:path";
import { Slide } from "../models/Slide.js";
import { requireAuth } from "../middleware/auth.js";
import type { AuthRequest } from "../types/index.js";

export { requireAuth };

async function processImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
}

const mimeMap: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

const allowedExts = new Set(Object.keys(mimeMap));

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExts.has(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${ext}. Allowed: ${[...allowedExts].join(", ")}`));
  }
};

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});
export const multiUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

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
    const resized = await processImage(req.file.buffer);
    const b64 = resized.toString("base64");
    const image_url = `data:image/jpeg;base64,${b64}`;
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
      await Promise.all(
        validFiles.map(async (f) => {
          const resized = await processImage(f.buffer);
          return {
            image_url: `data:image/jpeg;base64,${resized.toString("base64")}`,
            alt: "Slide image",
            is_active: true,
          };
        }),
      ),
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

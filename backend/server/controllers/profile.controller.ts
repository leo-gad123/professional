import type { Response } from "express";
import multer from "multer";
import { SiteSettings } from "../models/SiteSettings.js";
import { requireAuth } from "../middleware/auth.js";
import type { AuthRequest } from "../types/index.js";

export { requireAuth };

const cvUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const uploadCV = cvUpload.single("cv");

export async function getProfile(_req: AuthRequest, res: Response) {
  try {
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json({
      display_name: settings.display_name,
      cv_url: settings.cv_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function updateProfile(req: AuthRequest, res: Response) {
  try {
    const { display_name } = req.body;
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: { display_name } },
      { new: true, upsert: true, runValidators: true },
    );
    res.json({ display_name: settings.display_name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function handleUploadCV(req: AuthRequest, res: Response) {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const b64 = req.file.buffer.toString("base64");
    const cv_url = `data:application/pdf;base64,${b64}`;
    await SiteSettings.findOneAndUpdate(
      {},
      { $set: { cv_url } },
      { new: true, upsert: true },
    );
    res.json({ cv_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

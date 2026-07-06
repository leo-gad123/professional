import type { Response } from "express";
import { SiteSettings } from "../models/SiteSettings.js";
import { requireAuth } from "../middleware/auth.js";
import type { AuthRequest } from "../types/index.js";

export { requireAuth };

export async function get(_req: AuthRequest, res: Response) {
  try {
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, runValidators: true },
    );
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

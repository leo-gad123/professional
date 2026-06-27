import { Router } from "express";
import { SiteSettings } from "../models/SiteSettings.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res) => {
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
});

router.put("/", requireAuth, async (req, res) => {
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
});

export default router;

import { Router } from "express";
import { get, update, requireAuth } from "../controllers/siteSettings.controller.js";

const router = Router();

router.get("/", get);
router.put("/", requireAuth, update);

export default router;

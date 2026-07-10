import { Router } from "express";
import {
  getProfile,
  updateProfile,
  handleUploadCV,
  uploadCV,
  requireAuth,
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/", requireAuth, getProfile);
router.put("/", requireAuth, updateProfile);
router.post("/cv", requireAuth, uploadCV, handleUploadCV);

export default router;

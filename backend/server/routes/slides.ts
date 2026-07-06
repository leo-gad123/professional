import { Router } from "express";
import {
  getAll,
  getAdmin,
  create,
  uploadMultiple,
  update,
  remove,
  reorder,
  requireAuth,
  upload,
  multiUpload,
} from "../controllers/slides.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/admin", requireAuth, getAdmin);
router.post("/", requireAuth, upload.single("image"), create);
router.post("/upload-multiple", requireAuth, multiUpload.array("images", 50), uploadMultiple);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);
router.put("/reorder/:id", requireAuth, reorder);

export default router;

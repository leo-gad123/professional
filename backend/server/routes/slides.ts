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
} from "../controllers/slides.controller.js";
import multer from "multer";

const router = Router();

router.get("/", getAll);
router.get("/admin", requireAuth, getAdmin);
router.post("/", requireAuth, create);
router.post("/upload-multiple", requireAuth, (req, res, next) => {
  const multiUpload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }).array("images", 50);
  multiUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
      return;
    }
    next();
  });
}, uploadMultiple);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);
router.put("/reorder/:id", requireAuth, reorder);

export default router;

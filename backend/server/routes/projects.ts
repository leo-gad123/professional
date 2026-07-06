import { Router } from "express";
import { getAll, getAdmin, create, update, remove, requireAuth } from "../controllers/projects.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/admin", requireAuth, getAdmin);
router.post("/", requireAuth, create);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);

export default router;

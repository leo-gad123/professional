import { Router } from "express";
import { register, login, changePassword, getMe, requireAuth } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", requireAuth, changePassword);
router.get("/me", requireAuth, getMe);

export default router;

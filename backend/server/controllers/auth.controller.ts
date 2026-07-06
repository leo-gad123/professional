import type { Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";
import type { AuthRequest } from "../types/index.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const ADMIN_EMAIL = "hakizimanaleogad@gmail.com";

export { requireAuth };

export async function register(req: AuthRequest, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }
    if (email.toLowerCase().trim() !== ADMIN_EMAIL) {
      res.status(403).json({ error: "Registration is restricted to the admin only" });
      return;
    }
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      res.status(409).json({ error: "Admin account already exists" });
      return;
    }
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ email: ADMIN_EMAIL, password: hashed });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function login(req: AuthRequest, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function changePassword(req: AuthRequest, res: Response) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: "Current and new password required" });
      return;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      res.status(401).json({ error: "Current password is incorrect" });
      return;
    }
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
    res.json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const user = await User.findById(req.userId).select("email");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

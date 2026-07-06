import type { Response } from "express";
import { Project } from "../models/Project.js";
import { requireAuth } from "../middleware/auth.js";
import type { AuthRequest } from "../types/index.js";

export { requireAuth };

export async function getAll(_req: AuthRequest, res: Response) {
  try {
    const projects = await Project.find({ is_published: true })
      .sort({ sort_order: 1, createdAt: -1 })
      .lean();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getAdmin(_req: AuthRequest, res: Response) {
  try {
    const projects = await Project.find().sort({ sort_order: 1, createdAt: -1 }).lean();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

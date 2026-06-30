import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import app from "../server/index.js";
import { connectDB } from "../server/db.js";

let dbPromise: ReturnType<typeof connectDB> | null = null;

app.use(async (_req: Request, _res: Response, next: NextFunction) => {
  if (!dbPromise) {
    dbPromise = connectDB();
  }
  await dbPromise;
  next();
});

app.get("/api/db-status", (_req: Request, res: Response) => {
  res.json({
    connected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host || null,
  });
});

export default app;

import type { Request, Response, NextFunction } from "express";
import app from "../server/index.js";
import { connectDB } from "../server/db.js";

let dbPromise: Promise<void> | null = null;

app.use(async (_req: Request, _res: Response, next: NextFunction) => {
  if (!dbPromise) {
    dbPromise = connectDB();
  }
  await dbPromise;
  next();
});

export default app;

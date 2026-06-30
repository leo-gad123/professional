import app from "../server/index.js";
import { connectDB } from "../server/db.js";

connectDB();

export default app;

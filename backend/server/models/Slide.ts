import mongoose from "mongoose";

const slideSchema = new mongoose.Schema(
  {
    image_url: { type: String, required: true },
    alt: { type: String, default: "Slide image" },
    sort_order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Slide = mongoose.model("Slide", slideSchema);

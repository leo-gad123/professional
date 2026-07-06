import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, default: "" },
    tags: [{ type: String }],
    image_url: { type: String, default: null },
    project_url: { type: String, default: null },
    repo_url: { type: String, default: null },
    sort_order: { type: Number, default: 0 },
    is_published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);

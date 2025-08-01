import { Schema, model, models } from "mongoose";
import { IProject } from "@/types/project.type";

const projectSchema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: true,
        },
        short_description: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        live_url: {
            type: String,
            default: "/",
        },
        github_url: {
            type: String,
            default: "/",
        },
        pc_preview: {
            type: String,
            required: true,
        },
        mobile_preview: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        features: {
            type: String,
            default: "",
        },
        tools: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Project = models.Project || model<IProject>("Project", projectSchema);

export default Project;

import { IAddProjectPayload, IEditProjectPayload, IProjectResponse } from "@/types/project.type";
import { uploadImage } from "./uploadImage.action";



// add projects
export const addProject = async (payload: IAddProjectPayload) => {
    const { mobile_preview, pc_preview } = payload;

    try {
        const mobilePreviewResponse = await uploadImage(mobile_preview);
        const pcPreviewResponse = await uploadImage(pc_preview);

        if (!mobilePreviewResponse.url || !pcPreviewResponse.url) {
            return {
                error: "Failed to upload image"
            }
        };


        const newPayload = {
            ...payload,
            mobile_preview: mobilePreviewResponse.url,
            pc_preview: pcPreviewResponse.url
        };

        const response = await fetch('/api/project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPayload)
        });

        return response.json();

    } catch (error) {
        console.error("Failed to add project:", error);
        return {
            error: "Failed to add project"
        }
    }
}


// get all projects
export const getAllProjects = async () => {
    try {
        const response = await fetch('/api/project');
        const projects = await response.json();
        return projects.projects;
    } catch (error) {
        console.error("Failed to get projects:", error);
        return {
            error: "Failed to get projects"
        }
    }
}


// delete project
export const deleteProject = async (id: string) => {
    try {
        const response = await fetch(`/api/project/${id}`, {
            method: 'DELETE',
        });

        return response.json();
    } catch (error) {
        console.error("Failed to delete project:", error);
        return {
            error: "Failed to delete project"
        }
    }
}


// get project by id
export const getProject = async (id: string) => {
    try {
        const response = await fetch(`/api/project/${id}`);
        const project = await response.json();
        return project.projects;
    } catch (error) {
        console.error("Failed to get project:", error);
        return {
            error: "Failed to get project"
        }
    }
}

// edit project by id
export const editProject = async (
  payload: IEditProjectPayload,
  project: IProjectResponse
) => {
  try {
    const uploadOrKeepOriginal = async (
      file: File | null | undefined,
      originalUrl: string
    ) => {
      if (!file) return originalUrl;
      const { url } = await uploadImage(file);
      return url || originalUrl;
    };

    const newMobilePreview = await uploadOrKeepOriginal(payload.mobile_preview, project.mobile_preview);
    const newPcPreview = await uploadOrKeepOriginal(payload.pc_preview, project.pc_preview);

    const updatedProject = {
      ...payload,
      mobile_preview: newMobilePreview,
      pc_preview: newPcPreview,
    };

    const response = await fetch(`/api/project/${project._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    });

    return response.json();
  } catch (error) {
    console.error("Failed to edit project:", error);
    return { error: "Failed to edit project" };
  }
};

export interface Project  {
    id: number;
    title: string;
    tags: string[];
    desk_image: string;
    mobile_image: string;
    description: string;
    view_link: string;
    code_link: string;
}

export interface IProject {
    name: string;
    short_description: string;
    tags: string[];
    live_url?: string;
    github_url?: string;
    pc_preview: string;
    mobile_preview: string;
    description: string;
    features: string;
    tools: string;
}


export interface IAddProjectPayload {
    name: string;
    short_description: string;
    tags: string[];
    live_url?: string;
    github_url?: string;
    pc_preview: File;
    mobile_preview: File;
    description: string;
    features: string;
    tools: string;
}

export interface IProjectResponse {
    _id: string;
    name: string;
    short_description: string;
    tags: string[];
    live_url?: string;
    github_url?: string;
    pc_preview: string;
    mobile_preview: string;
    description: string;
    features: string;
    tools: string;
    created_at: Date;
    updated_at: Date;
}

export interface IEditProjectPayload {
    name: string;
    short_description: string;
    tags: string[];
    live_url?: string;
    github_url?: string;
    pc_preview?: File;
    mobile_preview?: File;
    description: string;
    features: string;
    tools: string;
}

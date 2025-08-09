import { IProjectResponse } from "@/types/project.type";


export function filterTags(projects: IProjectResponse[]) {
    const tags: string[] = [];
    projects.forEach((project) => {
        project.tags.forEach((tag) => {
            if (!tags.includes(tag)) {
                tags.push(tag)
            }
        })
    })
    return tags
}
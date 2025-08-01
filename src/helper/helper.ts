import { Project } from "@/types/project.type";


export function filterTags(projects: Project[]) {
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
"use client"

import { deleteProject } from '@/actions/project.action'
import { IProjectResponse } from '@/types/project.type'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { useQueryClient } from '@tanstack/react-query'



interface Props {
    project: IProjectResponse;
}

export default function ProjectCard({ project }: Props) {
    const queryClient = useQueryClient();
    
    // states
    const [isDeleting, setIsDeleting] = useState(false)

    // project delete mutation
    const deleteProjectMutation = useMutation({
        mutationFn: async () => await deleteProject(project._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast.success('Project deleted successfully');
            setIsDeleting(false)
        },
        onError: () => {
            toast.error("Failed to delete project");
            setIsDeleting(false)
        }
    });


    // delete project handler
    function onDeleteProject() {
        setIsDeleting(true)
        deleteProjectMutation.mutate();
    }

    return (
        <Card className='p-0 flex flex-col overflow-hidden gap-0'>
            <div className="relative">
                <div className="w-full h-60 overflow-hidden">
                    <Image
                        className='w-full h-full object-cover'
                        src={project.pc_preview}
                        height={500}
                        width={500}
                        alt='project-image'
                    />
                </div>
            </div>
            <div className="flex items-start justify-between p-3">
                <h2 className='text-lg font-bold'>{project.name}</h2>

                <div className="flex gap-2">
                    <Button asChild size="sm">
                        <Link className='flex align-center capitalize' href={`/admin/projects/${project._id}`}>
                            edit
                        </Link>
                    </Button>

                    <Button
                        className='capitalize'
                        variant="destructive"
                        size="sm"
                        onClick={onDeleteProject}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <Loader2 className='h-2 w-2 animate-spin' />
                        ) : (
                            'delete'
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    )
}

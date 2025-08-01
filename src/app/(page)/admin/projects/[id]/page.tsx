"use client"

import { getProject } from '@/actions/project.action';
import { EditProjectForm } from '@/components/form/EditProjectForm';
import Loader from '@/components/layout/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EditProject() {
    // id from query params
    const { id: projectId } = useParams();

    if (!projectId || typeof projectId !== 'string') {
        throw new Error('Invalid project ID');
    }

    // get project by id
    const { data: project, isLoading } = useQuery({
        queryKey: ['project', projectId],
        queryFn: async () => getProject(projectId),
        enabled: !!projectId,
    });

    return (
        <div className='max-w-4xl mx-auto py-5'>

            <Card>
                <CardHeader className='flex items-center gap-2'>
                    <Link href="/admin/projects">
                        <ArrowLeft />
                    </Link>
                    <CardTitle className='text-2xl capitalize'>Project</CardTitle>
                </CardHeader>

                <CardContent>
                    {isLoading && <Loader />}
                    {project && <EditProjectForm project={project} />}
                </CardContent>
            </Card>
        </div>
    )
}

"use client"

import { getAllProjects } from '@/actions/project.action'
import ProjectCard from '@/components/card/ProjectCard'
import Loader from '@/components/layout/Loader'
import { Button } from '@/components/ui/button'
import { IProjectResponse } from '@/types/project.type'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });


  return (
    <div className="p-2">
      <div className="flex align-center justify-between">
        <h2 className='text-2xl'>Your recent projects</h2>

        <Button asChild>
          <Link className='flex align-center capitalize' href="/admin/projects/new">
            new project

            <Plus className='ml-2' />
          </Link>
        </Button>
      </div>

      {isLoading && <Loader />}

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-5">
        {projects && projects.map((project: IProjectResponse) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  )
}

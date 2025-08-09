"use client"

import { getAllProjects } from '@/actions/project.action';
import ProjectsBannerGrid from '@/components/section/ProjectsBannerGrid'
import ProjectsBannerSlider from '@/components/section/ProjectsBannerSlider';
import ProjectsTabs from '@/components/section/ProjectsTabs';
import { useDevice } from '@/hooks/useDevice';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function Projects() {
  const device = useDevice();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });


  return (
    <>
      {device == "desktop" || device == "tablet" ? (
        <ProjectsBannerGrid />
      ) : (
        <ProjectsBannerSlider />
      )}
      {!isLoading && (
        <ProjectsTabs projects={projects} />
      )}
    </>
  )
}

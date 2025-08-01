"use client"

import ProjectsBannerGrid from '@/components/section/ProjectsBannerGrid'
import ProjectsBannerSlider from '@/components/section/ProjectsBannerSlider';
import ProjectsTabs from '@/components/section/ProjectsTabs';
import { useDevice } from '@/hooks/useDevice';
import React from 'react'

export default function Projects() {
  const device = useDevice();
  return (
    <>
      {device == "desktop" || device == "tablet" ? (
        <ProjectsBannerGrid />
      ):(
        <ProjectsBannerSlider />
      )}

      <ProjectsTabs/>
    </>
  )
}

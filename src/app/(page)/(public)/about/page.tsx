import About from '@/components/section/About'
import Education from '@/components/section/Education'
import Experience from '@/components/section/Experience'
import MorphBanner from '@/components/section/MorphBanner'
import React from 'react'

export default function page() {
  return (
    <>
      <MorphBanner />
      <About />
      <Education />
      <Experience />
    </>
  )
}

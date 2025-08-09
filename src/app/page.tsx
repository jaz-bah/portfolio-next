"use client"
import { getAllProjects } from "@/actions/project.action";
import Experience from "@/components/section/Experience";
import Expertise from "@/components/section/Expertise";
import ProjectsStack from "@/components/section/ProjectsStack";
import TextBanner from "@/components/section/TextBanner";
import { useQuery } from "@tanstack/react-query";


export default function Home() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });

  return (
    <>
      <TextBanner />
      <Expertise />
      {!isLoading && <ProjectsStack projects={projects} />}
      <Experience />
    </>
  );
}

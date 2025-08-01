import Experience from "@/components/section/Experience";
import Expertise from "@/components/section/Expertise";
import ProjectsStack from "@/components/section/ProjectsStack";
import TextBanner from "@/components/section/TextBanner";


export default function Home() {
  return (
    <>
      <TextBanner />
      <Expertise />
      <ProjectsStack />
      <Experience />
    </>
  );
}

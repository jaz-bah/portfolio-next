"use client"
import { useDevice } from '@/hooks/useDevice'
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useRef, useEffect, useState } from 'react'
import Heading from '../others/Heading'
import ProjectBigCard from './ProjectBigCard'
import { IProjectResponse } from '@/types/project.type'

gsap.registerPlugin(SplitText, ScrollTrigger);

const projectNames = [
    "Finly",
    "Beats",
    "Travela",
    "L’Gran",
]


interface Props {
    projects: IProjectResponse[];
}

export default function ProjectsStack({ projects }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const device = useDevice();
    const [featuredProjects, setFeaturedProjects] = useState<IProjectResponse[]>([]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldAnimate(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        if (sectionRef.current && shouldAnimate && device === "desktop") {
            const cards = gsap.utils.toArray(".project_card");
            const animDuration = 0.5;
            const bottom = `bottom top-=${100 * cards.length}`;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: bottom,
                    scrub: 1,
                    pin: true,
                }
            });

            cards.forEach((card, index) => {
                const currentCard = card as HTMLElement;

                tl.to(currentCard, {
                    y: -index * currentCard.offsetHeight + "px",
                    left: 0,
                    opacity: 1,
                    duration: animDuration,
                    ease: "power2.inOut",
                }, "<0.15")
            });
        }
    }, { scope: sectionRef, dependencies: [shouldAnimate] });

    useEffect(() => {
        if (projects) {
            setFeaturedProjects([]);
            projectNames.forEach((name) => {
                const project = projects.find((project) => project.name === name);
                if (project) {
                    setFeaturedProjects((prev) => [...prev, project]);
                }
            });

            const timer = setTimeout(() => {
                setShouldAnimate(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [projects]);


    return (
        <section className='home_projects_section' ref={sectionRef}>
            <div className='background'>
                <video
                    src="/static/videos/bg-video.webm"
                    autoPlay
                    loop
                    muted
                />
            </div>
            <div className='container'>
                <Heading title='Latest Builds' link='/projects' />

                <div className="projects_wrapper">
                    {featuredProjects && featuredProjects.map((project, index) => (
                        <ProjectBigCard
                            key={index}
                            image={project.pc_preview}
                            title={project.name}
                            description={project.short_description}
                            tags={project.tags}
                            link={project.live_url}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
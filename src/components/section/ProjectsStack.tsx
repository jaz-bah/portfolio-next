"use client"
import { useDevice } from '@/hooks/useDevice'
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useRef, useEffect, useState } from 'react'
import Heading from '../others/Heading'
import ProjectBigCard from './ProjectBigCard'

gsap.registerPlugin(SplitText, ScrollTrigger);

const projects = [
    {
        image: "/static/images/projects.png",
        title: "Project Title",
        description: "Project Description",
        tags: ["Tag 1", "Tag 2", "Tag 3"],
        link: "/"
    },
    {
        image: "/static/images/projects.png",
        title: "Project Title",
        description: "Project Description",
        tags: ["Tag 1", "Tag 2", "Tag 3"],
        link: "/"
    },
    {
        image: "/static/images/projects.png",
        title: "Project Title",
        description: "Project Description",
        tags: ["Tag 1", "Tag 2", "Tag 3"],
        link: "/"
    },
    {
        image: "/static/images/projects.png",
        title: "Project Title",
        description: "Project Description",
        tags: ["Tag 1", "Tag 2", "Tag 3"],
        link: "/"
    },
    {
        image: "/static/images/projects.png",
        title: "Project Title",
        description: "Project Description",
        tags: ["Tag 1", "Tag 2", "Tag 3"],
        link: "/"
    },
]

export default function ProjectsStack() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const device = useDevice();

    useEffect(() => {
        // Add delay to ensure layout is fully rendered
        const timer = setTimeout(() => {
            setShouldAnimate(true);
        }, 1000); // Adjust delay as needed (100ms should be sufficient)

        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        if (sectionRef.current && shouldAnimate) {
            const cards = gsap.utils.toArray(".project_card");
            const animDuration = 0.5;
            const bottom = device == "mobile" ? `bottom top-=${10 * cards.length}` : `bottom top-=${100 * cards.length}`;

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
    }, { scope: sectionRef, dependencies: [shouldAnimate] })

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
                    {projects && projects.map((project, index) => (
                        <ProjectBigCard
                            key={index}
                            image={project.image}
                            title={project.title}
                            description={project.description}
                            tags={project.tags}
                            link={project.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
'use client'

import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, SplitText } from 'gsap/all';
import Link from 'next/link';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);


const projects = [
    {
        media: "/static/images/slide-1.png",
        type: "image",
        path: "/"
    },
    {
        media: "/static/images/slide-2.png",
        type: "image",
        path: "/"
    },
    {
        media: "/static/images/slide-3.png",
        type: "image",
        path: "/"
    },
    {
        media: "/static/images/slide-4.mp4",
        type: "video",
        path: "/"
    },
    {
        media: "/static/images/slide-5.png",
        type: "image",
        path: "/"
    },
    {
        media: "/static/images/slide-6.jpg",
        type: "image",
        path: "/"
    },
]

export default function ProjectsBannerGrid() {

    const sectionRef = useRef<HTMLDivElement>(null);


    useGSAP(() => {
        if (sectionRef.current) {
            const projectsBanner = sectionRef.current;
            const projectsBannerGrid = projectsBanner?.querySelector(".grid_content") as HTMLElement;
            const projectsBannerGridWrapper = projectsBannerGrid?.querySelector(".grid_wrapper") as HTMLElement;
            const heading = sectionRef.current?.querySelector(".text_box .title") as HTMLElement;

            const projectsBannerColumns = [
                projectsBannerGridWrapper?.querySelector(".banner_col_one"),
                projectsBannerGridWrapper?.querySelector(".banner_col_two"),
                projectsBannerGridWrapper?.querySelector(".banner_col_three"),
                projectsBannerGridWrapper?.querySelector(".banner_col_four"),
            ] as HTMLElement[];

            if (!projectsBanner || !projectsBannerGrid || !projectsBannerGridWrapper || projectsBannerColumns.some(col => !col)) return;

            const headingSplit = new SplitText(heading, { type: "words, lines", linesClass: "flex overflow-hidden" });



            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: projectsBanner,
                    start: "top top",
                    pin: true,
                    scrub: 3,
                },
            });

            timeline.to(
                projectsBannerGrid,
                {
                    height: "auto",
                    width: "100%",
                    marginRight: "0px",
                    borderRadius: "0px",
                    duration: 1,
                    ease: "power1.out",
                },
            ).fromTo(
                projectsBannerGridWrapper,
                {
                    transform: "translateX(-15%) skew(-35deg, 10deg)",
                },
                {
                    transform: "translateX(0%) skew(0deg, 0deg)",
                    duration: 1,
                    ease: "power1.out",
                },
                "<"
            ).to(
                headingSplit.words,
                {
                    y: -100,
                    stagger: 0.02,
                    duration: 0.5,
                    ease: "power1.out",
                },
                "<"
            )

            const columnAnimations = ["-10%", "-20%", "-5%", "-30%"];

            projectsBannerColumns.forEach((col, index) => {
                timeline.fromTo(
                    col,
                    { y: "0%" },
                    { y: columnAnimations[index], duration: 1, ease: "power1.out" },
                    0
                );
            });
        }
    }, { scope: sectionRef });
    return (
        <section className='projects_banner_section projects_banner_section_grid' ref={sectionRef}>
            <div className="text_box">
                <h2 className="title">400+ projects. Shopify Themes</h2>
            </div>

            <div className="grid_content">
                <div className="grid_wrapper">
                    <div className="grid_column banner_col_one">
                        {projects && projects.map((project, index) => project.type === "image" ? (
                            (
                                <Link
                                    href={project.path}
                                    key={index}
                                    className="grid"
                                    style={{ backgroundImage: `url(${project.media})` }}
                                >
                                </Link>
                            )
                        ) : null
                        )}
                    </div>

                    <div className="grid_column banner_col_two">
                        {projects && projects.map((project, index) => project.type === "image" ? (
                            (
                                <Link
                                    href={project.path}
                                    key={index}
                                    className="grid"
                                    style={{ backgroundImage: `url(${project.media})` }}
                                >
                                </Link>
                            )
                        ) : null
                        )}
                    </div>

                    <div className="grid_column banner_col_three">
                        {projects && projects.map((project, index) => project.type === "image" ? (
                            (
                                <Link
                                    href={project.path}
                                    key={index}
                                    className="grid"
                                    style={{ backgroundImage: `url(${project.media})` }}
                                >
                                </Link>
                            )
                        ) : null
                        )}
                    </div>

                    <div className="grid_column banner_col_four">
                        {projects && projects.map((project, index) => project.type === "image" ? (
                            (
                                <Link
                                    href={project.path}
                                    key={index}
                                    className="grid"
                                    style={{ backgroundImage: `url(${project.media})` }}
                                >
                                </Link>
                            )
                        ) : null
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

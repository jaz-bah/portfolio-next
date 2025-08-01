"use client"
import { filterTags } from '@/helper/helper';
import { useDevice } from '@/hooks/useDevice';
import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import ProjectSmallCard from './ProjectSmallCard';

const projects = [
    {
        id: 1,
        title: "Beats",
        tags: ["Next.js"],
        desk_image: "/static/images/beats-pc.png",
        mobile_image: "/static/images/beats-mobile.png",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, esse aliquid
        quod a aspernatur dolor, repudiandae impedit consequatur beatae veniam explicabo
        veritatis, nemo ducimus ad. Modi non placeat quaerat alias.`,
        view_link: "/",
        code_link: "/"
    },
    {
        id: 2,
        title: "Beats",
        tags: ["Tailwind", "Shopify"],
        desk_image: "/static/images/beats-pc.png",
        mobile_image: "/static/images/beats-mobile.png",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, esse aliquid
        quod a aspernatur dolor, repudiandae impedit consequatur beatae veniam explicabo
        veritatis, nemo ducimus ad. Modi non placeat quaerat alias.`,
        view_link: "/",
        code_link: "/"
    },
    {
        id: 3,
        title: "Beats",
        tags: ["App", "Tailwind"],
        desk_image: "/static/images/beats-pc.png",
        mobile_image: "/static/images/beats-mobile.png",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, esse aliquid
        quod a aspernatur dolor, repudiandae impedit consequatur beatae veniam explicabo
        veritatis, nemo ducimus ad. Modi non placeat quaerat alias.`,
        view_link: "/",
        code_link: "/"
    },
    {
        id: 4,
        title: "Beats",
        tags: ["Ecommerce", "Shopify", "Redux"],
        desk_image: "/static/images/beats-pc.png",
        mobile_image: "/static/images/beats-mobile.png",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, esse aliquid
        quod a aspernatur dolor, repudiandae impedit consequatur beatae veniam explicabo
        veritatis, nemo ducimus ad. Modi non placeat quaerat alias.`,
        view_link: "/",
        code_link: "/"
    },
    {
        id: 5,
        title: "Beats",
        tags: ["Next.js", "Ecommerce", "Redux"],
        desk_image: "/static/images/beats-pc.png",
        mobile_image: "/static/images/beats-mobile.png",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, esse aliquid
        quod a aspernatur dolor, repudiandae impedit consequatur beatae veniam explicabo
        veritatis, nemo ducimus ad. Modi non placeat quaerat alias.`,
        view_link: "/",
        code_link: "/"
    },
]

export default function ProjectsTabs() {
    const refTabs = useRef<HTMLUListElement>(null);
    const device = useDevice();

    const [tags] = useState<string[]>(filterTags(projects));

    useEffect(() => {
        if (device !== 'mobile') {
            if (window !== undefined) {
                import('mixitup').then((mixitup) => {
                    mixitup.default('.project_grid');
                });
            }

            if (refTabs.current) {

                const tabs = refTabs.current;
                const projectTabs: NodeListOf<HTMLElement> = tabs.querySelectorAll(".projects_tabs_section .tabs_wrapper .tabs li");
                const tabsSelector: HTMLElement | null = tabs.querySelector(".projects_tabs_section .tabs_wrapper .tabs .selector");
                const tabsSelected: HTMLElement | null = tabs.querySelector(".projects_tabs_section .tabs_wrapper .tabs .selected");

                if (!tabsSelector || !tabsSelected) return;

                projectTabs.forEach((tab: HTMLElement) => {

                    tab.addEventListener("mouseenter", () => {
                        if (tabsSelector) {
                            tabsSelector.style.left = tab.offsetLeft + "px";
                        }
                        // tabsSelected.style.left = tab.offsetLeft + "px";
                    });

                    tab.addEventListener("mouseleave", () => {
                        projectTabs.forEach((tab) => {
                            if (tab.classList.contains("active")) {
                                tabsSelector.style.left = tab.offsetLeft + "px";
                            }
                        })
                    });

                    tab.addEventListener("click", () => {
                        projectTabs.forEach((elm) => elm.classList.remove("active"));

                        tabsSelector.style.left = tab.offsetLeft + "px";
                        tabsSelected.style.left = tab.offsetLeft + "px";
                        tab.classList.add("active");
                    });

                });
            }
        } else {
            new Swiper(".project_slider", {
                effect: "cards",
                grabCursor: true,
                slidesPerView: 1.1,
                modules: [Navigation, Pagination],
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        }

    }, [device])

    return (
        <section className='projects_tabs_section'>
            <div className='container-fluid'>

                <div className="tabs_wrapper">
                    <ul className="tabs" ref={refTabs}>
                        <span className="selector"></span>
                        <span className="selected"></span>
                        {tags && tags.map((tag, index) => (
                            <li key={index} className="tab" role="button" data-filter={`.${tag.replace(/\./g, "").replace(/\s+/g, "_")}`}>{tag}</li>
                        ))}
                    </ul>
                </div>

                <div className="project_slider swiper">
                    <div className="swiper-wrapper project_grid">
                        {projects && projects.map((project, index) => (
                            <ProjectSmallCard key={index} project={project} />
                        ))}
                    </div>

                    <div className="swiper-pagination"></div>
                </div>
            </div>
        </section>
    )
}

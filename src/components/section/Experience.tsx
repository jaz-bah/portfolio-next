'use client'

import { accordion } from '@/helper/accordion';
import { useDevice } from '@/hooks/useDevice';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/all';
import { useEffect, useRef } from 'react';
import Heading from '../others/Heading';

const experiences = [
    {
        position: "Lead Frontend Developer",
        company: "Pointerflow",
        date: "Sep 2024 - Present",
        description: `
        <p>
            Promoted to lead frontend role with a team of <strong>3 interns</strong>. Guided them on service-related tasks, code quality, and development workflows. My focus shifted to <strong>Shopify app development</strong> using <strong>Remix</strong>, <strong>GraphQL</strong>, and <strong>Polaris</strong>—shipping tools that are fast, intuitive, and built with a reactive mindset.
        </p>
        <ul>
            <li><strong>Storecraft:</strong> Public app built with Remix and Polaris. A customizable Shopify section and landing page library for merchants.</li>
            <li><strong>Lightnr Swatch:</strong> Product bundling app with PJAX-powered smooth navigation and dynamic bundle creation.</li>
            <li><strong>Tradie:</strong> Middleware app that syncs data between a Magento backend and Shopify for product and order management.</li>
            <li><strong>Memorial:</strong> A profile system tied to QR codes, allowing visitors to scan and view memorial pages for loved ones. Built with Remix and Polaris.</li>
        </ul>
        `
    },
    {
        position: "Frontend Developer",
        company: "Pointerflow",
        date: "Sep 2023 - Sep 2024",
        description: `
            <p>
                Focused on client-facing projects, developing over <strong>300+ custom Shopify themes</strong> using <strong>Liquid</strong> and best practices. Delivered pixel-perfect, high-performance storefronts aligned with each brand’s identity.
            </p>
        `
    },
    {
        position: "Frontend Developer",
        company: "Analysis ACE",
        date: "Feb 2021 - Sep 2023",
        description: `
        <p>
            Kickstarted my career by turning high-fidelity <strong>Figma designs</strong> into responsive, production-ready interfaces using <strong>Next.js</strong>. Specialized in <strong>API integration</strong> with <strong>Axios</strong> and <strong>TanStack Query</strong>, focusing on performance and clean architecture.
        </p>
        <ul>
            <li><strong>Diagnostic ACE:</strong> Medical dashboard using Metronic theme, featuring charts, tables, and complex UI components built with Next.js.</li>
            <li><strong>Bestfluency:</strong> E-learning platform with live chat and video calling, fully built in Next.js.</li>
        </ul>
        `
    },
]

export default function Experience() {
    const device = useDevice();
    const accordionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (accordionRef.current) {
                accordion(accordionRef.current, device);
            }
        }, 100); // Small delay to ensure DOM is ready

        return () => clearTimeout(timer);
    }, [device]);

    useGSAP(() => {
        if (accordionRef.current) {
            const accordions = gsap.utils.toArray(".accordion_item");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: accordionRef.current,
                    start: "top center+=200",
                    end: "+=300",
                    scrub: 1,
                    toggleActions: "restart none none reverse"
                }
            });

            accordions.forEach((accordion) => {
                const currentAccordion = accordion as HTMLElement;

                tl.from(currentAccordion, {
                    y: 50,
                    x: 20,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.inOut"
                })
            })
        }
    }, { scope: accordionRef })

    return (
        <section className='home_experience_section'>
            <div className='container'>
                <Heading title="Experience" />
                <div className="experience_content" data-cursor-type="none">
                    <div className="experience_accordion" ref={accordionRef}>
                        <span className="notification">Click to <br /> expand</span>
                        {experiences.map((experience, index) => (
                            <div className="accordion_item" key={index}>
                                <div className="header">
                                    <div className="left_box">
                                        <h2 className="title">{experience.position}</h2>
                                    </div>
                                    <div className="right_box">
                                        <h2 className="title">{experience.company}</h2>
                                        <h3 className="date">{experience.date}</h3>
                                    </div>
                                </div>
                                <div className="content_wrapper">
                                    <div
                                        className="content"
                                        dangerouslySetInnerHTML={{ __html: experience.description }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

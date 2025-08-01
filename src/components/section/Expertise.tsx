"use client"

import { useDevice } from '@/hooks/useDevice'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import { useRef } from 'react'
import SquareIcon from '../icons/SquareIcon'
import Heading from '../others/Heading'

gsap.registerPlugin(SplitText, ScrollTrigger)

const expertises = [
    {
        title: "Built for Shopify",
        description: "Apps that run sharp and scale smart—powered by Remix, GraphQL, and Polaris, developed with merchants in mind.",
    },
    {
        title: "Thinking in React(ive)",
        description: "Clean architecture. Scalable code. No clutter. Just smart, maintainable builds.",
    },
    {
        title: "Themes That Sell",
        description: "Built from scratch with performance and pixel-perfect precision. Fast-loading, clean designs that keep users hooked.",
    },
    {
        title: "Motion First",
        description: "From GSAP to Framer Motion, I turn static screens into responsive stories. Smooth, sharp, scroll-ready.",
    }
]

export default function Expertise() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const device = useDevice();

    useGSAP(() => {
        if (!sectionRef.current) return;
        const cards = sectionRef.current.querySelectorAll(".expertise_card");

        let topPoint;

        if (device === "mobile") {
            topPoint = "top top+=20"
        } else if (device === "tablet") {
            topPoint = "top top+=50"
        } else {
            topPoint = "top top+=200"
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: topPoint,
                toggleActions: "play none none none",
            }
        });

        cards.forEach((card) => {
            const icon = card.querySelector(".icon_box") as HTMLElement;
            const title = card.querySelector(".title") as HTMLElement;
            const textContent = card.querySelector(".text_content") as HTMLElement;

            const splitTitle = new SplitText(title, { type: "words, lines", linesClass: "overflow-hidden" });
            const splitText = new SplitText(textContent, { type: "words, lines", linesClass: "overflow-hidden" });

            tl.from(icon, {
                opacity: 0,
                scale: 0,
                duration: 0.5,
                ease: "power2.out",
            }, 0).from(splitTitle.words, {

                y: 100,
                rotate: 20,
                stagger: 0.2,
                duration: 1,
                ease: "power2.out",
            }, 0).from(splitText.words, {
                opacity: 0,
                y: 20,
                stagger: 0.05,
                duration: 0.5,
                ease: "power2.out",
            }, 0);

        });
    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} className='home_expertise_section'>
            <div className='container'>
                <Heading title="Core Skills" toggleActions="play none none none" />

                <div className="expertise_wrapper">
                    {expertises && expertises.map((expertise, index) => (
                        <div className="expertise_card" key={index}>
                            <div className="title_box">
                                <div className="icon_box">
                                    <SquareIcon />
                                </div>
                                <h3 className="title">{expertise.title}</h3>
                            </div>

                            <div className="text_content">
                                <p>{expertise.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

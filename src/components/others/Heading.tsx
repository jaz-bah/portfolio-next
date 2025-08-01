"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import Link from 'next/link';
import { useRef } from 'react';
import StarIcon from '../icons/StarIcon';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface Props {
    title: string;
    link?: string;
    toggleActions?: string;
}

export default function Heading({ title, link, toggleActions = "play none none reverse" }: Props) {
    const headingRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (headingRef.current) {
            const headingText = headingRef.current.querySelector('.heading');
            const star = headingRef.current.querySelector('.icon_box');

            const splitText = new SplitText(headingText, {
                type: "chars",
            });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top bottom-=200",
                    toggleActions: toggleActions,
                }
            })

            timeline.fromTo(star,
                {
                    opacity: 0,
                    x: 20,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "power2.out",
                }
            ).from(splitText.chars, {
                y: 100,
                stagger: 0.05,
                duration: 1,
                ease: "power2.out",
            })
        }
    }, { scope: headingRef })


    return (
        <div className="heading_box">
            <div ref={headingRef} className="left_box" data-cursor-type="heading">
                <div className="icon_box">
                    <StarIcon />
                </div>
                <h2 className="heading overflow-hidden">
                    {title}
                </h2>
            </div>

            {link && (
                <div className="right_box">
                    <Link href={link} className="link" data-cursor-type="link">View All</Link>
                </div>
            )}
        </div>
    )
}

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

            // link
            const link = headingRef.current.querySelector('.link');
            const first = link?.querySelector('.first') as HTMLElement;
            const second = link?.querySelector('.second') as HTMLElement;

            const firstSplit = new SplitText(first, {
                type: "chars",
            })
            const secondSplit = new SplitText(second, {
                type: "chars",
            })

            const animateChars = (y: number) => {
                const config = {
                    yPercent: y,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power2.out",
                };
                gsap.to(firstSplit.chars, config);
                gsap.to(secondSplit.chars, { ...config, yPercent: y * 1.2 }); 
            };

            link?.addEventListener('mouseenter', () => animateChars(-100));
            link?.addEventListener('mouseleave', () => animateChars(0));


        }
    }, { scope: headingRef })


    return (
        <div ref={headingRef} className="heading_box">
            <div className="left_box" data-cursor-type="heading">
                <div className="icon_box">
                    <StarIcon />
                </div>
                <h2 className="heading overflow-hidden">
                    {title}
                </h2>
            </div>

            {link && (
                <div className="right_box">
                    <Link href={link} className="link" data-cursor-type="link">
                        <span className="first">View All</span>
                        <span className="second">View All</span>
                    </Link>
                </div>
            )}
        </div>
    )
}

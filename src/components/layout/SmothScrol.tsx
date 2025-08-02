"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import React, { useState } from 'react';
import ScrollBar from './ScrollBar';
import { useDevice } from '@/hooks/useDevice';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


interface Props {
    children: React.ReactNode
}
export default function SmothScrol({ children }: Props) {
    const [scolledProgress, setScolledProgress] = useState(0);
    const device = useDevice();

    useGSAP(() => {
        ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.2,
            effects: true,
            onUpdate: (self) => {
                setScolledProgress(self.progress);
            }
        });
    });

    return (
        <>
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    {children}
                </div>
            </div>
            {device === "desktop" && (
                <ScrollBar scolledProgress={scolledProgress} />
            )}
        </>
    )
}

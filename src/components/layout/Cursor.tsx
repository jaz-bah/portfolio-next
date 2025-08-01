"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cursorType } from '@/helper/cursorType';

export default function Cursor() {
    const refBox = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const box = refBox.current;
        if (!box) return;

        const inner = box.querySelector('.inner_circle') as HTMLElement;
        const outer = box.querySelector('.outer_circle') as HTMLElement;

        const moveCursor = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            const type = cursorType(e.target as HTMLElement);

            const baseEase = 'power2.out';

            gsap.to(inner, {
                left: x,
                top: y,
                duration: 0.2,
                ease: baseEase,
            });

            gsap.to(outer, {
                left: x,
                top: y,
                delay: 0.1,
                duration: 0.2,
                ease: baseEase,
            });

            const typeStyles: Record<string, Partial<CSSStyleDeclaration> & { scale: never }> = {
                link: {
                    scale: 2 as never,
                },
                heading: {
                    scale: 5 as never,
                    backgroundColor: 'var(--c-accent-light)',
                    backdropFilter: 'invert(1)',
                },
                text: {
                    scale: 3 as never,
                    backgroundColor: 'var(--c-accent-light)',
                    backdropFilter: 'invert(1)',
                },
                none: {
                    scale: 2 as never,
                    opacity: "0"
                }
            };

            const outerConfig = {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: baseEase,
            };

            const innerConfig = {
                scale: 1,
                opacity: 1,
                backgroundColor: 'var(--c-accent)',
                backdropFilter: 'invert(0)',
                duration: 0.5,
                ease: baseEase,
            };

            if (type && typeStyles[type]) {
                if (type === 'link') {
                    gsap.to(outer, {
                        ...typeStyles.link,
                        duration: 1,
                        ease: baseEase,
                    });
                    gsap.to(inner, {
                        scale: 0.5,
                        duration: 1,
                        ease: baseEase,
                    });
                } else if (type === 'none'){
                    gsap.to(outer, {
                        ...typeStyles.none,
                        duration: 1,
                        ease: baseEase,
                    });

                    gsap.to(inner, {
                        scale: 0.5,
                        duration: 1,
                        ease: baseEase,
                    });
                } else {
                    gsap.to(outer, {
                        scale: 1.5,
                        opacity: 0,
                        duration: 1,
                        ease: baseEase,
                    });
                    gsap.to(inner, {
                        ...typeStyles[type],
                        duration: 1,
                        ease: baseEase,
                    });
                }
            } else {
                gsap.to(outer, outerConfig);
                gsap.to(inner, innerConfig);
            }
        };

        const clickCursor = () => {
            gsap.to(outer, {
                scale: 3,
                borderColor: 'var(--c-accent)',
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(outer, {
                        scale: 1,
                        borderColor: '#fff',
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out",
                    });
                }
            });
        }

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('click', clickCursor);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('click', clickCursor);
        };
    }, []);

    return (
        <div ref={refBox} className="cursor_wrapper">
            <div className="inner_circle" />
            <div className="outer_circle" />
        </div>
    );
}

"use client"
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from 'gsap/all'
import { useEffect, useRef, useState } from 'react'
import Button from '../others/Button'
import Heading from '../others/Heading'
import ImageShaderEffect from '../others/ImageShaderEffect'


export default function About() {
    const ref = useRef<HTMLDivElement>(null);
    const [isLoaded, setisLoaded] = useState(false);

    useGSAP(() => {
        if (ref.current) {
            const description = ref.current.querySelector('.description');
            const button = ref.current.querySelector('.button');
            const descriptionSplit = new SplitText(description, { type: 'lines' });
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top center',
                    end: 'top bottom',
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(descriptionSplit.lines, {
                opacity: 0,
                x: 50,
                stagger: 0.05,
                duration: 0.5,
                ease: 'power1.out',
            }).from(button, {
                opacity: 0,
                x: 50,
                duration: 0.5,
                ease: 'power1.out',
            })

        }
    }, { scope: ref })

    useEffect(() => {
        setTimeout(() => {
            setisLoaded(true);
        }, 1000);
    }, [])

    return (
        <section ref={ref} className='about_deatils_section'>
            <div className='container'>
                <div className='row g-5'>
                    <div className="col-12 col-md-6">
                        <div className="text_content">
                            <Heading title="About" />

                            <p className="description">
                                I’m JazBah, a frontend developer who treats the browser like a canvas.
                                I work in the space where clean code meets bold design—turning ideas
                                into smooth, responsive experiences using Next.js, Remix, React, and Shopify.
                                <br />
                                <br />
                                I build with intention—starting with structure, diving into logic,
                                and polishing with motion. Whether it’s translating Figma into code or wiring up APIs,
                                everything I touch is designed to feel fast and flow right.
                                <br />
                                <br />
                                I care about the craft. I code like it matters—because it does.
                                No shortcuts. No bloated fluff. Just honest work, thoughtful execution,
                                and projects that ship right.
                            </p>

                            <Button type='Link' url='/about'>Download CV</Button>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="img_content">
                            <div className='imgbox'>
                                {isLoaded && <ImageShaderEffect imageSrc="/static/images/about.png" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

"use client"
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from 'gsap/all';
import { useRef } from 'react';
import TextMarque from '../others/TextMarque';

const texts = [
    "Frontend Developer",
    "Shopify Theme & App Developer",
    "React Developer",
    "JavaScript Developer",
    "HTML & CSS Developer",
    "Node.js Developer",
    "MongoDB Developer",
    "SQL Developer",
    "PHP Developer",
    "Python Developer",
    "Java Developer",
    "C++ Developer",
    "C# Developer",
    "VB.NET Developer",
    "Swift Developer",
    "Objective-C Developer",
    "Ruby Developer",
    "Go Developer",
    "Rust Developer",
    "TypeScript Developer",
    "Kotlin Developer",
    "Scala Developer",
    "Perl Developer",
    "Haskell Developer",
    "Lua Developer",
    "Scheme Developer",
    "F# Developer",
    "Erlang Developer",
    "COBOL Developer",
    "Fortran Developer",
]

export default function MorphBanner() {
    const bannerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        if (bannerRef.current) {
            const heading = bannerRef.current.querySelector(".heading");
            const subheading = bannerRef.current.querySelector(".subheading");
            const profile = bannerRef.current.querySelector(".profile_image")
            const marqueOne = bannerRef.current.querySelector(".about_banner_marque.one");
            const marqueTow = bannerRef.current.querySelector(".about_banner_marque.tow");

            const headingSplit = new SplitText(heading, { type: "chars" });
            const subheadingSplit = new SplitText(subheading, { type: "lines" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: bannerRef.current,
                },
            });

            tl.from(headingSplit.chars, {
                x: 100,
                skewY: 40,
                opacity: 0,
                duration: 0.5,
                stagger: 0.02,
                ease: "circ.in"
            }).from(profile, {
                x: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power1.in"
            }, "<0.5").from(subheadingSplit.lines, {
                x: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: "power1.in"
            }).from(marqueOne, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.in"
            }).from(marqueTow, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.in"
            }, "<");
        }
    }, { scope: bannerRef })


    return (
        <section ref={bannerRef} className='about_banner_section'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className="col-12 col-md-6">
                        <div className="profile_image"></div>
                    </div>
                    <div className="col-12 col-md-6">
                        <h2 className="heading">
                            Hi... <br />
                            I&apos;m <span className="name">JazBah</span>
                        </h2>
                        <h3 className="subheading">Frontend Developer <br /> Shopify Theme & App Developer</h3>
                    </div>
                </div>
            </div>

            <div className="about_banner_marque_wrapper">
                <div className="about_banner_marque one">
                    <TextMarque texts={texts} speed={5000} />
                </div>
                <div className="about_banner_marque tow">
                    <TextMarque texts={texts} direction="right" speed={5000} />
                </div>
            </div>
        </section>
    )
}

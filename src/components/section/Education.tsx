"use client"
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from 'gsap/all';
import { useRef } from 'react';
import Heading from '../others/Heading';



const educations = [
    {
        name: "Bangladesh University (BU)",
        duration: "2023 – Present",
        subject: "BSc in Computer Science and Engineering",
        description: "Currently pursuing a Bachelor's in CSE with a focus on problem-solving, programming, and modern web technologies."
    },
    {
        name: "Rangpur Polytechnic Institute (RPI)",
        duration: "2019 – 2023",
        subject: "Diploma in Computer Science",
        description: "Completed a 4-year diploma in Computer Science, gaining hands-on experience in software development and system fundamentals."
    },
    {
        name: "PS Model High School",
        duration: "2018",
        subject: "Secondary School Certificate (SSC)",
        description: "Completed secondary education with a focus on science, laying the foundation for future studies in computing."
    }
];

export default function Education() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (sectionRef.current) {
            const row = sectionRef.current.querySelectorAll('.education_row');

            row.forEach((item) => {
                const bar = item.querySelector('.bar');
                const circle = item.querySelector('.circle');
                // const circleInner = item.querySelector('.circle_inner');
                const mainTitle = item.querySelector('.left_box .title');
                const subTitle = item.querySelector('.left_box .sub_title');
                const title = item.querySelector('.right_box .title');
                const description = item.querySelector('.right_box .description');

                const splitMainTitle = new SplitText(mainTitle, {
                    type: 'lines, words',
                    linesClass: "flex overflow-hidden"
                });

                const splitSubTitle = new SplitText(subTitle, {
                    type: 'lines, words',
                    linesClass: "flex overflow-hidden"
                });

                const splitTitle = new SplitText(title, {
                    type: 'lines, words',
                    linesClass: "flex overflow-hidden"
                });

                const splitDescription = new SplitText(description, {
                    type: 'lines',
                });



                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom-=200',
                        end: 'bottom bottom-=500',
                        scrub: 1,
                        toggleActions: 'play none none reverse'
                    }
                });

                tl.from(circle, {
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                    ease: 'bounce'
                }).from(splitMainTitle.words, {
                    y: 100,
                    stagger: 0.2,
                    duration: 1,
                    ease: 'power2.inOut'
                }).from(splitSubTitle.words, {
                    y: 100,
                    stagger: 0.2,
                    duration: 1,
                    ease: 'power2.inOut'
                }, "<").from(splitTitle.words, {
                    y: 100,
                    stagger: 0.2,
                    duration: 1,
                    ease: 'power2.inOut'
                }, "<").from(splitDescription.lines, {
                    x: 50,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: 'power2.inOut'
                }, "<").from(bar, {
                    height: 0,
                    duration: 1,
                    ease: 'power2.inOut'
                })
            })
        }
    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} className='about_education_section'>
            <div className='container'>
                <Heading title="Education" />

                <div className="education_content">
                    {educations && educations.map((education, index) => (
                        <div className="education_row" key={index}>
                            <div className="left_box">
                                <h2 className="title">{education.name}</h2>
                                <h3 className="sub_title">{education.duration}</h3>
                            </div>
                            <div className="right_box">
                                <h2 className="title">{education.subject}</h2>
                                <p className="description">{education.description}</p>

                                <span className="bar"></span>
                                <span className="circle"></span>
                                <span className="circle_inner"></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

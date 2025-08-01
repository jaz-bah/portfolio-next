"use client"

import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from 'gsap/all'
import Link from 'next/link'
import { useRef } from 'react'
import TextMarquee from '../others/TextMarque'

const texts = [
    'Front-End',
    'Back-End',
    'Full-Stack',
    'Shopify',
    'Wordpress',
    'App'
]

const socials = [
    {
        name: "Facebook",
        path: "https://www.facebook.com/"
    },
    {
        name: "Twitter",
        path: "https://twitter.com/"
    },
    {
        name: "Instagram",
        path: "https://www.instagram.com/"
    },
    {
        name: "Linkedin",
        path: "https://www.linkedin.com/"
    }
]

export default function Footer() {
    const headingRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (headingRef.current) {
            const headingSplit = new SplitText(headingRef.current, {
                type: "words,chars"
            });

            const tl = gsap.timeline({
                repeat: -1,
                repeatDelay: 0
            });

            tl.to(headingSplit.chars, {
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "sine.inOut", 
            }).to(headingSplit.chars, {
                opacity: 0.3,
                duration: 1,
                stagger: 0.2,
                ease: "sine.inOut", 
            }).to(headingSplit.chars, {
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "sine.inOut", 
            })

            tl.play();
        }
    }, { scope: headingRef })

    return (
        <footer className="footer_section">
            <div className="footer_marque_wrapper" data-cursor-type="heading">
                <TextMarquee texts={texts} direction='right' />
            </div>

            <div className="middle_content">
                <Link href={"/contact"}>
                    <h2 ref={headingRef} className="heading" data-cursor-type="link">LET’S TALK!</h2>
                </Link>

                <Link
                    className="mail"
                    href="mailto:jazbahulalam@gmail.com"
                    data-cursor-type="link"
                >
                    jazbahulalam@gmail.com
                </Link>
            </div>

            <div className="bottom_content">
                <p className="copyright">
                    © JazBah -
                    <span className="date">2023</span>
                    <Link className='ml-2 cursor-pointer' href={"/admin"} data-cursor-type="link">
                        Admin
                    </Link>
                </p>

                <ul className="social">
                    {socials && socials.map((social, index) => (
                        <li key={index} data-cursor-type="link">
                            <Link href={social.path}>
                                {social.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}

"use client"
import React, { useRef } from 'react'
import Heading from '../others/Heading'
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

export default function Contact() {
    const refBox = useRef<HTMLDivElement>(null);

    useGSAP(()=>{
        if(refBox.current){
            const bars = refBox.current.querySelectorAll('.bottom_bar');

            gsap.to(bars, {
                width: '100%',
                duration: 2,
                ease: 'power2.out',
            })
        }
    }, {scope: refBox})
    return (
        <section ref={refBox} className='contact_section'>
            <div className='container'>
                <div className='row'>
                    <div className="col-12 col-md-6">
                        <Heading title="Contact" />

                        <ul className="contact_list">
                            <li>
                                <div className="contact_icon">
                                    <Phone />
                                </div>
                                <div className="contact_text">
                                    <h4>Phone</h4>
                                    <p data-cursor-type="link">
                                        <Link href="tel:+8801712345678">+880 1712 345 678</Link>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="contact_icon">
                                    <Mail />
                                </div>
                                <div className="contact_text">
                                    <h4>Email</h4>
                                    <p data-cursor-type="link">
                                        <Link href="mailto:info@example.com">info@example.com</Link>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="contact_icon">
                                    <MapPin />
                                </div>
                                <div className="contact_text">
                                    <h4>Location</h4>
                                    <p>123 Main St, Anytown, USA</p>
                                </div>
                            </li>
                        </ul>

                        <ul className="social">
                            <li data-cursor-type="link">
                                <Link href="https://www.facebook.com/" target="_blank">
                                    <Facebook />
                                </Link>
                            </li>
                            <li data-cursor-type="link">
                                <Link href="https://www.twitter.com/" target="_blank">
                                    <Twitter />
                                </Link>
                            </li>
                            <li data-cursor-type="link">
                                <Link href="https://www.linkedin.com/" target="_blank">
                                    <Linkedin />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="contact_form">
                            <form action="">
                                <div className="input_wrapper">
                                    <input type="text" placeholder="Name" />
                                    <label htmlFor="name">Name</label>
                                    <div className="bottom_bar">
                                    </div>
                                </div>
                                <div className="input_wrapper">
                                    <input type="text" placeholder="Subject" />
                                    <label htmlFor="subject">Subject</label>
                                    <div className="bottom_bar">
                                    </div>
                                </div>
                                <div className="input_wrapper">
                                    <textarea name="" id="" cols={10} rows={10} placeholder="Message"></textarea>
                                    <label htmlFor="message">Message</label>
                                    <div className="bottom_bar">
                                    </div>
                                </div>
                                <button className='button' type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

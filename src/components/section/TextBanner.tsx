"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText, ScrambleTextPlugin } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrambleTextPlugin);

const texts = [
    {
        type: "text",
        value: "I'm",
    },
    {
        type: "text",
        value: "a",
    },
    {
        type: "image",
        value: "/static/images/banner-text-img-4.png",
    },
    {
        type: "text",
        value: "Front-End",
    },
    {
        type: "text",
        value: "Developer",
    },
    {
        type: "image",
        value: "/static/images/banner-text-img-3.png",
    },
    {
        type: "text",
        value: "Specialized",
    },
    {
        type: "text",
        value: "in",
    },
    {
        type: "text",
        value: "Shopify",
    },
    {
        type: "image",
        value: "/static/images/banner-text-img-2.png",
    },
    {
        type: "text",
        value: "Theme",
    },
    {
        type: "image",
        value: "/static/images/banner-text-img-1.png",
    },
    {
        type: "text",
        value: "&",
    },
    {
        type: "text",
        value: "App",
    },
    {
        type: "text",
        value: "Development",
    },
];

const brands = [
    "/static/images/next.png",
    "/static/images/remix.png",
    "/static/images/shopify.png",
];

export default function TextBanner() {
    const bannerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            if (bannerRef.current) {
                const bannerText = bannerRef.current.querySelector(".banner_text");
                const bannerTextImage =
                    bannerRef.current.querySelectorAll(".text_image");
                const brands = bannerRef.current.querySelectorAll(".brands .brand");
                const peragraphs = bannerRef.current.querySelectorAll(".text_content p span");

                const splitText = new SplitText(bannerText, {
                    type: "words",
                    charsClass: "text",
                });

                const bannerTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: bannerRef.current,
                    },
                });



                bannerTimeline
                    .from(splitText.words, {
                        duration: 1,
                        y: 100,
                        ease: "power4.out",
                        stagger: 0.1,
                    })
                    .fromTo(
                        bannerTextImage,
                        {
                            height: "0px",
                        },
                        {
                            height: "calc(100vw * var(--img-height-ratio))",
                            duration: 0.5,
                            ease: "power1.in",
                        },
                        "<0.5"
                    )
                    .fromTo(
                        brands,
                        {
                            x: 100,
                            opacity: 0,
                        },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 1,
                            ease: "power4.out",
                            stagger: 0.1,
                        },
                        "<0.5"
                    )

                const peragraphContents = ["Welcome", "to", "my", "world-", "where", "clean", "code", "meets", "creative", "flow."]

                peragraphs.forEach((pera, index) => {
                    gsap.to(pera, {
                        scrambleText: {
                            text: peragraphContents[index],
                            chars: "capitalize",
                            speed: 0.4,
                        },
                        duration: 2,
                    });
                })

            }
        },
        { scope: bannerRef }
    );

    return (
        <section ref={bannerRef} className="home_banner_section">
            <div className="background">
                <div className="overlay"></div>
                <video src="/static/videos/bg.mp4" autoPlay loop muted></video>
            </div>
            <div className="container">
                <div className="content_wrapper">
                    <div className="top_content">
                        <h2 className="banner_text" data-cursor-type="heading">
                            {texts &&
                                texts.map((text, index) =>
                                    text.type === "text" ? (
                                        <span key={index}>{text.value}</span>
                                    ) : (
                                        <span
                                            key={index}
                                            className="text_image"
                                            style={{ backgroundImage: `url(${text.value})` }}
                                        ></span>
                                    )
                                )}
                        </h2>
                    </div>

                    <div className="bottom_content">
                        <div className="brand_wrapper">
                            <div className="brands">
                                {brands.map((brand, index) => (
                                    <div key={index} className="brand">
                                        <div className="imgbox">
                                            <Image src={brand} alt="Brand" width={200} height={150} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text_content" data-cursor-type="text">
                                <p>
                                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

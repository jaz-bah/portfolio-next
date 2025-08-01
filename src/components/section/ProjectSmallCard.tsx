"use client"
import { Project } from '@/types/project.type';
import { ArrowUpRight, Code, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';




interface Props {
    project: Project
}

export default function ProjectSmallCard({ project }: Props) {
    const projectRef = useRef<HTMLDivElement>(null);
    const cleanedTags = project.tags.map(tag => tag.replace(/\./g, "").replace(/\s+/g, "_")).join(" ");



    useEffect(() => {
        if (projectRef.current) {
            const card = projectRef.current as HTMLDivElement;
            const moreContentWrapper = card.querySelector(".more_content_wrapper");
            const moreContent = card.querySelector(".more_content");

            card.addEventListener("mouseenter", () => {
                if (moreContentWrapper) {
                    (moreContentWrapper as HTMLElement).style.height = (moreContent as HTMLElement).offsetHeight + 20 + "px";
                }
            });

            card.addEventListener("mouseleave", () => {
                if (moreContentWrapper) {
                    (moreContentWrapper as HTMLElement).style.height = "0px";
                }
            });
        }
    }, []);

    return (
        <div className={`swiper-slide mix project_card ${cleanedTags} `} ref={projectRef}>
            <div className="button_box">
                <div className="content_wrapper">
                    <Link href={project.view_link} className="icon_box" data-toggle="tooltip" data-placement="top" title="View">
                        <Eye />
                    </Link>
                    <Link href={project.code_link} className="icon_box" data-toggle="tooltip" data-placement="top" title="Code">
                        <Code />
                    </Link>

                    <Link href={`/projects/${project.id} `} className="icon_box" data-toggle="tooltip" data-placement="top" title="Details">
                        <ArrowUpRight />
                    </Link>
                </div>
            </div>
            <div className="head">
                <div className="img_desk">
                    <div className="imgbox_full">
                        <Image src={project.desk_image} alt="image" width={500} height={500} />
                    </div>
                </div>

                <div className="img_tab">
                    <div className="imgbox_full">
                        <Image src={project.desk_image} alt="image" width={200} height={200} />
                    </div>
                </div>

                <div className="img_mobile">
                    <div className="imgbox_full">
                        <Image src={project.mobile_image} alt="image" width={400} height={400} />
                    </div>
                </div>
            </div>
            <div className="body">
                <h2 className="title">{project.title}</h2>

                <div className="more_content_wrapper">
                    <div className="more_content">
                        <p className="description">{project.description}</p>
                        <ul className="tags">
                            {project.tags && project.tags.map((tag, index) => <li key={index}>{tag}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

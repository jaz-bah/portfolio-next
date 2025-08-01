import Image from 'next/image'
import React from 'react'
import Button from '../others/Button'

interface Props {
    image: string,
    title: string,
    description: string,
    tags: string[],
    link: string
}

export default function ProjectBigCard({ image, title, description, tags, link }: Props) {
    return (
        <div className="project_card">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="imgbox">
                        <Image
                            src={image}
                            alt={title}
                            height={500}
                            width={500}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="content_wrapper">
                        <div className="top_content">
                            <h2 className="title">{title}</h2>

                            <p className="description">{description}</p>

                            <ul className="tags">
                                {tags && tags.map((tag, index) => <li key={index}>{tag}</li>)}
                            </ul>
                        </div>

                        <div className="bottom_content">
                            <Button type='Link' url={link}>View Project</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

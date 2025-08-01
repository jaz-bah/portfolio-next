import Link from 'next/link'
import React from 'react'

interface Props {
    type?: string,
    children: React.ReactNode,
    onClick?: () => void,
    url? : string
}

export default function Button({ children, type, onClick, url }: Props) {
    return (
        <>
            {type == "Link" ?
                <Link href={url ? url : "#"} className="button" data-cursor-type="link">{children}</Link> :
                <button className='button' onClick={onClick} data-cursor-type="link">{children}</button>
            }
        </>
    )
}

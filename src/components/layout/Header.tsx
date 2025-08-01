'use client'

import { useDevice } from '@/hooks/useDevice'
import { Code, Home, Mail, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const menus = [
    {
        title: "Home",
        path: "/",
        icon: <Home />
    },
    {
        title: "About",
        path: "/about",
        icon: <User />
    },
    {
        title: "Projects",
        path: "/projects",
        icon: <Code />
    },
    {
        title: "Contact",
        path: "/contact",
        icon: <Mail />
    }
]

export default function Header() {
    const device = useDevice();
    const pathname = usePathname();
    const navbar = useRef<HTMLElement | null>(null);
    const [scrollState, setScrollState] = useState<'top' | 'up' | 'down'>('top');

    useEffect(() => {
        const menuEl = navbar.current?.querySelector('.active');
        const menuPosition = (menuEl as HTMLElement)?.offsetLeft ?? 0;
        const selectorEl = navbar.current?.querySelector('.selector');
        if (!selectorEl) return;
        (selectorEl as HTMLElement).style.left = menuPosition + 'px';
    }, [pathname]);

    useEffect(() => {
        if (device === 'mobile') return;

        const navEl = navbar.current;
        if (!navEl) return;

        let scrollPosition = 0;

        const onScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll === 0) {
                setScrollState('top');
            } else if (currentScroll < scrollPosition) {
                setScrollState('up');
            } else {
                setScrollState('down');
            }
            scrollPosition = currentScroll;
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [device]);

    return (
        <nav
            className={`navbar_section ${scrollState == 'up' ? 'nav_sticky' : scrollState == 'down' ? 'nav_passed' : ''}`}
            ref={navbar}
        >
            <div className="menu_wrapper">
                <ul className="menu">
                    {menus && menus.map((menu, index) => (
                        <li
                            className={pathname === menu.path ? 'active' : undefined}
                            key={index}
                        >
                            <Link href={menu.path || "/"} data-cursor-type="link">
                                <span className="text">{menu.title}</span>
                                <span className="icon_box">
                                    {menu.icon}
                                </span>
                            </Link>
                        </li>
                    ))}
                    <span
                        className="selector"
                    >
                    </span>
                </ul>
            </div>
        </nav>
    )
}

import React from 'react';
import Header from './Header';
import SmothScrol from './SmothScrol';
import Footer from './Footer';
import Cursor from './Cursor';

interface Props {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
    return (
        <>
            <Header />
            <SmothScrol>
                <div id='mainContent'>
                    <main>
                        {children}
                    </main>
                    <Footer />
                </div>
            </SmothScrol>
            <Cursor />
        </>
    )
}

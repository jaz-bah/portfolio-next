"use client";
import React from "react";
import Header from "./Header";
import SmothScrol from "./SmothScrol";
import Footer from "./Footer";
import Cursor from "./Cursor";
import { useDevice } from "@/hooks/useDevice";

interface Props {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
    const device = useDevice();
    return (
        <div className="public_layout">
            <Header />
            <SmothScrol>
                <div id="mainContent">
                    <main>{children}</main>
                    <Footer />
                </div>
            </SmothScrol>
            {device === "desktop" && <Cursor />}
        </div>
    );
}

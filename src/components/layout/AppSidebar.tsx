"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import { Code, Home, HomeIcon, Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";

const items = [
    {
        title: "Home",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Projects",
        url: "/admin/projects",
        icon: Code,
    },
    {
        title: "Landing page",
        url: "/",
        icon: HomeIcon,
    }
];

export function AppSidebar() {
    const { state } = useSidebar();
    const [loggingOut, setLoggingOut] = useState(false);


    // handle logout
    const handleLogout = async () => {
        setLoggingOut(true);
        await signOut();
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b border-border w-full flex items-center justify-center h-15">
                <Link href="/admin">
                    <h1 className="text-2xl font-bold">{state === "collapsed" ? "A" : "Admin"}</h1>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="flex-1">
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarFooter className="border-t border-border">
                    <div className="flex flex-wrap align-center justify-between gap-2">
                        <Button variant="destructive" className="flex-1" size={state === "collapsed" ? "sm" : "default"} onClick={handleLogout}>
                            {loggingOut ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    {state === "collapsed" ? (
                                        <LogOut />
                                    ) : "Logout"}
                                </>
                            )}
                        </Button>
                        <SidebarTrigger size={state === "collapsed" ? "icon" : "default"} />
                    </div>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}
"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "next-themes"
import { usePathname } from "next/navigation"
import { Toaster } from "sonner"
import { AppSidebar } from "./AppSidebar"

interface Props {
    children: React.ReactNode
}
export default function AdminLayout({ children }: Props) {
    const pathName = usePathname();
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
        >
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full pb-5">
                    <div className="h-15 border-b border-border flex items-center justify-between px-4">
                        <p className="text-lg font-medium capitalize">
                            {pathName === "/admin" ? "Dashboard" : pathName?.split("/")[2]}
                        </p>
                    </div>
                    <div className="px-4">{children}</div>
                </main>
                <Toaster />
            </SidebarProvider>
        </ThemeProvider>
    )
}
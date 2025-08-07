"use client";

import { usePathname } from "next/navigation";
import AdminLayout from "./AdminLayout";
import Providers from "./Providers";
import PublicLayout from "./PublicLayout";


interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    const pathName = usePathname();
    return (
        <Providers>
            {pathName.includes("/admin") ? (

                <AdminLayout>{children}</AdminLayout>
            ) : (
                <>
                    {pathName.includes("sign") ? (
                        <>{children}</>
                    ) : (
                        <PublicLayout>{children}</PublicLayout>
                    )}
                </>
            )}
        </Providers>
    )
}

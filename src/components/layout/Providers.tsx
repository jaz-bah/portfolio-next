import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from "next-auth/react"
import React from 'react'

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider >
    )
}

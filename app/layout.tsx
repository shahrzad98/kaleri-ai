'use client'
import './../styles/main.scss';
import {UserProvider} from "@/UserContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode
}) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    })
    return (
        <html lang="en">
        <body>
        <QueryClientProvider client={queryClient}>
            <UserProvider>{children}</UserProvider>
        </QueryClientProvider>
        </body>
        </html>
    )
}
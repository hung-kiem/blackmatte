'use client'

import React from 'react'
import { SWRConfig } from 'swr/_internal'
import { fetcher } from '@/config/fetcher'
import useAuth from '@/hooks/useAuth'
import Header from '@/components/common/Layout/Header'
import Sidebar from '@/components/common/Layout/Sidebar'
import Footer from '@/components/common/Layout/Footer/Footer'

export default function SignedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { menuItems } = useAuth()

    if (!menuItems) return null

    return (
        <>
            <SWRConfig
                value={{
                    fetcher: (url) => fetcher(url, 'GET'),
                    dedupingInterval: 60000,
                    revalidateOnFocus: false,
                }}
            >
                <Header />
                <div className="flex flex-col">
                    <Sidebar />
                    {children}
                    <Footer />
                </div>
            </SWRConfig>
        </>
    )
}

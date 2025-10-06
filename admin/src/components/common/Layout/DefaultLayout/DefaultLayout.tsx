'use client'

import useColorMode from '@/hooks/useColorMode'
import useSidebar from '@/hooks/useSidebar'
import classNames from 'classnames'
import React, { ReactNode } from 'react'

export default function DefaultLayout({ children }: { children: ReactNode }) {
    const { collapsed } = useSidebar()
    const [theme] = useColorMode()
    return (
        <html lang="en">
            <body
                className={classNames('overflow-auto', {
                    'max-lg:overflow-hidden': collapsed,
                    dark: theme == 'dark',
                })}
            >
                <div className="min-h-screen dark:bg-boxdark-2 dark:text-bodydark">
                    {children}
                </div>
            </body>
        </html>
    )
}

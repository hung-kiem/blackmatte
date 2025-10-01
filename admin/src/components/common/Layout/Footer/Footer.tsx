'use client'

import React from 'react'
import classNames from 'classnames'
import useSidebar from '@/hooks/useSidebar'

export default function Footer() {
    const { collapsed } = useSidebar()

    return (
        <footer
            className={classNames(
                `fixed bottom-0 left-0 flex w-full items-center justify-center p-4 transition-all duration-300 ease-linear`,
                `bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none`,
                {
                    'ml-64 w-[calc(100%-16rem)]': !collapsed,
                    'ml-0 w-full': collapsed,
                }
            )}
        >
            <p>© VNPAY 2024 back-office template. All rights reserved.</p>
        </footer>
    )
}

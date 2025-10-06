'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useSidebar from '@/hooks/useSidebar'
import DarkModeSwitcher from './DarkModeSwitcher'
import DropdownUser from './DropdownUser'
import IconArrowWithTail from '@/components/common/icons/IconArrowWithTail'
import DropdownNotification from './DropdownNotification'

const Header: React.FC = () => {
    const { setIsSidebarCollapsed, collapsed } = useSidebar()

    const handleToggle = () => {
        setIsSidebarCollapsed((prev) => !prev)
    }

    return (
        <header className="sticky top-0 z-99999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-6 py-4 shadow-2">
                <div className="flex gap-4">
                    <Link href="/">
                        <Image
                            className="hidden dark:block"
                            width={100}
                            height={32}
                            src={'/images/logo/logo-light.svg'}
                            alt="Logo"
                            priority
                        />
                        <Image
                            className="dark:hidden"
                            src={'/images/logo/logo.svg'}
                            width={100}
                            height={32}
                            alt="Logo"
                            priority
                        />
                    </Link>
                    <button
                        onClick={handleToggle}
                        className="header-toggle-button block lg:block"
                        aria-controls="sidebar"
                    >
                        <IconArrowWithTail
                            direction={collapsed ? 'left' : 'right'}
                        />
                    </button>
                </div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <DarkModeSwitcher />
                        <DropdownNotification />
                        <DropdownUser />
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header

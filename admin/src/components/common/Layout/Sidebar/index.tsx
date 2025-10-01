'use client'

import React from 'react'
import SidebarItem from './SidebarItem'
import useSidebar from '@/hooks/useSidebar'
import useSessionStorage from '@/hooks/useSessionStorage'
import useAuth from '@/hooks/useAuth'
import classNames from 'classnames'
import ScopeWrapper from '@/components/common/ScopeWrapper'

const Sidebar: React.FC = () => {
    const [pageName, setPageName] = useSessionStorage('sidebar-page', 'home')
    const { collapsed } = useSidebar()
    const { menuItems } = useAuth()

    if (!menuItems) return null

    return (
        <aside
            className={classNames(
                `fixed left-0 top-20 z-999999 flex h-[calc(100vh-5rem)] w-70 flex-col bg-gray-2 duration-300 ease-linear dark:bg-boxdark lg:z-9999 lg:translate-x-0`,
                {
                    'w-0 -translate-x-full transform opacity-0': collapsed,
                    'w-64 translate-x-0 transform opacity-100': !collapsed,
                }
            )}
        >
            <div
                className={classNames(
                    `no-scrollbar flex h-full flex-col overflow-y-auto duration-300 ease-linear`
                )}
            >
                <nav className="px-2 py-2">
                    <ul className="mb-4 flex flex-col gap-1">
                        {menuItems.map((menuItem, menuIndex) => (
                            <ScopeWrapper
                                key={menuIndex}
                                scopes={menuItem?.scopes}
                            >
                                <SidebarItem
                                    item={menuItem}
                                    pageName={pageName}
                                    setPageName={setPageName}
                                />
                            </ScopeWrapper>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar

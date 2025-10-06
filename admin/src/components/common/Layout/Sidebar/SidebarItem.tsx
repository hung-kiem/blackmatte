import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SidebarDropdown from './SidebarDropdown'
import classNames from 'classnames'
import IconCollapseArrow from '@/components/common/icons/IconCollapseArrow'
import { MenuItems } from '@/types/auth'
import Icon from './Icon'

const SidebarWrapper = ({
    children,
    pageName,
    setPageName,
    item,
    isItemActive,
    onClick,
}: {
    children: ReactNode
    pageName: string
    setPageName: (pageName: string) => void
    item: MenuItems
    isItemActive: boolean
    onClick?: () => void
}) => {
    const handleClick = () => {
        const updatedPageName =
            pageName !== (item.label?.toLowerCase() ?? '')
                ? (item.label?.toLowerCase() ?? '')
                : ''
        setPageName(updatedPageName)
        if (onClick) onClick()
    }

    if (item.route)
        return (
            <Link
                href={item.route}
                onClick={handleClick}
                className={classNames(
                    'unselectable group relative flex items-center space-x-1 rounded-sm px-4 py-2 text-sm font-medium',
                    'text-graydark duration-300 ease-in-out hover:bg-secondary',
                    'hover:text-white dark:text-white dark:hover:bg-secondary max-lg:gap-2.5',
                    {
                        'bg-primary !text-white dark:bg-meta-4': isItemActive,
                    }
                )}
            >
                {children}
                {item.children && (
                    <IconCollapseArrow
                        direction={
                            pageName === (item.label?.toLowerCase() ?? '')
                                ? 'up'
                                : 'down'
                        }
                        customClass="ml-auto"
                    />
                )}
            </Link>
        )

    return (
        <div
            onClick={handleClick}
            className={classNames(
                'unselectable group relative flex items-center rounded-sm px-4 py-2 text-sm font-medium',
                'text-graydark duration-300 ease-in-out hover:bg-secondary',
                'hover:text-white dark:text-white dark:hover:bg-secondary max-lg:gap-2.5',
                {
                    'bg-primary !text-white dark:bg-meta-4': isItemActive,
                }
            )}
            role={'button'}
        >
            {children}
            {item.children && (
                <IconCollapseArrow
                    direction={
                        pageName === (item.label?.toLowerCase() ?? '')
                            ? 'up'
                            : 'down'
                    }
                    customClass="ml-auto"
                />
            )}
        </div>
    )
}

const SidebarItem = ({
    item,
    pageName,
    setPageName,
}: {
    item: MenuItems
    pageName: string
    setPageName: (pageName: string) => void
}) => {
    const pathname = usePathname()
    const [expanded, setExpanded] = useState(false)

    const isActive = (item: MenuItems): boolean => {
        if (item.route === pathname) return true
        if (item.children) {
            return item.children.some((child: MenuItems) => isActive(child))
        }
        return false
    }

    const isItemActive = isActive(item)

    useEffect(() => {
        if (isItemActive) {
            setExpanded(true)
        }
    }, [isItemActive])

    const toggleDropdown = () => {
        setExpanded(!expanded)
    }

    return (
        <>
            <li className="group relative">
                <SidebarWrapper
                    item={item}
                    setPageName={setPageName}
                    pageName={pageName}
                    isItemActive={isItemActive}
                    onClick={toggleDropdown}
                >
                    <Icon name={item.icon} />
                    <div
                        className={classNames(
                            'ml-1 flex h-full w-auto items-center justify-center text-center opacity-100'
                        )}
                    >
                        {item.label}
                    </div>
                </SidebarWrapper>
                {item.children && (
                    <div
                        className={classNames('translate ml-6 transform', {
                            hidden: !expanded,
                        })}
                    >
                        <SidebarDropdown
                            item={item.children}
                            pageName={pageName}
                            setPageName={setPageName}
                            parentLabel={item.label}
                        />
                    </div>
                )}
            </li>
        </>
    )
}

export default SidebarItem

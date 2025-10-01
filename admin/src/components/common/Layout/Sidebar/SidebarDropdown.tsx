import classNames from 'classnames'
import { Fragment, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MenuItems } from '@/types/auth'

export const SidebarWrapper = ({
    children,
    setPageName,
    item,
    isChild,
    parentLabel,
}: {
    children: ReactNode
    setPageName: (pageName: string) => void
    item: MenuItems
    isChild?: boolean
    parentLabel?: string
}) => {
    const handleClick = () => {
        return setPageName(parentLabel || '')
    }

    const pathname = usePathname()

    const isActive = (item: MenuItems): boolean => {
        if (item.route === pathname) return true
        if (item.children) {
            return item.children.some((child: MenuItems) => isActive(child))
        }
        return false
    }

    const isItemActive = isActive(item)

    if (item.route)
        return (
            <Link
                href={item.route}
                onClick={handleClick}
                className={classNames(
                    'unselectable group relative flex h-10 items-center rounded-sm border-b-2 border-l-2 border-dashed border-bodydark py-2 pr-4 text-sm font-medium',
                    'text-graydark duration-300 ease-in-out hover:bg-secondary',
                    'hover:text-white dark:text-white dark:hover:bg-secondary max-lg:gap-2.5',
                    {
                        'font-semibold text-primary dark:bg-meta-4 dark:text-blue-300':
                            isItemActive,
                    },
                    isChild ? 'pl-10' : ''
                )}
            >
                {children}
            </Link>
        )

    return (
        <div
            onClick={handleClick}
            className={classNames(
                'unselectable group relative flex h-10 items-center rounded-sm border-b-2 border-l-2 border-dashed border-bodydark py-2 pr-4 text-sm font-medium',
                'text-graydark duration-300 ease-in-out hover:bg-secondary',
                'hover:text-white dark:text-white dark:hover:bg-secondary max-lg:gap-2.5',
                {
                    'font-semibold text-primary dark:bg-meta-4 dark:text-blue-300':
                        isItemActive,
                },
                isChild ? 'pl-10' : ''
            )}
            role={'button'}
        >
            {children}
        </div>
    )
}

function SidebarDropdown({
    item,
    pageName,
    setPageName,
    isChild,
    parentLabel,
}: {
    item: MenuItems[]
    pageName: string
    setPageName: (pageName: string) => void
    isChild?: boolean
    parentLabel?: string
}) {
    return (
        <>
            <ul className={classNames('relative flex flex-col gap-0')}>
                {item.map((menuItem: MenuItems, index: number) => {
                    return (
                        <Fragment key={index}>
                            <SidebarWrapper
                                item={menuItem}
                                setPageName={setPageName}
                                isChild={isChild}
                                parentLabel={parentLabel}
                            >
                                {!isChild && (
                                    <div className="mr-1 h-0.5 w-4 border-t border-dashed border-bodydark"></div>
                                )}
                                <div
                                    className={classNames('w-auto opacity-100')}
                                >
                                    {menuItem.label}
                                </div>
                            </SidebarWrapper>
                            {menuItem.children && (
                                <SidebarDropdown
                                    item={menuItem.children}
                                    pageName={pageName}
                                    setPageName={setPageName}
                                    isChild={menuItem.children ? true : false}
                                />
                            )}
                        </Fragment>
                    )
                })}
            </ul>
        </>
    )
}

export default SidebarDropdown

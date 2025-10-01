import { MenuItems } from '@/types/auth'

export const isActive = (item: MenuItems, pathname: string): boolean => {
    if (item.route === pathname) return true
    if (item.children) {
        return item.children.some((child: MenuItems) => isActive(child, ''))
    }
    return false
}

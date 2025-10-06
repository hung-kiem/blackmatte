import { create } from 'zustand'

const useSidebar = create<{
    collapsed: boolean
    setIsSidebarCollapsed: (
        state: boolean | ((prev: boolean) => boolean)
    ) => void
}>((set) => ({
    collapsed: false,
    setIsSidebarCollapsed: (state) =>
        set((prevState) => ({
            collapsed:
                typeof state === 'function'
                    ? state(prevState.collapsed)
                    : state,
        })),
}))

export default useSidebar

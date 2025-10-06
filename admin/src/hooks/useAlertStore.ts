import { create } from 'zustand'

interface Alert {
    id: string
    type: 'warning' | 'success' | 'error'
    message: string
    title: string
}

interface AlertState {
    alerts: Alert[]
    showAlert: (
        type: 'success' | 'error' | 'warning',
        message: string,
        title: string
    ) => void
    hideAlert: (id: string) => void
}

export const useAlertStore = create<AlertState>((set) => ({
    alerts: [],
    showAlert: (type, message, title) =>
        set((state) => ({
            alerts: [
                ...state.alerts,
                { id: Date.now().toString(), type, message, title },
            ],
        })),
    hideAlert: (id) =>
        set((state) => ({
            alerts: state.alerts.filter((alert) => alert.id !== id),
        })),
}))

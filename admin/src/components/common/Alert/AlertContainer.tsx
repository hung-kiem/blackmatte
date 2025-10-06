import { useEffect } from 'react'
import Alert from './Alert'
import { useAlertStore } from '@/hooks/useAlertStore'

const AlertContainer = () => {
    const { alerts, hideAlert } = useAlertStore()

    useEffect(() => {
        if (alerts.length > 0) {
            const timers = alerts.map((alert) =>
                setTimeout(() => {
                    hideAlert(alert.id)
                }, 3000)
            )

            return () => {
                timers.forEach((timer) => clearTimeout(timer))
            }
        }
    }, [alerts, hideAlert])

    return (
        <div className="fixed right-8 top-25 z-[9999] flex flex-col gap-4">
            {alerts.map((alert, index) => (
                <div
                    key={alert.id}
                    className={`transform transition-transform duration-500 ease-in-out ${
                        alert ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                >
                    <Alert
                        type={alert.type}
                        title={alert.title}
                        message={alert.message}
                        onHide={() => hideAlert(alert.id)}
                    />
                </div>
            ))}
        </div>
    )
}

export default AlertContainer

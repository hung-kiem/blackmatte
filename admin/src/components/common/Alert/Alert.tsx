import React, { useEffect } from 'react'
import IconSuccess from '../icons/IconSuccess'
import IconWarning from '../icons/IconWarning'
import IconError from '../icons/IconError'

interface AlertProps {
    type: 'warning' | 'success' | 'error'
    title: string
    message: string
    onHide: () => void
}

const Alert: React.FC<AlertProps> = ({ type, title, message, onHide }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onHide()
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [onHide])

    const getAlertConfig = () => {
        switch (type) {
            case 'warning':
                return {
                    borderColor: 'border-warning',
                    bgColor: 'bg-warning',
                    progressColor: 'bg-yellow-500',
                    Icon: IconWarning,
                }
            case 'success':
                return {
                    borderColor: 'border-success',
                    bgColor: 'bg-success',
                    progressColor: 'bg-green-500',
                    Icon: IconSuccess,
                }
            case 'error':
                return {
                    borderColor: 'border-danger',
                    bgColor: 'bg-danger',
                    progressColor: 'bg-red-500',
                    Icon: IconError,
                }
            default:
                return null
        }
    }

    const config = getAlertConfig()

    if (!config) return null

    const { borderColor, bgColor, progressColor, Icon } = config

    return (
        <div
            className={`flex w-[300px] border-l-4 ${borderColor} ${bgColor} rounded-md px-4 py-3 shadow-md`}
        >
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full">
                <Icon />
            </div>
            <div className="w-full">
                <h5 className="mb-1 text-base font-semibold text-white">
                    {title}
                </h5>
                <p className="text-sm leading-snug text-white">{message}</p>
                <div className="bg-gray-600 relative mt-3 h-1 w-full overflow-hidden rounded-full">
                    <div
                        className={`h-1 ${progressColor} animate-progress`}
                        style={{ animationDuration: '3s' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Alert

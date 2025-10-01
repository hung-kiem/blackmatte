import React, { ReactNode, useEffect, useState } from 'react'
import classNames from 'classnames'
import { closeModal } from '.'

interface ModalProps {
    children: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'full' | true
    md?: '1/4' | '1/2' | '3/4' | 'full' | true
    lg?: '1/4' | '1/2' | '3/4' | 'full' | true
    xl?: '1/4' | '1/2' | '3/4' | 'full' | true
}

export default function Modal({
    children,
    size = 'full',
    xl = '1/4',
    lg = '1/2',
    md = '3/4',
}: ModalProps) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal()
            }
        }
        setTimeout(() => {
            setReady(true)
        }, 10)
        document.addEventListener('keydown', handleEscape)
        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [])

    return (
        <div
            className={classNames(
                'fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 ease-in-out',
                {
                    'opacity-0': !ready,
                    'opacity-100': ready,
                }
            )}
            onClick={closeModal}
        >
            <div
                className={classNames(
                    'relative rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark',
                    {
                        'w-1/4': size == 'sm',
                        'w-3/4': size == 'lg',
                        'w-1/2': size == 'md',
                        'w-11/12': size == 'full' || size == true,
                        'md:w-1/4': md == '1/4',
                        'md:w-1/2': md == '1/2',
                        'md:w-3/4': md == '3/4',
                        'md:w-11/12': md == 'full' || md == true,
                        'lg:w-1/4': lg == '1/4',
                        'lg:w-1/2': lg == '1/2',
                        'lg:w-3/4': lg == '3/4',
                        'lg:w-11/12': lg == 'full' || lg == true,
                        'xl:w-1/4': xl == '1/4',
                        'xl:w-1/2': xl == '1/2',
                        'xl:w-3/4': xl == '3/4',
                        'xl:w-11/12': xl == 'full' || xl == true,
                    }
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="text-gray-600 hover:text-gray-900 absolute right-4 top-2"
                    onClick={closeModal}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}

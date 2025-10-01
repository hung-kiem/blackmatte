'use client'

import Link from 'next/link'
import { FC, ReactNode } from 'react'
import classNames from 'classnames'

interface ButtonProps {
    type?:
        | 'primary'
        | 'secondary'
        | 'black'
        | 'outline'
        | 'outline-secondary'
        | 'outline-black'
    size?: 'small' | 'medium' | 'large'
    icon?: ReactNode
    href?: string
    onClick?: () => void
    children: ReactNode
    className?: string
    htmlType?: 'button' | 'submit' | 'reset'
}

const Button: FC<ButtonProps> = ({
    type = 'black',
    size = 'small',
    icon,
    href,
    onClick,
    children,
    className,
    htmlType = 'button',
}) => {
    const buttonClasses = classNames(
        className,
        'inline-flex items-center justify-center whitespace-nowrap border text-center font-medium transition hover:bg-opacity-90',
        {
            'border-primary bg-primary text-white': type === 'primary',
            'border-primary text-primary hover:bg-primary hover:text-white':
                type === 'outline',
            'border-secondary bg-secondary text-white': type === 'secondary',
            'border-secondary text-secondary hover:bg-secondary hover:text-white':
                type === 'outline-secondary',
            'border-black bg-black text-white hover:bg-[rgb(46,50,54)] dark:border-white dark:hover:bg-[rgb(21,22,23)]':
                !type || type === 'black',
            'border-black text-black hover:bg-black hover:text-white dark:border-whiten dark:text-whiten':
                type === 'outline-black',

            'h-[36px] px-4 text-sm': size === 'small',
            'text-md h-[42px] px-6': size === 'medium',
            'h-[56px] px-8 text-lg': !size || size === 'large',

            'rounded-full': size === 'large',
            'rounded-lg': size !== 'large',
        }
    )

    if (href) {
        return (
            <Link href={href} className={buttonClasses} onClick={onClick}>
                {icon && <span className="mr-2">{icon}</span>}
                {children}
            </Link>
        )
    }

    return (
        <button type={htmlType} className={buttonClasses} onClick={onClick}>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    )
}

export default Button

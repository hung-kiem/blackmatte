'use client'
import React from 'react'

type InputDetailProps = {
    label: string
    value: React.ReactNode
    color?: 'red' | 'blue' | 'normal'
}

const InputDetail: React.FC<InputDetailProps> = ({
    label,
    value,
    color = 'normal',
}) => {
    let valueClassName = 'text-black dark:text-white'
    if (color === 'red') {
        valueClassName = 'text-red dark:text-red'
    } else if (color === 'blue') {
        valueClassName = 'text-blue-600 dark:text-blue-400'
    }

    return (
        <>
            <div className="flex">
                <label className="basis-2/5 text-sm text-neutral-600 dark:text-white">
                    {label}:
                </label>
                <div
                    className={`basis-3/5 text-sm font-semibold ${valueClassName}`}
                >
                    {value || '-'}
                </div>
            </div>
        </>
    )
}

export default InputDetail

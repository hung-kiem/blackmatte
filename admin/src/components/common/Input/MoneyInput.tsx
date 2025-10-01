import React, { forwardRef, useEffect, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import FieldInput from './FieldInput'

type MoneyInputProps = {
    name: string
    label?: string
    labelPosition?: 'horizontal' | 'vertical'
    errorMessage?: string
    field: UseFormRegisterReturn
    currentValue: string
    locale?: string
    currency?: string
    maxLength?: number
}

const formatMoney = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ''))
    if (isNaN(num)) return ''
    return num.toLocaleString('en-US')
}

const parseMoney = (value: string) => {
    return value.replace(/,/g, '')
}

const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(
    (
        {
            name,
            label,
            labelPosition,
            errorMessage,
            field,
            currentValue,
            maxLength = 12,
        },
        ref
    ) => {
        const [formattedValue, setFormattedValue] = useState<string>(
            formatMoney(currentValue || '')
        )

        useEffect(() => {
            setFormattedValue(formatMoney(currentValue || ''))
        }, [currentValue])

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value
            const parsedValue = parseMoney(inputValue)
            if (parsedValue.length > maxLength) {
                return
            }

            setFormattedValue(formatMoney(parsedValue))
            field.onChange({
                ...e,
                target: {
                    ...e.target,
                    value: parsedValue,
                },
            })
        }

        return (
            <FieldInput
                name={name}
                label={label}
                labelPosition={labelPosition}
                errorMessage={errorMessage}
                ref={(node) => {
                    if (typeof field.ref === 'function') field.ref(node)
                    if (typeof ref === 'function') ref(node)
                }}
                value={formattedValue}
                onChange={handleChange}
                onBlur={field.onBlur}
                type="text"
                placeholder="Nhập số tiền"
            />
        )
    }
)

MoneyInput.displayName = 'MoneyInput'

export default MoneyInput

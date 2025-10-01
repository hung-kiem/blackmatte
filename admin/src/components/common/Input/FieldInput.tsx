import React, { forwardRef, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { UseFormRegisterReturn } from 'react-hook-form'

type FieldInputProps = {
    name: string
    label?: string
    labelPosition?: 'horizontal' | 'vertical'
    errorMessage?: string
    field?: UseFormRegisterReturn
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>

const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(
    (
        {
            type = 'text',
            name,
            placeholder = '',
            disabled = false,
            maxLength,
            className = '',
            label = '',
            labelPosition = 'horizontal',
            errorMessage = '',
            field,
            ...rest
        },
        ref
    ) => {
        const inputClasses = classNames(
            'w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black dark:text-white outline-none transition',
            {
                'border-stroke focus:border-primary': !errorMessage,
                'border-red focus:border-red-500': !!errorMessage,
                'disabled:cursor-default disabled:bg-gray-100': disabled,
            },
            className
        )

        const labelClasses = classNames(
            'block text-sm font-medium text-black dark:text-white',
            {
                'mb-3 ': labelPosition === 'vertical',
                'mr-3  inline-block': labelPosition === 'horizontal',
            }
        )

        return (
            <div
                className={classNames('flex', {
                    'flex-col': labelPosition === 'vertical',
                    'items-end space-x-3': labelPosition === 'horizontal',
                })}
            >
                {label && (
                    <label htmlFor={name} className={labelClasses}>
                        {label}
                    </label>
                )}
                <div className="w-full">
                    <input
                        id={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}
                        maxLength={maxLength}
                        className={inputClasses}
                        ref={field?.ref || ref}
                        {...field}
                        {...rest}
                    />
                    {errorMessage && (
                        <p className="mt-1 text-sm text-red">{errorMessage}</p>
                    )}
                </div>
            </div>
        )
    }
)

FieldInput.displayName = 'FieldInput'

export default FieldInput

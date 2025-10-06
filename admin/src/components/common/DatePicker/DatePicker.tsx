import useFlatpickr from '@/hooks/useFlatpickr'
import React, { useRef } from 'react'
import IconCalendar from '../icons/IconCalendar'
import classNames from 'classnames'

type DatePickerProps = {
    onDateChange?: (dates: string | [string, string]) => void
    placeholder?: string
    value?: string | [string, string]
    minDate?: string
    maxDate?: string
    title?: string
    mode?: 'single' | 'range'
}

const DatePicker = ({
    onDateChange,
    placeholder = 'dd/MM/yyyy',
    value,
    minDate,
    maxDate,
    title,
    mode = 'single',
}: DatePickerProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useFlatpickr(inputRef, {
        onDateChange,
        value,
        minDate,
        maxDate,
        mode,
        dateFormat: 'dd/MM/yyyy',
    })

    return (
        <div>
            {title && (
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {title}
                </label>
            )}
            <div className="relative">
                <input
                    ref={inputRef}
                    className={classNames(
                        'form-datepicker w-full cursor-pointer rounded-lg bg-transparent px-5 py-3 font-normal outline-none transition',
                        'text-black dark:text-white',
                        'border-[1.5px] border-stroke focus:border-primary active:border-primary dark:border-form-strokedark',
                        'dark:bg-form-input dark:focus:border-primary'
                    )}
                    placeholder={
                        mode === 'range'
                            ? 'dd/MM/yyyy ~ dd/MM/yyyy'
                            : placeholder
                    }
                    data-class="flatpickr-right"
                    readOnly
                />

                <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                    <IconCalendar />
                </div>
            </div>
        </div>
    )
}

export default DatePicker

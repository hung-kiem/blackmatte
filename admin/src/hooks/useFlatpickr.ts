import flatpickr from 'flatpickr'
import { useEffect } from 'react'
import { parse, format } from 'date-fns'

type FlatpickrOptions = {
    onDateChange?: (dates: string | [string, string]) => void
    value?: string | [string, string]
    minDate?: string
    maxDate?: string
    dateFormat?: string
    mode?: 'single' | 'range'
}

const useFlatpickr = (
    inputRef: React.RefObject<HTMLInputElement>,
    {
        onDateChange,
        value,
        minDate,
        maxDate,
        dateFormat = 'dd/MM/yyyy',
        mode = 'single',
    }: FlatpickrOptions
) => {
    useEffect(() => {
        if (inputRef.current) {
            const parsedMinDate = minDate
                ? parse(minDate, dateFormat, new Date())
                : undefined
            const parsedMaxDate = maxDate
                ? parse(maxDate, dateFormat, new Date())
                : undefined

            const instance = flatpickr(inputRef.current, {
                dateFormat: 'Y-m-d', // Giữ format mặc định cho xử lý
                altInput: true,
                altFormat: 'd/m/Y', // Hiển thị ngày dưới dạng dd/MM/yyyy
                mode,
                minDate: parsedMinDate,
                maxDate: parsedMaxDate,
                defaultDate: value
                    ? Array.isArray(value)
                        ? value.map((v) => parse(v, dateFormat, new Date()))
                        : parse(value, dateFormat, new Date())
                    : undefined,
                locale: {
                    ...flatpickr.l10ns.default,
                    rangeSeparator: ' ~ ', // Thay đổi chữ "to" thành "~"
                },
                onChange: (selectedDates) => {
                    if (mode === 'range' && selectedDates.length === 2) {
                        const formattedRange: [string, string] = [
                            format(selectedDates[0], 'dd/MM/yyyy'),
                            format(selectedDates[1], 'dd/MM/yyyy'),
                        ]
                        onDateChange?.(formattedRange)
                    } else if (
                        mode === 'single' &&
                        selectedDates.length === 1
                    ) {
                        onDateChange?.(format(selectedDates[0], 'dd/MM/yyyy'))
                    }
                },
            })

            return () => instance.destroy()
        }
    }, [inputRef, onDateChange, value, minDate, maxDate, dateFormat, mode])
}

export default useFlatpickr

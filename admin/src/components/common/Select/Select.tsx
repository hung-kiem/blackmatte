'use client'

import ClickOutside from '@/components/ClickOutside'
import React, { useState, useEffect } from 'react'

export interface Option {
    value: string
    label: string
}

interface SelectProps {
    label: string
    options: Option[]
    value: string
    title: string
    onSelect?: (value: string) => void
    isLive?: boolean
}

const Select = ({
    label,
    options,
    value: propValue = '',
    title = 'Chọn',
    onSelect,
    isLive = false,
}: SelectProps) => {
    const [value, setValue] = useState<string>(propValue)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    useEffect(() => {
        const filtered = options.filter((option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredOptions(filtered)
    }, [searchTerm, options])

    const handleSelectOption = (selectedValue: string) => {
        setValue(selectedValue)
        setIsDropdownOpen(false)
        if (onSelect) {
            onSelect(selectedValue)
        }
    }

    return (
        <ClickOutside onClick={() => setIsDropdownOpen(false)}>
            <div className="relative">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {label}
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                    <div
                        className={`relative h-[42px] w-full cursor-pointer appearance-none rounded-lg border border-stroke bg-transparent px-4 py-2 outline-none ${
                            value ? 'text-black dark:text-white' : ''
                        } text-sm`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {value || value === '' ? (
                            options.find((option) => option.value === value)
                                ?.label
                        ) : (
                            <span className="text-sm text-body dark:text-bodydark">
                                {title}
                            </span>
                        )}
                        <div className="absolute right-4 top-1/2 z-30 flex w-8 -translate-y-1/2 items-center py-1 pl-1 pr-1">
                            <button
                                type="button"
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g opacity="0.8">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                            fill="#637381"
                                        ></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-stroke bg-white shadow-lg dark:border-form-strokedark dark:bg-form-input">
                            {isLive && (
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="h-[42px] w-full border-b border-stroke px-4 py-2 text-sm dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                />
                            )}

                            <ul className="max-h-60 overflow-auto">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((option) => (
                                        <li
                                            key={option.value}
                                            onClick={() =>
                                                handleSelectOption(option.value)
                                            }
                                            className="hover:bg-gray-100 dark:hover:bg-dark-hover cursor-pointer px-4 py-2 text-sm"
                                        >
                                            {option.label}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-sm text-body dark:text-bodydark">
                                        Không tìm thấy kết quả
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </ClickOutside>
    )
}

export default Select

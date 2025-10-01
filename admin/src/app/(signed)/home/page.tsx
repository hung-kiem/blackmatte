'use client'

import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Buttons/Button'
import FieldInput from '@/components/common/Input/FieldInput'
import MoneyInput from '@/components/common/Input/MoneyInput'
import React, { useEffect, useState } from 'react'
import { format, subDays, subMonths } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'
import DatePicker from '@/components/common/DatePicker/DatePicker'
import Switcher from '@/components/common/Switcher/Switcher'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import TextArea from '@/components/common/TextArea/TextArea'
import { UserRow } from '@/types/user'
import UserTable from './UserTable'

type FormData = {
    name: string
    age: number
    email: string
    phone: string
    transactionId: string
    amount: string
    ticketDate: string
    fromDate: string
    toDate: string
    toggle: boolean
    checkBox: boolean
    textarea: string
}

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [totalCount, setTotalCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState<UserRow[]>([])

    const {
        register,
        handleSubmit,
        setFocus,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm<FormData>()

    const fromDate = watch(
        'fromDate',
        format(subDays(new Date(), 7), 'dd/MM/yyyy')
    )
    const toDate = watch('toDate', format(new Date(), 'dd/MM/yyyy'))
    const currentAmount = watch('amount', '')

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('>>>>>>>>> submit data: ', data)
    }

    useEffect(() => {
        const errorFields = Object.keys(errors)
        if (errorFields.length > 0) {
            setFocus(errorFields[0] as keyof FormData)
        }
    }, [errors, setFocus])

    const handleExportExcel = () => {
        console.log('Exporting excel...')
    }

    const handleOnChangePage = (pageNo: number) => {
        setCurrentPage(pageNo)
    }

    const handleOnChangeRowsPerPage = (pageSize: number) => {
        setPageSize(pageSize)
        setCurrentPage(1)
    }

    const handleViewDetail = (id: number) => {
        console.log('View detail: ', id)
    }

    return (
        <>
            <Breadcrumb breadcrumbs={[{ label: 'Home', href: '/home' }]} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 flex flex-col gap-4 rounded-lg bg-white p-4 dark:bg-black">
                    <div className="grid grow grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <FieldInput
                            name="name"
                            type="text"
                            label="Tên"
                            placeholder="Nhập tên của bạn"
                            labelPosition="vertical"
                            field={register('name')}
                            errorMessage={errors.name?.message}
                        />
                        <FieldInput
                            name="age"
                            type="number"
                            label="Tuổi"
                            placeholder="Nhập tuổi của bạn"
                            labelPosition="vertical"
                            field={register('age')}
                            errorMessage={errors.age?.message}
                        />
                        <MoneyInput
                            name="amount"
                            label="Số tiền"
                            labelPosition="vertical"
                            field={register('amount')}
                            currentValue={currentAmount}
                            errorMessage={errors.amount?.message}
                        />
                        <DatePicker
                            title="Range date"
                            placeholder="dd/MM/yyyy - dd/MM/yyyy"
                            mode="range"
                            value={[fromDate, toDate]}
                            minDate={format(
                                subMonths(new Date(), 6),
                                'dd/MM/yyyy'
                            )}
                            maxDate={format(new Date(), 'dd/MM/yyyy')}
                            onDateChange={(dates) => {
                                if (Array.isArray(dates)) {
                                    setValue('fromDate', dates[0])
                                    setValue('toDate', dates[1])
                                }
                            }}
                        />
                        <Switcher
                            name="toggle"
                            control={control}
                            label="Enable Feature"
                            labelPosition="horizontal"
                        />
                        <Checkbox
                            name="checkBox"
                            control={control}
                            label="Check me"
                        />
                        <TextArea
                            name="textarea"
                            control={control}
                            label="Textarea"
                            rows={3}
                        />
                    </div>
                    <div className="mt-10 flex justify-center gap-2">
                        <Button type="primary" htmlType="submit" size="medium">
                            Tìm kiếm
                        </Button>
                        <Button
                            type="outline"
                            htmlType="button"
                            size="medium"
                            onClick={handleExportExcel}
                        >
                            Xuất excel
                        </Button>
                    </div>
                </div>
            </form>
            <div className="overflow-hidden rounded-xl">
                <UserTable
                    currentPage={currentPage}
                    loading={loading}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    data={userData}
                    onChangePageNo={handleOnChangePage}
                    onChangePageSize={handleOnChangeRowsPerPage}
                    handleViewDetail={handleViewDetail}
                />
            </div>
        </>
    )
}

export default HomePage

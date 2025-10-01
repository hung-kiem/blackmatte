import TableData from '@/components/common/Table/TableData'
import { UserRow } from '@/types/user'
import * as React from 'react'
import { TableColumn } from 'react-data-table-component'
import { HiEye } from 'react-icons/hi'

interface UserTableProps {
    currentPage: number
    pageSize: number
    totalCount: number
    loading: boolean
    data: UserRow[]
    onChangePageNo: (pageNo: number) => void
    onChangePageSize: (pageSize: number) => void
    handleViewDetail: (id: number) => void
}

const UserTable = ({
    currentPage,
    pageSize,
    totalCount,
    data,
    loading,
    onChangePageNo,
    onChangePageSize,
    handleViewDetail,
}: UserTableProps) => {
    const columns: TableColumn<UserRow>[] = [
        {
            name: 'STT',
            cell: (_, index: number) =>
                (currentPage - 1) * pageSize + index + 1,
            width: '60px',
            style: { textAlign: 'center' },
        },
        {
            name: 'Tên đăng nhập',
            selector: (row: UserRow) => row.user || '',
        },
        {
            name: 'Họ và tên',
            selector: (row: UserRow) => row.fullName || '',
        },
        {
            name: 'Email',
            selector: (row: UserRow) => row.email || '',
        },
        {
            name: 'Số điện thoại',
            selector: (row: UserRow) => row.tel || '',
        },
        {
            name: 'Nhóm quyền',
            selector: (row: UserRow) => row.role || '',
        },
        {
            name: 'Trạng thái',
            selector: (row: UserRow) => row.status || '',
        },
        {
            name: 'Chức năng',
            cell: (row: UserRow) => (
                <div className="border-gray-5 alight-center flex w-full justify-center gap-2 border-l-2 pl-2">
                    <button
                        onClick={() => handleViewDetail(row.id)}
                        className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
                        title="Xem chi tiết"
                    >
                        <HiEye className="h-4 w-4" />
                    </button>
                </div>
            ),
            width: '200px',
            style: { textAlign: 'center' },
        },
    ]

    return (
        <TableData
            columns={columns}
            data={data}
            loading={loading}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={totalCount}
            onChangePageNo={onChangePageNo}
            onChangePageSize={onChangePageSize}
        />
    )
}

export default UserTable

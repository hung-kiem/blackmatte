import { GetMenuItemResponse } from '@/types/auth'
import { NextResponse } from 'next/server'

export async function GET() {
    const data: GetMenuItemResponse = {
        menuItems: [
            {
                icon: 'home',
                label: 'Màn hình chính',
                route: '/home',
            },
            {
                icon: 'transaction',
                label: 'Quản lý giao dịch tàu',
                children: [
                    {
                        label: 'Danh sách tìm kiếm',
                        children: [
                            {
                                label: 'Danh sách',
                                route: '/home3',
                            },
                        ],
                    },
                    {
                        label: 'Danh sách giao dịch V2',
                        route: '/home1',
                    },
                    {
                        label: 'Danh sách hoàn',
                        route: '/home2',
                    },
                    {
                        label: 'Danh sách SMS',
                        route: '/home7',
                    },
                    {
                        label: 'Danh sách OTT',
                        route: '/home4',
                    },
                    {
                        label: 'Chương trình bán chéo',
                        route: '#',
                    },
                    {
                        label: 'Chương trình khuyến mãi',
                        route: '#',
                    },
                ],
            },
            {
                icon: 'report',
                label: 'Quản lý báo cáo tàu',
                children: [
                    {
                        label: 'Phòng kế toán',
                        children: [
                            {
                                label: 'BC chi tiết vé',
                                route: '#',
                            },
                            {
                                label: 'BC chi tiết thanh toán',
                                route: '#',
                            },
                            {
                                label: 'BC tổng hợp kế toán',
                                route: '#',
                            },
                        ],
                    },
                    {
                        label: 'Phòng thanh toán',
                        route: '#',
                        children: [
                            {
                                label: 'BC chi tiết GD đặt vé',
                                route: '#',
                            },
                            {
                                label: 'BC chi tiết GD hủy',
                                route: '#',
                            },
                            {
                                label: 'Báo cáo tổng hợp số liệu',
                                route: '#',
                            },
                        ],
                    },
                    {
                        label: 'Khách hàng',
                        route: '#',
                    },
                ],
            },
            {
                icon: 'user',
                label: 'Quản lý người dùng',
                children: [
                    {
                        label: 'Danh sách người dùng',
                        route: '/users',
                    },
                    {
                        label: 'Quản lý phân quyền',
                        route: '/roles',
                    },
                ],
            },
        ],
    }

    return NextResponse.json(data)
}
